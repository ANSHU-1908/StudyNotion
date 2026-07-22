# StudyNotion (v1.0)

StudyNotion is a fully functional Ed-Tech platform that enables users to create, consume, and rate educational content. It is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and follows clean, production-grade architectural patterns.

## 🚀 Features
- **Student Dashboard:** Enroll in courses, watch video lectures, and track progress.
- **Instructor Dashboard:** Create and manage courses, upload videos, and track revenue.
- **Authentication:** Secure JWT-based authentication with OTP email verification.
- **Payment Integration:** Razorpay integration for seamless course purchases.
- **Responsive UI:** Modern, accessible, and responsive user interface with dark mode aesthetics.

## 🛠 Tech Stack
- **Frontend:** React, React Router, Redux Toolkit, Vanilla CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Services:** Razorpay (Payments), Cloudinary (Media Storage), Nodemailer (Emails)

## 📂 Project Structure

```text
studynotion/
├── backend/
│   ├── config/          # Database, Cloudinary, and Razorpay configuration
│   ├── constants/       # App-wide constants (enums, roles, etc.)
│   ├── controllers/     # Route handler logic
│   ├── middleware/      # Auth, role-checks, error handlers
│   ├── models/          # Mongoose database schemas
│   ├── routes/          # API route definitions
│   ├── utils/           # Helper functions (Mail sender, token generator)
│   ├── .env.example     # Backend environment template
│   └── server.js        # Entry point for the backend
│
├── frontend/
│   ├── public/          # Static assets (Favicon, index.html)
│   ├── src/
│   │   ├── components/  # Reusable UI components (Navbar, Footer, Sidebar, etc.)
│   │   ├── pages/       # Page-level components (Home, Dashboard, CourseDetails)
│   │   ├── redux/       # Redux Toolkit slices for global state management
│   │   ├── services/    # Axios API wrappers (authAPI, courseAPI, etc.)
│   │   ├── App.js       # Main application routing
│   │   └── index.css    # Global CSS variables and utility classes
│   └── .env.example     # Frontend environment template
│
└── .gitignore           # Global git ignore configuration
```

## 💻 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas)
- Razorpay and Cloudinary Accounts (for API keys)

### 1. Clone the repository
```bash
git clone https://github.com/ANSHU-1908/StudyNotion.git
cd StudyNotion
```

### 2. Setup Backend
```bash
cd backend
npm install
```
Create a `.env` file inside `backend/` by copying the structure from `.env.example` and fill in your credentials:
```bash
cp .env.example .env
```
Start the backend server:
```bash
npm run dev
```

### 3. Setup Frontend
Open a new terminal window:
```bash
cd frontend
npm install
```
Create a `.env` file inside `frontend/` by copying the structure from `.env.example`:
```bash
cp .env.example .env
```
Start the frontend development server:
```bash
npm start
```

## 📄 License
This project is for educational purposes.
