# Issue Solver - Problem Tracking & Resolution Platform

A comprehensive issue tracking and resolution system with role-based access control, built with modern web technologies.

## Features

### 🔐 Security Features
- **JWT-based Authentication**: Secure token-based authentication system
- **Role-Based Access Control**: Separate admin and user roles
- **Password Hashing**: Industry-standard bcryptjs for password security
- **Protected Routes**: Role-based route protection to prevent unauthorized access
- **No Admin Registration**: Users can only register as regular users; admin accounts are created by existing admins only
- **CORS Enabled**: Secure cross-origin requests

### 👤 User Features
- **Create Issues**: Report new issues with detailed information
- **Track Issues**: View personal issue submissions and their status
- **Real-time Updates**: Live issue status tracking
- **Dashboard Analytics**: Personal statistics on issue resolution rates

### 🛡️ Admin Features
- **Manage All Issues**: View and manage all issues across the platform
- **Status Updates**: Change issue status (Pending → Investigating → Resolved)
- **Search & Filter**: Advanced search and filtering capabilities
- **Bulk Operations**: Manage multiple issues efficiently
- **Comprehensive Analytics**: Platform-wide statistics and insights
- **Delete Capability**: Remove resolved or invalid issues

### 🎨 Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Beautiful Gradients**: Modern gradient-based design system
- **Interactive Components**: Smooth animations and transitions
- **Dark & Light Modes**: Optimized for different lighting conditions
- **Professional Color Scheme**: Carefully chosen colors for better usability

## Tech Stack

### Frontend
- **React 19**: Latest React with hooks and context API
- **React Router 7**: Client-side routing
- **Axios**: HTTP client for API communication
- **CSS-in-JS**: Inline styles for component-level styling

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB Atlas**: Cloud database
- **JWT (jsonwebtoken)**: Token-based authentication
- **bcryptjs**: Password hashing and verification
- **Mongoose**: MongoDB ODM

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SafetyNet-Pro
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the backend directory:
   ```
   MONGODB_URI=<your-mongodb-atlas-uri>
   JWT_SECRET=<your-jwt-secret-key>
   PORT=5000
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start the application**
   
   Terminal 1 (Backend):
   ```bash
   cd backend
   npm start
   ```
   
   Terminal 2 (Frontend):
   ```bash
   cd frontend
   npm start
   ```

The application will be available at `http://localhost:3000`

## Default Test Accounts

### Admin Account
- **Username**: admin
- **Password**: admin123
- **Role**: Admin (full access to all issues)

### Regular User Account
- **Username**: user
- **Password**: user123
- **Role**: User (limited to personal issues)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Issues (User)
- `GET /api/alerts` - Get personal issues
- `POST /api/alerts` - Create new issue

### Issues (Admin)
- `GET /api/alerts` - Get all issues
- `PUT /api/alerts/:id` - Update issue status
- `DELETE /api/alerts/:id` - Delete issue

## Security Considerations

### ✅ Implemented Security Measures
1. **Admin Role Protection**: Users cannot register as admin during signup
2. **Password Encryption**: All passwords are hashed with bcryptjs (salt rounds: 10)
3. **JWT Authentication**: Stateless authentication with secure tokens
4. **Input Validation**: Server-side validation of all inputs
5. **CORS Protection**: Restricted to allowed origins
6. **Protected Routes**: Frontend routes protected based on user role

### 🛡️ Production Recommendations
1. Use environment variables for all sensitive data
2. Enable HTTPS/SSL for all connections
3. Implement rate limiting on API endpoints
4. Add request logging and monitoring
5. Set up automated backups for MongoDB
6. Use a reverse proxy (nginx/Apache)
7. Implement API versioning
8. Add request/response compression
9. Set up security headers (CSP, HSTS, etc.)
10. Regular security audits and penetration testing

## File Structure

```
SafetyNet-Pro/
├── backend/
│   ├── server.js           # Main server file
│   ├── models/
│   │   ├── User.js        # User schema with authentication
│   │   └── Alert.js       # Issue/Alert schema
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html     # HTML entry point
│   ├── src/
│   │   ├── App.js         # Main app component
│   │   ├── index.js       # React entry point
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AlertForm.jsx
│   │   │   └── AlertCard.jsx
│   │   └── contexts/
│   │       └── AuthContext.js
│   └── package.json
└── README.md
```

## Building for Production

### Frontend
```bash
cd frontend
npm run build
```

The build folder contains optimized production files.

### Deployment
The application can be deployed to:
- Vercel (Frontend)
- Heroku (Backend)
- AWS (Full stack)
- DigitalOcean (Full stack)
- Netlify (Frontend)

## Troubleshooting

### Admin Mode Not Working
- Ensure you're logged in with an admin account
- Check browser console for errors
- Verify backend is running on port 5000

### Cannot Create Issues
- Check that backend API is accessible
- Verify user is logged in
- Check browser network tab for failed requests

### Registration Issues
- Ensure backend MongoDB connection is active
- Check that all required fields are filled
- Verify unique constraints on email/username

## Contributing

To contribute to this project:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue on the repository.

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
