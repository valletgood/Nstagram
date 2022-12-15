import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { addDoc } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { storageService, dbService } from '../fbase';


const Add = ({ userObj }) => {

    const [gram, setGram] = useState('');
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
            createrImg: userObj.profileImg,
            createrName: userObj.displayName,
            attachmentUrl,
        }
        const docRef = await addDoc(collection(dbService, 'Nstagrams'), newItem)
        setGram('')
        setAttachment('')
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

    return (
        <div className='Add'>
            <form onSubmit={onSubmit}>
                <div className='Add_file'>
                    <label htmlFor='attach_file'>
                        <span>Add Photos </span>
                    </label>
                    <input id='attach_file' type='file' accept='images/*' onChange={onFileChange} style={{ display: 'none' }} />
                </div>
                {attachment &&
                    <div className='attach_preview'>
                        <img src={attachment} style={{ width: '100%', objectFit: 'cover' }} />
                        <div style={{ marginTop: '10px' }} onClick={onClearFile}>
                            <span style={{ cursor: 'pointer' }}>파일 삭제</span>
                        </div>
                    </div>
                }
                <div className='Add_input'>
                    <textarea className='Add_input_text' type='text' value={gram} placeholder='무슨 생각중인가요?' onChange={(e) => setGram(e.target.value)} />
                </div>
                <div className='Add_submit'>
                    <input className='Add_input_submit' type='submit' value='게시' />
                </div>
            </form>
        </div>
    )
}

export default Add;