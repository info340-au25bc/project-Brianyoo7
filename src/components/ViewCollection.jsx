import React from 'react';
import Header from 'Header';
import Footer from 'Footer';
import NavBar from 'NavBar';
import { Link, useParams } from 'react-router';


function ViewCollection(props) {
    const { id } = useParams();

    return(
        <>
            <NavBar />
            <Header />
            <section className="main-feed">
                <Link to="/collections"><button className="collection-button">Back</button></Link>
                <button className="collection-button">Edit</button>
                <div className="collection-layout">
                    
                    <div className="collection-post">
                        <div className="post-image-container">
                            <img className="post-image" src="images/astronaut-career.jpg" alt="astronaut career switch"/>
                        </div>
                        <p className="post-title"><a href="post-card.html">My Success Story: Going From Doctor to Astronaut</a></p>
                        <button className="collection-button">&#8593</button>
                        <button className="collection-button">&#8595</button>
                        <button className="collection-button">Remove</button>
                        <button className="collection-button">Move to ...</button>
                    </div>

                    <div className="collection-post">
                        <div className="post-image-container">
                            <img className="post-image" src="images/doctor-career.jpg" alt="medical doctor career switch"></img>
                        </div>
                        <p className="post-title">My Success Story: Going From SWE to Doctor</p>
                        <button className="collection-button">&#8593</button>
                        <button className="collection-button">&#8595</button>
                        <button className="collection-button">Remove</button>
                        <button className="collection-button">Move to ...</button>
                    </div>

                    <div className="collection-post">
                        <div className="post-image-container">
                            <img className="post-image" src="images/software-engineer-career.jpg" alt="software engineer career switch"/>
                        </div>
                        <p className="post-title">My Success Story: Going From Sales to SWE</p>
                        <button className="collection-button">&#8593</button>
                        <button className="collection-button">&#8595</button>
                        <button className="collection-button">Remove</button>
                        <button className="collection-button">Move to ...</button>
                    </div>

                    <div className="collection-post">
                        <div className="post-image-container">
                            <img className="post-image" src="images/engineer-career.jpg" alt="engineer career switch"/>
                        </div>
                        <p className="post-title">My Success Story: Going From Doctor to Engineer</p>
                        <button className="collection-button">&#8593</button>
                        <button className="collection-button">&#8595</button>
                        <button className="collection-button">Remove</button>
                        <button className="collection-button">Move to ...</button>
                    </div>

                    <div className="collection-post">
                        <div className="post-image-container">
                            <img className="post-image" src="images/actor-career.gif" alt="actor career switch"/>
                        </div>
                        <p className="post-title">My Success Story: Going From Engineer to Actor</p>
                        <button className="collection-button">&#8593</button>
                        <button className="collection-button">&#8595</button>
                        <button className="collection-button">Remove</button>
                        <button className="collection-button">Move to ...</button>
                    </div>

                    <div className="collection-post">
                        <div className="post-image-container">
                            <img className="post-image" src="images/talk-show-host-career.jpg" alt="talk show host career switch"/>
                        </div>
                        <p className="post-title">My Success Story: Going From Actor to Talk Show Host</p>
                        <button className="collection-button">&#8593</button>
                        <button className="collection-button">&#8595</button>
                        <button className="collection-button">Remove</button>
                        <button className="collection-button">Move to ...</button>
                    </div>

                </div>
            </section>
            <Footer />
        </>
    );
}
        
export default ViewCollection();