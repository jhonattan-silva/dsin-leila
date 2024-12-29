import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

interface ProfileProps {
    userName: string;
}

const Profile: React.FC<ProfileProps> = ({ userName }) => {
    const navigate = useNavigate();

    const fazerLogout = () => {
        if (window.confirm('Deseja realmente sair?')) {
            localStorage.removeItem('token'); // Remove o token do localStorage
            navigate('/');
        }
    };


    return (
        <header className="profile-container">
            <p>Bem-vindo, {userName}!</p>
            <button onClick={fazerLogout} className="logout-btn">
                Logout
            </button>
        </header>
    );
};

export default Profile;
