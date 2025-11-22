import React from 'react';
import Header from './Header';
import Footer from './Footer';
import NavBar from './NavBar';
import { Link } from 'react-router';

function CollectionsMain() {
    const navLinksArray = [
        { name: "Create Post", url: "/postcreation" },
        { name: "Filter Posts", url: "/filter" },
        { name: "Collections", url: "/collections" }, 
        { name: "Liked Pages", url: "/likedpage"},
        { name: "Home", url: "/"}
    ];
    const headerText = "My Collections"
    return(
    <>
        <NavBar navLinks={navLinksArray}/>
        <Header summary={headerText}/>
        <section className="main-feed">
            <button>New Collection</button>
            <div className="collection-layout">
                        
                <div className="collection-post">
                    <div className="post-image-container">
                        <img className="post-image" src="images/software-engineer-career.jpg" alt="Man pointing at a computer screen with code on it"/>
                    </div>
                    <p className="post-title"><Link to="/viewcollection">Career Switches</Link></p>
                    <button>Edit</button>
                </div>

                <div className="collection-post">
                    <div className="post-image-container">
                        <img className="post-image" src="images/doctor-career.jpg" alt="medical doctor career switch"/>
                    </div>
                    <p className="post-title">
                        <Link to="/collections/2">USA</Link>
                    </p>
                    <button>Edit</button>
                </div>

                <div className="collection-post">
                    <div className="post-image-container">
                        <img className="post-image" src="images/talk-show-host-career.jpg" alt="Woman speaking into a microphone"/>
                    </div>
                    <p className="post-title"><a href="post-card.html">Interview Prep</a></p>
                    <button>Edit</button>
                </div>
                    
            </div>
        </section>
        <Footer />
    </>
    );
}

export default CollectionsMain;