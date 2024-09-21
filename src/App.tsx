import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';
import { TodoProvider } from './context/TodoContext';
import ProtectedRoute from './routes/ProtectedRoute';
import MyToDo from './pages/MyToDo';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <TodoProvider>
          <Routes>
            {/* Redirect root path to login */}
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {/* Protected route for My To-Do */}
            <Route element={<ProtectedRoute />}>
              <Route path="/my-to-do" element={<MyToDo />} />
            </Route>

          </Routes>
        </TodoProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
