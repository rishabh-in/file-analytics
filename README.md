
---

# File Analytics App

Welcome to the File Analytics App! This application allows users to upload files, analyze their content, and perform various operations such as word count analysis and masking specific words. With real-time notifications and seamless integration between the frontend and backend, this app provides a smooth user experience for managing and analyzing files.

## Setup Instructions

### Prerequisites

- Git
- Node.js and npm (or yarn)
- MongoDB
- React

### Steps

1. **Clone the Repository**:
   - Open a terminal or command prompt and navigate to your desired local directory where you want to clone the project.
   - Run the following command:
     ```
     git clone https://github.com/rishabh-in/file-analytics.git
     ```
   This will create a new directory named `file-analytics` on your system, containing the application's source code.

2. **Set Up the Backend (server directory)**:
   - Navigate to the backend directory:
     ```
     cd file-analytics/server
     ```

3. **Import the .env file (if applicable)**:
   - If the project uses a `.env` file for environment variables (like database connection strings), make sure you have it available in the server directory.
   - Paste the contents of the provided `.env` file into this directory. You might need to create the `.env` file yourself if it's not included.

4. **Install Dependencies**:
   ```
   npm install
   ```

5. **Start the Backend Server**:
   ```
   node start
   ```

6. **Set Up the Frontend (Client directory)**:
   - Navigate to the frontend directory:
     ```
     cd ../Client
     ```

7. **Install Frontend Dependencies (using Node.js version 16)**:
   ```
   nvm use 16  # Assuming you have nvm installed for managing Node.js versions
   npm install
   ```

8. **Start the Frontend Server**:
   ```
   npm start
   ```

   This will launch the frontend development server, usually accessible at http://localhost:3000 (verify the port if different).

### Verification

- Open your web browser and navigate to http://localhost:3000 to access the frontend application.
- If everything is set up correctly, you should see the application's interface.

By following these steps, you should have your file upload and word analysis application running locally, ready for exploration and development.

---

Feel free to customize the setup instructions or add any additional information as needed.