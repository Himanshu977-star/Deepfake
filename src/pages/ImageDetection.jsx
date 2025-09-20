import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { Upload, Image as ImageIcon, AlertCircle, CheckCircle, X, Loader } from 'lucide-react'
import { predictImage } from '../services/api'
import './ImageDetection.css'

const ImageDetection = () => {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      setUploadedFile(file)
      setError(null)
      setResult(null)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024 // 10MB
  })

  const handlePredict = async () => {
    if (!uploadedFile) return

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', uploadedFile)
      
      const prediction = await predictImage(formData)
      setResult(prediction)
    } catch (err) {
      setError(err.message || 'Failed to analyze image')
    } finally {
      setLoading(false)
    }
  }

  const clearResults = () => {
    setUploadedFile(null)
    setPreview(null)
    setResult(null)
    setError(null)
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

  return (
    <div className="image-detection">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="detection-header"
      >
        <h1>Image Deepfake Detection</h1>
        <p>Upload an image to analyze it for deepfake content using our AI model</p>
      </motion.div>

      <div className="detection-container">
        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="upload-section"
        >
          <div
            {...getRootProps()}
            className={`upload-area ${isDragActive ? 'drag-active' : ''} ${uploadedFile ? 'has-file' : ''}`}
          >
            <input {...getInputProps()} />
            
            {!uploadedFile ? (
              <div className="upload-content">
                <div className="upload-icon">
                  <Upload size={48} />
                </div>
                <h3>Drop your image here</h3>
                <p>or click to browse files</p>
                <div className="upload-formats">
                  <span>Supports: JPG, PNG, GIF, BMP, WebP</span>
                  <span>Max size: 10MB</span>
                </div>
              </div>
            ) : (
              <div className="preview-container">
                <img src={preview} alt="Preview" className="preview-image" />
                <div className="file-info">
                  <div className="file-name">
                    <ImageIcon size={16} />
                    <span>{uploadedFile.name}</span>
                  </div>
                  <div className="file-size">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    clearResults()
                  }}
                  className="remove-file"
                >
                  <X size={20} />
                </button>
              </div>
            )}
          </div>

          {uploadedFile && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handlePredict}
              disabled={loading}
              className="analyze-btn"
            >
              {loading ? (
                <>
                  <Loader className="loading-spinner" size={20} />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <span>Analyze Image</span>
                </>
              )}
            </motion.button>
          )}
        </motion.div>

        {/* Results Section */}
        <AnimatePresence>
          {(result || error) && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="results-section"
            >
              {error ? (
                <div className="error-result">
                  <div className="result-icon error">
                    <AlertCircle size={32} />
                  </div>
                  <h3>Analysis Failed</h3>
                  <p>{error}</p>
                  <button onClick={clearResults} className="retry-btn">
                    Try Again
                  </button>
                </div>
              ) : result ? (
                <div className="success-result">
                  <div className="result-header">
                    <div className="result-icon success">
                      <CheckCircle size={32} />
                    </div>
                    <div className="result-title">
                      <h3>Analysis Complete</h3>
                      <p>Image has been analyzed for deepfake content</p>
                    </div>
                  </div>

                  <div className="prediction-card">
                    <div className="prediction-main">
                      <div className={`prediction-label ${result.is_fake ? 'fake' : 'real'}`}>
                        {result.prediction}
                      </div>
                      <div className="prediction-confidence">
                        <div className="confidence-bar">
                          <div
                            className="confidence-fill"
                            style={{
                              width: `${result.confidence * 100}%`,
                              backgroundColor: getConfidenceColor(result.confidence)
                            }}
                          />
                        </div>
                        <div className="confidence-text">
                          <span className="confidence-value">
                            {(result.confidence * 100).toFixed(1)}%
                          </span>
                          <span className="confidence-label">
                            {getConfidenceLabel(result.confidence)} Confidence
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="prediction-details">
                      <div className="detail-item">
                        <span className="detail-label">Prediction:</span>
                        <span className={`detail-value ${result.is_fake ? 'fake' : 'real'}`}>
                          {result.prediction}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Confidence:</span>
                        <span className="detail-value">
                          {(result.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Model:</span>
                        <span className="detail-value">CNN Deepfake Detector</span>
                      </div>
                    </div>
                  </div>

                  <div className="result-actions">
                    <button onClick={clearResults} className="new-analysis-btn">
                      Analyze Another Image
                    </button>
                  </div>
                </div>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="info-section"
      >
        <h3>How It Works</h3>
        <div className="info-grid">
          <div className="info-item">
            <div className="info-number">1</div>
            <h4>Upload Image</h4>
            <p>Drag and drop or select an image file from your device</p>
          </div>
          <div className="info-item">
            <div className="info-number">2</div>
            <h4>AI Analysis</h4>
            <p>Our CNN model analyzes the image for deepfake characteristics</p>
          </div>
          <div className="info-item">
            <div className="info-number">3</div>
            <h4>Get Results</h4>
            <p>Receive detailed prediction with confidence score</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ImageDetection

