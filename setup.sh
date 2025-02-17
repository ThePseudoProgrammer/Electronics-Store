mkdir electronics-store
cd electronics-store

# Создаем frontend
npx create-react-app client
cd client
npm install axios react-router-dom@5 @material-ui/core @material-ui/icons
cd ..

# Создаем backend
mkdir server
cd server
npm init -y
npm install express cors mongoose dotenv bcryptjs jsonwebtoken

# Создаем .env файл
echo "MONGODB_URI=mongodb://localhost:27017/electronics-store
JWT_SECRET=your-secret-key-here
PORT=5000" > .env 