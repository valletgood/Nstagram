import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, storageService } from '../fbase';
import { updateProfile } from 'firebase/auth';
import { ref, uploadString, getDownloadURL } from 'firebase/storage'

const Profile = ({ userObj, reLoadUser }) => {
    const [newName, setNewName] = useState(userObj.displayName);

    const [profileUrl, setProfileUrl] = useState(userObj.profileImg);

    const navigate = useNavigate();

    const logOut = () => {
        authService.signOut();
        navigate('/', { replace: true })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        let attachmentUrl = '';
        if (userObj.displayName !== newName && userObj.profileImg !== profileUrl) {
            if (profileUrl !== '') {
                const fileRef = ref(storageService, `${userObj.uid}/Profile_image`)
                const response = await uploadString(fileRef, profileUrl, 'data_url')
                attachmentUrl = await getDownloadURL(ref(storageService, fileRef))
            }
            await updateProfile(authService.currentUser, {
                displayName: newName,
                photoURL: attachmentUrl
            })
            reLoadUser();
        }
        else if (userObj.displayName !== newName) {
            await updateProfile(authService.currentUser, {
                displayName: newName,
            })
            reLoadUser();
        } else if (userObj.profileImg !== profileUrl) {
            if (profileUrl !== '') {
                const fileRef = ref(storageService, `${userObj.uid}/Profile_image`)
                const response = await uploadString(fileRef, profileUrl, 'data_url')
                attachmentUrl = await getDownloadURL(ref(storageService, fileRef))
            }
            await updateProfile(authService.currentUser, {
                photoURL: attachmentUrl
            })
            reLoadUser();
        }
    }

    const onFileChange = (e) => {
        const item = e.target.files
        const theItem = item[0]
        const reader = new FileReader();
        reader.onloadend = (finishedEvnet) => {
            const imgUrl = finishedEvnet.currentTarget.result
            setProfileUrl(imgUrl)
        }
        reader.readAsDataURL(theItem)
    }

    return (
        <div className='Profile'>
            <h4><img src={profileUrl} style={{ width: '100px', height: '100px', borderRadius: '50px', objectFit: 'cover' }} />{userObj.displayName}의 프로필</h4>
            <form onSubmit={onSubmit}>
                <input className='Profile_input' type='text' value={newName} onChange={(e) => setNewName(e.target.value)} /><br />
                <input className='Profile_image' type='file' onChange={onFileChange} /><br />
                <input className='Profile_submit' type='submit' value='변경' />
            </form>
        </div>
    )
}

export default Profile;