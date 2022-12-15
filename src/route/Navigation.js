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

    const scrollTop = () => {
        if (!window.scrollY) return;
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })

    }

    return (
        <div className='navigation'>
            <nav>
                <img style={{ width: '100px', margin: 'auto', marginTop: '10px' }} src={process.env.PUBLIC_URL + 'assets/instagram_logo.png'} />
                <Link onClick={scrollTop} to='/' >
                    <h4>Home</h4>
                </Link>
                <Link onClick={scrollTop} to='/Profile'>
                    <h4>Profile</h4>
                </Link>
                <Link onClick={scrollTop} to='/Add'>
                    <h4>Add Story</h4>
                </Link>
                <button style={{ cursor: 'pointer' }} onClick={logOut}>LogOut</button>
            </nav>
        </div>
    )
}

export default Navigation;