# 🚀 MERN Todo App

A feature-rich, full-stack Todo application built with the MERN stack, featuring custom animations, dark/light mode toggle, and user authentication.

## 🌐 Live Demo

**Live Application:** [https://todo-lx3c.onrender.com/](https://todo-lx3c.onrender.com/)

## ✨ Features

### 🎨 **UI/UX Features**
- **Custom Dark/Light Mode Toggle**: Animated sun/moon with twinkling stars
- **Smooth Animations**: Scale effects, transitions, and micro-interactions
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Modern UI**: Clean, minimalist design with proper spacing and typography

### 🔐 **Authentication & Security**
- **JWT Token Management**: Secure authentication with token expiration
- **Password Hashing**: bcrypt with salt rounds for secure password storage
- **Protected Routes**: User-specific todo access
- **Input Validation**: Server-side validation and error handling

### ⚡ **Core Functionality**
- **Real-time CRUD Operations**: Create, Read, Update, Delete todos
- **User-specific Todos**: Each user sees only their own todos
- **Persistent Theme**: Dark/light mode preference saved in localStorage
- **Optimistic Updates**: Immediate UI feedback with proper error handling

## 🛠️ Tech Stack

### **Frontend**
- **React 19** - Latest React with hooks
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **React Icons** - Icon library

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

### **Deployment**
- **Render** - Full-stack deployment platform
- **MongoDB Atlas** - Cloud database

## 📁 Project Structure

```
mern-todo-app/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── todo.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── auth.route.js
│   │   └── todo.route.js
│   └── server.cjs
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── AuthModal.jsx
│   │   ├── DarkModeToggle.jsx
│   │   ├── darkmode.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tarankumar001/Todo.git
   cd Todo
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   ```

3. **Environment Setup**
   
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. **Run the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production build
   npm run build
   npm start
   ```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Todos (Protected Routes)
- `GET /api/todos` - Get all todos for authenticated user
- `POST /api/todos` - Create a new todo
- `PATCH /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## 🎨 Key Features Explained

### Custom Dark Mode Toggle
The dark mode toggle features:
- **Animated Sun/Moon**: SVG-based icons that morph between states
- **Twinkling Stars**: Appear in dark mode with smooth opacity transitions
- **Smooth Transitions**: CSS transitions for all state changes
- **Persistent State**: Theme preference saved in localStorage

### Authentication Flow
- **Registration**: Email/password with bcrypt hashing
- **Login**: JWT token generation with 7-day expiration
- **Protected Routes**: Middleware ensures user authentication
- **Token Management**: Automatic token refresh and logout handling

### Responsive Design
- **Mobile-first**: Optimized for all screen sizes
- **TailwindCSS**: Utility classes for consistent styling
- **Flexible Layout**: Adapts to different viewport sizes

## 🚀 Deployment

### Render Deployment
The application is deployed on Render with:
- **Automatic builds** from GitHub repository
- **Environment variables** for secure configuration
- **Static file serving** for the React frontend
- **MongoDB Atlas** for database hosting

### Environment Variables
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todo-app
JWT_SECRET=your_secure_jwt_secret
NODE_ENV=production
PORT=10000
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**P. Tarankumar**
- GitHub: [@tarankumar001](https://github.com/tarankumar001)
- LinkedIn: [Your LinkedIn Profile]

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite for the fast build tool
- TailwindCSS for the utility-first CSS framework
- MongoDB for the database solution
- Render for the deployment platform

---

⭐ **Star this repository if you found it helpful!** 