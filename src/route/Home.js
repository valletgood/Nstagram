import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore'
import { dbService } from '../fbase';
import Nsta from './Nsta';

const Home = ({ userObj }) => {

    const [grams, setGrams] = useState([])

    const getGrams = async () => {
        const querySnapshot = await getDocs(collection(dbService, 'Nstagrams'));
        querySnapshot.forEach((doc) => {
            {
                const gramObject = {
                    ...doc.data(),
                    id: doc.id,
                }
                setGrams(prev => [gramObject, ...prev])
            }
        })
    }

    useEffect(() => {
        getGrams();
        const q = query(collection(dbService, 'Nstagrams'), orderBy('createdAt', 'desc'));
        onSnapshot(q, (querySnapshot) => {
            const newArray = querySnapshot.docs.map((it) => {
                return {
                    id: it.id,
                    ...it.data()
                }
            })
            setGrams(newArray)
        })
    }, [])

    return (
        <div className='Home'>
            <div className='Home_nsta'>
                {grams.map((it) => <Nsta key={it.id} nstaObj={it} userObj={userObj} isOwner={it.createrId === userObj.uid} />)}
            </div>
        </div>
    )
}

export default Home;