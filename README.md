# 🌍 TravShare - Social Media for Travelers
A fullstack web application built as part of our **engineering thesis**, connecting travelers worldwide. Users can share photos, posts, and location pins to showcase their journeys, inspiring global interaction and exploration.

### Main Features
- 📝 CRUD for posts with photos and descriptions
- 💬 CRUD for comments + likes and super likes (1 per 24h) for posts & comments
- 🏅 Achievements system - users collect badges for activity
- 📍 CRUD for check-ins (active for 24h) to mark travel locations
- 🌍 User profile statistics - check-in history, achievements, and visited countries map
- 🤝 Friendship system - connect and interact with other travelers
- 🧑‍💼 Admin panel - manage users and posts


## ⚙️ Tech Stack
### Frontend:
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a>
<a href="https://react.dev/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="react" width="40" height="40"/> </a>

### Backend:
<a href="https://www.java.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" alt="java" width="40" height="40"/> </a>
<a href="https://spring.io/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/springio/springio-icon.svg" alt="spring" width="40" height="40"/> </a>

### Database:
<a href="https://www.mysql.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/> </a>

## 🗃️ Database ERD Diagram
<img width="800"  alt="ERD_poziomo_23 11 2024" src="https://github.com/user-attachments/assets/67a3ca9b-cc8b-4d8d-abe5-fd9f1a4b05d0" />


## 🖼️ Application Screenshots
#### Home page:
<img width="700" alt="strona_glowna_2" src="https://github.com/user-attachments/assets/3f9e6f82-d25c-4b44-b871-cf6335f8c089" />

#### Profile page:
<img width="550" alt="profil_zdjecia_informacje_staty" src="https://github.com/user-attachments/assets/afea040a-1e2b-43ab-8dd3-e0c44113b255" />

#### Profile page:
<img width="600" alt="osiagniecia_list" src="https://github.com/user-attachments/assets/d2a05c96-8235-4c55-9d91-d26b9af9d215" />

#### Post component:
<img width="450"  alt="wpis_całosc" src="https://github.com/user-attachments/assets/96d2c293-f9e3-472f-ae80-7576bcf21296" />

#### Pin component:
<img width="500" alt="meldunek_1_1" src="https://github.com/user-attachments/assets/a1ed1e62-5bfd-4fee-a898-2d49b3d7fe09" />

#### Navbar notification component:
<img width="350" alt="notification_activity" src="https://github.com/user-attachments/assets/d965e885-025e-442f-b188-baff9ad4e197" />

#### Register component:
<img width="300" alt="register_view_3" src="https://github.com/user-attachments/assets/232497d3-5942-4b17-8115-09d81d9c1e25" />

#### Admin Dashboard page:
<img width="700" alt="admin_panel_dashboard" src="https://github.com/user-attachments/assets/648bf48c-3f2c-465b-a021-df01c3ef3121" />

#### Admin User management page:
<img width="700" alt="admin_panel_users" src="https://github.com/user-attachments/assets/fadc8b92-59d4-46fc-bb9e-e41148b0e02d" />



## 🚀 Getting Started
### 1️⃣ Clone the Repository

```bash
git clone https://github.com/SMS-PL/travel_app.git
cd travel_app
```

### 2️⃣ Database Setup (MySQL)
Before starting the backend, create an empty database for the application.

```sql
CREATE DATABASE travel_app_db;
```

### 3️⃣ Backend Setup (Spring Boot)
#### Navigate to the backend directory:
```bash
cd backend/travelapp
```

#### Install Dependencies:
```bash
mvn clean install
```

#### Configuration File:
Create a file named `application.properties` inside `src/main/resources/` with the following content:

```properties
DATABASE_URL=jdbc:mysql://localhost:3306/travel_app_db
DATABASE_USER=${your_mysql_username}
DATABASE_PASSWORD=${your_mysql_password}
GEO_API_KEY=${your_geolocation_api_key}
```

#### Run the Backend Server (to generate tables with Hibernate):
```bash
mvn spring-boot:run
```

#### Insert Initial Data:
Once the tables are created, insert the required roles:
```sql
USE travel_app_db;
INSERT INTO user_role (name) VALUES ('ROLE_USER');
INSERT INTO user_role (name) VALUES ('ROLE_ADMIN');
```

### 4️⃣ Frontend Setup (React + Vite)

#### Navigate to frontend:
```bash
cd ../../frontend
```

#### Install Dependencies:
```bash
npm install
```

#### Run the Frontend Server:
```bash
npm run dev
```

### 5️⃣ Access the Application
- Backend API: http://localhost:8080
- Frontend app: http://localhost:5173

## 👥 Authors

Szymon Wierzchoś - Frontend

Michał Tomaszewski - Backend

Joint Work - Database schema, ERD diagrams, overall concept and architecture
