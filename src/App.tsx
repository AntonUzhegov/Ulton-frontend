import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import Home from './pages/Home';
import Hello from './pages/Hello';
import AllCourses from './pages/AllCourses';
import CourseView from './pages/CourseView';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Contacts from './pages/Contacts';
import './styles/style.css';
import './styles/login.css';

// Компонент для условного отображения главной страницы
const HomeOrHello: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Home /> : <Hello />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          {/* Header теперь внутри BrowserRouter */}
          <Header />
          <main>
            <div className="content-container">
              <Routes>
                <Route path="/" element={<HomeOrHello />} />
                <Route path="/allCourses" element={<AllCourses />} />
                <Route path="/courses/:slug" element={<CourseView />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route path="/contacts" element={<Contacts />} />
              </Routes>
            </div>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;