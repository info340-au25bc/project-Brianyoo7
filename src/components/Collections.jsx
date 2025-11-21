import React from 'react';

const collectionsHeader  = 
<header className="base-header-style">
    <h1> Collections</h1>
</header>;

const collectionsMain = 
<section className="main-feed">
    <button>New Collection</button>
    <div className="collection-layout">
                
        <div className="collection-post">
            <div className="post-image-container">
                <img className="post-image" src="images/software-engineer-career.jpg" alt="Man pointing at a computer screen with code on it"></img>
            </div>
            <p className="post-title"><a href="viewcollection.html">Frontend Roadmap</a></p>
            <button>Edit</button>
        </div>

        <div className="collection-post">
            <div class="post-image-container">
                <img className="post-image" src="images/doctor-career.jpg" alt="medical doctor career switch"></img>
            </div>
            <p className="post-title">USA</p>
            <button>Edit</button>
        </div>

        <div class="collection-post">
            <div class="post-image-container">
                <img className="post-image" src="images/talk-show-host-career.jpg" alt="Woman speaking into a microphone"></img>
            </div>
            <p className="post-title"><a href="post-card.html">Interview Prep</a></p>
            <button>Edit</button>
        </div>
             
    </div>
</section>;

const collectionsFooter = 
<footer>
  <p class="author"> &copy; 2025 Lunjia Dai, Tresan Alcorta, Rui Wang, Brian Yoo. All rights reserved. </p>
  <span>Email:</span> <address><a href="mailto:lunjia@uw.edu">lunjia@uw.edu</a><a href="mailto:tresan33@uw.edu">, tresan33@uw.edu</a></address>
</footer>;
