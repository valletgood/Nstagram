import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { dbService, storageService } from '../fbase';
import { v4 as uuidv4 } from 'uuid';
import Nsta from './Nsta';

const Home = ({ userObj }) => {
    const [gram, setGram] = useState('');
    const [grams, setGrams] = useState([])
    const [attachment, setAttachment] = useState('');

    const onSubmit = async (e) => {
        if (gram === '') {
            return;
        }
        e.preventDefault();
        let attachmentUrl = '';
        if (attachment !== '') {
            const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`)
            const response = await uploadString(fileRef, attachment, 'data_url')
            attachmentUrl = await getDownloadURL(ref(storageService, fileRef))
        }
        const newItem = {
            text: gram,
            createdAt: Date.now(),
            createrId: userObj.uid,
            attachmentUrl,
        }
        const docRef = await addDoc(collection(dbService, 'Nstagrams'), newItem)
        setGram('')
        setAttachment('')
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

    const onFileChange = (e) => {
        const item = e.target.files
        const theItem = item[0]
        const reader = new FileReader();
        reader.onloadend = (finishedEvnet) => {
            const imgUrl = finishedEvnet.currentTarget.result
            setAttachment(imgUrl)
        }
        reader.readAsDataURL(theItem)
    }

    const onClearFile = () => {
        setAttachment('')
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
            <form onSubmit={onSubmit}>
                <div className='Home_input'>
                    <input type='text' value={gram} placeholder='무슨 생각중인가요?' onChange={(e) => setGram(e.target.value)} />
                    <input type='submit' value='&rarr;' />
                </div>
                <div className='Home_file'>
                    <label htmlFor='attach_file'>
                        <span>Add Photos</span>
                    </label>
                    <input id='attach_file' type='file' accept='images/*' onChange={onFileChange} />
                </div>
                {attachment &&
                    <div>
                        <img src={attachment} style={{ width: '100px', backgroundImage: attachment }} />
                        <div onClick={onClearFile}>
                            <span>파일 삭제</span>
                        </div>
                    </div>
                }
            </form>
            <div>
                {grams.map((it) => <Nsta key={it.id} nstaObj={it} isOwner={it.createrId === userObj.uid} />)}
            </div>
        </div>
    )
}

export default Home;