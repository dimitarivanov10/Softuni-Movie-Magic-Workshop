# 🎬 Movie Magic Workshop

A full-stack web application for movie enthusiasts to discover, review, and manage movies and casts. Built with modern JavaScript technologies following MVC architecture.

## 📋 Table of Contents
- [Overview](#overview)
- [Live Demo](#live-demo)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Features](#features)
- [Data Models](#data-models)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Authentication & Authorization](#authentication--authorization)
- [Error Handling](#error-handling)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

Movie Magic is a comprehensive back-end workshop project demonstrating full-stack JavaScript development. Users can browse movies, create new movie entries, manage cast members, and interact with content through a secure authentication system.

## 🚀 Live Demo

*Coming soon*

## 💻 Technologies Used

### Backend Core
- **Node.js** - JavaScript runtime environment
- **Express.js 5.1.0** - Web framework for building REST APIs and handling HTTP requests
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose 8.18.3** - ODM (Object Document Mapper) for MongoDB schema validation and modeling

### Authentication & Security
- **bcrypt 6.0.0** - Password hashing library for secure credential storage
- **jsonwebtoken 9.0.2** - JWT implementation for stateless authentication
- **cookie-parser 1.4.7** - Cookie parsing middleware for token storage

### Templating & Frontend
- **express-handlebars 8.0.1** - Template engine for dynamic HTML rendering
- **UUID 13.0.0** - For generating unique identifiers

### Development Tools
- **nodemon** (via --watch flag) - Auto-reload during development

## 🏗 Architecture
````bash
│
├── 🔵 PRESENTATION LAYER (Views)
│   ├── 📁 views/
│   │   ├── layouts/main.hbs      # Base HTML wrapper
│   │   ├── home.hbs              # Movie catalog display
│   │   ├── search.hbs            # Search form & results
│   │   ├── movies/details.hbs    # Single movie view
│   │   ├── movies/create.hbs     # Movie creation form
│   │   ├── movies/edit.hbs       # Movie edit form
│   │   ├── casts/create.hbs      # Cast creation form
│   │   ├── casts/attach.hbs      # Attach cast to movie
│   │   ├── auth/login.hbs        # Login form
│   │   ├── auth/register.hbs     # Registration form
│   │   ├── about.hbs             # About page
│   │   └── 404.hbs               # Not found page
│   │
│   └── 📁 partials/
│       └── movie.hbs              # Reusable movie card component
│
├── 🟢 CONTROLLER LAYER (Request Handlers)
│   ├── 📁 controllers/
│   │   ├── homeController.js     # GET /, GET /about
│   │   ├── movieController.js    # CRUD operations for movies
│   │   ├── castController.js     # Create & manage casts
│   │   └── authController.js     # Login, register, logout
│   │
│   └── 📁 middlewares/
│       └── authMiddleware.js     # isAuth, isGuest guards
│
├── 🟡 SERVICE LAYER (Business Logic)
│   └── 📁 services/
│       ├── movieService.js       # Movie filtering, CRUD logic
│       ├── castService.js        # Cast queries & exclusions
│       └── authService.js        # Password hashing, JWT generation
│
├── 🔴 MODEL LAYER (Database & Schemas)
│   └── 📁 models/
│       ├── Movie.js              # Movie schema with validation
│       ├── Cast.js               # Cast schema with validation
│       └── User.js               # User schema with bcrypt hashing
│
└── 🟣 DATA STORAGE
    └── 🗄️ MongoDB
        ├── 📁 users collection   # Email + hashed password
        ├── 📁 movies collection  # Movie data + casts[] + creator
        └── 📁 casts collection   # Cast member information

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 REQUEST FLOW EXAMPLE (Create Movie)

┌─────────────┐
│   Browser   │
│  POST /movies/create
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────────────────────────────┐
│  🟢 CONTROLLER LAYER                                        │
│  movieController.post('/create')                            │
│  ├── isAuth guard (checks JWT)                             │
│  ├── Extracts movieData from req.body                      │
│  └── Calls movieService.create(movieData, userId)          │
└──────┬──────────────────────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────────────────────┐
│  🟡 SERVICE LAYER                                           │
│  movieService.create()                                      │
│  ├── Validates input data                                  │
│  ├── Adds creator field (userId)                           │
│  ├── Converts rating to Number                             │
│  └── Calls Movie.create()                                  │
└──────┬──────────────────────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────────────────────┐
│  🔴 MODEL LAYER                                             │
│  Movie.create(movieData)                                    │
│  ├── Schema validation (required, minLength, regex)        │
│  ├── Saves to MongoDB                                      │
│  └── Returns Mongoose document                             │
└──────┬──────────────────────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────────────────────┐
│  🗄️ DATABASE                                                │
│  MongoDB - movies collection                                │
│  └── Inserts new movie document                            │
└──────┬──────────────────────────────────────────────────────┘
       │
       ▼
┌─────────────┐
│   Browser   │
│  Redirect to /
└─────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔐 AUTHENTICATION FLOW

┌─────────────┐
│   Browser   │
│  POST /auth/login (email + password)
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────────────────────────────┐
│  🟢 CONTROLLER                                              │
│  authController.post('/login')                              │
│  └── Calls authService.login(email, password)              │
└──────┬──────────────────────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────────────────────┐
│  🟡 SERVICE                                                 │
│  authService.login()                                        │
│  ├── User.findOne({ email })                               │
│  ├── bcrypt.compare(password, user.password)               │
│  └── generateAuthToken(user) → JWT (expires 2h)           │
└──────┬──────────────────────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────────────────────┐
│  🟢 CONTROLLER                                              │
│  res.cookie('auth', token)                                 │
│  res.redirect('/')                                          │
└──────┬──────────────────────────────────────────────────────┘
       │
       ▼
┌─────────────┐
│   Browser   │
│  Redirect to / (authenticated)
└─────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔀 MIDDLEWARE PIPELINE

┌─────────────────────────────────────────────────────────────┐
│  Every Request                                              │
└──────┬──────────────────────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────────────────────┐
│  1. express.static()          # Serve CSS/images           │
└──────┬──────────────────────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────────────────────┐
│  2. express.urlencoded()      # Parse form data            │
└──────┬──────────────────────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────────────────────┐
│  3. cookieParser()            # Parse cookies              │
└──────┬──────────────────────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────────────────────┐
│  4. authMiddleware()          # Verify JWT & set req.user  │
│     ├── If token valid → req.isAuthenticated = true        │
│     ├── res.locals.isAuthenticated = true                  │
│     └── res.locals.user = decoded                          │
└──────┬──────────────────────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────────────────────┐
│  5. Routes → Controller → Service → Model → Response       │
└─────────────────────────────────────────────────────────────┘
````


## 📁 Project Structure

````bash
📁 softuni-movie-magic-workshop/
├── 📁 src/
│   ├── 📁 config/
│   │   └── constants.js              # JWT_SECRET & app configuration
│   ├── 📁 controllers/
│   │   ├── authController.js         # Login, register, logout logic
│   │   ├── homeController.js         # Home & about page routes
│   │   ├── movieController.js        # Movie CRUD operations
│   │   └── castController.js         # Cast member management
│   ├── 📁 models/
│   │   ├── User.js                   # User schema with password hashing
│   │   ├── Movie.js                  # Movie schema with validation
│   │   └── Cast.js                   # Cast schema with validation
│   ├── 📁 services/
│   │   ├── authService.js            # Authentication business logic
│   │   ├── movieService.js           # Movie filtering & DB operations
│   │   └── castService.js            # Cast query & creation logic
│   ├── 📁 middlewares/
│   │   └── authMiddleware.js         # JWT verification & route guards
│   ├── 📁 utils/
│   │   ├── errorUtils.js             # Error message formatting
│   │   └── tokenUtils.js             # JWT generation utilities
│   ├── 📁 views/
│   │   ├── 📁 layouts/
│   │   │   └── main.hbs              # Base layout with navigation
│   │   ├── 📁 partials/
│   │   │   └── movie.hbs             # Reusable movie card component
│   │   ├── home.hbs                  # Movie catalog homepage
│   │   ├── about.hbs                 # About page
│   │   ├── search.hbs                # Search with filters
│   │   ├── 404.hbs                   # Not found page
│   │   ├── 📁 auth/
│   │   │   ├── login.hbs             # Login form
│   │   │   └── register.hbs          # Registration form
│   │   ├── 📁 movies/
│   │   │   ├── create.hbs            # Create movie form
│   │   │   ├── details.hbs           # Movie details with casts
│   │   │   └── edit.hbs              # Edit movie form
│   │   └── 📁 casts/
│   │       ├── create.hbs            # Create cast form
│   │       └── attach.hbs            # Attach cast to movie
│   ├── 📁 public/
│   │   ├── 📁 css/
│   │   │   └── style.css             # Main stylesheet
│   │   └── 📁 img/
│   │       ├── logo.webp             # Site logo
│   │       ├── about-image.png       # About page image
│   │       └── error-image.webp      # 404 error image
│   ├── routes.js                     # Route aggregation
│   └── index.js                      # Application entry point
├── package.json                      # Dependencies & scripts
├── package-lock.json                 # Dependency lock file
└── README.md                         # Project documentation
````
## ✨ Features

### User Management
- **Registration** - New user account creation with password confirmation
- **Login** - Secure authentication with JWT tokens
- **Logout** - Session termination
- **Protected Routes** - Authentication guards for sensitive operations

### Movie Management
- **Browse Movies** - View all movies on homepage
- **Search Movies** - Filter by title, genre, and year
- **Create Movie** - Add new movies with validation
- **Edit Movie** - Update existing movie information
- **Delete Movie** - Remove movies (creator only)
- **Rate Movies** - Rate movies on a 1-10 scale

### Cast Management
- **Create Cast** - Add new cast members with biographical info
- **Attach Cast** - Associate cast members with movies
- **View Casts** - See all cast members attached to a movie

### Search & Filtering
- Case-insensitive title search using MongoDB regex
- Exact genre matching
- Year filtering

## 📊 Data Models

### User Model
```javascript
{
  email: String (required, min:10, regex: email pattern),
  password: String (required, min:6, hashed with bcrypt),
  rePassword: Virtual (password confirmation)
}
