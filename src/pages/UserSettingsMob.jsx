import { faArrowRight, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../features/authSlice'

function UserSettingsMob() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [navigate, user])
    return (
        <>
            <div className='pt-20 mx-3 md:mx-14'>
                {
                    user &&
                    <div className='flex flex-col bg-base-100'>
                        <div className='text-center text-lg font-bold my-4'>Pengaturan Akun</div>
                        <Link className='btn rounded-none text-left btn-ghost normal-case flex justify-between items-center'
                            to={'/customers/address'}
                        >
                            Alamat Pengiriman
                            <FontAwesomeIcon icon={faArrowRight}/>
                        </Link>
                        <button className='btn rounded-none btn-ghost flex normal-case justify-between items-center'
                            onClick={() => dispatch(logoutUser())}
                        >
                            Logout
                            <FontAwesomeIcon icon={faRightFromBracket}/>
                        </button>

                    </div>
                }
            </div>
        </>
    )
}

export default UserSettingsMob