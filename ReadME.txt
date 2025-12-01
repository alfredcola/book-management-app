Book Manager Application
1. Project Info

Project Name: Book Manager - A server-side application for managing books with user authentication and RESTful APIs.
Group No.: Group 3
Students’ Names and SID:
Chen Ching Lok (SID: 14201970)
Fu King Tung (SID: 13907711)
Cheung Wing Lok (SID: 14107140)
Li Hoi Yan (SID: 14109378)
Zhang Yiu Hin (SID: 13909765)

2. Project File Intro

server.js: The main server file that sets up Express.js, connects to MongoDB, configures session-based authentication (using cookie-session via express-session), and mounts routes for authentication, web CRUD, and RESTful APIs. It handles the overall application startup and cloud deployment.
package.json: Lists all dependencies including express, mongoose, bcryptjs, express-session (for cookie-session authentication), ejs, and others. Also defines scripts for starting the server (e.g., "node server.js").
public/ (folder): Contains static files such as CSS styles (e.g., styles.css) for UI enhancement.
views/ (folder): Contains EJS templates for web pages:
login.ejs: Login page UI.
register.ejs: Registration page UI with role selection.
books.ejs: Book list page with search and CRUD buttons (admin-only for create/update/delete).
newBook.ejs: Form for adding a new book.
editBook.ejs: Form for editing an existing book.

models/ (folder): Contains Mongoose schema files:
User.js: User model with username, hashed password (using bcrypt), and role (reader/admin).
Book.js: Book model with title, author, year, and genre.

routes/ (or root files):
auth.js: Handles login, register, and logout routes. Uses cookie-session for authentication.
api.js: Defines RESTful APIs for CRUD on books (no authentication required).
books.js: Handles web-based CRUD routes for books, with admin middleware protection.

middleware/auth.js: Middleware functions for authentication (isAuthenticated) and role-based access (isAdmin), using session data.
README.md: This file, providing project information, file introductions, cloud URL, and operation guides.

3. The Cloud-Based Server URL
The application is deployed on Render cloud platform:
https://book-management-app-tqet.onrender.com
(Access the login page at https://book-management-app-tqet.onrender.com/login. Ensure the app is running; Render may spin down free tiers after inactivity.)
4. Operation Guides
Use of Login/Logout Pages

Authentication Method: We use cookie-session (via express-session) for session-based authentication. After login, a session cookie is set with userId and role, which protects CRUD web pages. No OAuth or JWT is used.
Valid Login Information (Test Accounts - Pre-registered in the database for demo):
Admin Account: Username: admin, Password: admin123, Role: admin (Can perform full CRUD).
Reader Account: Username: reader, Password: reader123, Role: reader (Read-only access).

Sign-in Steps:
Open the URL: https://book-management-app-tqet.onrender.com/login.
Enter username and password in the form.
Click "Login". If successful, you will be redirected to the book list page (/books).
If error (e.g., invalid credentials), an alert message will show on the login page.

Registration (Optional, for new users):
Go to https://book-management-app-tqet.onrender.com/register.
Enter username, password (min 6 characters), and select role (reader or admin).
Click "Register". You will be auto-logged in and redirected to /books.

Logout:
On any protected page (e.g., /books), click the "Logout" button in the header.
You will be redirected to the login page, and the session cookie will be cleared.


Use of CRUD Web Pages
These pages are protected by authentication (must login first). Only admins can create/update/delete; readers can only read/search.

Access: After login, go to https://book-management-app-tqet.onrender.com/books.
Create:
(Admin only) Click "+ Add New Book" button in the header.
Fill in title (required), author (required), year, genre.
Click "Add Book". Redirects back to book list.

Read/Search:
Use the search form at the top: Enter title, author, year, or genre.
Click "🔍 Search" to filter books (uses MongoDB regex for partial matches).
Results show in a list with book details (title, author, year, genre).
If no results, shows "No books found".

Update:
(Admin only) In the book list, click "Edit" next to a book.
Update fields in the form.
Click "Update Book". Redirects back to book list.

Delete:
(Admin only) In the book list, click "Delete" next to a book.
Confirm the prompt ("Are you sure?").
Book is removed, redirects back to book list.


Use of RESTful CRUD Services
These APIs are open (no authentication required) and mapped to HTTP methods. Base URL: https://book-management-app-tqet.onrender.com/api

List of APIs:
Read All Books: GET /books - Returns all books.
Read by Title: GET /books/title/:title - Returns book by exact title.
Search by Keyword: GET /books/search/:keyword - Returns books with title matching keyword (regex).
Create Book: POST /books - Creates a new book (body: {title, author, year, genre}).
Update by ID: PUT /books/:id - Updates book by MongoDB ID.
Update by Title: PUT /books/title/:title - Updates book by title.
Delete by ID: DELETE /books/:id - Deletes book by MongoDB ID.
Delete by Title: DELETE /books/title/:title - Deletes book by title.

How to Test Them: Use CURL commands in terminal. Below are examples (for Mac OS and Windows). Replace :id or :title with actual values.

Mac OS CURL Commands:
text# Read all books
curl -X GET "https://book-management-app-tqet.onrender.com/api/books"

# Create a book
curl -X POST "https://book-management-app-tqet.onrender.com/api/books" -H "Content-Type: application/json" -d '{"title":"3810GroupProject","author":"Alfred","year":2025,"genre":"Demo"}'

# Read by title
curl -X GET "https://book-management-app-tqet.onrender.com/api/books/title/3810GroupProject"

# Update by title
curl -X PUT "https://book-management-app-tqet.onrender.com/api/books/title/3810GroupProject" -H "Content-Type: application/json" -d '{"title":"3810GroupProject","author":"Alfred Updated","year":2026,"genre":"Final"}'

# Read by title (after update)
curl -X GET "https://book-management-app-tqet.onrender.com/api/books/title/3810GroupProject"

# Delete by title
curl -X DELETE "https://book-management-app-tqet.onrender.com/api/books/title/3810GroupProject"

# Read all books (after delete)
curl -X GET "https://book-management-app-tqet.onrender.com/api/books"

# Search by keyword (example)
curl -X GET "https://book-management-app-tqet.onrender.com/api/books/search/Project"
Windows CURL Commands:
text# Read all books
curl -X GET "https://book-management-app-tqet.onrender.com/api/books"

# Create a book
curl -X POST "https://book-management-app-tqet.onrender.com/api/books" ^
  -H "Content-Type: application/json" ^
  -d "{\"title\":\"3810GroupProject\",\"author\":\"Alfred\",\"year\":2025,\"genre\":\"Demo\"}"

# Read by title
curl -X GET "https://book-management-app-tqet.onrender.com/api/books/title/3810GroupProject"

# Update by title
curl -X PUT "https://book-management-app-tqet.onrender.com/api/books/title/3810GroupProject" ^
  -H "Content-Type: application/json" ^
  -d "{\"title\":\"3810GroupProject\",\"author\":\"Alfred Updated\",\"year\":2026,\"genre\":\"Final\"}"

# Read by title (after update)
curl -X GET "https://book-management-app-tqet.onrender.com/api/books/title/3810GroupProject"

# Delete by title
curl -X DELETE "https://book-management-app-tqet.onrender.com/api/books/title/3810GroupProject"

# Read all books (after delete)
curl -X GET "https://book-management-app-tqet.onrender.com/api/books"

# Search by keyword (example)
curl -X GET "https://book-management-app-tqet.onrender.com/api/books/search/Project"
