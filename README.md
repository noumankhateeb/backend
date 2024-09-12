# Project Setup

## Backend

### Download the Project
1. Clone the repository:
   ```bash
   git clone https://github.com/noumankhateeb/backend.git
   ```
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

### Install Dependencies
1. Ensure you have Node.js and npm installed. You can download them from [Node.js](https://nodejs.org/).
2. Install the required packages:
   ```bash
   npm install
   ```

### Add Environment Variables
1. Create a `.env` file in the backend directory.
2. Add the secret keys provided by the owner to the `.env` file. You can also use your own MongoDB URI and JWT secret:
   ```plaintext
   PORT=4000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

### Run the Project
1. Start the server:
   ```bash
   npm run start
   ```
2. The backend server should now be running.