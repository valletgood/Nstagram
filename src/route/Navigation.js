import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

const Navigation = ({ userObj }) => {


    return (
        <nav>
            <Link style={{ marginRight: '30px' }} to='/' >
                <div>
                    <img src={process.env.PUBLIC_URL + "/assets/instagram.png"} style={{ width: '100px' }} /><br />
                    <h4>Home</h4>
                </div>
            </Link>
            <Link to='/Profile'>
                {userObj.displayName
                    ?
                    <>
                        <div>
                            <img src={userObj.profileImg} style={{ width: '100px', height: '100px', borderRadius: '50px', objectFit: 'cover' }} />
                        </div>
                        <h4>{userObj.displayName}의 프로필</h4>
                    </>
                    :
                    "프로필"}
            </Link>
        </nav>
    )
}

export default Navigation;