import React, {} from 'react'
import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from './../features/authSlice.js'

export const Navbar = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logoutUser());
    }
    
  return (
    <>
        <div className="navbar bg-primary py-4 px-1 shadow-lg lg:px-20 ">
            <div className="navbar-start">
                <div className="dropdown block lg:hidden">
                    <label tabIndex={0} className="btn btn-ghost btn-circle text-primary-content">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-72">
                        <li><Link to = "/">Homepage</Link></li>
                        <li><Link to = "/">Portfolio</Link></li>
                        <li><Link to = "/">About</Link></li>
                    </ul>
                </div>
                <Link to = "/" className="btn btn-ghost flex normal-case text-xl text-primary-content">Store Name</Link>
            </div>
            <div className="navbar-end ">
                
                {user ? 
                <div>
                    <div className="indicator" >
                        <span className="indicator-item badge-sm badge badge-warning text-warning-content">99</span> 
                        <Link to = "/" className=' text-primary-content'><FontAwesomeIcon icon={faCartShopping} size="xl" /></Link>
                    </div>
                    <div className="dropdown ml-4 dropdown-end">
                        <label tabIndex={0} 
                            className="btn btn-ghost mr-2 normal-case text-primary-content px-4 flex flex-col">
                                <FontAwesomeIcon icon={faUser} size='xl'/>
                                <span className='text-xs'>{user.role === "admin" ? 'Admin' : 'Akun'}</span>
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-neutral rounded-box w-52">
                                <Link to = "/dashboard" className='btn normal-case btn-ghost text-neutral-content'>Profil Saya</Link>
                                <Link to = "/customers/address" className='btn normal-case btn-ghost text-neutral-content'>Alamat Pengiriman</Link>

                            <button 
                            onClick={handleLogout}
                            className='btn normal-case btn-ghost text-neutral-content'>Logout</button>
                        </ul>
                    </div> 
                 </div>   
                :
                <div>
                    <Link to = "/auth/register" className='btn btn-ghost text-base-100 normal-case ml-8 px-4'>Daftar</Link>
                    
                </div>
                }
            </div>
        </div>
        <div className='pb-20 lg:pb-0 relative'>
            <Outlet/>
        </div>
        <div className="btm-nav bg-neutral lg:hidden">
            <button className="text-neutral-content">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            </button>
            <button className="text-neutral-content active">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </button>
            <button className="text-neutral-content">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            </button>
        </div>
        </>
  )
}
