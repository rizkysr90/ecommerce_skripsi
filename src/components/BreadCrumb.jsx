import React from 'react'
import { Link } from 'react-router-dom'

function BreadCrumb(props) {
  return (
    <div className="text-sm breadcrumbs">
        <ul>
            <li><Link to={'/'}>Home</Link></li> 
            <li><Link to={'/products'}>Produk</Link></li> 
            <li>{props.name}</li>
        </ul>
    </div>
  )
}

export default BreadCrumb