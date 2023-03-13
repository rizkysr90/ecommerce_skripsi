import React from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

function Cart() {
    const fetchCart = async (url) => await axios.get(url).then((res) => res.data.data);
    const {data : cart} = useSWR(`${process.env.REACT_APP_API_HOST}/carts/count`, fetchCart);
    return (
        <>
            <div className="indicator" >
                <span className="indicator-item badge-sm badge badge-warning text-warning-content">{cart?.totalProductInCart}</span> 
                <Link to = "/cart" className=' text-primary-content'><FontAwesomeIcon icon={faCartShopping} size="xl" /></Link>
            </div>
        </>
    )
}

export default Cart