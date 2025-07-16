**Admin Dashboard & CMS Implementation Plan: BelgicaLaw Website**

---

**Purpose**
To provide BelgicaLaw with a secure and user-friendly internal dashboard to manage website content without needing to manually edit code. The CMS will allow the admin to manage text content, service listings, inquiries, and FAQ/blog entries.

---

**Phase 1: Objectives & Scope**

### 1.1 Goals
- Enable the admin (lawyer or authorized staff) to manage key website content
- Secure login-protected area with role-based access
- Store content updates in the database for dynamic frontend rendering

### 1.2 Features
- Admin login/logout system
- Dashboard overview panel
- Content editing modules:
  - About Page Editor
  - Services Manager (add/update/delete services)
  - FAQ or Blog Manager
  - View and respond to inquiries
- Media upload (profile photo, downloadable PDFs)

---

**Phase 2: Tech Stack & Tools**

### 2.1 Backend
- Laravel 12 (with Laravel Breeze or Jetstream for authentication)
- SQLite or MySQL database

### 2.2 Frontend
- Inertia.js + React.js (to align with main site stack)
- Tailwind CSS for styling

### 2.3 Packages (optional for rapid development)
- [Filament Admin Panel](https://filamentphp.com/) – customizable Laravel admin panel
- [Laravel Nova] (if licensing is available)

---

**Phase 3: CMS Structure**

### 3.1 Routes
- `/admin` – dashboard root
- `/admin/login` – authentication page
- `/admin/about` – About page editor
- `/admin/services` – Manage legal services
- `/admin/inquiries` – View submitted messages
- `/admin/faqs` – Manage FAQ/blog entries

### 3.2 Models & Tables
- `User` – Admin accounts
- `Service` – Legal services list
- `Inquiry` – Messages from inquiry widget
- `Faq` – Optional Q&A/blog content
- `Setting` – For storing about page and general info

### 3.3 Authentication
- Laravel Breeze with React frontend for login
- Middleware to protect all `/admin/*` routes
- Optional role system if there will be multiple admins

---

**Phase 4: Admin Interface Features**

### 4.1 Dashboard
- Welcome message
- Quick stats: # of inquiries, published services, etc.

### 4.2 WYSIWYG Editor
- For About page and FAQ content editing (use [TipTap](https://tiptap.dev/) or [Editor.js](https://editorjs.io/))

### 4.3 CRUD Management
- Add/edit/delete service entries
- View/mark/read/respond to inquiries
- Toggle visibility or order of FAQs/services

---

**Phase 5: Deployment & Security**

### 5.1 Hosting Security
- Use HTTPS and force SSL
- Protect `.env` and sensitive files
- Set proper file/folder permissions

### 5.2 Admin Security
- Strong password validation
- reCAPTCHA on login (optional)
- Rate-limiting and lockout for brute force prevention

---

**Phase 6: Maintenance**

### 6.1 Ongoing Tasks
- Update legal service listings as needed
- Review and respond to client inquiries
- Update FAQs based on client trends
- Monitor activity logs and perform backups

---

**End of Document**

