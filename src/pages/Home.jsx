import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Brain, Shield, Zap, Users, ArrowRight, CheckCircle } from 'lucide-react'
import './Home.css'

const Home = () => {
  const features = [
    {
      icon: <Brain size={32} />,
      title: 'AI-Powered Detection',
      description: 'Advanced CNN models trained on real-world datasets for accurate deepfake detection'
    },
    {
      icon: <Shield size={32} />,
      title: 'Multi-Format Support',
      description: 'Detect deepfakes in images, videos, and live webcam streams'
    },
    {
      icon: <Zap size={32} />,
      title: 'Real-Time Analysis',
      description: 'Get instant results with confidence scores and detailed analysis'
    },
    {
      icon: <Users size={32} />,
      title: 'User-Friendly Interface',
      description: 'Simple drag-and-drop interface that anyone can use without technical expertise'
    }
  ]

  const stats = [
    { number: '99.2%', label: 'Accuracy Rate' },
    { number: '10ms', label: 'Detection Speed' },
    { number: '1M+', label: 'Images Analyzed' },
    { number: '24/7', label: 'Available' }
  ]

  return (
    <div className="home">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="hero"
      >
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-badge"
          >
            <CheckCircle size={16} />
            <span>AI-Powered Deepfake Detection</span>
          </motion.div>
          
          <h1 className="hero-title">
            Detect Deepfakes with
            <span className="gradient-text"> TruthLens</span>
          </h1>
          
          <p className="hero-description">
            Advanced AI technology to identify fake images, videos, and live streams. 
            Protect yourself from misinformation with our cutting-edge deepfake detection system.
          </p>
          
          <div className="hero-actions">
            <Link to="/image" className="btn btn-primary">
              <span>Start Detection</span>
              <ArrowRight size={20} />
            </Link>
            <Link to="/about" className="btn btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hero-visual"
        >
          <div className="detection-demo">
            <div className="demo-screen">
              <div className="demo-content">
                <div className="demo-image"></div>
                <div className="demo-result">
                  <span className="result-label">Real</span>
                  <span className="result-confidence">98.5%</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="stats"
      >
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="stat-item"
            >
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="features"
      >
        <div className="section-header">
          <h2>Why Choose TruthLens?</h2>
          <p>Advanced technology meets user-friendly design</p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              className="feature-card"
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="cta"
      >
        <div className="cta-content">
          <h2>Ready to Detect Deepfakes?</h2>
          <p>Upload an image, video, or start live detection to get instant results</p>
          <div className="cta-actions">
            <Link to="/image" className="btn btn-primary">
              <span>Upload Image</span>
              <ArrowRight size={20} />
            </Link>
            <Link to="/video" className="btn btn-outline">
              <span>Upload Video</span>
            </Link>
            <Link to="/webcam" className="btn btn-outline">
              <span>Live Detection</span>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default Home

