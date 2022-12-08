import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../fbase';
import { updateProfile } from 'firebase/auth';

const Profile = ({ userObj, reLoadUser }) => {
    const [newName, setNewName] = useState(userObj.displayName);

    const navigate = useNavigate();

    const logOut = () => {
        authService.signOut();
        navigate('/', { replace: true })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (userObj.displayName !== newName) {
            await updateProfile(authService.currentUser, {
                displayName: newName,
            })
            reLoadUser();
        }
    }

    return (
        <div className='Profile'>
            <h2>{userObj.displayName}의 프로필</h2>
            <form onSubmit={onSubmit}>
                <input type='text' value={newName} onChange={(e) => setNewName(e.target.value)} />
                <input type='submit' value='변경' />
            </form>
            <button onClick={logOut}>로그아웃</button>
        </div>
    )
}

export default Profile;