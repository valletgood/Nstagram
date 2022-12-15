import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore'
import { dbService, storageService } from '../fbase';
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadString, deleteObject } from 'firebase/storage'

const Edit = ({ setEditOpen, userObj, nstaObj }) => {

    const [newText, setNewText] = useState(nstaObj.text);

    const [newAttachment, setNewAttachment] = useState(nstaObj.attachmentUrl);
    console.log(nstaObj.attachmentUrl)
    const toggleEdit = () => {
        setEditOpen((prev => !prev))
    }
    const onSubmit = async () => {
        const editGram = doc(dbService, 'Nstagrams', nstaObj.id);
        let attachmentUrl = '';
        // 텍스트만 교체하는 경우
        if (newAttachment === nstaObj.attachmentUrl) {
            await updateDoc(editGram, {
                text: newText,
            })
        }

        // 첨부파일이 있는데 바꿀 경우 - clear
        else if (nstaObj.attachmentUrl !== "" && newAttachment !== "") {
            await deleteObject(ref(storageService, nstaObj.attachmentUrl))
            const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`)
            const response = await uploadString(fileRef, newAttachment, 'data_url')
            attachmentUrl = await getDownloadURL(ref(storageService, fileRef))
            await updateDoc(editGram, {
                text: newText,
                attachmentUrl
            })
        }
        // 첨부파일 없는데 없이 할 경우 - clear
        else if (nstaObj.attachmentUrl === "" && newAttachment === "") {
            await updateDoc(editGram, {
                text: newText,
            })
        }
        // 첨부파일이 있는데 삭제할 경우 - clear
        else if (newAttachment === "") {
            await deleteObject(ref(storageService, nstaObj.attachmentUrl))
            await updateDoc(editGram, {
                text: newText,
                attachmentUrl: ""
            })
        }
        // 첨부파일이 없는데 추가할 경우 - clear
        else if (nstaObj.attachmentUrl === "" && newAttachment !== "") {
            const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`)
            const response = await uploadString(fileRef, newAttachment, 'data_url')
            attachmentUrl = await getDownloadURL(ref(storageService, fileRef))
            await updateDoc(editGram, {
                text: newText,
                attachmentUrl
            })
        }
        setEditOpen((prev => !prev))
    }

    const onFileChange = (e) => {
        const item = e.target.files
        const theItem = item[0]
        const reader = new FileReader();
        reader.onloadend = (finishedEvnet) => {
            const imgUrl = finishedEvnet.currentTarget.result
            setNewAttachment(imgUrl)
        }
        reader.readAsDataURL(theItem)
    }

    const onClearFile = () => {
        setNewAttachment("")
    }

    return (
        <div className='Edit_box'>
            <div className='Edit'>
                <form onSubmit={onSubmit}>
                    <div className='Edit_file'>
                        <label htmlFor='attach_file'>
                            <span>Change Photos </span>
                        </label>
                        <input id='attach_file' type='file' accept='images/*' onChange={onFileChange} style={{ display: 'none' }} />
                    </div>
                    {newAttachment &&
                        <div className='attach_preview'>
                            <img src={newAttachment} style={{ width: '350px', height: '350px', objectFit: 'cover' }} />
                            <div style={{ marginTop: '10px' }} onClick={onClearFile}>
                                <span style={{ cursor: 'pointer' }}>파일 삭제</span>
                            </div>
                        </div>
                    }
                    <div className='Edit_input'>
                        <textarea className='Edit_input_text' type='text' value={newText} placeholder='무슨 생각중인가요?' onChange={(e) => setNewText(e.target.value)} />
                    </div>
                    <div className='Edit_submit'>
                        <button onClick={toggleEdit}>수정 취소</button>
                        <input className='Edit_input_submit' type='submit' value='게시' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Edit;