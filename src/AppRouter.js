import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './route/Home';
import Login from './route/Login';
import Navigation from './route/Navigation';
import Profile from './route/Profile';

const AppRouter = ({ userObj, isLogIn, reLoadUser }) => {
    return (
        <Router>
            <>
                {isLogIn && <Navigation userObj={userObj} />}
                <div className='Home_container'>
                    <Routes>
                        {isLogIn ?
                            <>
                                <Route path='/' element={<Home userObj={userObj} />} />
                                <Route path='/Profile' element={<Profile userObj={userObj} reLoadUser={reLoadUser} />} />
                            </>
                            :
                            <>
                                <Route path='/' element={<Login />} />
                            </>
                        }
                    </Routes>
                </div>
            </>
        </Router>
    )
}

export default AppRouter