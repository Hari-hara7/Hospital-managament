<div align="center">

# 🏥 Hospital Management System

**A modern hospital management platform using Firebase and React.**  
Admins can add/manage patient records, and patients can securely view their personal data.

<br />

<img src="https://img.shields.io/badge/React-18.x-blue?style=for-the-badge&logo=react" />
<img src="https://img.shields.io/badge/Vite-5.x-purple?style=for-the-badge&logo=vite" />
<img src="https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge&logo=typescript" />
<img src="https://img.shields.io/badge/Firebase-Firestore%20+%20Auth-yellow?style=for-the-badge&logo=firebase" />
<img src="https://img.shields.io/badge/CSS-Responsive-blue?style=for-the-badge&logo=css3" />

</div>

---

## 🛠️ Tech Stack

### 🧠 Frontend
- ⚛️ **React** + **Vite**
- 📘 **TypeScript**
- 🎨 **CSS (Modules/Global)**
- 🔀 **React Router v6**

### ☁️ Backend as a Service
- 🔐 **Firebase Authentication**
- 📂 **Firebase Firestore (NoSQL DB)**

---

## 🚀 Features

### 👩‍⚕️ Admin
- 🔐 Admin registration & login
- ➕ Add new patient records
- 🗃 View all patients' details

### 🧑‍💼 Patient
- 🔐 Patient registration & login
- 👀 View personal medical record only

---

## 🔐 Firebase Auth Flow

- Authenticated via **Firebase Email/Password**
- Role-based access (`admin` / `patient`)
- Route protection using React Router and Firebase state
- Firebase Firestore used for storing user & patient data

---

## 🧪 How to Run Locally

```bash
# 1️⃣ Clone the repo
git clone https://github.com/yourusername/hospital-management-firebase.git

# 2️⃣ Go into the frontend directory
cd frontend

# 3️⃣ Install dependencies
npm install

# 4️⃣ Run the development server
npm run dev
```
