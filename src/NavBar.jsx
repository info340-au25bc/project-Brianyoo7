function NavBar(props) {
    return (
        <nav>
            <img src="images/app-logo.jpg" alt="Blogging App Logo" />
            <ul>
                <li><a href="post-creation.html">Create Post</a></li>
                <li><a href="filter.html">Filter Posts</a></li>
                <li><a href="collections.html">Collections</a></li>
            </ul>
        </nav>
    );
}

export default NavBar;