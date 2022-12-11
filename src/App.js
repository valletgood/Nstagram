import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { authService } from './fbase';
import './App.css';
import AppRouter from './AppRouter';

function App() {
  const [init, setInit] = useState(false)
  const [userObj, setUserObj] = useState(null);

  const reLoadUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
      profileImg: user.photoURL
    })
  }

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
          profileImg: user.photoURL
        })
        const uid = user.uid
      } else {
        setUserObj(null)
      }
      setInit(true)
    })
  }, [])


  return (
    <div className="App">
      {init ? <AppRouter isLogIn={Boolean(userObj)} userObj={userObj} reLoadUser={reLoadUser} /> : "Loading..."}
    </div>
  );
}

export default App;
