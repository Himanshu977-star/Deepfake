import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Webcam from 'react-webcam'
import { Camera, CameraOff, AlertCircle, CheckCircle, Loader, Play, Pause, Square } from 'lucide-react'
import { predictImageBase64 } from '../services/api'
import './WebcamDetection.css'

const WebcamDetection = () => {
  const webcamRef = useRef(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentResult, setCurrentResult] = useState(null)
  const [error, setError] = useState(null)
  const [analysisHistory, setAnalysisHistory] = useState([])
  const [autoAnalysis, setAutoAnalysis] = useState(false)
  const [analysisInterval, setAnalysisInterval] = useState(null)
  const [fps, setFps] = useState(1) // Analysis frequency per second

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: 'user'
  }

  const startStream = () => {
    setIsStreaming(true)
    setError(null)
    setCurrentResult(null)
  }

  const stopStream = () => {
    setIsStreaming(false)
    setIsAnalyzing(false)
    setCurrentResult(null)
    if (analysisInterval) {
      clearInterval(analysisInterval)
      setAnalysisInterval(null)
    }
  }

  const captureAndAnalyze = useCallback(async () => {
    if (!webcamRef.current || isAnalyzing) return

    const imageSrc = webcamRef.current.getScreenshot()
    if (!imageSrc) return

    setIsAnalyzing(true)
    setError(null)

    try {
      const result = await predictImageBase64(imageSrc)
      setCurrentResult(result)
      
      // Add to history
      setAnalysisHistory(prev => [
        {
          id: Date.now(),
          timestamp: new Date().toLocaleTimeString(),
          result: result,
          image: imageSrc
        },
        ...prev.slice(0, 9) // Keep only last 10 results
      ])
    } catch (err) {
      setError(err.message || 'Failed to analyze frame')
    } finally {
      setIsAnalyzing(false)
    }
  }, [isAnalyzing])

  const toggleAutoAnalysis = () => {
    if (autoAnalysis) {
      // Stop auto analysis
      if (analysisInterval) {
        clearInterval(analysisInterval)
        setAnalysisInterval(null)
      }
      setAutoAnalysis(false)
    } else {
      // Start auto analysis
      setAutoAnalysis(true)
      const interval = setInterval(captureAndAnalyze, 1000 / fps)
      setAnalysisInterval(interval)
    }
  }

  const clearHistory = () => {
    setAnalysisHistory([])
    setCurrentResult(null)
  }

  const getConfidenceColor = (confidence) => {
    if (confidence > 0.8) return '#10b981' // Green
    if (confidence > 0.6) return '#f59e0b' // Yellow
    return '#ef4444' // Red
  }

  const getConfidenceLabel = (confidence) => {
    if (confidence > 0.8) return 'High'
    if (confidence > 0.6) return 'Medium'
    return 'Low'
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (analysisInterval) {
        clearInterval(analysisInterval)
      }
    }
  }, [analysisInterval])

  return (
    <div className="webcam-detection">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="detection-header"
      >
        <h1>Live Webcam Detection</h1>
        <p>Real-time deepfake detection using your webcam feed</p>
      </motion.div>

      <div className="webcam-container">
        {/* Webcam Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="webcam-section"
        >
          <div className="webcam-wrapper">
            {isStreaming ? (
              <div className="webcam-feed">
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  width={640}
                  height={480}
                  videoConstraints={videoConstraints}
                  screenshotFormat="image/jpeg"
                  className="webcam-video"
                />
                <div className="webcam-overlay">
                  {isAnalyzing && (
                    <div className="analysis-indicator">
                      <Loader className="loading-spinner" size={24} />
                      <span>Analyzing...</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="webcam-placeholder">
                <Camera size={64} />
                <h3>Webcam Not Active</h3>
                <p>Click "Start Camera" to begin live detection</p>
              </div>
            )}
          </div>

          <div className="webcam-controls">
            {!isStreaming ? (
              <button onClick={startStream} className="control-btn start-btn">
                <Camera size={20} />
                <span>Start Camera</span>
              </button>
            ) : (
              <div className="control-group">
                <button onClick={stopStream} className="control-btn stop-btn">
                  <CameraOff size={20} />
                  <span>Stop Camera</span>
                </button>
                
                <button
                  onClick={captureAndAnalyze}
                  disabled={isAnalyzing}
                  className="control-btn analyze-btn"
                >
                  {isAnalyzing ? (
                    <Loader className="loading-spinner" size={20} />
                  ) : (
                    <Play size={20} />
                  )}
                  <span>{isAnalyzing ? 'Analyzing...' : 'Analyze Frame'}</span>
                </button>

                <button
                  onClick={toggleAutoAnalysis}
                  className={`control-btn auto-btn ${autoAnalysis ? 'active' : ''}`}
                >
                  {autoAnalysis ? <Pause size={20} /> : <Play size={20} />}
                  <span>{autoAnalysis ? 'Stop Auto' : 'Auto Analysis'}</span>
                </button>
              </div>
            )}
          </div>

          {/* FPS Control */}
          {isStreaming && (
            <div className="fps-control">
              <label htmlFor="fps-slider">Analysis Frequency:</label>
              <input
                id="fps-slider"
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={fps}
                onChange={(e) => setFps(parseFloat(e.target.value))}
                className="fps-slider"
              />
              <span className="fps-value">{fps} FPS</span>
            </div>
          )}
        </motion.div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="results-section"
        >
          <div className="results-header">
            <h3>Live Analysis Results</h3>
            {analysisHistory.length > 0 && (
              <button onClick={clearHistory} className="clear-btn">
                <Square size={16} />
                <span>Clear History</span>
              </button>
            )}
          </div>

          <AnimatePresence>
            {error ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="error-result"
              >
                <div className="result-icon error">
                  <AlertCircle size={24} />
                </div>
                <div className="error-content">
                  <h4>Analysis Failed</h4>
                  <p>{error}</p>
                </div>
              </motion.div>
            ) : currentResult ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="current-result"
              >
                <div className="result-header">
                  <div className="result-icon success">
                    <CheckCircle size={24} />
                  </div>
                  <div className="result-title">
                    <h4>Current Analysis</h4>
                    <p>Latest frame analysis result</p>
                  </div>
                </div>

                <div className="prediction-card">
                  <div className="prediction-main">
                    <div className={`prediction-label ${currentResult.is_fake ? 'fake' : 'real'}`}>
                      {currentResult.prediction}
                    </div>
                    <div className="prediction-confidence">
                      <div className="confidence-bar">
                        <div
                          className="confidence-fill"
                          style={{
                            width: `${currentResult.confidence * 100}%`,
                            backgroundColor: getConfidenceColor(currentResult.confidence)
                          }}
                        />
                      </div>
                      <div className="confidence-text">
                        <span className="confidence-value">
                          {(currentResult.confidence * 100).toFixed(1)}%
                        </span>
                        <span className="confidence-label">
                          {getConfidenceLabel(currentResult.confidence)} Confidence
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="no-results">
                <div className="no-results-icon">
                  <Camera size={32} />
                </div>
                <p>No analysis results yet. Start the camera and analyze a frame.</p>
              </div>
            )}
          </AnimatePresence>

          {/* Analysis History */}
          {analysisHistory.length > 0 && (
            <div className="analysis-history">
              <h4>Analysis History</h4>
              <div className="history-list">
                {analysisHistory.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="history-item"
                  >
                    <div className="history-time">{item.timestamp}</div>
                    <div className={`history-prediction ${item.result.is_fake ? 'fake' : 'real'}`}>
                      {item.result.prediction}
                    </div>
                    <div className="history-confidence">
                      {(item.result.confidence * 100).toFixed(1)}%
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="info-section"
      >
        <h3>How Live Detection Works</h3>
        <div className="info-grid">
          <div className="info-item">
            <div className="info-number">1</div>
            <h4>Start Camera</h4>
            <p>Grant camera permissions and start the webcam feed</p>
          </div>
          <div className="info-item">
            <div className="info-number">2</div>
            <h4>Analyze Frames</h4>
            <p>Capture and analyze individual frames or enable auto-analysis</p>
          </div>
          <div className="info-item">
            <div className="info-number">3</div>
            <h4>Real-Time Results</h4>
            <p>Get instant predictions with confidence scores</p>
          </div>
          <div className="info-item">
            <div className="info-number">4</div>
            <h4>Track History</h4>
            <p>View analysis history and monitor changes over time</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default WebcamDetection

