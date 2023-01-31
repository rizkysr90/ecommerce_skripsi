import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, reset } from '../features/authSlice'; 
import LoadSpinner from '../components/LoadSpinner';
import { toast, ToastContainer } from 'react-toastify';

import { useState } from 'react';
export default function Register() {
    const [currentPw, setCurrentPw] = useState('');
    const [comparePw, setComparePw] = useState({
        value : "",
        status : true
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isSuccess } = useSelector(
        (state) => state.auth
      ); 
    const [isLoading, setIsLoading] = useState(false);
    const handleFormSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJSON = Object.fromEntries(formData.entries());

        try {
            const res = await axios.post('http://localhost:8080/auth/register/customers', formJSON).then((res) => res.data);
            dispatch(loginUser({email:formJSON.email, password: formJSON.password}));
        } catch (error) {
            setIsLoading(false);
            let errMsg = 'Internal Server Error'
            if (error.response?.status !== 500) {
                errMsg = error.response?.data?.metadata?.msg
            }
            
            toast.error(`Error ${error?.response?.status} - ${errMsg}`, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }
    useEffect(() => {
        if (user || isSuccess) {
            navigate("/");
        }
        dispatch(reset());
    }, [user, isSuccess, dispatch, navigate]);
  return (
    <>
        <LoadSpinner
            isLoading = {isLoading}
        />
        <div className="hero min-h-screen bg-base-200 lg:px-40">
            <ToastContainer/>
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                <h1 className="text-2xl lg:text-5xl font-bold">Daftar Sekarang!</h1>
                <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <form className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
                    onSubmit={handleFormSubmit}
                >
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label" htmlFor='fullname'>
                                <span className="label-text">Nama Lengkap</span>
                            </label>
                            <input required type="text" placeholder="email" name="fullname" id="fullname" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label" htmlFor='email'>
                                <span className="label-text">Email</span>
                            </label>
                            <input required type="text" placeholder="email" id="email" name="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label" htmlFor='password'>
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" id='password' name='password'
                            onChange={(e) => setCurrentPw(e.target.value)}
                            className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label" htmlFor='confirm_password'>
                                <span className="label-text">Konfirmasi Password</span>
                            </label>
                            <input  required type="password" placeholder="konfirmasi password" id="confirm_password"
                            onChange={(e) => {
                                setComparePw({...comparePw, value : e.target.value})
                                if (e.target.value !== currentPw) {
                                    setComparePw({...comparePw, status : false})
                                } else {
                                    setComparePw({...comparePw, status : true})
                                }
                            }}
                            name="confirm_password" className="input input-bordered" />
                            {
                                comparePw.status === false ?  
                                <label className="label">
                                    <div className="alert shadow">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                                            className="stroke-error flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            <span>Password tidak sesuai</span>
                                        </div>
                                    </div>
                                </label> : null
                            }
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Daftar</button>
                        </div>
                        <div>
                        <Link to = "/auth/login" className='btn btn-ghost text-neutral w-full normal-case ml-2 px-4 underline'>Sudah punya akun? masuk disini</Link>
                        </div>
                    </div>
                </form>
            </div>
            </div>
    </>
  )
}
