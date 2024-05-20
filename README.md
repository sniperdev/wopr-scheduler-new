## Work Shift Management App

### Overview
This repository contains the source code for a Work Shift Management application, designed to help employees manage their work schedules efficiently. The application is built using the following technologies:

- **React:** A JavaScript library for building user interfaces.
- **TypeScript (TS):** A typed superset of JavaScript that adds static types.
- **Node.js:** A JavaScript runtime for server-side development.
- **Express:** A web application framework for Node.js.
- **Sequelize:** A promise-based ORM for Node.js that supports multiple database systems.
- **MySQL:** A relational database management system.

### Features
User Authentication: Each employee has a personal account to log in and access the system.
Shift Management: Users can add, edit, and delete their work shifts through an interactive calendar.
Multi-Company Support: The application supports multiple companies, and each company has its own set of employees and work schedules.
Administrator Privileges: Administrators of each company can manage work hours and user accounts within their respective companies.

### Setup Instructions
1. **Clone the repository:**
   ```bash
   git clone https://github.com/sniperdev/wopr-scheduler-new
   cd wopr-scheduler-new
   ```

2. **Install Dependencies:**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Run the Application:**
   - Start the server:
     ```bash
     cd ../server
     npm run start
     ```
   - Start the client:
     ```bash
     cd ../client
     npm run dev
     ```
