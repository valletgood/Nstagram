import React, { useState } from 'react';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage'
import { dbService, storageService } from '../fbase';

const Nsta = ({ nstaObj, isOwner, userObj }) => {

    const [isEdit, setIsEdit] = useState(false);
    const [newText, setNewText] = useState(nstaObj.text);

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
        setIsEdit((prev => !prev))
    }

    const onSubmit = async () => {
        const editGram = doc(dbService, 'Nstagrams', nstaObj.id);
        await updateDoc(editGram, {
            text: newText,
        })
        setIsEdit((prev => !prev))
    }

    return (
        <div className='Nsta'>
            {
                isEdit ?
                    <>
                        <form onSubmit={onSubmit}>
                            <input type='text' value={newText} placeholder='수정할 내용을 입력하세요' required onChange={(e) => setNewText(e.target.value)} />
                            <input type='submit' value='수정' />
                        </form>
                        <button onClick={toggleEdit}>수정 취소</button>
                    </>
                    :
                    <>
                        <h3>{userObj.displayName}</h3>
                        {nstaObj.attachmentUrl && <img src={nstaObj.attachmentUrl} style={{ width: '100px' }} />}
                        <p>{nstaObj.text}</p>
                        {isOwner &&
                            <div className='Nsta_btns'>
                                <button style={{ backgroundColor: '#fd565f' }} onClick={onDeleteGram}>게시글 삭제</button>
                                <button style={{ backgroundColor: '#ececec' }} onClick={toggleEdit}>게시글 수정</button>
                            </div>
                        }
                    </>
            }
        </div>
    )
}

export default Nsta;