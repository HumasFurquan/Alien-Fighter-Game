# 🚀 Alien Fighter Game

A fast-paced **2D space shooter game** built using **HTML, CSS, and JavaScript (ES Modules)** where players control a fighter plane and survive against an evolving alien UFO.

**🎮 Play, survive, score, and beat your high score!**

🔗 **Live Demo**: [https://hatexspeechxdetectionx2x0.streamlit.app/](https://hatexspeechxdetectionx2x0.streamlit.app/)

---

## 🎥 Project Demo

![Project Demo](assets/demo.gif)

---

## 📸 Screenshots

### 🏠 Home Page
![Home Page](assets/home.jpg)

### 💡 Text Suggestions
![Suggestions](assets/suggestions.jpg)

### 📊 Prediction Results
![Prediction Result 1](assets/prediction_1.jpg)
![Prediction Result 2](assets/prediction_2.jpg)
![Prediction Result 2](assets/prediction_3.jpg)

---

## 🚀 Project Overview

**Hate Speech Detection 2.0** is designed to classify user-provided text into hate-related categories while providing **model interpretability** and a clean, interactive UI. The project focuses on scalability, reproducibility, and real-world deployment constraints (large model size, cloud storage, inference latency).

This project is suitable for:

* NLP / ML Engineers
* Data Scientists
* Researchers working on toxic language, moderation, or social media analysis

---

## ❓ Problem Statement

The rapid growth of user-generated content on social media and online platforms has led to a significant increase in **toxic, abusive, and hate-based language**. Manually moderating such content is **time-consuming, expensive, and not scalable**, especially at the scale of millions of daily posts.

Traditional rule-based systems fail to capture contextual and semantic nuances of language, leading to high false positives and negatives. As a result, there is a strong need for **machine learning–based solutions** that can automatically detect hate speech with high accuracy while being deployable in real-world systems.

This project aims to address these challenges by leveraging **Transformer-based NLP models** to perform reliable hate speech detection and demonstrate how such models can be trained, hosted, and deployed in production environments.

---

## 🧠 Key Features

* ✅ Transformer-based hate speech classification (BERT-family model)
* ✅ Model hosted on **Hugging Face Hub** to handle large file sizes
* ✅ Live inference using **Streamlit**
* ✅ GPU/CPU auto-detection
* ✅ Session-based input history
* ✅ Confidence visualization
* ✅ Modular and extensible codebase
* ✅ Production-friendly deployment setup

---

## 🏗️ Architecture

```
User Input (Streamlit UI)
        ↓
Tokenizer (Hugging Face)
        ↓
Fine-tuned Transformer Model
        ↓
Softmax Probabilities
        ↓
Prediction + Confidence Visualization
```

---

## 📈 Model Performance

The model was trained for 3 epochs and evaluated on a held-out validation set. The best-performing model was selected based on validation F1-score.

**Best Validation Metrics:**
- **Accuracy:** 69.21%
- **F1-score:** 69.40%

**Training Summary:**
- Epoch 1 — Val Acc: 69.21%, Val F1: 69.40% ✅ (Best model saved)
- Epoch 2 — Val Acc: 67.76%, Val F1: 67.96%
- Epoch 3 — Val Acc: 67.81%, Val F1: 67.97%

> Note: While training loss continued to decrease across epochs, validation performance peaked early, indicating the onset of overfitting. The final deployed model corresponds to the best validation checkpoint.

---

## 🤗 Model Hosting (Hugging Face)

Due to GitHub’s file size limitations, the trained model is hosted on **Hugging Face Hub** and dynamically loaded during app startup.

* Model Repository: `humasfurquan/hatexplain-bert`
* Framework: PyTorch + Transformers

This approach ensures:

* Faster repository cloning
* Clean version control
* Industry-standard model sharing

---

## 🧪 Training Journey & Optimization

This project went through multiple iterations:

- **First attempt:** Model training was performed on CPU, taking approximately **7 hours**, highlighting the limitations of local CPU-based training for large Transformer models.
- **Second attempt:** Training was interrupted due to session termination, resulting in loss of in-memory variables and requiring a full restart.
- **Final iteration:** The model was successfully trained using **GPU acceleration**, reducing training time to **~26 minutes** and significantly improving development efficiency.

These iterations reflect real-world ML challenges such as resource constraints, session management, and the importance of hardware acceleration.

---

## 🚧 Engineering Challenges Solved

During the development and deployment of this project, several real-world engineering challenges were identified and resolved:

- **GitHub file size limitations:** The trained Transformer model exceeded GitHub’s file size limits, making direct storage in the repository impractical.
- **Model storage solution:** The model was hosted on **Hugging Face Hub**, enabling versioned, scalable, and industry-standard model distribution.
- **Dynamic model loading in Streamlit:** Implemented runtime model loading with proper handling of CPU/GPU availability to ensure smooth deployment.
- **Cache handling:** Configured Hugging Face cache management to avoid repeated downloads and ensure consistent behavior across local and cloud environments.

These solutions demonstrate practical considerations required when transitioning from experimentation to production-ready machine learning applications.

---

## 🖥️ Tech Stack

| Layer         | Technology                |
| ------------- | ------------------------- |
| Language      | Python                    |
| ML Framework  | PyTorch                   |
| NLP           | Hugging Face Transformers |
| UI            | Streamlit                 |
| Visualization | Matplotlib                |
| Model Hosting | Hugging Face Hub          |
| Deployment    | Streamlit Cloud           |

---

## 📦 Installation (Local Setup)

```bash
# Clone repository
git clone https://github.com/HumasFurquan/Hate-Speech-Detection-2.0.git
cd Hate-Speech-Detection-2.0

# Create virtual environment (optional)
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the app
streamlit run app.py
```

---

## 📊 How It Works

1. User enters text in the Streamlit UI
2. Text is tokenized using the same tokenizer used during training
3. The Transformer model predicts class probabilities
4. The most probable label is returned
5. Confidence scores are visualized

---

## 📁 Project Structure

```
Hate-Speech-Detection-2.0/
│
├── app.py                 # Streamlit application
├── test_model.py          # Model testing script
├── requirements.txt       # Dependencies
├── all_texts.pkl          # Autocomplete / suggestion data
├── hf_cache/              # Hugging Face cache (runtime)
└── README.md              # Project documentation
```

---

## 🎯 Use Cases

* Social media moderation
* Toxic content filtering
* Research on online hate speech
* NLP model deployment demonstration

---

## 🔒 Limitations

* Model performance depends on dataset bias
* English-language focused
* Not a replacement for human moderation

These limitations are common in supervised NLP systems and can be mitigated through dataset expansion, multilingual training, and continual learning with real-world feedback.

---

## 📈 Future Improvements

* Multi-class hate category breakdown
* SHAP / attention-based explainability UI
* Multi-language support
* REST API (FastAPI backend)
* User feedback loop for model retraining
* Database-backed history instead of session state

---

## 👨‍💻 Author

**Humas Furquan**
ML & Frontend Developer
GitHub: [https://github.com/HumasFurquan](https://github.com/HumasFurquan)

---

## ⭐ Acknowledgements

* Hugging Face 🤗
* Streamlit
* Open-source NLP community

---

> If you find this project useful, consider giving it a ⭐ on GitHub.
