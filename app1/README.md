<h1 align="center">🧠 TruthLens – Deepfake Detection System</h1>
<h3 align="center">AI-Powered Tool for Detecting Fake Images, Videos, and Live Webcam Streams</h3>

---

## 🚀 About the Project

TruthLens is an AI-based web application designed to detect deepfake content in **images**, **videos**, and **real-time webcam streams**.  
It uses **Convolutional Neural Networks (CNNs)** for classification and is built with a **Flask-based interface** to ensure easy access for all users — no deep learning expertise required.

The system is lightweight and can run on a standard laptop, making it perfect for educational, research, and practical use cases.

---

## 🎯 Features

- 🖼️ Detects deepfakes in **images**, **videos**, and **live webcam feeds**
- ⚡ Provides **real-time predictions** with confidence scores
- 🌐 Built with a **user-friendly Flask web interface**
- 🧠 Powered by a **CNN model** trained on real-world datasets
- 💻 Compatible with normal laptops (no GPU needed)

---

## 🛠️ Tech Stack

- **Languages:** Python, HTML, CSS  
- **Libraries/Frameworks:** TensorFlow, OpenCV, Flask  
- **Tools:** Jupyter Notebook, Git  

---

## 📂 Datasets Used

- [`DeepFake Detection DFD – Entire Original Dataset`](https://www.kaggle.com/datasets)  
  Path: `/kaggle/input/deep-fake-detection-dfd-entire-original-dataset`

- [`Deepfake and Real Images Dataset`](https://www.kaggle.com/datasets)  
  Path: `/kaggle/input/deepfake-and-real-images`

These datasets include both real and synthetically generated face data and are used for training and validating the CNN model.

---

## ⚙️ System Workflow

```
Input (Image / Video / Webcam)
        ↓
   Preprocessing (OpenCV)
        ↓
     CNN-Based Model
        ↓
  Real / Fake Prediction
        ↓
Flask Web Interface Output
```

---

## 📦 Installation & Run Locally

### 🔧 Requirements

- Python 3.x  
- Required Python packages (in `requirements.txt`)  

### 📥 Clone the Repository

```bash
git clone https://github.com/Himanshu977-star/Deepfake.git
cd Deepfake/app1
```

### 📦 Install Dependencies

```bash
pip install -r requirements.txt
```

### 🚀 Run the App

```bash
python app.py
```

Open your browser and navigate to:  
`http://localhost:5000/`

---

## 🧠 Future Scope

- 🎙️ **Audio Deepfake Detection**  
  Extend detection to AI-generated voices using speech recognition models.

- 📱 **Mobile Deployment**  
  Build Android/iOS support for on-the-go verification.

- 🌐 **API & Social Media Integration**  
  Integrate with platforms like Twitter, Instagram, or fact-checking APIs for real-time fake content detection.

---

## 👨‍💻 Team Members
 
- **Dubey Himanshu Rajesh**   
- **Avanish Chaurasiya(https://github.com/avanish-chaurasiya)** 

---



---

⭐️ Project by [Himanshu977-star](https://github.com/Himanshu977-star)
