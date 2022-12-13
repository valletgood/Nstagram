import React from 'react';

const Detail = ({ userObj }) => {
    return (
        <div className='Detail'>
            <img src={userObj.profileImg} style={{ width: '100px', height: '100px', borderRadius: '50px', objectFit: 'cover' }} />
            <h4>{userObj.displayName}</h4>
        </div>
    )
}

export default Detail;