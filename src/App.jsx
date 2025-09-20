import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from './components/Header'
import Home from './pages/Home'
import ImageDetection from './pages/ImageDetection'
import VideoDetection from './pages/VideoDetection'
import WebcamDetection from './pages/WebcamDetection'
import About from './pages/About'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="main-content"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/image" element={<ImageDetection />} />
            <Route path="/video" element={<VideoDetection />} />
            <Route path="/webcam" element={<WebcamDetection />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </motion.main>
      </div>
    </Router>
  )
}

export default App

