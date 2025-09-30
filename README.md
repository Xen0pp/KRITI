<p align="center">
  <img src="assets/banner.png" alt="Project Kriti Banner" width="100%">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active%20Development-blue" />
  <img src="https://img.shields.io/badge/Made%20With-Python-orange" />
  <img src="https://img.shields.io/badge/License-MIT-green" />
</p>

---

# 🌟 Project Kriti: AI-Powered Artisan Ecommerce Platform  

Welcome to **Project Kriti** – more than just an e-commerce platform. Kriti is a **digital home for artisans** and a **living museum of cultural heritage**.  
Our mission is simple yet profound: **to sell not just products, but the vibrant stories and traditions behind them.**  

---

## 🎯 Core Objective  
Preserve and empower cultural traditions by making each handmade product a **living story**.  

We achieve this by:  
- **Empowering Artisans**: Easy-to-use tools for selling, marketing, and growth.  
- **Engaging Customers**: Immersive shopping powered by AI-driven stories.  
- **Preserving Heritage**: Attaching cultural context and attribution to every product.  

---

## 🚀 Key Features  

✨ **AI-Powered Storytelling** – Each product comes with an AI-generated micro-documentary about the artisan, craft, and culture.  
🎁 **Personalized Discovery** – Intelligent recommendations help customers discover new artisans and traditions.  
📊 **Artisan Dashboard** – A simple portal to manage sales, earnings, and AI-generated marketing content (reels, descriptions, flyers).  
🛍️ **Virtual Bazaar** – An optional 3D marketplace where users can “walk through” artisan stalls.  
🌍 **Multilingual Support** – AI translation and narration make stories globally accessible.  
💙 **Impact Dashboard** – Buyers can track the real impact of their purchase on artisans and their communities.  

---

## 💻 Tech Stack  

Our stack is **modern, scalable, and serverless-first**:  

**Frontend**: Next.js + Tailwind CSS  
**Backend**: Firebase + Cloud Run  
**Database**: Firestore (real-time data) + BigQuery (analytics)  
**AI Layer**:  
- Vertex AI – Personalized recommendations & trend analysis  
- PaLM/Gemini – Storytelling & marketing content generation  
- Vision AI – Product image cleanup & background removal  
- TTS & Translation API – Multilingual storytelling  
**3D Support**: Three.js / Babylon.js (for Virtual Bazaar)  

---

## 🧱 Architecture & Core Modules  

Our system is built with modular **AI-driven agents**:  

- **interpreter.py 🧠** – Maps natural user intent (e.g., *“Show me wedding gifts”*) to categories & filters.  
- **designer.py 🎨** – Generates product/story schemas & synthetic data for dev/testing.  
- **mapper.py 🗺️** – Connects product data to cultural & artisan metadata.  
- **ingress_egress.py 📥📤** – Manages artisan submissions & report exports.  
- **certifier.py ✅** – Validates data & assigns **“Kriti Verified”** badges.  
- **app.py 🚀** – The orchestrator coordinating end-to-end workflows.  

---

## 📁 Project Structure  

kriti/
│── agents/ # Core AI-driven modules
│ ├── interpreter.py
│ ├── designer.py
│ ├── mapper.py
│ ├── ingress_egress.py
│ ├── certifier.py
│
│── tools/ # Utility scripts
│ ├── faker_generators.py
│ ├── transform_utils.py
│
│── config/ # Config & schema files
│ ├── use_case_map.json
│ ├── mapping_rules.json
│ ├── schemas/
│
│── database/ # Local dev database
│ ├── kriti.db
│ ├── init.sql
│
│── app.py # Main orchestrator
│── README.md # Documentation
│── requirements.txt # Python dependencies



---

## 📦 Getting Started  

Clone the repository:  
```bash
git clone https://github.com/your-username/kriti.git
cd kriti

Create & activate a virtual environment:
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate


Install dependencies:
pip install -r requirements.txt


Run the application in simulation mode:
python app.py


You’ll be prompted with a question like:
👉 “What are you looking for?”
Kriti will then generate a product card + story powered by its AI agents.

🤝 Contribution

We ❤️ open-source collaboration!
Check out our CONTRIBUTING.md
 to see how you can help build Kriti into a thriving platform for artisans worldwide.

🙏 Acknowledgments

A heartfelt thanks to the artisans who dedicate their lives to preserving cultural traditions.
Project Kriti is for you. 💙

📌 Project Status

🚧 Active Development – Features are being added continuously.
⭐ Star this repo to follow our journey!


---

✅ Just make sure:  
- Place your `banner.png` in an `assets/` folder at the root of your repo.  
- Copy this entire README content into `README.md`.  

Would you like me to also add a **“Demo GIF / Screenshot Section”** placeholder in the README so that once you build the UI, you can show live previews of Kriti?

