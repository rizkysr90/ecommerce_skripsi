import React, {} from 'react'
import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleDown, faArrowDown, faArrowRight, faBoxesStacked, faCaretDown, faCartShopping, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from './../features/authSlice.js'
import useSWR  from 'swr';
import axios from 'axios';
import Cart from './Cart.jsx';

export const Navbar = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const fetchCategories = async (url) => await axios.get(url).then((res) => res.data.data);
    const {data : categories} = useSWR(`${process.env.REACT_APP_API_HOST}/productCategories`, fetchCategories);
    console.log(categories);
    const handleLogout = () => {
        dispatch(logoutUser());
    }
    
  return (
    <>
        <div className="navbar bg-primary py-2 px-1 shadow-lg lg:px-20 ">
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
                <Link to = "/" className="btn btn-secondary normal-case ">Store Name</Link>
                <div className='ml-4 dropdown '>
                    <div className='btn btn-ghost normal-case flex items-center'
                        tabIndex={0}
                    >
                        <FontAwesomeIcon 
                        icon={faBoxesStacked} className=""/>
                        <span className='ml-1'>Kategori</span>
                        <FontAwesomeIcon icon={faCaretDown} className="ml-2"/>
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        {
                            categories?.map((data) => {
                                return (
                                    <Link 
                                    className=' rounded-lg p-2 btn-ghost normal-case flex justify-between items-center '
                                    key={data?.id}>
                                        {data?.name}
                                        <FontAwesomeIcon icon={faArrowRight} className="text-sm"/>
                                    </Link>
                                )
                            })
                        }
                    </ul>

                </div>
             
            </div>
            <div className="navbar-center w-5/12">
                <div className='  w-full'>
                    <input 
                    placeholder='Cari produk'
                    className='input input-sm w-full rounded-lg'
                    type="text"/>
                </div>
                <FontAwesomeIcon 
                className='-ml-7 cursor-pointer hover:text-secondary'
                icon={faSearch}/>
            </div>
            <div className="navbar-end ">
                
                {user ? 
                <div>
                    <Cart/>
                    <div className="dropdown ml-4 dropdown-end">
                        <label tabIndex={0} 
                            className="btn btn-ghost mr-2 normal-case text-primary-content px-4 flex flex-col">
                                <FontAwesomeIcon icon={faUser} size='xl'/>
                                <span className='text-xs'>Akun</span>
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-neutral rounded-box w-52">
                                <Link to = "/dashboard" className='btn normal-case btn-ghost text-neutral-content'>Profil Saya</Link>
                                <Link to = "/customers/address" className='btn normal-case btn-ghost text-neutral-content'>Alamat Pengiriman</Link>
                                <Link to = "/customers/myorders" className='btn normal-case btn-ghost text-neutral-content'>Pesanan Saya</Link>
                            <button 
                            onClick={handleLogout}
                            className='btn normal-case btn-ghost text-neutral-content'>Logout</button>
                        </ul>
                    </div> 
                 </div>   
                :
                <div>
                    <Link to = "/auth/login" className='btn btn-secondary btn-outline bg-secondary-content btn-sm normal-case ml-8'>Masuk</Link>

                    <Link to = "/auth/register" className='btn btn-secondary btn-sm normal-case ml-3'>Daftar</Link>
                    
                </div>
                }
            </div>
        </div>
        <div className='pb-20 lg:pb-0 relative bg-base-200 min-h-screen'>
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
