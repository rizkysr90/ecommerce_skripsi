import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import { loginUser } from '../features/authSlice';
import backToHome from '../media/undraw_back_home_nl-5-c.svg';
import override from '../styles/spinner';

function RegisterValidation() {
    const location = useLocation();
    const dispatch = useDispatch();
    const getUser = location?.state?.user;
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const handleVerify = async () => {
        const payload = getUser;
        payload.otp = otp;
        try {
            setIsLoading(true)
             await axios.post(`${process.env.REACT_APP_API_HOST}/auth/newCust/validation`, payload)
            .then((res) => res.data);
            const obj = {
                email: payload.email,
                password: getUser.password
            };
            dispatch(loginUser(obj))
            setIsLoading(false);
            toast.success('berhasil verifikasi akun');
            setTimeout(() => {
                navigate('/')
            }, 2000);
        } catch (error) {
            setIsLoading(false);
            let errMsg = 'Internal Server Error'
            if (error.response?.status !== 500) {
                errMsg = error.response?.data?.metadata?.msg
            }
            
            toast.error(`Error ${error?.response?.status} - ${errMsg}`);
        }
    }
    const handleResendOtp = async () => {
        const payload = getUser;
        try {
            setIsLoading(true)
            await axios.post(`${process.env.REACT_APP_API_HOST}/auth/refreshOtp/registration`, payload)
            .then((res) => res.data);
            toast.success('Sukses mengirim ulang OTP')
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            let errMsg = 'Internal Server Error'
            if (error.response?.status !== 500) {
                errMsg = error.response?.data?.metadata?.msg
            }
            
            toast.error(`Error ${error?.response?.status} - ${errMsg}`);
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
            {
                getUser ? 
                <div className='shadow-lg flex flex-col px-10 mx-4 lg:mx-0 bg-base-100 py-8 rounded-lg'>
                    <div className='text-lg font-bold text-center'>Verifikasi Pengguna</div>
                    <div className='text-center text-sm'>Kode OTP dikirim ke email 
                        <span className='font-bold text-primary'>
                        {` ${getUser?.email}`}
                        </span>
                    </div>
                    <div className='mt-4'>
                        <input 
                        value={otp}
                        onChange={(e) => {
                            setOtp(e.target.value)
                        }}
                        type='number'
                        required
                        placeholder='Masukkan kode OTP'
                        className='input input-bordered w-full'/>
                    </div>
                    <div className='text-sm text-center mt-4'>Tidak menerima kode OTP ? 
                        <span className='font-bold underline cursor-pointer ml-1'
                            onClick={handleResendOtp}
                        >Kirim ulang</span>
                    </div>
                    {
                        otp ? 
                        <button className='btn btn-primary normal-case mt-4'
                            onClick={handleVerify}
                        >Verifikasi</button>
                        :
                        <button className='btn btn-disabled normal-case mt-4'>Verifikasi</button>
                    }
                </div>
                :
                <div className='flex flex-col'>
                    <div className='w-72'>
                        <img src={backToHome} alt="back"/>
                    </div>
                    <div className='mt-2'>Oops not allowed, please back to home</div>
                    <Link to='/' className='btn normal-case mt-2 btn-primary'>Back to home</Link>
                </div>
            }
        </div>
    </>
  )
}

export default RegisterValidation