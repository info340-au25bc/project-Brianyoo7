function NavBar(props) {
    const navLinks = props.navLinks;

    return (
        <nav>
            <img src="images/app-logo.jpg" alt="Blogging App Logo" />
            <ul>
                {
                    navLinks.map((navObj, index) => {
                        return <li key={index}><a href={navObj.url}>{navObj.name}</a></li>
                    })
                }
            </ul>
        </nav>
    );
}

export default NavBar;