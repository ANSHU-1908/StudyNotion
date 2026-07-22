# Backend Documentation

This directory contains the Express-based backend API for StudyNotion. It follows a clean, layered architecture: `config/` for external service setups (Database, Cloudinary, Razorpay), `controllers/` for distinct route logic, `middleware/` for request interception (Auth), `models/` for Mongoose schemas, `routes/` for API endpoint mappings, `utils/` for helper services (e.g., mailSender), and `constants/` for app-wide enums. This structure ensures clear separation of concerns, easier testing, and scalability.
