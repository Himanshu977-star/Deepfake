# TruthLens - Deepfake Detection Frontend

A modern React frontend for the TruthLens deepfake detection system, built with Vite for optimal performance and developer experience.

## 🚀 Features

- **Image Detection**: Upload and analyze images for deepfake content
- **Video Detection**: Frame-by-frame analysis of video files
- **Live Webcam Detection**: Real-time analysis using your webcam
- **Modern UI**: Beautiful, responsive interface with smooth animations
- **Real-time Results**: Instant predictions with confidence scores
- **Analysis History**: Track detection results over time

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, React Router
- **Styling**: CSS3 with modern features (backdrop-filter, gradients)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **File Handling**: React Dropzone
- **Webcam**: React Webcam
- **HTTP Client**: Axios

## 📦 Installation

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd deepfake-detection-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:3000` to view the application.

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Navigation header
│   └── Header.css      # Header styles
├── pages/              # Main application pages
│   ├── Home.jsx        # Landing page
│   ├── ImageDetection.jsx  # Image upload & analysis
│   ├── VideoDetection.jsx  # Video upload & analysis
│   ├── WebcamDetection.jsx # Live webcam detection
│   ├── About.jsx       # About page
│   └── *.css           # Page-specific styles
├── services/           # API and external services
│   └── api.js          # API client configuration
├── App.jsx             # Main application component
├── App.css             # Global app styles
├── main.jsx            # Application entry point
└── index.css           # Global styles and CSS reset
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Configuration

### API Configuration

The frontend expects a backend API running on `http://localhost:5000` by default. You can configure this in the `.env` file:

```env
VITE_API_URL=http://your-api-url:port
```

### Backend API Endpoints

The frontend integrates with the following API endpoints:

- `POST /api/predict` - Image prediction
- `POST /api/predict_base64` - Base64 image prediction
- `POST /api/extract_frames` - Video frame extraction and analysis

## 🎨 UI Features

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interactions

### Modern Styling
- Glassmorphism effects with backdrop-filter
- Smooth animations and transitions
- Gradient backgrounds and modern color schemes
- Custom scrollbars and interactive elements

### User Experience
- Drag-and-drop file uploads
- Real-time feedback and loading states
- Error handling with user-friendly messages
- Progress indicators and confidence visualizations

## 🔌 Integration

### With Flask Backend

This frontend is designed to work with the Flask backend from the main TruthLens project. Make sure your backend is running and accessible at the configured API URL.

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000` |

## 🚀 Deployment

### Production Build

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### Deployment Options

- **Static Hosting**: Deploy the `dist` folder to services like Netlify, Vercel, or GitHub Pages
- **CDN**: Upload to any CDN or static file hosting service
- **Server**: Serve the `dist` folder with any web server (nginx, Apache, etc.)

### Environment Configuration for Production

Update the `VITE_API_URL` environment variable to point to your production API endpoint.

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Verify the backend is running
   - Check the `VITE_API_URL` configuration
   - Ensure CORS is properly configured on the backend

2. **File Upload Issues**
   - Check file size limits (10MB for images, 100MB for videos)
   - Verify supported file formats
   - Ensure proper file permissions

3. **Webcam Access**
   - Grant camera permissions in your browser
   - Use HTTPS in production (required for webcam access)
   - Check browser compatibility

### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of the TruthLens deepfake detection system. See the main project repository for license information.

## 🙏 Acknowledgments

- Built with React and Vite
- Icons by Lucide React
- Animations by Framer Motion
- Part of the TruthLens project by Himanshu977-star and Avanish Chaurasiya

