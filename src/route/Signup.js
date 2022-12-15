import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { authService } from '../fbase';

const SignUp = ({ setSignOpen }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const toggleSign = () => {
        setSignOpen((prev => !prev))
    }

    const signUp = async () => {
        const data = await createUserWithEmailAndPassword(authService, email, password);
        setSignOpen((prev => !prev))
    }

    return (
        <div className='SignUp_box'>
            <form className='SignUp'>
                g,,
            </form>
        </div>
    )
}

export default SignUp;