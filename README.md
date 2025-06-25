# 🎯 Voxen--User Feedback System

A comprehensive full-stack application for collecting, managing, and analyzing user feedback with beautiful analytics dashboard and real-time insights.

![User Feedback System](https://raw.githubusercontent.com/SoumyadipOjha/Voxen---User-Feedback-Management/main/frontend/src/assets/b.png)
## ✨ Features

### 🎨 Frontend Features
- **Beautiful Feedback Form**: Clean, responsive form with real-time validation
- **Interactive Analytics Dashboard**: Comprehensive charts and statistics
- **Advanced Feedback Management**: View, filter, sort, and manage feedback efficiently
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern Pink Theme**: Elegant design with Chakra UI components
- **Real-time Updates**: Instant feedback status updates
- **Search & Filter**: Advanced filtering by category, status, rating, and text search
- **Pagination**: Efficient handling of large datasets

### 🚀 Backend Features
- **RESTful API**: Complete CRUD operations for feedback management
- **MongoDB Integration**: Secure data storage with Mongoose ODM
- **Data Validation**: Comprehensive server-side validation with Joi
- **Analytics Engine**: Advanced feedback analytics and reporting
- **Security Features**: Rate limiting, CORS protection, and Helmet security
- **Error Handling**: Robust error management and logging
- **Health Monitoring**: API health check endpoints

### 📊 Analytics & Insights
- **Feedback Trends**: Monthly submission patterns and growth analysis
- **Category Distribution**: Visual breakdown of feedback types
- **Rating Analysis**: User satisfaction metrics and distribution
- **Status Tracking**: Monitor pending, reviewed, and resolved feedback
- **Performance Metrics**: Average ratings and response times
- **Interactive Charts**: Beautiful visualizations with Chart.js

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Chakra UI** for component library
- **Chart.js** for data visualization
- **React Router** for navigation
- **Vite** for development and building
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **Joi** for validation
- **CORS** and **Helmet** for security
- **Express Rate Limit** for API protection

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React)       │◄──►│   (Node.js)     │◄──►│   (MongoDB)     │
│                 │    │                 │    │                 │
│ • Feedback Form │    │ • REST API      │    │ • Feedback      │
│ • Dashboard     │    │ • Validation    │    │   Collection    │
│ • Analytics     │    │ • Analytics     │    │ • Indexes       │
│ • Charts        │    │ • Security      │    │ • Aggregation   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📁 Project Structure

```
user-feedback-system/
├── 📁 backend/
│   ├── 📁 controllers/
│   │   └── feedbackController.js    # Request handlers
│   ├── 📁 middleware/
│   │   ├── errorHandler.js          # Error handling
│   │   └── validation.js            # Input validation
│   ├── 📁 models/
│   │   └── Feedback.js              # Database schema
│   ├── 📁 routes/
│   │   └── feedback.js              # API routes
│   ├── 📁 utils/
│   │   ├── appError.js              # Custom error class
│   │   └── catchAsync.js            # Async error wrapper
│   ├── .env                         # Environment variables
│   ├── package.json                 # Backend dependencies
│   └── server.js                    # Main server file
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── 📁 Dashboard/
│   │   │   │   ├── AnalyticsChart.tsx
│   │   │   │   ├── CategoryChart.tsx
│   │   │   │   ├── FeedbackTable.tsx
│   │   │   │   ├── RatingChart.tsx
│   │   │   │   └── StatCard.tsx
│   │   │   └── 📁 Layout/
│   │   │       └── Navbar.tsx
│   │   ├── 📁 pages/
│   │   │   ├── Dashboard.tsx        # Analytics dashboard
│   │   │   └── FeedbackForm.tsx     # Feedback submission
│   │   ├── 📁 services/
│   │   │   └── feedbackService.ts   # API service layer
│   │   ├── 📁 theme/
│   │   │   └── index.ts             # Chakra UI theme
│   │   ├── App.tsx                  # Main app component
│   │   └── main.tsx                 # App entry point
│   ├── index.html
│   ├── package.json                 # Frontend dependencies
│   └── vite.config.ts               # Vite configuration
└── README.md                        # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (local installation or cloud service)
- **npm** or **yarn** package manager

### 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/user-feedback-system.git
   cd user-feedback-system
   ```

2. **Install backend dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**:
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**:
   ```bash
   cd ../backend
   cp .env.example .env
   ```
   
   Edit `.env` file:
   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/feedback-system
   PORT=5000
   NODE_ENV=development
   ```

5. **Start MongoDB** (if running locally):
   ```bash
   mongod
   ```

### 🏃‍♂️ Running the Application

#### Development Mode (Recommended)

**Option 1: Run both servers simultaneously**
```bash
# From the root directory
npm run dev
```

**Option 2: Run servers separately**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

#### Production Mode

**Build frontend**:
```bash
cd frontend
npm run build
```

**Start backend**:
```bash
cd backend
npm start
```

### 🌐 Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## 📱 Screenshots

### Feedback Submission Form
![Feedback Form](https://raw.githubusercontent.com/SoumyadipOjha/Voxen---User-Feedback-Management/main/frontend/src/assets/a.png)

*Clean and intuitive feedback submission form with real-time validation*

### Analytics Dashboard
![Analytics Dashboard](https://raw.githubusercontent.com/SoumyadipOjha/Voxen---User-Feedback-Management/main/frontend/src/assets/b.png)

![Analytics Dashboard](https://raw.githubusercontent.com/SoumyadipOjha/Voxen---User-Feedback-Management/main/frontend/src/assets/c.png)

*Comprehensive analytics dashboard with interactive charts and insights*

## 🔌 API Endpoints

### Feedback Operations
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/feedback` | Submit new feedback |
| `GET` | `/api/feedback` | Get all feedback (with filtering) |
| `GET` | `/api/feedback/:id` | Get specific feedback |
| `PUT` | `/api/feedback/:id` | Update feedback status |
| `DELETE` | `/api/feedback/:id` | Delete feedback |

### Analytics
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/feedback/analytics` | Get comprehensive analytics |

### System
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Server health status |

## 📊 Database Schema

### Feedback Model
```javascript
{
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    validate: email format
  },
  category: {
    type: String,
    enum: ['suggestion', 'bug-report', 'feature-request', 'general'],
    default: 'general'
  },
  message: {
    type: String,
    required: true,
    maxlength: 1000
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'resolved'],
    default: 'pending'
  },
  createdAt: Date,
  updatedAt: Date
}
```

## 🎯 Usage Guide

### Submitting Feedback
1. Navigate to the home page
2. Fill out the feedback form:
   - Enter your name and email
   - Select a category (Suggestion, Bug Report, Feature Request, General)
   - Choose a rating (1-5 stars)
   - Write your detailed feedback
3. Click "Submit Feedback"
4. Receive confirmation of successful submission

### Managing Feedback (Dashboard)
1. Navigate to the Dashboard
2. View analytics overview with key metrics
3. Explore interactive charts:
   - Monthly feedback trends
   - Category distribution
   - Rating analysis
4. Manage feedback in the table:
   - Search by name, email, or message
   - Filter by category, status, or rating
   - Sort by date, rating, or other criteria
   - Update feedback status inline
   - Navigate through pages

## 🔒 Security Features

- **Rate Limiting**: Prevents API abuse (100 requests per 15 minutes)
- **CORS Protection**: Configured for specific origins
- **Input Validation**: Comprehensive server-side validation
- **Helmet Security**: HTTP security headers
- **Error Handling**: Secure error responses
- **Environment Variables**: Sensitive data protection

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)
```bash
cd frontend
npm run build
# Deploy the 'dist' folder
```

### Backend Deployment (Heroku/Railway)
```bash
cd backend
# Set environment variables in your hosting platform
# Deploy with: npm start
```

### Environment Variables for Production
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=production
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Feedback form validation
- [ ] Feedback submission
- [ ] Dashboard loading
- [ ] Charts rendering
- [ ] Filtering and sorting
- [ ] Status updates
- [ ] Responsive design
- [ ] API endpoints

### API Testing with curl
```bash
# Submit feedback
curl -X POST http://localhost:5000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","category":"suggestion","message":"Great app!","rating":5}'

# Get analytics
curl http://localhost:5000/api/feedback/analytics
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

**MongoDB Connection Error**
```bash
# Ensure MongoDB is running
mongod

# Check if port 27017 is available
netstat -an | grep 27017
```

**Port Already in Use**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

**Dependencies Issues**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

For issues and questions:
- Create an issue in the repository
- Check existing issues for solutions
- Review the troubleshooting section

## 🙏 Acknowledgments

- **Chakra UI** for the beautiful component library
- **Chart.js** for powerful data visualization
- **MongoDB** for reliable data storage
- **Express.js** for robust backend framework
- **React** for the amazing frontend library

---

**Made with ❤️ and lots of ☕**

*Happy coding! 🚀*
