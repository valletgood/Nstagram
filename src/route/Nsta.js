import React, { useEffect, useState } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage'
import { dbService, storageService } from '../fbase';
import Edit from './Edit';

const Nsta = ({ nstaObj, isOwner, userObj }) => {

    const [editOpen, setEditOpen] = useState(false);

    const ownerId = nstaObj.createrId;
    const ownerImg = nstaObj.createrImg;
    const ownerName = nstaObj.createrName;
    console.log(ownerId)
    console.log(ownerImg)
    console.log(ownerName)
    const onDeleteGram = async () => {
        const check = window.confirm('정말로 삭제하시겠습니까?')
        if (check) {
            if (nstaObj.attachmentUrl) {
                await deleteObject(ref(storageService, nstaObj.attachmentUrl))
                await deleteDoc(doc(dbService, 'Nstagrams', nstaObj.id))
            } else {
                await deleteDoc(doc(dbService, 'Nstagrams', nstaObj.id))
            }
        }
    }

    const toggleEdit = () => {
        setEditOpen((prev => !prev))
    }

    return (
        <div className='Nsta'>
            <p>
                <img src={ownerImg} style={{ width: '30px', height: '30px', borderRadius: '50px', objectFit: 'cover', marginRight: '10px', border: '1px solid gray' }} />
                {ownerName}
            </p>
            {nstaObj.attachmentUrl && <img src={nstaObj.attachmentUrl} style={{ width: '100%', objectFit: 'cover' }} />}
            <p>{nstaObj.text}</p>
            {isOwner &&
                <div className='Nsta_btns'>
                    <button style={{ backgroundColor: '#fd565f' }} onClick={onDeleteGram}>게시글 삭제</button>
                    <button style={{ backgroundColor: '#ececec' }} onClick={toggleEdit}>게시글 수정</button>
                </div>
            }
            {editOpen && <Edit setEditOpen={setEditOpen} userObj={userObj} nstaObj={nstaObj} />}
        </div>
    )
}

export default Nsta;