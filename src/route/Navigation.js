import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../fbase';
import { Link } from 'react-router-dom';

const Navigation = ({ userObj }) => {

    const navigate = useNavigate();

    const logOut = () => {
        authService.signOut();
        navigate('/', { replace: true })
    }
    return (
        <nav>
            <Link to='/' >
                <h4>Home</h4>
            </Link>
            <Link to='/Profile'>
                <h4>Profile</h4>
            </Link>
            <Link to='/Add'>
                <h4>Add Story</h4>
            </Link>
            <button onClick={logOut}>LogOut</button>
        </nav>
    )
}

export default Navigation;