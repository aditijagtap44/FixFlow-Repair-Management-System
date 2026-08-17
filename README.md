# 🔧 FixFlow – Repair Management System

FixFlow is a responsive web-based Repair Management System designed to simplify the process of booking, tracking, and managing device repairs.

The system provides separate customer and admin functionalities, allowing customers to submit repair requests and track their repair status while administrators can manage requests, update repair statuses, and monitor repair operations.

## 🚀 Features

### 👤 Customer Features

* Book a new repair request
* Enter device and repair details
* Receive a unique Repair ID
* Track repair status using Repair ID
* View repair progress and timeline
* View technician and estimated repair cost
* Responsive customer interface

### 🛠️ Admin Features

* Secure admin login
* Admin dashboard
* View total repair requests
* View pending repairs
* View repairs in progress
* View completed repairs
* Search repair requests
* Filter repairs by status
* Update repair status
* Track individual repairs
* Logout functionality

### 💾 Data Management

* Uses Browser LocalStorage
* Customer and admin pages share repair data
* Repair status updates are reflected across pages
* Data remains available after page refresh

## 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript
* Font Awesome
* Google Fonts
* Browser LocalStorage

## 📂 Project Structure

```text
FixFlow/
│
├── index.html
│
├── css/
│   ├── style.css
│   ├── admin.css
│   └── ...
│
├── js/
│   ├── admin-login.js
│   ├── tracking.js
│   └── ...
│
├── pages/
│   ├── admin-login.html
│   ├── admin-dashboard.html
│   ├── customer-dashboard.html
│   ├── track-repair.html
│   ├── book-repair.html
│   └── ...
│
└── README.md
```

## 🔄 Repair Workflow

```text
Customer
   ↓
Book Repair
   ↓
Repair ID Generated
   ↓
Request Received
   ↓
Diagnosis
   ↓
Repair In Progress
   ↓
Quality Testing
   ↓
Ready for Pickup
   ↓
Completed
```

## 🔐 Admin Login

For demonstration purposes, the project currently uses predefined admin credentials.

**Email:** `admin@fixflow.com`

**Password:** `FixFlow@123`

> These credentials are intended only for the frontend demo. A production application should use a secure backend authentication system.

## ▶️ How to Run

1. Clone the repository.

```bash
git clone https://github.com/aditijagtap44/FixFlow-Repair-Management-System.git
```

2. Open the project folder.

```bash
cd FixFlow-Repair-Management-System
```

3. Open `index.html` in your browser.

Alternatively, open the project using **VS Code Live Server** for the best development experience.

## 📌 Current Limitations

* The project currently uses LocalStorage instead of a backend database.
* Authentication is frontend-based for demonstration purposes.
* Repair notifications are not connected to email or SMS services.
* There is no real-time backend synchronization.

## 🔮 Future Improvements

* Add Node.js and Express.js backend
* Add MongoDB database
* Implement secure authentication
* Add customer registration and login
* Add email/SMS repair notifications
* Add technician management
* Add payment integration
* Add repair analytics and reports
* Deploy the application online

## 🎯 Project Goal

The goal of FixFlow is to provide a simple and user-friendly platform that improves repair-service management by connecting customers, technicians, and administrators through a centralized repair tracking system.

## 👩‍💻 Developer

**Aditi Jagtap**

GitHub: https://github.com/aditijagtap44

---

⭐ If you find this project useful, consider giving the repository a star!
