import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars, faUser} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { logoutUser } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';


export const Drawer = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/')
    }
  return (
    <>
       <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col bg-primary-content">
                {/* <!-- Page content here --> */}
                <div className='flex bg-primary py-4 justify-between px-4 items-center'>
                    <label htmlFor="my-drawer-2"
                         className="btn btn-ghost drawer-button lg:hidden text-primary-content">
                        <FontAwesomeIcon icon={faBars} size='xl'/>
                    </label>
                    <div className='p-2 rounded text-lg text-secondary-content bg-secondary font-bold'>Admin Dashboard</div>
                    {user ? 
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} 
                            className="btn btn-ghost normal-case text-primary-content flex flex-col">
                                <FontAwesomeIcon icon={faUser} size='xl'/>
                                <span className='text-xs'>
                                    {user.role === "admin" || user.role === "superadmin" ? 'Admin' : 'Akun'}
                                </span>
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-neutral rounded-box w-52">
                            <Link to = "/" className='btn normal-case btn-ghost text-neutral-content'>Lihat Toko</Link>
                            <button 
                            onClick={handleLogout}
                            className='btn normal-case btn-ghost text-neutral-content'>Logout</button>
                        </ul>
                    </div> 
                    : 
                    <Link to = "/auth/login" className='btn normal-case ml-8 px-4'>Login</Link>
                    }
                </div>
                
            </div> 
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
                <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                {/* <!-- Sidebar content here --> */}
                <li><a>Sidebar Item 1</a></li>
                <li><a>Sidebar Item 2</a></li>
                </ul>
            
            </div>
            </div>
    </>
  )
}
