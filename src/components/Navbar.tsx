import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../navbar.css'; // Ensure to create this CSS file for styling

const Navbar = () => {
    const { user, logout } = useContext(AuthContext)!;

    return (
        <nav className="navbar">
            <h1 className="navbar-title">To-Do App</h1>
            <div className="navbar-right">
                {user ? (
                    <div className="navbar-user">
                        <span>{user?.name}</span>
                        <button onClick={logout} className="navbar-logout">Logout</button>
                    </div>
                ) : null}
            </div>
        </nav>
    );
};

export default Navbar;
