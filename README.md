# Getting Started

Ensure that you have Node.js and npm installed. The project has been built using Node v12.18.3 and npm v6.14.6. I, personally, use yarn (v1.22.4) over npm.

Run npm install (or yarn) at the root of the project to install all dependencies.

Please set up a local instance of MySQL (using XAMPP, or other) and create a blank database called 'broker-api'. When you run `npm start` for the first time, the ORM will syncronise the database schema with your database.

Database user details can be edited in `/src/typeorm.config.ts`, if required.

To start the application, run `npm start`. This will initialise the express server on localhost:4000. 
