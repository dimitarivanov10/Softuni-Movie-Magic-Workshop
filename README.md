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

┌─────────────────────────────────────────────────────┐
│ Client Browser │
└─────────────────┬───────────────────────────────────┘
│ HTTP Requests
▼
┌─────────────────────────────────────────────────────┐
│ Express Application │
│ ┌─────────────────────────────────────────────┐ │
│ │ Middleware Stack │ │
│ │ • Static Files │ │
│ │ • URL Encoded Parser │ │
│ │ • Cookie Parser │ │
│ │ • Auth Middleware │ │
│ └─────────────────────────────────────────────┘ │
│ │
│ ┌──────────────┐ ┌──────────────┐ │
│ │ Routes │ ───► │ Controllers │ │
│ └──────────────┘ └──────┬───────┘ │
│ │ │
│ ▼ │
│ ┌──────────────┐ │
│ │ Services │ │
│ │ (Business │ │
│ │ Logic) │ │
│ └──────┬───────┘ │
│ │ │
│ ▼ │
│ ┌──────────────┐ │
│ │ Models │ │
│ │ (Mongoose │ │
│ │ Schemas) │ │
│ └──────┬───────┘ │
└─────────────────────────────┼─────────────────────┘
│
▼
┌─────────────────┐
│ MongoDB │
│ Database │
└─────────────────┘

The project follows the **MVC (Model-View-Controller)** pattern with a clear separation of concerns:



### Layer Description

1. **Presentation Layer (Views)** - Handlebars templates for UI rendering
2. **Controller Layer** - Handles HTTP requests/responses and orchestrates actions
3. **Service Layer (Business Logic)** - Contains core application logic and data validation
4. **Data Access Layer (Models)** - Mongoose schemas for database interaction
5. **Middleware Layer** - Intercepts requests for cross-cutting concerns

## 📁 Project Structure

src/
├── config/
│ └── constants.js # Configuration constants (JWT_SECRET, etc.)
├── controllers/
│ ├── authController.js # Authentication logic (login/register/logout)
│ ├── homeController.js # Home and about page routes
│ ├── movieController.js # Movie CRUD operations
│ └── castController.js # Cast member management
├── models/
│ ├── User.js # User schema with password hashing
│ ├── Movie.js # Movie schema with validation
│ └── Cast.js # Cast member schema
├── services/
│ ├── authService.js # Authentication business logic
│ ├── movieService.js # Movie business logic
│ └── castService.js # Cast business logic
├── middlewares/
│ └── authMiddleware.js # JWT verification and auth guards
├── utils/
│ ├── errorUtils.js # Error message formatting
│ └── tokenUtils.js # JWT generation utilities
├── views/
│ ├── layouts/
│ │ └── main.hbs # Main layout template
│ ├── home.hbs # Home page with movie catalog
│ ├── about.hbs # About page
│ ├── search.hbs # Search page with filters
│ ├── 404.hbs # Not found page
│ ├── auth/
│ │ ├── login.hbs # Login form
│ │ └── register.hbs # Registration form
│ ├── movies/
│ │ ├── create.hbs # Create movie form
│ │ ├── details.hbs # Movie details with casts
│ │ └── edit.hbs # Edit movie form
│ ├── casts/
│ │ ├── create.hbs # Create cast form
│ │ └── attach.hbs # Attach cast to movie
│ └── partials/
│ └── movie.hbs # Movie card partial
├── public/
│ ├── css/ # Stylesheets
│ └── img/ # Images
├── routes.js # Route definitions
└── index.js # Application entry point


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
