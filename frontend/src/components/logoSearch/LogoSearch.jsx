import React from 'react'
import Logo from '../../assets/logo.png'
// import { UilSearch } from '@iconscout/react-unicons'
import './LogoSearch.css'
import { Link } from 'react-router-dom'
const LogoSearch = () => {
    return (
        <div className="LogoSearch">
            <Link to="/" ><img src={Logo} alt="" /></Link>
            <div className="Search">
                <input type="text" placeholder='Search' />
                <div className="s-icon">
                    Search
                </div>
            </div>
        </div>
    )
}

export default LogoSearch