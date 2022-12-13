import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ userObj }) => {


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
        </nav>
    )
}

export default Navigation;