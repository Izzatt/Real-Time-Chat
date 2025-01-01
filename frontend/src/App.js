import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import RegisterPage from './pages/RegisterPage';
import ChatsPage from './pages/ChatsPage';
import ChatPage from './pages/ChatPage';

function App() {
    return (
        <Router>
            <Routes>
                {/* Перенаправление на страницу логина по умолчанию */}
                <Route path="/" element={<Navigate to="/login" />} />

                {/* Маршрут для страницы авторизации */}
                <Route path="/login" element={<AuthPage />} />

                {/* Маршрут для страницы регистрации */}
                <Route path="/register" element={<RegisterPage />} />

                {/* Маршрут для списка чатов */}
                <Route path="/chats" element={<ChatsPage />} />

                {/* Маршрут для страницы конкретного чата */}
                <Route path="/chat/:chatId" element={<ChatPage />} />
            </Routes>
        </Router>
    );
}

export default App;
