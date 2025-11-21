import NavBar from "./NavBar"
import Header from "./Header";
import PostFeed from "./PostFeed";
import Footer from "./Footer";

function HomePage(props) {
    const navLinksArray = [
        { name: "Create Post", url: "post-creation.html" },
        { name: "Filter Posts", url: "filter.html" },
        { name: "Collections", url: "collections.html" }
    ];
    const headerText = "Share your career switching journey to inspire and get inspired. Start now"
    
    return (
        <>
            <NavBar navLinks={navLinksArray} />
            <Header summary={headerText} />
            <PostFeed postArray={props.postArray} />
            <Footer />
        </>
    );
}

export default HomePage;