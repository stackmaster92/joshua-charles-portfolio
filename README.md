# Portfolio Website V5

A modern, responsive portfolio website built with React and Tailwind CSS.

## 🚀 Features

- **Responsive Design** - Works seamlessly on all devices
- **Modern UI/UX** - Beautiful animations and transitions
- **Contact Form** - Integrated EmailJS for contact form submissions
- **Project Showcase** - Display your projects with detailed information
- **Professional Experience Timeline** - Showcase your work history
- **Certificate Gallery** - Display your achievements
- **Comment System** - Interactive comments powered by Supabase (optional)

## 🛠️ Tech Stack

- **React 18** - Frontend framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Material UI** - React component library
- **Framer Motion** - Animation library
- **AOS** - Animate On Scroll library
- **Lucide React** - Icon library
- **EmailJS** - Contact form email service
- **Supabase** - Backend for portfolio data and comments (optional)
- **SweetAlert2** - Beautiful alert dialogs

## 📋 Prerequisites

- **Node.js** (version 16.x or higher)
- **npm** or **yarn** package manager

## 🏃‍♂️ Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Portofolio_V5
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
# EmailJS Configuration (Required for contact form)
VITE_EMAILJS_SERVICE_ID=your-service-id
VITE_EMAILJS_TEMPLATE_ID=your-template-id
VITE_EMAILJS_PUBLIC_KEY=your-public-key

# Supabase Configuration (Optional - for comments and dynamic data)
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

**Note:** All environment variables must be prefixed with `VITE_` for Vite to access them.

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Building for Production

To create a production-ready build:

```bash
npm run build
```

The optimized build files will be saved in the `dist` folder.

## 📁 Project Structure

```
src/
├── components/     # Reusable React components
├── Pages/         # Page components
├── data/          # Static data (projects, etc.)
├── images/        # Image assets
└── main.jsx       # Application entry point
```

## ⚙️ Configuration

### EmailJS Setup

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create a service, template, and get your public key
3. Add the credentials to your `.env` file

### Supabase Setup (Optional)

If you want to use Supabase for dynamic data and comments:

1. Create a project at [Supabase](https://supabase.com/)
2. Set up the required tables (see Supabase documentation)
3. Add your credentials to `.env`

## 🚨 Troubleshooting

- **Build errors**: Ensure all dependencies are installed correctly
- **Environment variables not working**: Restart the dev server after creating/modifying `.env`
- **Styling issues**: Clear browser cache and rebuild

## 📝 License

This project is private and proprietary.

## 📞 Support

For issues or questions, please contact the repository owner.
