import NavBar from "./NavBar"
import Header from "./Header";
import PostFeed from "./PostFeed";
import PostCard from "./PostCard"
import Footer from "./Footer";
import { useState } from "react";

function HomePage(props) {
    const navLinksArray = [
        { name: "Create Post", url: "post-creation.html" },
        { name: "Filter Posts", url: "filter.html" },
        { name: "Collections", url: "collections.html" }
    ];
    const headerText = "Share your career switching journey to inspire and get inspired. Start now"
    const [postArray, setPostArray] = useState([]);
    
    return (
        <>
            <NavBar navLinks={navLinksArray} />
            <Header summary={headerText} />
            <PostFeed />
            <Footer />
        </>
    );
}

export default HomePage;