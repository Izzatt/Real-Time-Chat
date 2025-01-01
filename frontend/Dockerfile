# Используем официальный образ Node.js
FROM node:16

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект в контейнер
COPY . .

# Собираем приложение
RUN npm run build

# Открываем порт для доступа к приложению
EXPOSE 3000

# Запускаем сервер React
CMD ["npm", "start"]
