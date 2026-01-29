import React, { useMemo, useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Globe2,
  User,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";
import emailjs from "@emailjs/browser";

// Generate 30-minute time slots: 9am to 5pm (workday hours)
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 17; hour++) {
    // 9 AM to 5 PM (17:00)
    slots.push(`${hour === 12 ? 12 : hour % 12}:00 ${hour >= 12 ? 'PM' : 'AM'}`);
    if (hour < 17) {
      // Don't add :30 slot for 5 PM
      slots.push(`${hour === 12 ? 12 : hour % 12}:30 ${hour >= 12 ? 'PM' : 'AM'}`);
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();
const MEETING_LOCATION = "Toronto, ON, Canada";

const AppointmentScheduler = () => {
  const today = useMemo(() => {
    const date = new Date();
    // If today is a weekend, move to next Monday
    const day = date.getDay();
    if (day === 0) {
      // Sunday - move to Monday
      date.setDate(date.getDate() + 1);
    } else if (day === 6) {
      // Saturday - move to Monday
      date.setDate(date.getDate() + 2);
    }
    return date;
  }, []);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState("9:00 AM");
  const [step, setStep] = useState("select"); // 'select' | 'details' | 'confirmed'
  const [details, setDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    consent: false,
  });
  const [bookedSlots, setBookedSlots] = useState(() => {
    // Load booked slots from localStorage on component mount
    try {
      const stored = localStorage.getItem("bookedAppointments");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Helper function to create a unique key for a date+time slot
  const getSlotKey = (date, time) => {
    const dateStr = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return `${dateStr}-${time}`;
  };

  // Check if a slot is booked
  const isSlotBooked = (date, time) => {
    const slotKey = getSlotKey(date, time);
    return bookedSlots.includes(slotKey);
  };

  // Save a booked slot and send confirmation emails to both organizer and client
  const saveBookedSlot = async (date, time) => {
    const slotKey = getSlotKey(date, time);
    const updated = [...bookedSlots, slotKey];
    setBookedSlots(updated);
    localStorage.setItem("bookedAppointments", JSON.stringify(updated));

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_page3ar";
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_hordn1h";
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "99o0MgHfdJvDvUD_A";
    const organizerEmail = "joshua80.charles@gmail.com";

    const formattedDate = date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    // 1) Email to organizer (Joshua)
    try {
      const organizerParams = {
        // appears as sender
        name: "Joshua Charles",
        email: organizerEmail,
        // recipient – EmailJS template MUST use {{to_email}} in the “To Email” field
        to_email: organizerEmail,
        message:
          `New Appointment Booking Notification\n\n` +
          `Client Details:\n` +
          `- Name: ${details.fullName}\n` +
          `- Email: ${details.email}\n` +
          `- Phone: ${details.phone || "N/A"}\n\n` +
          `Appointment Details:\n` +
          `- Date: ${formattedDate}\n` +
          `- Time: ${time}\n` +
          `- Duration: 30 minutes\n` +
          `- Timezone: ${timezoneLabel}\n` +
          `- Location: ${MEETING_LOCATION}\n\n` +
          `Client Message:\n${details.message || "No message provided"}\n\n` +
          `Please add this appointment to your calendar.`,
      };

      await emailjs.send(serviceId, templateId, organizerParams, publicKey);
    } catch (error) {
      console.error("Failed to send appointment email to organizer:", error);
    }

    // 2) Email to client
    try {
      const clientParams = {
        name: details.fullName || "Client",
        email: details.email,
        to_email: details.email,
        message:
          `Appointment Confirmation\n\n` +
          `Dear ${details.fullName || "Client"},\n\n` +
          `Your appointment has been successfully scheduled.\n\n` +
          `Appointment Details:\n` +
          `- Date: ${formattedDate}\n` +
          `- Time: ${time}\n` +
          `- Duration: 30 minutes\n` +
          `- Timezone: ${timezoneLabel}\n` +
          `- Location: ${MEETING_LOCATION}\n\n` +
          `Organizer:\n` +
          `- Name: Joshua Charles\n` +
          `- Email: ${organizerEmail}\n\n` +
          `If you have any questions, feel free to reply to this email.\n\n` +
          `Best regards,\nJoshua Charles`,
      };

      await emailjs.send(serviceId, templateId, clientParams, publicKey);
    } catch (error) {
      console.error("Failed to send appointment confirmation email to client:", error);
    }
  };

  const monthLabel = useMemo(() => {
    return new Date(currentYear, currentMonth, 1).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  }, [currentMonth, currentYear]);

  const daysInMonth = useMemo(() => {
    const days = [];
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const firstWeekday = firstDay.getDay(); // 0 = Sunday

    // Leading empty slots
    for (let i = 0; i < firstWeekday; i++) {
      days.push(null);
    }

    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(new Date(currentYear, currentMonth, d));
    }

    return days;
  }, [currentMonth, currentYear]);

  const handleMonthChange = (direction) => {
    setCurrentMonth((prev) => {
      const next = prev + direction;
      if (next < 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      if (next > 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return next;
    });
  };

  const isSameDay = (a, b) =>
    a &&
    b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  // Toronto, Canada timezone
  const timezoneLabel = useMemo(() => {
    try {
      // Create a date formatter for Toronto timezone
      const torontoFormatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Toronto",
        timeZoneName: "long",
      });
      
      // Get the timezone name (e.g., "Eastern Standard Time" or "Eastern Daylight Time")
      const torontoString = torontoFormatter.formatToParts(new Date()).find(part => part.type === "timeZoneName")?.value || "";
      
      // Calculate offset: Create dates in Toronto and UTC, then compare
      const now = new Date();
      const torontoTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Toronto" }));
      const utcTime = new Date(now.toLocaleString("en-US", { timeZone: "UTC" }));
      
      // Calculate offset in minutes
      const offsetMs = torontoTime.getTime() - utcTime.getTime();
      const offsetMinutes = Math.round(offsetMs / (1000 * 60));
      const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
      const offsetMins = Math.abs(offsetMinutes) % 60;
      const sign = offsetMinutes >= 0 ? "+" : "-";
      
      return `GMT${sign}${offsetHours.toString().padStart(2, "0")}:${offsetMins.toString().padStart(2, "0")} America/Toronto`;
    } catch {
      // Fallback
      return "GMT-05:00 America/Toronto";
    }
  }, []);

  // Generate Google Calendar URL
  const generateGoogleCalendarLink = () => {
    // Parse the selected time (e.g., "10:00 AM" or "2:00 PM")
    const timeMatch = selectedTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!timeMatch) return null;

    let hours = parseInt(timeMatch[1], 10);
    const minutes = parseInt(timeMatch[2], 10);
    const period = timeMatch[3].toUpperCase();

    // Convert to 24-hour format
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    // Create date object with selected date and time in local timezone
    const startDate = new Date(selectedDate);
    startDate.setHours(hours, minutes, 0, 0);

    // End date is 30 minutes later
    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + 30);

    // Format dates for Google Calendar (YYYYMMDDTHHMMSSZ in UTC)
    // getUTC* methods automatically convert local time to UTC
    const formatGoogleDate = (date) => {
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, "0");
      const day = String(date.getUTCDate()).padStart(2, "0");
      const hour = String(date.getUTCHours()).padStart(2, "0");
      const minute = String(date.getUTCMinutes()).padStart(2, "0");
      const second = String(date.getUTCSeconds()).padStart(2, "0");
      return `${year}${month}${day}T${hour}${minute}${second}Z`;
    };

    const startStr = formatGoogleDate(startDate);
    const endStr = formatGoogleDate(endDate);

    // Build Google Calendar URL
    const clientName = details.fullName || "Client";
    const eventTitle = encodeURIComponent(`Appointment: ${clientName} with Joshua Charles`);
    const organizerEmail = "joshua80.charles@gmail.com";
    const organizerName = "Joshua Charles";
    
    const eventDetails = encodeURIComponent(
      `30-minute strategy & architecture review session.\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `ORGANIZER:\n` +
      `${organizerName}\n` +
      `Email: ${organizerEmail}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `CLIENT DETAILS:\n` +
      `Name: ${details.fullName}\n` +
      `Email: ${details.email}\n` +
      `Phone: ${details.phone || "N/A"}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `APPOINTMENT DETAILS:\n` +
      `Date: ${selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })}\n` +
      `Time: ${selectedTime}\n` +
      `Duration: 30 minutes\n` +
      `Timezone: ${timezoneLabel}\n` +
      `Location: ${MEETING_LOCATION}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `CLIENT MESSAGE:\n${details.message || "No message provided"}`
    );
    const eventLocation = encodeURIComponent(MEETING_LOCATION);
    
    // Always include organizer email and client email as attendees
    const clientEmail = details.email ? encodeURIComponent(details.email) : "";
    const organizerParam = `&add=${encodeURIComponent(organizerEmail)}`;
    const clientParam = clientEmail ? `&add=${clientEmail}` : "";
    const addParam = `${organizerParam}${clientParam}`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startStr}/${endStr}&details=${eventDetails}&location=${eventLocation}${addParam}`;
  };


  const handleConfirmAppointment = () => {
    // Basic validation for required fields
    if (!details.fullName || !details.email || !details.message) {
      alert("Please fill in your full name, email, and message before scheduling.");
      return;
    }

    // Check if the selected slot is already booked
    if (isSlotBooked(selectedDate, selectedTime)) {
      alert("This time slot is already booked. Please select a different time.");
      return;
    }

    // Save the booked slot
    saveBookedSlot(selectedDate, selectedTime);

    // Move to confirmation step; calendar links are available via buttons
    setStep("confirmed");
  };

  return (
    <section
      className="mt-16 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-10"
      id="Appointment"
    >
      <div className="flex flex-col gap-8 lg:flex-row min-h-[460px]">
        {/* Left: Summary */}
        <div className="lg:w-1/3 border-b lg:border-b-0 lg:border-r border-white/10 pr-0 lg:pr-8 pb-6 lg:pb-0">
          <h3 className="text-2xl md:text-3xl font-semibold text-white mb-2">
            Book an Appointment
          </h3>
          <p className="text-sm text-gray-400 mb-6 pt-[10px]">
            Schedule a 30-minute session to discuss your AI, cloud, or backend
            projects. We can walk through your architecture, roadmap, or code
            together.
          </p>

          <div className="space-y-4 text-sm">
            <div>
              <span className="block text-xs uppercase tracking-wide text-gray-500">
                Session
              </span>
              <p className="mt-1 text-gray-200 font-medium">
                30 mins · Strategy & Architecture Review
              </p>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-wide text-gray-500">
                Selected Time
              </span>
              <p className="mt-1 text-gray-200 font-medium flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-400" />
                {selectedTime} on{" "}
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-wide text-gray-500">
                Time zone
              </span>
              <p className="mt-1 text-gray-200 font-medium flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-indigo-400" />
                {timezoneLabel}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Date & time picker OR confirmation */}
        <div className="lg:w-2/3 pl-0 lg:pl-8 flex">
          {step === "select" ? (
            <div className="flex flex-col gap-6 w-full min-h-[360px]">
              {/* Month nav */}
              <div className="flex items-center justify-end">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleMonthChange(-1)}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-medium text-gray-100 min-w-[140px] text-center">
                    {monthLabel}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleMonthChange(1)}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Calendar and Time Slots */}
              <div className="grid grid-cols-[auto,auto] gap-6 items-start">
                {/* Calendar */}
                <div className="flex flex-col w-full">
                  <div className="mb-4">
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-wide text-gray-500">
                        Select Date &amp; Time
                      </span>
                      <span className="text-sm text-gray-400 mt-0.5">
                        Choose a day and a slot that works for you
                      </span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="grid grid-cols-7 text-center text-[11px] uppercase tracking-wide text-gray-500 gap-1">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                        <span key={d}>{d}</span>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1.5">
                    {daysInMonth.map((date, index) => {
                      if (!date) {
                        return <div key={`empty-${index}`} />;
                      }

                      // Disable past dates and weekends (Saturday = 6, Sunday = 0)
                      const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                      const isWeekend = date.getDay() === 0 || date.getDay() === 6; // Sunday or Saturday
                      const disabled = isPast || isWeekend;
                      const selected = isSameDay(date, selectedDate);

                      return (
                        <button
                          key={date.toISOString()}
                          type="button"
                          disabled={disabled}
                          onClick={() => setSelectedDate(date)}
                          className={[
                            "w-9 h-9 rounded-full text-sm flex items-center justify-center transition-all",
                            disabled
                              ? "text-gray-600 cursor-not-allowed bg-white/5"
                              : selected
                              ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/40"
                              : "bg-white/5 text-gray-200 hover:bg-indigo-500/20 hover:text-white",
                          ].join(" ")}
                        >
                          {date.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time slots */}
                <div className="flex flex-col w-full">
                  <div className="mb-4 -mt-[5px]">
                    <span className="text-xs uppercase tracking-wide text-gray-500">
                      Time (Toronto, Canada)
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                  {timeSlots.map((slot) => {
                    const selected = slot === selectedTime;
                    const booked = isSlotBooked(selectedDate, slot);
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={booked}
                        onClick={() => !booked && setSelectedTime(slot)}
                        className={[
                          "px-4 py-2 rounded-xl border text-sm font-medium flex items-center justify-center gap-2 transition-all",
                          booked
                            ? "bg-gray-700/30 text-gray-500 border-gray-700/50 cursor-not-allowed opacity-50"
                            : selected
                            ? "bg-indigo-500 text-white border-indigo-400 shadow-lg shadow-indigo-500/40"
                            : "bg-white/5 text-gray-200 border-white/10 hover:bg-indigo-500/10 hover:border-indigo-400/70",
                        ].join(" ")}
                        title={booked ? "This time slot is already booked" : ""}
                      >
                        <Clock className="w-4 h-4" />
                        {slot}
                        {booked && <span className="text-[10px] ml-1">(Booked)</span>}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => setStep("details")}
                  className="mt-4 inline-flex items-center justify-center px-4 py-3 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f5] text-white text-sm font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.01] active:scale-[0.99] transition-all"
                >
                  Continue
                </button>
              </div>
            </div>
            </div>
          ) : step === "details" ? (
            <div className="flex flex-col gap-6 w-full min-h-[360px]">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-wide text-gray-500">
                    Enter Details
                  </span>
                  <span className="text-sm text-gray-400">
                    Please provide your information to complete the booking
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep("select")}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  ← Back
                </button>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={details.fullName}
                    onChange={(e) =>
                      setDetails((prev) => ({ ...prev, fullName: e.target.value }))
                    }
                    placeholder="Full Name"
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={details.email}
                    onChange={(e) =>
                      setDetails((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder="Email *"
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    value={details.phone}
                    onChange={(e) =>
                      setDetails((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    placeholder="Phone (optional)"
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>

                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <textarea
                    rows={4}
                    value={details.message}
                    onChange={(e) =>
                      setDetails((prev) => ({ ...prev, message: e.target.value }))
                    }
                    placeholder="Message * — what is this meeting about?"
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 resize-none"
                  />
                </div>

                <label className="flex items-start gap-2 text-[11px] text-gray-400">
                  <input
                    type="checkbox"
                    className="mt-[3px] h-3 w-3 rounded border border-white/20 bg-white/5"
                    checked={details.consent}
                    onChange={(e) =>
                      setDetails((prev) => ({ ...prev, consent: e.target.checked }))
                    }
                  />
                  <span>
                    I consent to receive email notifications and reminders about this
                    meeting.
                  </span>
                </label>
              </div>

              <button
                type="button"
                onClick={handleConfirmAppointment}
                className="mt-2 inline-flex items-center justify-center px-4 py-3 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white text-sm font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                Schedule Meeting & Add to Google Calendar
              </button>

              <p className="text-[11px] text-gray-500 leading-snug mt-1">
                This will open Google Calendar with the appointment pre-filled. After
                you click "Save" there, the meeting will appear in your Google Calendar.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center gap-8 w-full min-h-[360px]">
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-indigo-500/10 flex items-center justify-center">
                  <Clock className="w-7 h-7 text-indigo-400" />
                </div>
                <h4 className="text-xl md:text-2xl font-semibold text-white">
                  Your Meeting has been Scheduled
                </h4>
                <p className="text-sm text-gray-400 max-w-xl">
                  Thank you for your appointment request. You’ll receive a calendar
                  event once you add it to your preferred calendar below.
                </p>
              </div>

              <div className="w-full max-w-xl bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-left space-y-2 text-sm text-gray-200">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  <span>30 mins · Strategy &amp; Architecture Review</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  <span>
                    {selectedTime} –{" "}
                    {selectedDate.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}{" "}
                    ,{" "}
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-indigo-400" />
                  <span>{MEETING_LOCATION}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-indigo-400" />
                  <span>{timezoneLabel}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  const link = generateGoogleCalendarLink();
                  if (link) {
                    window.open(link, "_blank");
                    // Reset back to first step after opening Google Calendar
                    setStep("select");
                    // Reset form details
                    setDetails({
                      fullName: "",
                      email: "",
                      phone: "",
                      message: "",
                      consent: false,
                    });
                  }
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white text-sm font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Add to Google Calendar
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AppointmentScheduler;

