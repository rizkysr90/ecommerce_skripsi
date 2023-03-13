import React, { useState } from 'react'
import { ClipLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import override from '../styles/spinner';
import forgotPassImg from '../media/undraw_forgot_password_re_hxwm.svg';
import axios from 'axios';

function ForgotPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    
    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            let res = await axios.post(`${process.env.REACT_APP_API_HOST}/auth/forgot-password`, {email})
            .then(res => res.data)
            toast.success(`${res.metadata?.msg}`)
            setIsLoading(false);
        } catch (error) {
            let errMsg = 'Internal Server Error'
            if (error.response?.status !== 500) {
                errMsg = error.response?.data?.metadata?.msg
            }
            
            toast.error(`Error ${error?.response?.status} - ${errMsg}`);
            setIsLoading(false);
        }
    }
    return (
        <>
            {
              isLoading && 
              <div className='bg-base-100 fixed z-50 w-full left-0 top-0 right-0 min-h-screen'>
                    <ClipLoader
                    color={"#1eb854"}
                    loading={isLoading}
                    size={35}
                    cssOverride={override}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    />
              </div>
            }
            <ToastContainer
            autoClose={3000}
            limit={1}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover
            theme="dark"
            />
            <div className='min-h-screen flex items-center bg-base-200 justify-center'>
                <div className='shadow-lg flex flex-col px-6 lg:px-10 py-8 bg-base-100 rounded-lg mx-8 lg:mx-0'>
                    <div className='text-lg font-bold text-center'>Lupa Password</div>
                    <div className='flex justify-center mt-2'>
                        <img src={forgotPassImg} 
                        className="h-24"
                        alt='forgot password'/>
                    </div>
                    <div className='mt-5'>
                        <input 
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        type='email'
                        required
                        placeholder='Masukkan email kamu'
                        className='input input-bordered w-full'/>
                    </div>
                    <div className="alert p-1 bg-transparent ">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <span className='text-xs'>Alamat reset password akan dikirimkan ke email kamu.</span>
                        </div>
                    </div>
                  
                    {
                        email ? 
                        <button className='btn btn-primary normal-case mt-4'
                        onClick={handleSubmit}
                        >Kirim</button>
                        :
                        <button className='btn btn-disabled normal-case mt-4'>Kirim</button>
                    }
                </div>
            </div>
        </>
      )
}

export default ForgotPassword