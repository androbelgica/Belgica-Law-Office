# BelgicaLaw - Professional Legal Services Website

A modern, professional website for BelgicaLaw, providing legal consultation and notarial services in Metro Manila. Built with Laravel 12 and React.js using Inertia.js for seamless full-stack development.

## Features

- **Professional Design**: Clean, trustworthy design with modern UI elements
- **Responsive Layout**: Mobile-friendly design that works on all devices
- **Service Showcase**: Comprehensive display of legal services offered
- **Contact Forms**: Multiple ways for clients to get in touch
- **Inquiry Widget**: Floating messaging widget for quick inquiries
- **WhatsApp Integration**: Direct contact via WhatsApp
- **Professional Typography**: Uses Inter and Merriweather fonts for a formal look
- **Modern Color Scheme**: Professional blues and grays

## Tech Stack

- **Backend**: Laravel 12
- **Frontend**: React.js with Inertia.js
- **Styling**: Tailwind CSS v4
- **Database**: SQLite (development)
- **Build Tool**: Vite

## Pages

- **Home**: Hero section, services overview, testimonials
- **About**: Professional background and credentials
- **Services**: Detailed service offerings and process
- **Contact**: Contact form and office information

## Getting Started

### Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js and npm

### Installation

1. Clone the repository
2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Install JavaScript dependencies:
   ```bash
   npm install
   ```

4. Copy environment file:
   ```bash
   cp .env.example .env
   ```

5. Generate application key:
   ```bash
   php artisan key:generate
   ```

6. Run database migrations:
   ```bash
   php artisan migrate
   ```

7. Build assets:
   ```bash
   npm run build
   ```

### Development

1. Start the Laravel development server:
   ```bash
   php artisan serve
   ```

2. In another terminal, start the Vite development server:
   ```bash
   npm run dev
   ```

3. Visit `http://localhost:8000` in your browser

## Customization

### Contact Information
Update contact details in:
- `resources/js/Components/Footer.jsx`
- `resources/js/Pages/Contact.jsx`
- `resources/js/Components/WhatsAppButton.jsx`

### Services
Modify services in:
- `resources/js/Pages/Home.jsx`
- `resources/js/Pages/Services.jsx`

### Colors and Styling
Customize the professional color scheme in:
- `resources/css/app.css`

## Deployment

1. Build production assets:
   ```bash
   npm run build
   ```

2. Configure your web server to point to the `public` directory
3. Set up your production database
4. Configure email settings for contact forms

## License

This project is proprietary software for BelgicaLaw.
