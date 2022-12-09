import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { authService } from '../fbase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    let provider = new GoogleAuthProvider();

    const onSocialLogin = async (e) => {
        await signInWithPopup(authService, provider)
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {

            const data = await signInWithEmailAndPassword(authService, email, password)
            console.log(data)

        } catch (error) {
            setError(error.message)
        }
    }

    const signUp = async () => {
        const data = await createUserWithEmailAndPassword(authService, email, password);
    }

    return (
        <div className='Login'>
            <img className='Login_photo' src={process.env.PUBLIC_URL + '/assets/Login_photo.png'} alt='Login_photo' />
            <div>
                <div className='Login_input'>
                    <form className='Login_form' onSubmit={onSubmit}>
                        <img className='Login_logo' src={process.env.PUBLIC_URL + '/assets/instagram_logo.png'} alt='intagram_logo' />
                        <input type='text' value={email} placeholder='아이디를 입력해주세요' onChange={(e) => setEmail(e.target.value)} required />
                        <input type='password' value={password} placeholder='비밀번호를 입력해주세요' onChange={(e) => setPassword(e.target.value)} required />
                        <input className='Login_submit' type='submit' value='로그인' />
                        <p>------------ 또는 ------------</p>
                        {error && <span>{error}</span>}
                    </form>
                    <div className='Login_btns'>
                        <button onClick={onSocialLogin}><FontAwesomeIcon icon={faGoogle} /> 구글로 로그인하기</button>
                    </div>
                </div>
                <span className='Login_input'>
                    아이디와 비밀번호를 입력 후 <input className='Login_signUp' type='button' value='회원가입' onClick={signUp} />을 눌러주세요
                </span>
            </div>
        </div>
    )
}

export default Login;