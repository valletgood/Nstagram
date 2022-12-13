import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Add from './route/Add';
import Detail from './route/Detail';
import Home from './route/Home';
import Login from './route/Login';
import Navigation from './route/Navigation';
import Profile from './route/Profile';

export const onEdit = React.createContext();

const AppRouter = ({ userObj, isLogIn, reLoadUser }) => {

    return (
        <Router>
            <>
                {isLogIn ?
                    <onEdit.Provider value={false}>
                        <div className='container'>
                            <Navigation userObj={userObj} />
                            <div className='Home_container'>
                                <Routes>
                                    <Route path='/' element={<Home userObj={userObj} />} />
                                    <Route path='/Profile' element={<Home userObj={userObj} />} />
                                    <Route path='/Add' element={<Home userObj={userObj} />} />
                                </Routes>
                            </div>
                            <div className='Detail_container'>
                                <Routes>
                                    <Route path='/' element={<Detail userObj={userObj} />} />
                                    <Route path='/Profile' element={<Profile userObj={userObj} reLoadUser={reLoadUser} />} />
                                    <Route path='/Add' element={<Add userObj={userObj} />} />
                                </Routes>
                            </div>
                        </div>
                    </onEdit.Provider>
                    :
                    <>
                        <Routes>
                            <Route path='/' element={<Login />} />
                        </Routes>
                    </>

                }
            </>
        </Router>
    )
}

export default AppRouter