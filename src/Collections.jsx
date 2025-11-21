import React from 'react';
import Header from 'Header';
import Footer from 'Footer';

// should take an array of collections objets
// collections should contain an array of post objects
// display collections cards
// display 
function collectionsMain(props) {
    return(
    <section className="main-feed">
        <button>New Collection</button>
        <div className="collection-layout">
                    
            <div className="collection-post">
                <div className="post-image-container">
                    <img className="post-image" src="images/software-engineer-career.jpg" alt="Man pointing at a computer screen with code on it"/>
                </div>
                <p className="post-title"><a href="viewcollection.html">Frontend Roadmap</a></p>
                <button>Edit</button>
            </div>

            <div className="collection-post">
                <div className="post-image-container">
                    <img className="post-image" src="images/doctor-career.jpg" alt="medical doctor career switch"/>
                </div>
                <p className="post-title">USA</p>
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
    );
}

export default collectionsMain;