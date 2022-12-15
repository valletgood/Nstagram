import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore'
import { dbService } from '../fbase';
import Nsta from './Nsta';

const Home = ({ userObj }) => {

    const [grams, setGrams] = useState([])

    const newSign = () => {
        if (userObj.displayName === null) {
            alert('프로필이 설정되지 않았습니다. Profile 탭으로 이동해 지금 바로 설정해주세요!')
        }
    }

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
        newSign();
    }, [])

    return (
        <div className='Home_nsta'>
            {grams.map((it) => <Nsta key={it.id} nstaObj={it} userObj={userObj} isOwner={it.createrId === userObj.uid} />)}
        </div>
    )
}

export default Home;