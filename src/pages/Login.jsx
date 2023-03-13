import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, reset } from "../features/authSlice";
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import override from '../styles/spinner';
import {  ToastContainer } from 'react-toastify';
import imageContent from '../media/undraw_shopping_app_flsj.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeLowVision } from '@fortawesome/free-solid-svg-icons';

export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPass1, setShowPass1] = useState(false);
    const [currentPw, setCurrentPw] = useState('');

    const { user, isError, isSuccess, isLoading, message } = useSelector(
        (state) => state.auth
      );
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const obj = {
            email: formData.get("email"),
            password: formData.get("password"),
        };
        dispatch(loginUser(obj))
    }
    
    useEffect(() => {
        if (user || isSuccess) {
            navigate("/");
        }
        dispatch(reset());
    }, [user, isSuccess, dispatch, navigate]);
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
            <div className="min-h-screen flex bg-base-200 justify-center items-center">
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
                <div className="flex flex-col lg:flex-row  w-full items-center justify-center mx-8 lg:mx-0">
                    <div className="text-center mr-14 hidden lg:flex flex-col items-center justify-center ">
                        <div className=''>
                            <img src={imageContent} 
                            className="w-96"
                            alt="banner logo pendaftaran"/>
                        </div>
                        <p className="font-bold text-lg mt-8">Belanja lebih mudah, hanya di Store Name</p>
                    </div>
                    <form className=" basis-6/12 shadow-lg w-full max-w-sm shadow-lg rounded-lg bg-base-100"
                        onSubmit={handleFormSubmit}
                    >
                        <div className="flex flex-col px-4 lg:px-10 py-4">
                            <div className='font-bold text-2xl text-center'>Daftar Sekarang</div>
                            <div className='text-center text-sm'>Belum punya akun? <Link to = "/auth/register" 
                            className='text-primary underline'>Daftar</Link></div>
                            <div className="form-control">
                                <label className="label" htmlFor='email'>
                                    <span className="label-text">Email</span>
                                </label>
                                <input required type="text" placeholder="email@gmail.com" id="email" name="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label" htmlFor='password'>
                                    <span className="label-text">Password</span>
                                </label>
                                <div className='flex items-center'>
                                    <input type={ showPass1 ? 'text' : 'password'  }  id='password' name='password'
                                    onChange={(e) =>  {
                                        setCurrentPw(e.target.value)
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
                            {
                                isError &&
                                <div className="alert text-sm alert-warning p-1  mt-2  bg-transparent">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                        <span>{message}</span>
                                    </div>
                                </div>
                            }
                            <div className="form-control mt-4">
                                {
                                    currentPw ? 
                                    <button type="submit" className="btn btn-secondary normal-case font-bold">Masuk</button>
                                    :
                                    <button type="submit" className="btn btn-disabled normal-case font-bold">Masuk</button>
                                }
                                <Link to={'/auth/forgot-password'}
                                className='btn btn-ghost normal-case mt-2 font-bold'>Lupa Password ?</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
      )
}
