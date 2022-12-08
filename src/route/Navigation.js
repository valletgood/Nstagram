import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ userObj }) => {
    return (
        <nav>
            <ul>
                <Link style={{ marginRight: '30px' }} to='/' >Home</Link>
                <Link to='/Profile'>Profile</Link>
            </ul>
        </nav>
    )
}

export default Navigation;