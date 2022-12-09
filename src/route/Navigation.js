import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ userObj }) => {
    return (
        <nav>
            <Link style={{ marginRight: '30px' }} to='/' >Home</Link>
            <Link to='/Profile'>
                {userObj.displayName
                    ? `${userObj.displayName}의 프로필`
                    : "프로필"}
            </Link>
        </nav>
    )
}

export default Navigation;