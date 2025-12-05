import { useState } from 'react';
import { Link } from "react-router-dom"
import  Hamburger  from "./Hamburger";

function NavBar(props) {
    const navLinks = props.navLinks;

    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const toggleHamburger = () => setHamburgerOpen(!hamburgerOpen);

    return (
        <nav>
            <img src="/images/app-logo.jpg" alt="Blogging App Logo" />
            <ul>
                {
                    navLinks.map((navObj, index) => {
                        return <li key={index}><Link to={navObj.url}>{navObj.name}</Link></li>
                    })
                }
            </ul>
                <Hamburger toggleHamburger={toggleHamburger} isOpen={hamburgerOpen}/> 
                {hamburgerOpen && (
                    <ul className='dropdown-links'>
                        {navLinks.map((navObj, index) => (
                            <li key={index}><Link to={navObj.url}>{navObj.name}</Link></li>
                        ))}
                        
                    </ul>
                )}  
        </nav>
    );
}

export default NavBar;