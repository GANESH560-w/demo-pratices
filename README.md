# Student Register - Static Website

A simple frontend-only Student Registration application built with HTML, CSS and JavaScript.

## Features
- Register student
- Edit student
- Delete student
- Search students
- Student statistics
- Export student data to CSV
- Responsive design
- Uses browser localStorage for persistence

## Run
Open `index.html` in a browser.

For production, replace localStorage with an API/backend and database.

## Azure deployment
This frontend can be hosted as a static website using Azure Static Web Apps or Azure Storage Static Website. If you add Azure Functions, the functions can provide backend APIs such as:
- POST /api/students
- GET /api/students
- PUT /api/students/{id}
- DELETE /api/students/{id}

A database such as Azure SQL, Cosmos DB or Table Storage can then persist the records centrally.
