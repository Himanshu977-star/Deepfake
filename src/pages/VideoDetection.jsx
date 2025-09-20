import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { Upload, Video, AlertCircle, CheckCircle, X, Loader, Play, Pause } from 'lucide-react'
import { extractFramesAndPredict } from '../services/api'
import './VideoDetection.css'

const VideoDetection = () => {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      setUploadedFile(file)
      setError(null)
      setResult(null)
      
      // Create preview
      const videoUrl = URL.createObjectURL(file)
      setPreview(videoUrl)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm', '.mkv']
    },
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024 // 100MB
  })

  const handlePredict = async () => {
    if (!uploadedFile) return

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', uploadedFile)
      
      const prediction = await extractFramesAndPredict(formData)
      setResult(prediction)
    } catch (err) {
      setError(err.message || 'Failed to analyze video')
    } finally {
      setLoading(false)
    }
  }

  const clearResults = () => {
    if (preview) {
      URL.revokeObjectURL(preview)
    }
    setUploadedFile(null)
    setPreview(null)
    setResult(null)
    setError(null)
    setIsPlaying(false)
  }

  const togglePlayPause = () => {
    const video = document.getElementById('preview-video')
    if (video) {
      if (isPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setIsPlaying(!isPlaying)
    }
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
    <div className="video-detection">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="detection-header"
      >
        <h1>Video Deepfake Detection</h1>
        <p>Upload a video to analyze it frame-by-frame for deepfake content</p>
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
                <h3>Drop your video here</h3>
                <p>or click to browse files</p>
                <div className="upload-formats">
                  <span>Supports: MP4, AVI, MOV, WMV, FLV, WebM, MKV</span>
                  <span>Max size: 100MB</span>
                </div>
              </div>
            ) : (
              <div className="preview-container">
                <div className="video-wrapper">
                  <video
                    id="preview-video"
                    src={preview}
                    className="preview-video"
                    controls
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />
                  <div className="video-overlay">
                    <button
                      onClick={togglePlayPause}
                      className="play-pause-btn"
                    >
                      {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    </button>
                  </div>
                </div>
                <div className="file-info">
                  <div className="file-name">
                    <Video size={16} />
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
                  <span>Analyzing Video...</span>
                </>
              ) : (
                <>
                  <span>Analyze Video</span>
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
                      <h3>Video Analysis Complete</h3>
                      <p>Video has been analyzed frame-by-frame for deepfake content</p>
                    </div>
                  </div>

                  <div className="prediction-card">
                    <div className="prediction-main">
                      <div className={`prediction-label ${result.overall_prediction === 'Fake' ? 'fake' : 'real'}`}>
                        {result.overall_prediction}
                      </div>
                      <div className="prediction-confidence">
                        <div className="confidence-bar">
                          <div
                            className="confidence-fill"
                            style={{
                              width: `${result.overall_confidence * 100}%`,
                              backgroundColor: getConfidenceColor(result.overall_confidence)
                            }}
                          />
                        </div>
                        <div className="confidence-text">
                          <span className="confidence-value">
                            {(result.overall_confidence * 100).toFixed(1)}%
                          </span>
                          <span className="confidence-label">
                            {getConfidenceLabel(result.overall_confidence)} Confidence
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="prediction-details">
                      <div className="detail-item">
                        <span className="detail-label">Overall Prediction:</span>
                        <span className={`detail-value ${result.overall_prediction === 'Fake' ? 'fake' : 'real'}`}>
                          {result.overall_prediction}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Average Confidence:</span>
                        <span className="detail-value">
                          {(result.overall_confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Frames Analyzed:</span>
                        <span className="detail-value">
                          {result.total_frames_analyzed}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Model:</span>
                        <span className="detail-value">CNN Deepfake Detector</span>
                      </div>
                    </div>
                  </div>

                  {/* Frame Analysis */}
                  {result.frame_predictions && result.frame_predictions.length > 0 && (
                    <div className="frame-analysis">
                      <h4>Frame-by-Frame Analysis</h4>
                      <div className="frames-grid">
                        {result.frame_predictions.map((frame, index) => (
                          <div key={index} className="frame-item">
                            <div className="frame-number">Frame {frame.frame + 1}</div>
                            <div className={`frame-prediction ${frame.is_fake ? 'fake' : 'real'}`}>
                              {frame.prediction}
                            </div>
                            <div className="frame-confidence">
                              {(frame.confidence * 100).toFixed(1)}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="result-actions">
                    <button onClick={clearResults} className="new-analysis-btn">
                      Analyze Another Video
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
        <h3>How Video Analysis Works</h3>
        <div className="info-grid">
          <div className="info-item">
            <div className="info-number">1</div>
            <h4>Upload Video</h4>
            <p>Select a video file from your device (up to 100MB)</p>
          </div>
          <div className="info-item">
            <div className="info-number">2</div>
            <h4>Frame Extraction</h4>
            <p>Our system extracts key frames from the video for analysis</p>
          </div>
          <div className="info-item">
            <div className="info-number">3</div>
            <h4>AI Analysis</h4>
            <p>Each frame is analyzed using our CNN deepfake detection model</p>
          </div>
          <div className="info-item">
            <div className="info-number">4</div>
            <h4>Results</h4>
            <p>Get overall prediction and detailed frame-by-frame analysis</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default VideoDetection

