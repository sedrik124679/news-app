import React from 'react';
import {Link, NavLink} from "react-router-dom";
import './Navbar.css'
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer";

const Navbar = () => {

    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.currentUser)
    const role = useSelector(state => state.user.currentUser.role)
    console.log(user)

    return (
        <nav>
            <div className="nav-wrapper purple">
                <Link to="/" className="brand-logo">News</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink style={({ isActive }) => ({ backgroundColor: isActive ? 'green' : null })} to='/'>Home</NavLink></li>
                    <li><NavLink style={({ isActive }) => ({ backgroundColor: isActive ? 'green' : null })} to='/news'>News</NavLink></li>
                    <li>
                    {!isAuth
                        ? <NavLink style={({ isActive }) => ({ backgroundColor: isActive ? 'green' : null })} to='/authorization'>Authorize</NavLink>
                        : <NavLink style={({ isActive }) => ({ backgroundColor: isActive ? 'green' : null })} to='/authorization' onClick={() => dispatch(logout())}>Exit</NavLink>
                    }
                    </li>
                    {role === 'Admin'
                        ? <li><NavLink style={({ isActive }) => ({ backgroundColor: isActive ? 'green' : null })} to='/add'>Add news</NavLink></li>
                        : null
                    }
                    <li style={{'height': '64px'}}>
                        <div className="input-field">
                            <input id="search" type="search" required />
                                <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                                <i className="material-icons">close</i>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>

    );
};

export default Navbar;