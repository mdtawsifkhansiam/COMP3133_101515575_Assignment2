# Employee Management System (Full Stack) - Assignment 2

A professional MERN-stack application (MongoDB, Express, Angular, Node.js) featuring a **GraphQL API** for managing employee records, including secure authentication and Cloudinary-powered image uploads.

## 🚀 Key Features (Assignment 2)

- **User Authentication**: Secure Signup and Login system using JWT (JSON Web Tokens) stored in LocalStorage.
- **Complete CRUD**: Create, Read, Update, and Delete functionality for employee records.
- **Image Upload**: Integrated **Cloudinary API** for hosting employee profile pictures securely.
- **Advanced Search**: Dynamic filtering by **Department** or **Designation**.
- **Detailed View**: Dedicated page for individual employee details, including joining date and salary.
- **Professional UI**: Enhanced with Bootstrap alerts, delete confirmations, and automatic avatars for missing photos.

## 🛠️ Technical Stack

- **Frontend**: Angular (Standalone Components).
- **Backend**: Node.js & Express.
- **API**: GraphQL (Apollo Server).
- **Database**: MongoDB Atlas.
- **File Storage**: Cloudinary.

## ⚙️ Installation & Setup

### 1. Backend Setup

1.  Navigate to the backend directory: `cd backend`
2.  Install dependencies: `npm install`
3.  Create a `.env` file in the `backend` folder and add your credentials:
    ```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_chosen_secret_key

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
    ```
4.  Start the server: `npm start`.

### 2. Frontend Setup

1.  Navigate to the frontend directory: `cd frontend`
2.  Install dependencies: `npm install`
3.  Start the Angular server: `ng serve`
4.  Open your browser to: `http://localhost:4200`.

## ✅ Assignment Requirements Met

- [x] Login & Signup with full validation.
- [x] Employee list with Search (Department/Designation).
- [x] View, Update, and Delete Employee functionality.
- [x] Profile Picture upload to Cloudinary.
- [x] Formatted dates (`mediumDate`) and professional UI components.

---

**Author**:MD Tawsif Khan Siam  
**Student ID**: 101515575
