import React, { useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faArrowRight, faBars, faBoxesStacked, faCaretDown,  faSearch, faShoppingBag, faUser } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from './../features/authSlice.js'
import useSWR  from 'swr';
import axios from 'axios';
import Cart from './Cart.jsx';

export const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const fetchCategories = async (url) => await axios.get(url).then((res) => res.data.data);
    const {data : categories} = useSWR(`${process.env.REACT_APP_API_HOST}/productCategories`, fetchCategories);
    const handleLogout = () => {
        dispatch(logoutUser());
    }
    const [search, setSearch] = useState('');
    const handleSearch = (e) => {
        e.preventDefault();
        navigate({
            pathname : `/search`,
            search: `?keyword=${search}`
        })
        setSearch('');
    }
  return (
    <>
        <div className="navbar bg-primary fixed top-0 z-50 py-2 px-1  lg:px-20 ">
            <div className="navbar-start w-auto md:w-1/2">
                <Link to = "/" className="btn hidden md:flex btn-secondary normal-case ">Store Name</Link>
                <div className='ml-0  md:ml-4 dropdown p-0'>
                    <div className='btn btn-ghost 
                    normal-case flex flex-row items-center justify-center
                    '
                        tabIndex={0}
                    >
                        <FontAwesomeIcon 
                        icon={faBoxesStacked} className="hidden md:block"/>
                        <FontAwesomeIcon icon={faBars} className="block md:hidden h-6"/>
                        <span className='ml-1 hidden md:block'>Kategori</span>
                        <FontAwesomeIcon icon={faCaretDown} className="ml-2 hidden md:block"/>
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        {
                            categories?.map((data) => {
                                return (
                                    <Link 
                                    to={`/category/${data.name}/${data.id}`} 
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
            <div className="navbar-center grow md:w-5/12">
                <form className='w-full'
                    onSubmit={(e) => handleSearch(e)}
                >
                    <input 
                    value={search}
                    placeholder='Cari produk'
                    className='input input-sm w-full rounded-lg'
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                    type="text"/>
                    <button type='submit'>
                        <FontAwesomeIcon 
                        className='-ml-7 cursor-pointer hover:text-secondary'
                        icon={faSearch}/>
                    </button>
                </form>
            </div>
            <div className="navbar-end  w-auto md:w-1/2">
                
                {user ? 
                <div className='flex items-center'>
                    <Cart/>
                    <div className="dropdown hidden md:flex dropdown-end">
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
                <div className='flex '>
                    <Link to = "/auth/login" className='btn hidden md:flex btn-secondary btn-outline bg-secondary-content btn-sm normal-case ml-8'>Masuk</Link>
                    <Link to = "/auth/login" className='btn flex md:hidden btn-secondary mr-4 btn-sm rounded-lg normal-case ml-8'>Masuk</Link>
                    <Link to = "/auth/register" className='btn hidden md:flex btn-secondary btn-sm normal-case ml-3'>Daftar</Link>
                    
                </div>
                }
            </div>
        </div>
        <div className='pb-20 lg:pb-0 relative bg-base-200 bg-secondary min-h-screen'>
            <Outlet
                context={{categories, search}}
            />
        </div>
        {/* {
            (location.pathname === '/' || location.pathname === '/customers/setting') &&
        } */}
            <div className="btm-nav border border-base-200 fixed inset-x-0 bottom-0 z-50 bg-base-100 lg:hidden">
                <NavLink className="hover:bg-base-200" to={'/'}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                    <div className='text-sm'>Beranda</div>
                </NavLink>
                <NavLink className="hover:bg-base-200" to="/tes">
                    <FontAwesomeIcon icon={faShoppingBag} className=""/>
                    <div className='text-sm'>My Order</div>
                </NavLink>
                <NavLink to="/customers/setting" className="hover:bg-base-200">
                    <FontAwesomeIcon icon={faUser}/>
                    <div className='text-sm'>Akun</div>
            </NavLink>
            </div>
      
        </>
  )
}
