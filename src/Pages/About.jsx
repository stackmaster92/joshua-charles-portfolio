import React, { useEffect, memo, useMemo, useState, useRef } from "react"
import { FileText, Code, Award, Globe, ArrowUpRight, Sparkles, UserCheck, ChevronDown, ChevronUp, Briefcase, Building2, Calendar, CheckCircle2, TrendingUp, Zap, MapPin, ChevronLeft, ChevronRight, X, Database, Server, Cloud, Target, Layers, Monitor, Network, Brain, Settings } from "lucide-react"
import AOS from 'aos'
import 'aos/dist/aos.css'

// Memoized Components
const Header = memo(() => (
  <div className="text-left lg:mb-8 mb-2">
    <div className="relative group" data-aos="zoom-in-up" data-aos-duration="600">
      <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2 w-full">
        <span className="text-[#a78bfa]">01.</span>
        <span className="text-[#a855f7]">About Me</span>
        <span className="h-[1px] flex-1 bg-gradient-to-r from-[#a855f7]/60 to-transparent ml-2"></span>
      </h2>
    </div>
    <p 
      className="mt-2 text-gray-400 max-w-2xl text-base sm:text-lg flex items-center gap-2"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="w-5 h-5 text-purple-400" />
      Transforming ideas into digital experiences
      <Sparkles className="w-5 h-5 text-purple-400" />
    </p>
  </div>
));

const ProfileImage = memo(() => (
  <div className="flex justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2">
    <div 
      className="relative group" 
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      {/* Optimized gradient backgrounds with reduced complexity for mobile */}
      <div className="absolute -inset-6 opacity-[25%] z-0 hidden sm:block">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 rounded-full blur-2xl animate-spin-slower" />
        <div className="absolute inset-0 bg-gradient-to-l from-fuchsia-500 via-rose-500 to-pink-600 rounded-full blur-2xl animate-pulse-slow opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-cyan-500 to-teal-400 rounded-full blur-2xl animate-float opacity-50" />
      </div>

      <div className="relative">
        <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(120,119,198,0.3)] transform transition-all duration-700 group-hover:scale-105">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full z-20 transition-all duration-700 group-hover:border-white/40 group-hover:scale-105" />
          
          {/* Optimized overlay effects - disabled on mobile */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10 transition-opacity duration-700 group-hover:opacity-0 hidden sm:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-blue-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden sm:block" />
          
          <img
            src="/photo.jpg"
            alt="Joshua Charles - Senior Lead AI/ML Engineer"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
            loading="lazy"
            onError={(e) => {
              // Fallback if photo.jpg doesn't exist, try Photo.png
              if (e.target.src !== '/Photo.png') {
                e.target.src = '/Photo.png';
              }
            }}
          />

          {/* Advanced hover effects - desktop only */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 hidden sm:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/10 to-transparent transform translate-y-full group-hover:-translate-y-full transition-transform duration-1000 delay-100" />
            <div className="absolute inset-0 rounded-full border-8 border-white/10 scale-0 group-hover:scale-100 transition-transform duration-700 animate-pulse-slow" />
          </div>
        </div>
      </div>
    </div>
  </div>
));

const StatCard = memo(({ icon: Icon, color, value, label, description, animation }) => (
  <div data-aos={animation} data-aos-duration={1300} className="relative group">
    <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
      <div className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <span 
          className="text-4xl font-bold text-white"
          data-aos="fade-up-left"
          data-aos-duration="1500"
          data-aos-anchor-placement="top-bottom"
        >
          {value}
        </span>
      </div>

      <div>
        <p 
          className="text-sm uppercase tracking-wider text-gray-300 mb-2"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-anchor-placement="top-bottom"
        >
          {label}
        </p>
        <div className="flex items-center justify-between">
          <p 
            className="text-xs text-gray-400"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-anchor-placement="top-bottom"
          >
            {description}
          </p>
          <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
        </div>
      </div>
    </div>
  </div>
));

// Experience Accordion Component with Professional Design
const ExperienceItem = memo(({ title, company, period, achievements, index, isOpen, onToggle }) => {
  // Determine icon based on title
  const getIcon = () => {
    if (title.toLowerCase().includes('lead') || title.toLowerCase().includes('manager')) {
      return <Briefcase className="w-5 h-5" />;
    } else if (title.toLowerCase().includes('devops') || title.toLowerCase().includes('sre') || title.toLowerCase().includes('platform')) {
      return <Zap className="w-5 h-5" />;
    } else if (title.toLowerCase().includes('engineer')) {
      return <Code className="w-5 h-5" />;
    }
    return <Briefcase className="w-5 h-5" />;
  };

  return (
    <div 
      className="group relative bg-gradient-to-br from-white/5 via-white/5 to-white/3 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl hover:shadow-indigo-500/10"
      data-aos="fade-up"
      data-aos-duration={`${1200 + (index * 100)}`}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300"></div>
      
      {/* Left border accent */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-purple-500 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}></div>
      
      <button
        onClick={onToggle}
        className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-white/5 transition-all duration-300 relative z-10"
      >
        <div className="flex items-start gap-4 flex-1 min-w-0">
          {/* Icon */}
          <div className="flex-shrink-0 mt-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform duration-300">
              {getIcon()}
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
              <div className="flex-1 min-w-0">
                <h4 className="text-lg sm:text-xl font-bold text-white mb-1.5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all duration-300">
                  {title}
                </h4>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 text-indigo-400">
                    <Building2 className="w-4 h-4" />
                    <p className="text-sm font-medium">{company}</p>
                  </div>
                </div>
              </div>
              
              {/* Period Badge */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-xs font-medium text-indigo-300 whitespace-nowrap">{period}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Chevron Icon */}
        <div className="ml-4 flex-shrink-0">
          <div className={`w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 ${isOpen ? 'rotate-180 bg-indigo-500/10 border-indigo-500/20' : 'group-hover:bg-white/10'}`}>
            <ChevronDown className={`w-5 h-5 transition-colors duration-300 ${isOpen ? 'text-indigo-400' : 'text-gray-400'}`} />
          </div>
        </div>
      </button>
      
      {/* Expanded Content */}
      {isOpen && (
        <div 
          data-expanded-content
          className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 border-t border-white/10 relative z-10 animate-in slide-in-from-top-2 duration-300"
        >
          <div className="mt-4 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-5 flex-shrink-0">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              <h5 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Key Achievements</h5>
            </div>
            <ul className="space-y-3 flex-1">
              {achievements.map((achievement, idx) => (
                <li key={idx} className="flex items-start gap-3 group/item">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-5 h-5 text-indigo-400/70 group-hover/item:text-indigo-400 transition-colors duration-200" />
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed flex-1 group-hover/item:text-gray-200 transition-colors duration-200">
                    {achievement}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
});

// Image Carousel Component
const ImageCarousel = memo(({ images, currentIndex, onNext, onPrevious, onDotClick }) => {
  if (!images || images.length === 0) return null;
  if (images.length === 1) {
    return (
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
        style={{
          backgroundImage: `url(${images[0]})`,
          filter: 'blur(0px) brightness(0.75)',
          height: '100%',
          width: '100%',
          objectFit: 'cover'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full" style={{ height: '100%', width: '100%' }}>
      {/* Carousel Images - Fixed Height Container */}
      <div className="relative w-full h-full overflow-hidden" style={{ height: '100%', width: '100%' }}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ${
              index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              filter: 'blur(0px) brightness(0.75)',
              height: '100%',
              width: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={onPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => onDotClick(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-indigo-400 w-8' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
});

// Experience Detail Card - Simplified card style (not modal)
const ExperienceDetailCard = memo(({ experience, position }) => {
  if (!experience) return null;

  return (
    <div 
      className="w-[700px] max-w-[90vw] bg-[#030014] backdrop-blur-xl rounded-xl border border-white/30 shadow-2xl p-6 animate-card-enter"
            style={{
        position: 'fixed',
        top: position?.top || '50%',
        left: position?.left || 'auto',
        right: position?.right || 'auto',
        transform: position?.transform || 'translateY(-50%)',
        zIndex: 50,
        maxHeight: '80vh',
        overflowY: 'auto',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)'
      }}
      onMouseEnter={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="mb-4 pb-4 border-b border-white/10">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">
                {experience.title}
              </h3>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#a855f7]/60" />
              <p className="text-sm font-semibold text-gray-300">
                {experience.company}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#a855f7]/20 border border-[#a855f7]/30 flex-shrink-0">
            <Calendar className="w-3.5 h-3.5 text-[#a855f7]" />
            <span className="text-xs font-semibold text-[#a855f7] whitespace-nowrap">{experience.period}</span>
          </div>
            </div>
          </div>

      {/* Achievements Section */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-[#a855f7]" />
              <h4 className="text-xs font-semibold text-gray-200 uppercase tracking-wide">Key Achievements</h4>
            </div>
        <ul className="space-y-2.5 max-h-[300px] overflow-y-auto custom-scrollbar">
              {experience.achievements.map((achievement, idx) => (
                <li key={idx} className="flex items-start gap-2.5 group/item p-2 rounded-lg hover:bg-white/5 transition-colors duration-200">
                  <div className="flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-[#a855f7] group-hover/item:text-[#a855f7] transition-colors duration-200" />
                  </div>
              <p className="text-sm text-gray-300 leading-relaxed flex-1 group-hover/item:text-white transition-colors duration-200">
                    {achievement}
                  </p>
                </li>
              ))}
            </ul>
          </div>

      {/* Tech Stack Section */}
          {experience.techStack && experience.techStack.length > 0 && (
        <div className="pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 mb-3">
            <Code className="w-4 h-4 text-[#a855f7]" />
                <h4 className="text-xs font-semibold text-gray-200 uppercase tracking-wide">Tech Stack</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {experience.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                className="px-2.5 py-1 rounded-md bg-[#a855f7]/20 border border-[#a855f7]/30 text-xs text-[#a855f7] font-medium backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
    </div>
  );
});

// Timeline Component - Updated to match image style
const TimelineItem = memo(({ experience, index, onMouseEnter, onMouseLeave, isLast }) => {
  // Extract year from period (e.g., "Aug 2024 – Nov 2025" -> "2024")
  const getYear = () => {
    const yearMatch = experience.period.match(/\d{4}/);
    return yearMatch ? yearMatch[0] : '';
  };

  const year = getYear();
  const isEven = index % 2 === 0; // Alternate left/right positioning

  // Get icon based on company/role - Professional icon mapping
  const getCompanyIcon = () => {
    const title = experience.title.toLowerCase();
    const company = experience.company.toLowerCase();
    
    // Data Engineer / AI Engineer
    if (title.includes('data engineer') || title.includes('ai engineer') || company.includes('gravitate')) {
      return <Database className="w-7 h-7 text-[#a855f7]" />;
    }
    // DevOps / SRE / Platform Engineer
    else if (title.includes('devops') || title.includes('sre') || title.includes('platform engineer') || 
             company.includes('grant') || company.includes('cibc') || company.includes('loblaws')) {
      return <Cloud className="w-7 h-7 text-[#a855f7]" />;
    }
    // Technical Project Manager
    else if (title.includes('project manager') || title.includes('technical manager') || company.includes('prosa')) {
      return <Target className="w-7 h-7 text-[#a855f7]" />;
    }
    // Full-Stack Engineer
    else if (title.includes('full-stack') || title.includes('full stack')) {
      return <Layers className="w-7 h-7 text-[#a855f7]" />;
    }
    // Backend Engineer
    else if (title.includes('backend') || company.includes('cloudtech') || company.includes('fintech')) {
      return <Server className="w-7 h-7 text-[#a855f7]" />;
    }
    // Frontend Developer
    else if (title.includes('frontend') || title.includes('front-end') || company.includes('digital')) {
      return <Monitor className="w-7 h-7 text-[#a855f7]" />;
    }
    // Senior Software Engineer
    else if (title.includes('senior software') || company.includes('devx')) {
      return <Code className="w-7 h-7 text-[#a855f7]" />;
    }
    // Default
    return <Briefcase className="w-7 h-7 text-[#a855f7]" />;
  };

  return (
    <div className="relative flex items-start mb-8">
      {/* Timeline Line - Centered vertical line with professional styling */}
      {!isLast && (
        <div className="absolute left-1/2 top-16 bottom-0 transform -translate-x-1/2 z-0">
          {/* Glow effect */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[4px] -translate-x-1/2 bg-gradient-to-b from-[#a855f7]/20 via-[#a855f7]/15 to-transparent blur-sm"></div>
          {/* Main line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#a855f7]/70 via-[#a855f7]/60 to-[#a855f7]/40"></div>
          {/* Inner highlight */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-gradient-to-b from-white/30 via-[#a855f7]/50 to-transparent"></div>
        </div>
      )}
      
      {/* Company Image - Rectangular image centered on timeline */}
      <div className="absolute left-1/2 top-2 transform -translate-x-1/2 z-10 w-24 h-16 flex items-center justify-center">
        {/* Outer glow */}
        <div className="absolute inset-0 rounded-lg bg-[#a855f7]/20 blur-md"></div>
        {/* Shadow ring */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#a855f7]/30 to-[#6366f1]/20 shadow-[0_0_20px_rgba(168,85,247,0.3)]"></div>
        {/* Main image container */}
        <div className="relative w-24 h-16 rounded-lg bg-gradient-to-br from-white via-gray-50 to-[#a855f7]/10 shadow-xl overflow-hidden border-2 border-[#a855f7]/60 backdrop-blur-sm">
          {/* Company image */}
          {experience.images && experience.images.length > 0 ? (
            <img 
              src={experience.images[0]} 
              alt={experience.company}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#a855f7]/20 to-[#6366f1]/20">
              {getCompanyIcon()}
            </div>
          )}
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7]/10 to-transparent"></div>
            </div>
          </div>
          
      {/* Card - Alternating left/right */}
      <div className={`w-[calc(50%-5rem+50px)] ${isEven ? 'mr-auto pr-10' : 'ml-auto pl-10'}`}>
        <button
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="group w-full bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 shadow-lg p-4 text-left hover:shadow-2xl hover:shadow-[#a855f7]/30 hover:border-[#a855f7]/50 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 relative overflow-hidden"
        >
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7]/0 via-[#a855f7]/0 to-[#a855f7]/0 group-hover:from-[#a855f7]/5 group-hover:via-[#a855f7]/3 group-hover:to-[#a855f7]/5 transition-all duration-500 rounded-xl"></div>
          
          <div className="relative z-10">
            <div className="space-y-1.5">
              {/* Title */}
              <h4 className="text-base font-bold text-white leading-tight group-hover:text-[#a855f7] transition-colors duration-300">
              {experience.title}
            </h4>
              
              {/* Company and Working Period - Same row */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-[#a855f7]/60" />
                  <p className="text-xs font-semibold text-gray-300">
                {experience.company}
                  </p>
                </div>
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${
                  isEven 
                    ? 'bg-[#a855f7]/20 text-[#a855f7]' 
                    : 'bg-[#6366f1]/20 text-[#6366f1]'
                }`}>
                  <Calendar className="w-3 h-3" />
                  <span>{experience.period}</span>
              </div>
            </div>
          </div>
        </div>
      </button>
      </div>
    </div>
  );
});

const AboutPage = () => {
  // Memoized calculations
  const { totalProjects, totalCertificates, YearExperience } = useMemo(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const storedCertificates = JSON.parse(localStorage.getItem("certificates") || "[]");
    
    const startDate = new Date("2010-01-01"); // Approximate start of 15+ years experience
    const today = new Date();
    const experience = today.getFullYear() - startDate.getFullYear() -
      (today < new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate()) ? 1 : 0);

    return {
      totalProjects: storedProjects.length,
      totalCertificates: storedCertificates.length,
      YearExperience: experience
    };
  }, []);

  // Experience data with background images (can be single image or array for carousel)
  const experiences = useMemo(() => [
    {
      title: "Lead Data Engineer / AI Engineer",
      company: "Gravitate (Contract)",
      period: "Aug 2024 – Nov 2025",
      images: [
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80",
      ],
      techStack: ["Python", "Apache Airflow", "OpenAI API", "LLM", "ETL Pipelines", "REST APIs", "Docker", "Kubernetes", "AWS", "PostgreSQL", "MongoDB", "Prometheus", "Grafana"],
      achievements: [
        "Designed and built ETL pipelines processing 500M+ records per day using Python and Apache Airflow",
        "Improved pipeline performance by 35% through tuning, optimization, and automated data validation",
        "Developed GPT-powered assistants for deal analysis, investor Q&A, and automated insights",
        "Integrated LLM solutions securely with internal data platforms and APIs",
        "Built analytical and ML models to improve deal discovery accuracy by 25%",
        "Worked closely with product and business teams to deliver scalable, data-driven solutions",
        "Implemented monitoring and alerting to ensure reliable production data and AI pipelines"
      ]
    },
    {
      title: "Senior DevOps / SRE / AI Platform Engineer",
      company: "Grant Thornton",
      period: "Aug 2024 – Mar 2025",
      images: [
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80",
      ],
      techStack: ["Azure", "Terraform", "GitHub Actions", "Azure DevOps", "Docker", "Kubernetes", "Helm", "Prometheus", "Grafana"],
      achievements: [
        "Led cloud modernization initiative for AI and data platforms on Azure, migrating legacy infrastructure to cloud-native architecture using Terraform and Infrastructure as Code principles",
        "Designed and implemented secure, automated CI/CD pipelines using GitHub Actions and Azure DevOps, reducing deployment time by 60% and eliminating manual errors",
        "Built comprehensive observability stack with Prometheus and Grafana, implementing custom metrics, dashboards, and alerting rules for AI platform health monitoring",
        "Containerized applications using Docker and orchestrated deployments with Kubernetes and Helm, improving scalability and resource utilization by 40%",
        "Established SRE practices including SLI/SLO definitions, error budgets, and incident response procedures, reducing platform downtime by 45%",
        "Collaborated with AI/ML teams to optimize model deployment pipelines, ensuring seamless integration between development and production environments"
      ]
    },
    {
      title: "Technical Project Manager",
      company: "Prosa.ai",
      period: "Sep 2023 – Dec 2024",
      images: [
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80",
      ],
      techStack: ["FastAPI", "Python", "React", "TypeScript", "Docker", "Kubernetes", "Helm", "AWS", "OpenAI", "LLM", "PostgreSQL", "MongoDB", "Redis", "Terraform"],
      achievements: [
        "Owned end-to-end delivery of AI-driven NLP, chatbot, and document intelligence platforms, from requirements discovery through production deployment",
        "Led architecture and hands-on development of full-stack solutions, building backend services with FastAPI and Python and frontend applications using React",
        "Translated complex business requirements into technical roadmaps, system designs, and sprint plans, ensuring alignment across engineering, product, and stakeholders",
        "Managed and mentored cross-functional teams to deliver AI-powered automation systems, achieving 35% operational efficiency improvements",
        "Ensured scalable, secure, and reliable deployments using Docker, Kubernetes, and cloud-native best practices, with a focus on performance, security, and maintainability"
      ]
    },
    {
      title: "Senior DevOps / SRE / AI Platform Engineer",
      company: "CIBC",
      period: "Jul 2022 – May 2024",
      images: [
        "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&q=80",
      ],
      techStack: ["AWS", "Azure", "GCP", "Jenkins", "GitLab CI", "Docker", "Kubernetes", "Terraform", "Ansible", "MLOps", "Prometheus", "Grafana", "ELK Stack"],
      achievements: [
        "Architected and implemented multi-cloud CI/CD pipelines across AWS, Azure, and GCP using Jenkins and GitLab CI, supporting enterprise AI and analytics workloads with 99.9% uptime",
        "Built comprehensive observability infrastructure using Prometheus, Grafana, and ELK Stack, enabling real-time monitoring, logging, and alerting for ML platform health and performance",
        "Designed and deployed secure ML platform infrastructure using Terraform and Ansible, implementing automated provisioning, configuration management, and compliance controls",
        "Established MLOps practices including model versioning, automated testing, and canary deployments, reducing model deployment time from days to hours",
        "Implemented container orchestration with Docker and Kubernetes across multi-cloud environments, optimizing resource allocation and improving cost efficiency by 35%",
        "Developed security frameworks and compliance controls for ML platforms, ensuring data privacy, access management, and audit trail requirements",
        "Led incident response and post-mortem processes, establishing SRE best practices that reduced mean time to recovery (MTTR) by 50%"
      ]
    },
    {
      title: "Senior DevOps / SRE / AI Platform Engineer",
      company: "Loblaws Canada",
      period: "Jun 2021 – Jul 2022",
      images: [
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&q=80",
      ],
      techStack: ["Kubernetes", "OpenShift", "Docker", "Helm", "Jenkins", "GitLab CI", "Prometheus", "Grafana", "MLOps", "Python", "Terraform", "Ansible"],
      achievements: [
        "Managed and optimized Kubernetes and OpenShift container platforms supporting AI-enabled applications, ensuring 99.95% uptime and high availability across production environments",
        "Designed and implemented CI/CD pipelines using Jenkins and GitLab, automating build, test, and deployment processes for AI/ML workloads, reducing release cycles by 40%",
        "Built monitoring and alerting infrastructure with Prometheus and Grafana, creating custom dashboards and alerting rules for AI platform metrics, resource utilization, and performance KPIs",
        "Developed Helm charts and containerization strategies using Docker, standardizing deployment processes and enabling rapid scaling of AI applications",
        "Automated infrastructure provisioning and configuration management using Terraform and Ansible, implementing Infrastructure as Code practices for consistent, repeatable deployments",
        "Collaborated with AI/ML engineering teams to optimize resource allocation, implement auto-scaling policies, and improve platform performance for model training and inference workloads",
        "Established SRE practices including capacity planning, disaster recovery procedures, and incident management workflows, ensuring platform reliability and business continuity"
      ]
    },
    {
      title: "Senior Software Engineer",
      company: "DevX Innovations",
      period: "Apr 2020 – Aug 2022",
      images: [
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80",
      ],
      techStack: ["Python", "Django", "React", "JavaScript", "PostgreSQL", "Redis", "Docker", "AWS", "Nginx", "Gunicorn", "REST APIs"],
      achievements: [
        "Architected and developed scalable backend systems using Python and Django, designing RESTful APIs that handled millions of requests daily with sub-200ms response times",
        "Built responsive, interactive frontend applications using React and JavaScript, implementing modern UI/UX patterns and optimizing client-side performance",
        "Designed and optimized database schemas using PostgreSQL and MySQL, implementing efficient indexing strategies, query optimization, and connection pooling that improved database performance by 40%",
        "Implemented caching strategies using Redis, reducing database load by 50% and improving application response times for frequently accessed data",
        "Containerized applications using Docker and deployed to AWS infrastructure, implementing auto-scaling, load balancing with Nginx, and WSGI server configuration with Gunicorn",
        "Established CI/CD pipelines automating testing, code quality checks, and deployment processes, reducing release cycles and improving code reliability",
        "Improved overall backend performance by 30% through code optimization, database tuning, and caching strategies, while reducing production defects by 35% through comprehensive testing and code reviews"
      ]
    },
    {
      title: "Backend & Full-Stack Engineer",
      company: "FinTech Solutions Ltd.",
      period: "Apr 2019 – Jan 2020",
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
      ],
      techStack: ["Node.js", "Python", "React", "Apache Kafka", "Redis", "PostgreSQL", "Docker", "AWS", "REST APIs", "WebSocket"],
      achievements: [
        "Designed and developed real-time analytics dashboards using React, processing and visualizing streaming data to provide actionable business insights, reducing decision-making time by 30%",
        "Built scalable data pipelines using Python and Apache Kafka, ingesting and processing millions of events per day with low latency and high throughput",
        "Implemented WebSocket-based real-time communication systems using Node.js, enabling instant data updates and interactive features that increased user engagement by 25%",
        "Developed RESTful APIs and microservices architecture, ensuring seamless integration between frontend applications and backend data processing systems",
        "Optimized database performance using PostgreSQL with advanced query optimization, indexing strategies, and connection pooling for high-concurrency workloads",
        "Implemented caching layers using Redis for session management and frequently accessed data, improving application response times and reducing database load",
        "Containerized applications with Docker and deployed to AWS cloud infrastructure, implementing CI/CD pipelines for automated testing and deployment"
      ]
    },
    {
      title: "Backend Engineer",
      company: "CloudTech Systems",
      period: "Mar 2017 – Jan 2019",
      images: [
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80",
      ],
      techStack: ["PHP", "Laravel", "MySQL", "Redis", "REST APIs", "Docker", "Nginx", "AWS"],
      achievements: [
        "Developed and maintained scalable backend services using PHP and Laravel to support high-traffic applications",
        "Designed and implemented RESTful APIs for internal and external integrations",
        "Worked extensively with MySQL, including schema design and query optimization",
        "Optimized database queries, indexing strategies, and transaction handling for high-volume workloads, improving query performance by 50%",
        "Improved overall system reliability and stability by 30% through code refactoring, error handling, and performance tuning",
        "Collaborated with frontend and infrastructure teams to ensure smooth deployments and system scalability"
      ]
    },
    {
      title: "Frontend Developer",
      company: "Digital Innovations",
      period: "Aug 2015 – Jan 2017",
      images: [
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&q=80",
      ],
      techStack: ["JavaScript", "React", "HTML5", "CSS3", "Webpack", "Babel"],
      achievements: [
        "Developed responsive, high-performance web interfaces using JavaScript and React, implementing component-based architecture and modern UI/UX design patterns",
        "Optimized frontend build processes using Webpack and Babel, implementing code splitting, lazy loading, and tree shaking to reduce bundle sizes and improve load times",
        "Improved page load times by up to 40% through frontend optimization techniques including image optimization, CSS minification, JavaScript bundling, and CDN integration",
        "Implemented responsive design principles using HTML5 and CSS3, ensuring seamless user experiences across desktop, tablet, and mobile devices",
        "Collaborated with backend teams to integrate RESTful APIs, implementing error handling, loading states, and data validation for robust user interactions",
        "Established frontend development workflows using Git version control and NPM package management, ensuring code quality and maintainability",
        "Conducted performance audits and implemented optimization strategies including lazy loading, memoization, and virtual scrolling for large datasets"
      ]
    }
  ], []);

  // Modal state for experience details
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExperienceIndex, setSelectedExperienceIndex] = useState(0);
  const [modalPosition, setModalPosition] = useState({ top: '50%', left: '32px', right: 'auto', transform: 'translateY(-50%)' });
  const cardRefs = useRef(experiences.map(() => React.createRef()));
  const hideCardTimeoutRef = useRef(null);

  // Calculate minimum height needed to display all companies in timeline
  // Header: ~68px (mb-6 + h4 + p) + Padding: ~48px (p-5 sm:p-6) + Items: 9 × ~60px + Gaps: 8 × 32px + Extra bottom space
  // Maximum 9 items without scrollbar, more than 9 will show scrollbar
  const minHeightForAllCompanies = useMemo(() => {
    const headerHeight = 68; // mb-6 (24px) + h4 (28px) + p (16px)
    const paddingHeight = 48; // p-5 sm:p-6 top and bottom
    const itemHeight = 60; // Each timeline item approximate height (reduced for compact design)
    const gapHeight = 32; // mb-8 (2rem = 32px)
    const extraBottomSpace = 8; // Extra space at bottom to ensure last item is fully visible
    const maxItemsWithoutScroll = 9; // Maximum items to display without scrollbar
    const itemsToCalculate = Math.min(experiences.length, maxItemsWithoutScroll);
    const totalItemsHeight = itemsToCalculate * itemHeight;
    const totalGapsHeight = (itemsToCalculate - 1) * gapHeight;
    return headerHeight + paddingHeight + totalItemsHeight + totalGapsHeight + extraBottomSpace;
  }, [experiences.length]);

  // Hide card on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isModalOpen) {
        // Clear any pending hide timeout
        if (hideCardTimeoutRef.current) {
          clearTimeout(hideCardTimeoutRef.current);
          hideCardTimeoutRef.current = null;
        }
        // Hide the card immediately when scrolling
        setIsModalOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isModalOpen]);

  // Optimized AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: false, 
      });
    };

    initAOS();
    
    // Debounced resize handler
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initAOS, 250);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Memoized stats data
  const statsData = useMemo(() => [
    {
      icon: Code,
      color: "from-[#6366f1] to-[#a855f7]",
      value: totalProjects,
      label: "Total Projects",
      description: "AI/ML & backend systems delivered",
      animation: "fade-right",
    },
    {
      icon: Award,
      color: "from-[#a855f7] to-[#6366f1]",
      value: totalCertificates,
      label: "Certificates",
      description: "Industry certifications earned",
      animation: "fade-up",
    },
    {
      icon: Globe,
      color: "from-[#6366f1] to-[#a855f7]",
      value: YearExperience,
      label: "Years of Experience",
      description: "Years of professional experience",
      animation: "fade-left",
    },
  ], [totalProjects, totalCertificates, YearExperience]);

  return (
    <div
      className="h-auto pb-[10%] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10 sm-mt-0" 
      id="About"
    >
      <Header />

      <div className="w-full mx-auto pt-8 sm:pt-12 relative">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <div data-aos="fade-right" data-aos-duration="1000">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div>
                <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">Available for Opportunities</span>
              </div>
              
            </div>
            
            <div className="space-y-4">
              <p 
                className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed text-justify"
                data-aos="fade-right"
                data-aos-duration="1500"
              >
                I am a Senior Lead AI/ML and Backend Engineering professional building and scaling enterprise-grade AI, data, and cloud platforms across fintech, consulting, and high-growth environments.
              </p>
              
              <p 
                className="text-base sm:text-lg text-gray-400 leading-relaxed text-justify"
                data-aos="fade-right"
                data-aos-duration="1600"
              >
                My expertise spans delivering <span className="text-purple-400">LLM-powered systems</span>, ML pipelines, and mission-critical backend services from design to production. I have a strong background in cloud architecture, MLOps, and platform reliability, with a proven ability to align technical execution with business goals and lead cross-functional teams.
              </p>
            </div>

               {/* Quote Section */}
      <div 
        className="relative bg-gradient-to-br from-[#6366f1]/5 via-transparent to-[#a855f7]/5 border border-gradient-to-r border-[#6366f1]/30 rounded-2xl p-4 my-6 backdrop-blur-md shadow-2xl overflow-hidden"
        data-aos="fade-up"
        data-aos-duration="1700"
      >
        {/* Floating orbs background */}
        <div className="absolute top-2 right-4 w-16 h-16 bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -left-2 w-12 h-12 bg-gradient-to-r from-[#a855f7]/20 to-[#6366f1]/20 rounded-full blur-lg"></div>
        
        {/* Quote icon */}
        <div className="absolute top-3 left-4 text-[#6366f1] opacity-30">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
          </svg>
        </div>
        
        <blockquote className="text-gray-300 text-center lg:text-left italic font-medium text-sm relative z-10 pl-6">
          "Leveraging AI as a professional tool, not a replacement."
        </blockquote>
      </div>

            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-4 lg:px-0 w-full">
              <a href="/Joshua Charles.pdf" download="Joshua Charles.pdf" className="w-full lg:w-auto">
              <button 
                data-aos="fade-up"
                data-aos-duration="800"
                className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 shadow-lg hover:shadow-xl "
              >
                <FileText className="w-4 h-4 sm:w-5 sm:h-5" /> Download CV
              </button>
              </a>
              <a href="#Portofolio" className="w-full lg:w-auto">
              <button 
                data-aos="fade-up"
                data-aos-duration="1000"
                className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg border border-[#a855f7]/50 text-[#a855f7] font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 hover:bg-[#a855f7]/10 "
              >
                <Code className="w-4 h-4 sm:w-5 sm:h-5" /> View Projects
              </button>
              </a>
            </div>
          </div>

          <ProfileImage />
        </div>

        <a href="#Portofolio">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 cursor-pointer">
            {statsData.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </a>

        {/* Professional Experience Section */}
        <div className="mt-24 space-y-16">
          <div className="text-center space-y-4" data-aos="fade-up" data-aos-duration="1000">
            <div className="inline-flex items-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-indigo-500/50 to-indigo-500"></div>
              <div className="p-3 rounded-full bg-gradient-to-br from-[#6366f1]/20 to-[#a855f7]/20 border border-[#a855f7]/30">
                <Briefcase className="w-6 h-6 text-[#a855f7]" />
              </div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent via-purple-500/50 to-purple-500"></div>
            </div>
            <h3 
              className="text-[32px] sm:text-[44px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7] tracking-tight"
            >
              Professional Experience
            </h3>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
              A journey through innovation, leadership, and technical excellence
            </p>
          </div>

          {/* Timeline Layout - Full width, centered */}
          <div className="relative max-w-6xl mx-auto px-4 sm:px-8" data-aos="fade-up" data-aos-duration="1000">
            <div className="relative">
              {/* Timeline Items */}
              <div className="relative space-y-0 pt-4">
                {experiences.map((exp, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <div key={index} ref={cardRefs.current[index]}>
                    <TimelineItem
                      experience={exp}
                      index={index}
                        onMouseEnter={() => {
                          // Clear any pending hide timeout
                          if (hideCardTimeoutRef.current) {
                            clearTimeout(hideCardTimeoutRef.current);
                            hideCardTimeoutRef.current = null;
                          }
                          
                          setSelectedExperienceIndex(index);
                          setIsModalOpen(true);
                          // Position card 10px from button horizontally
                          // Card start point should align with button start point in Y axis
                          setTimeout(() => {
                            if (cardRefs.current[index]?.current) {
                              // Find the button element within the ref
                              const wrapper = cardRefs.current[index].current;
                              const button = wrapper.querySelector('button');
                              if (!button) return;
                              
                              const rect = button.getBoundingClientRect();
                              const modalWidth = 700;
                              const gap = 30; // 30px gap from button
                              
                              let left, right;
                              if (isEven) {
                                // Left side button: card appears 10px from button's right side
                                left = `${rect.right + gap}px`;
                                right = 'auto';
                              } else {
                                // Right side button: card appears 10px from button's left side
                                // Card's right edge should be 10px from button's left edge
                                left = `${rect.left - modalWidth - gap}px`;
                                right = 'auto';
                              }
                              
                              // Card top should align with button top (start point in Y)
                              const top = `${rect.top}px`;
                              
                              setModalPosition({ top, left, right, transform: 'translateY(0)' });
                            }
                          }, 0);
                        }}
                        onMouseLeave={() => {
                          // Delay hiding the card by 0.5 seconds
                          hideCardTimeoutRef.current = setTimeout(() => {
                            setIsModalOpen(false);
                            hideCardTimeoutRef.current = null;
                          }, 500);
                        }}
                      isLast={index === experiences.length - 1}
                    />
                    </div>
                  );
                })}
                </div>
              </div>
            </div>
            
          {/* Experience Details Card - Shows on hover */}
          {isModalOpen && (
            <div
              onMouseEnter={() => {
                // Clear any pending hide timeout when hovering over card
                if (hideCardTimeoutRef.current) {
                  clearTimeout(hideCardTimeoutRef.current);
                  hideCardTimeoutRef.current = null;
                }
                setIsModalOpen(true);
              }}
              onMouseLeave={() => {
                // Delay hiding the card by 0.5 seconds
                hideCardTimeoutRef.current = setTimeout(() => {
                  setIsModalOpen(false);
                  hideCardTimeoutRef.current = null;
                }, 500);
              }}
            >
              <ExperienceDetailCard 
                experience={experiences[selectedExperienceIndex]} 
                position={modalPosition}
              />
              </div>
          )}

          {/* Education & Certifications Section */}
          <div className="mt-16 space-y-8">
            <div className="text-center space-y-4" data-aos="fade-up" data-aos-duration="1000">
              <div className="inline-flex items-center gap-4">
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-indigo-500/50 to-indigo-500"></div>
                <div className="p-3 rounded-full bg-gradient-to-br from-[#6366f1]/20 to-[#a855f7]/20 border border-[#a855f7]/30">
                  <Award className="w-6 h-6 text-[#a855f7]" />
                </div>
                <div className="h-px w-16 bg-gradient-to-l from-transparent via-purple-500/50 to-purple-500"></div>
              </div>
              <h3 
                className="text-[32px] sm:text-[44px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7] tracking-tight"
            >
              Education & Certifications
            </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Education */}
              <div 
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
                data-aos="fade-right"
                data-aos-duration="1200"
              >
                <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <UserCheck className="w-6 h-6 text-indigo-400" />
                  Education
                </h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-white font-medium">MBA</p>
                    <p className="text-gray-400 text-sm">SCDL University</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">Bachelor of Commerce</p>
                    <p className="text-gray-400 text-sm">University of Delhi</p>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div 
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
                data-aos="fade-left"
                data-aos-duration="1200"
              >
                <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Award className="w-6 h-6 text-purple-400" />
                  Certifications
                </h4>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-300">PMP®</p>
                  <p className="text-gray-300">ITIL® Foundation</p>
                  <p className="text-gray-300">AWS Certified Solutions Architect – Associate</p>
                  <p className="text-gray-300">Microsoft Azure Administrator & Solutions Architect Expert</p>
                  <p className="text-gray-300">CompTIA Security+, Cloud+, PenTest+</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default memo(AboutPage);