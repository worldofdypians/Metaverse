import React from "react";
import { NavLink } from "react-router-dom";
import './_header.scss'
import metaverse from '../../assets/navbarAssets/metaverse.svg'


const Header = ({handleRegister})=>{
    return (
        <div className="d-none d-lg-flex mx-5 navbar-wrapper py-4">
            <div className="row mx-0 w-100">
                <div className="col-3 d-flex align-items-center justify-content-start ps-0">
                    <NavLink to='/'>
                    <img src={metaverse} alt="metaverse" />
                    </NavLink>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-around">
                    <div className="nav-anchor font-poppins">Explore</div>
                    <div className="nav-anchor font-poppins">Marketplace</div>
                    <div className="nav-anchor font-poppins">Roadmap</div>
                    <div className="nav-anchor font-poppins">News</div>
                </div>
                <div className="col-3 d-flex align-items-center justify-content-end gap-4 pe-0">
                    <div className="linear-border">
                    <button className="btn outline-btn px-5">Log In</button>
                    </div>
                    <div className="linear-border">
                    <button className="btn filled-btn px-5" onClick={handleRegister}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    )
    }
export default Header