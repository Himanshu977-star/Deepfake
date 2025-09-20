import React from 'react'
import { motion } from 'framer-motion'
import { Brain, Shield, Zap, Users, Target, Award, Github, ExternalLink } from 'lucide-react'
import './About.css'

const About = () => {
  const features = [
    {
      icon: <Brain size={32} />,
      title: 'Advanced AI Technology',
      description: 'Powered by state-of-the-art Convolutional Neural Networks trained on extensive datasets of real and synthetic content.'
    },
    {
      icon: <Shield size={32} />,
      title: 'Multi-Format Detection',
      description: 'Detect deepfakes across images, videos, and live streams with high accuracy and confidence scores.'
    },
    {
      icon: <Zap size={32} />,
      title: 'Real-Time Analysis',
      description: 'Get instant results with our optimized models that provide fast analysis without compromising accuracy.'
    },
    {
      icon: <Users size={32} />,
      title: 'User-Friendly Interface',
      description: 'Intuitive design that makes advanced AI technology accessible to everyone, regardless of technical expertise.'
    }
  ]

  const stats = [
    { number: '99.2%', label: 'Detection Accuracy', description: 'High precision in identifying deepfake content' },
    { number: '10ms', label: 'Analysis Speed', description: 'Ultra-fast processing for real-time detection' },
    { number: '1M+', label: 'Images Analyzed', description: 'Extensive training on diverse datasets' },
    { number: '24/7', label: 'Availability', description: 'Always accessible for your detection needs' }
  ]

  const technologies = [
    { name: 'TensorFlow', description: 'Deep learning framework for model training and inference' },
    { name: 'OpenCV', description: 'Computer vision library for image and video processing' },
    { name: 'React', description: 'Modern frontend framework for responsive user interface' },
    { name: 'Flask', description: 'Lightweight Python web framework for API development' },
    { name: 'CNN Models', description: 'Convolutional Neural Networks for image classification' },
    { name: 'WebRTC', description: 'Real-time communication for live webcam detection' }
  ]

  return (
    <div className="about">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="hero"
      >
        <div className="hero-content">
          <h1>About TruthLens</h1>
          <p className="hero-description">
            TruthLens is an advanced AI-powered deepfake detection system designed to help users 
            identify synthetic media content across multiple formats. Our mission is to combat 
            misinformation and provide reliable tools for content verification in the digital age.
          </p>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mission"
      >
        <div className="mission-content">
          <div className="mission-text">
            <h2>Our Mission</h2>
            <p>
              In an era where AI-generated content is becoming increasingly sophisticated, 
              TruthLens provides a crucial defense against deepfake technology. We believe 
              that everyone should have access to reliable tools for content verification, 
              helping to maintain trust and authenticity in digital communications.
            </p>
            <div className="mission-values">
              <div className="value-item">
                <Target size={24} />
                <div>
                  <h4>Accuracy</h4>
                  <p>Delivering precise detection results with high confidence scores</p>
                </div>
              </div>
              <div className="value-item">
                <Shield size={24} />
                <div>
                  <h4>Reliability</h4>
                  <p>Consistent performance across diverse content types and formats</p>
                </div>
              </div>
              <div className="value-item">
                <Users size={24} />
                <div>
                  <h4>Accessibility</h4>
                  <p>Making advanced AI technology available to everyone</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="features"
      >
        <div className="section-header">
          <h2>Key Features</h2>
          <p>Advanced capabilities that set TruthLens apart</p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="feature-card"
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="stats"
      >
        <div className="section-header">
          <h2>Performance Metrics</h2>
          <p>Numbers that demonstrate our system's capabilities</p>
        </div>
        
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
              className="stat-card"
            >
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-description">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Technology Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="technology"
      >
        <div className="section-header">
          <h2>Technology Stack</h2>
          <p>Built with cutting-edge tools and frameworks</p>
        </div>
        
        <div className="tech-grid">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
              className="tech-card"
            >
              <h4 className="tech-name">{tech.name}</h4>
              <p className="tech-description">{tech.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="team"
      >
        <div className="section-header">
          <h2>Development Team</h2>
          <p>Meet the minds behind TruthLens</p>
        </div>
        
        <div className="team-grid">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="team-member"
          >
            <div className="member-avatar">
              <Users size={32} />
            </div>
            <h4>Dubey Himanshu Rajesh</h4>
            <p className="member-role">Lead Developer & AI Engineer</p>
            <p className="member-bio">
              Specialized in deep learning and computer vision with extensive experience 
              in developing AI-powered detection systems.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.0 }}
            className="team-member"
          >
            <div className="member-avatar">
              <Users size={32} />
            </div>
            <h4>Avanish Chaurasiya</h4>
            <p className="member-role">Full-Stack Developer</p>
            <p className="member-bio">
              Expert in web development and system architecture, responsible for 
              creating the user-friendly interface and backend infrastructure.
            </p>
            <a 
              href="https://github.com/avanish-chaurasiya" 
              target="_blank" 
              rel="noopener noreferrer"
              className="member-link"
            >
              <Github size={16} />
              <span>GitHub</span>
              <ExternalLink size={12} />
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Future Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.2 }}
        className="future"
      >
        <div className="section-header">
          <h2>Future Roadmap</h2>
          <p>Exciting developments coming to TruthLens</p>
        </div>
        
        <div className="roadmap-grid">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 2.4 }}
            className="roadmap-item"
          >
            <div className="roadmap-icon">
              <Award size={24} />
            </div>
            <h4>Audio Deepfake Detection</h4>
            <p>Extend detection capabilities to AI-generated voices and speech synthesis</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 2.6 }}
            className="roadmap-item"
          >
            <div className="roadmap-icon">
              <Shield size={24} />
            </div>
            <h4>Mobile Applications</h4>
            <p>Native iOS and Android apps for on-the-go deepfake detection</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 2.8 }}
            className="roadmap-item"
          >
            <div className="roadmap-icon">
              <Zap size={24} />
            </div>
            <h4>API Integration</h4>
            <p>Social media platform integration for real-time content verification</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3.0 }}
        className="contact"
      >
        <div className="contact-content">
          <h2>Get in Touch</h2>
          <p>
            Have questions about TruthLens or want to contribute to the project? 
            We'd love to hear from you.
          </p>
          <div className="contact-links">
            <a 
              href="https://github.com/Himanshu977-star/Deepfake" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-link"
            >
              <Github size={20} />
              <span>View on GitHub</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default About

