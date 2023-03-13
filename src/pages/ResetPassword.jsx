import { faEye, faEyeLowVision } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import notFound from '../media/undraw_page_not_found_re_e9o6.svg';
import override from '../styles/spinner';

function ResetPassword() {
    const [isLoading, setIsLoading] = useState('');
    const [showPass1, setShowPass1] = useState(false);
    const [showPass2, setShowPass2] = useState(false);
    const [currentPw, setCurrentPw] = useState('');
    const [comparePw, setComparePw] = useState('');
    const [statusPw, setStatusPw] = useState(false);
    const [isError, setIsError] = useState(false);
    const {token, userId} = useParams();
    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            await axios.post(`${process.env.REACT_APP_API_HOST}/auth/forgot-password/${userId}/${token}`, {
                password : currentPw,
                confirm_password : comparePw
            })
            setIsError(false)
            setIsLoading(false);
            toast.success('berhasil memperbarui password')
        } catch (error) {
            setIsLoading(false);
            setIsError(true)
            let errMsg = 'Internal Server Error'
            if (error.response?.status !== 500) {
                errMsg = error.response?.data?.metadata?.msg
            }
            if (error.response?.data?.metadata?.msg === 'invalid signature') {
                errMsg = error.response?.data?.metadata?.msg
                error.response.status = 401
            }
            
            toast.error(`Error ${error?.response?.status} - ${errMsg}`);
        }
    }
    useEffect(() => {
        const getData = async () => {
            setIsLoading(true)
            try {
                await axios.get(`${process.env.REACT_APP_API_HOST}/auth/forgot-password/${userId}/${token}`)
                .then(res => res.data);
                setIsError(false);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                setIsError(true);
            }
        }
        getData()
    }, [token, userId])

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
                {
                    isError ? 
                    <div className='flex flex-col'>
                        <div className='w-72'>
                            <img src={notFound} alt="back"/>
                        </div>
                        <div className='mt-2'>Oops not allowed, please back to home</div>
                        <Link to='/' className='btn normal-case mt-2 btn-primary'>Back to home</Link>
                    </div>
                    :
                    <div className='shadow-lg flex flex-col px-10 py-8 bg-base-100 rounded-lg'>
                        <div className='text-lg font-bold text-center'>Reset Password</div>
                        {/* <div className='flex justify-center mt-2'>
                            <img src={forgotPassImg} 
                            className="h-24"
                            alt='forgot password'/>
                        </div> */}
                    <div className="form-control">
                            <label className="label" htmlFor='password'>
                                <span className="label-text">Password</span>
                            </label>
                            <div className='flex items-center'>
                                <input type={ showPass1 ? 'text' : 'password'  }  id='password' name='password'
                                onChange={(e) =>  {
                                    setCurrentPw(e.target.value)
                                    if (e.target.value !== comparePw && comparePw) {
                                        setStatusPw(false)
                                    } else {
                                        setStatusPw(true)
                                    }
                                }}
                                className="input input-bordered w-full" />
                                {
                                    showPass1 ? 
                                    <FontAwesomeIcon icon={faEyeLowVision} className="h-4 -ml-8 cursor-pointer"
                                    onClick={() => setShowPass1(false)}
                                    />
                                    :
                                    <FontAwesomeIcon icon={faEye} className="h-4 -ml-8 cursor-pointer"
                                        onClick={() => setShowPass1(true)}
                                    />
                                }
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label" htmlFor='confirm_password'>
                                <span className="label-text">Konfirmasi Password</span>
                            </label>
                            <div className='flex items-center'>
                                <input  required type={ showPass2 ? "text" : "password" } id="confirm_password"
                                onChange={(e) => {
                                    setComparePw(e.target.value)
                                    if (e.target.value === currentPw) {
                                        setStatusPw(true)
                                    } else {
                                        setStatusPw(false)
                                    }
                                }}
                                name="confirm_password" className="input input-bordered w-full" />
                                {
                                    showPass2 ? 
                                    <FontAwesomeIcon icon={faEyeLowVision} className="h-4 -ml-8 cursor-pointer"
                                    onClick={() => setShowPass2 (false)}
                                    />
                                    :
                                    <FontAwesomeIcon icon={faEye} className="h-4 -ml-8 cursor-pointer"
                                        onClick={() => setShowPass2 (true)}
                                    />
                                }
                                
                            </div>
                            {
                                comparePw && currentPw && !statusPw &&  
                                <label className="label">
                                    <div className="alert p-0 bg-transparent text-sm">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                                            className="stroke-error flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            <span>Password tidak sesuai</span>
                                        </div>
                                    </div>
                                </label> 
                            }
                        </div>
                        <div className="form-control mt-4">
                            {
                                currentPw && comparePw && statusPw ? 
                                <button type="submit" className="btn btn-secondary normal-case font-bold"
                                    onClick={handleSubmit}
                                >Reset</button>
                                :
                                <button type="submit" className="btn btn-disabled normal-case font-bold">Reset</button>
                            }
                        </div>
                    </div>
                }
            </div>
        </>
      )
}

export default ResetPassword