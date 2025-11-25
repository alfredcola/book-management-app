MAC OS

curl -X GET "https://book-management-app-tqet.onrender.com/api/books"

curl -X POST "https://book-management-app-tqet.onrender.com/api/books" -H "Content-Type: application/json" -d '{"title":"3810GroupProject","author":"Alfred","year":2025,"genre":"Demo"}'

curl -X GET "https://book-management-app-tqet.onrender.com/api/books/title/3810GroupProject"

curl -X PUT "https://book-management-app-tqet.onrender.com/api/books/title/3810GroupProject" -H "Content-Type: application/json" -d '{"title":"3810GroupProject","author":"Alfred Updated","year":2026,"genre":"Final"}'

curl -X GET "https://book-management-app-tqet.onrender.com/api/books/title/3810GroupProject"

curl -X DELETE "https://book-management-app-tqet.onrender.com/api/books/title/3810GroupProject"

curl -X GET "https://book-management-app-tqet.onrender.com/api/books"

WINDOWS

curl -X GET "https://book-management-app-tqet.onrender.com/api/books"

curl -X POST "https://book-management-app-tqet.onrender.com/api/books" ^
  -H "Content-Type: application/json" ^
  -d "{\"title\":\"3810GroupProject\",\"author\":\"Alfred\",\"year\":2025,\"genre\":\"Demo\"}"

curl -X GET "https://book-management-app-tqet.onrender.com/api/books/title/3810GroupProject"

curl -X PUT "https://book-management-app-tqet.onrender.com/api/books/title/3810GroupProject" ^
  -H "Content-Type: application/json" ^
  -d "{\"title\":\"3810GroupProject\",\"author\":\"Alfred Updated\",\"year\":2026,\"genre\":\"Final\"}"

curl -X GET "https://book-management-app-tqet.onrender.com/api/books/title/3810GroupProject"

curl -X DELETE "https://book-management-app-tqet.onrender.com/api/books/title/3810GroupProject"

curl -X GET "https://book-management-app-tqet.onrender.com/api/books"
