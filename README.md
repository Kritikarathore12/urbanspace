# 🏙️ UrbanSpace - Premium Portfolio & CMS

**UrbanSpace** is a full-stack MERN (MongoDB, Express, React, Node.js) application designed to showcase a creative portfolio with a fully functional Content Management System (CMS).

The application features a modern, "Glassmorphism" aesthetic, real-time data fetching, and secure administrative controls.

---

## 🚀 Live Demo
*   **Frontend**: [https://urbanspace-fawn.vercel.app/](https://urbanspace-fawn.vercel.app/)
*   **Backend API**: [https://urbanspace.onrender.com](https://urbanspace.onrender.com)

---

## ✨ Key Features

### 🎨 Public Interface (Frontend)
*   **Modern UI/UX**: Built with **React + Vite** and styled using **Tailwind CSS**.
*   **Dynamic Content**: "Our Projects" and "Happy Clients" sections are fetched dynamically from the database.
*   **Responsive Design**: Fully optimized for Mobile, Tablet, and Desktop.
*   **Animations**: Smooth transitions powered by `framer-motion`.

### 🛡️ Admin Dashboard (CMS)
*   **Secure Authentication**: JWT (JSON Web Token) based login system for administrators.
*   **Project Management**: Create, Read, Update, and Delete (CRUD) portfolio projects.
*   **Client Management**: Manage client testimonials and details.
*   **Image Management**: Integrated **Cloudinary** for scalable, cloud-based image storage and optimization.
*   **Secure Uploads**: Multer middleware ensures safe file handling.

---

## 🛠️ Technology Stack

### Frontend
-   **Core**: React.js (Vite)
-   **Styling**: Tailwind CSS
-   **Icons**: Lucide React
-   **State/API**: Axios, React Hooks
-   **Tools**: PostCSS, Autoprefixer

### Backend
-   **Server**: Node.js, Express.js
-   **Database**: MongoDB (Mongoose ODM)
-   **Auth**: JSON Web Token (JWT), BcryptJS
-   **Storage**: Cloudinary, Multer
-   **Security**: CORS, Dotenv

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Prerequisites
-   Node.js (v14+)
-   MongoDB Atlas Account
-   Cloudinary Account

### 2. Clone the Repository
```bash
git clone https://github.com/Kritikarathore12/urbanspace.git
cd urbanspace
```

### 3. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=dmixbtllv
CLOUDINARY_API_KEY=253725849657114
CLOUDINARY_API_SECRET=hYyhfKWAk0ohVtng-9pxIpBqcHE
```
Start the server:
```bash
node index.js
```

### 4. Frontend Setup
Open a new terminal:
```bash
cd client
npm install
npm run dev
```

Visit `http://localhost:5173` to view the app.

---

## 🌐 API Endpoints

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/projects` | Fetch all projects | Public |
| `POST` | `/api/projects` | Create a new project | Admin |
| `DELETE` | `/api/projects/:id` | Delete a project | Admin |
| `GET` | `/api/clients` | Fetch all clients | Public |
| `POST` | `/api/auth/login` | Administrator Login | Public |

---

## 📂 Project Structure
```
urbanspace/
├── client/          # React Frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Admin & Landing pages
│   │   └── context/     # Auth Context
├── server/          # Node.js Backend
│   ├── controllers/ # Logic for API endpoints
│   ├── models/      # Mongoose Database Schemas
│   ├── routes/      # API Routes
│   └── middleware/  # Auth & Upload Middleware
└── README.md        # Project Documentation
```

---

## 👤 Author
**Kritika Rathore**
*   Full Stack Developer
*   [GitHub Profile](https://github.com/Kritikarathore12)
