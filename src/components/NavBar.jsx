import { Link } from "react-router-dom"
import { Hamburger } from "./Hamburger";

function NavBar(props) {
    const navLinks = props.navLinks;

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
            <div className="hamburger">
                <Hamburger />
            </div>
        </nav>
    );
}

export default NavBar;