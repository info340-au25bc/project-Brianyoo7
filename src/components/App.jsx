import { useState } from 'react';
import HomePage from "./HomePage";
// import LikedPage from "./LikedPage";
// import POSTS_DATA from "../data/postsData";

function App(props) {
    // const [likedPosts, setLikedPosts] = useState([
    //     POSTS_DATA[0],
    //     POSTS_DATA[1]
    // ]);

    // // remove a post from liked
    // function handleUnlike(postId) {
    //     const confirmed = window.confirm('Remove this post from your liked posts?');
    //     if (confirmed) {
    //         setLikedPosts(likedPosts.filter(function(post) {
    //             return post.id !== postId;
    //         }));
    //     }
    // }
    const postData = [
        {
          id: 1,
          title: "My Success Story: Going From Sales to SWE",
          image: "images/software-engineer-career.jpg",
          alt: "software engineer career switch"
        },
        {
          id: 2,
          title: "My Success Story: Going From SWE to Doctor",
          image: "images/doctor-career.jpg",
          alt: "medical doctor career switch"
        },
        {
          id: 3,
          title: "My Success Story: Going From Doctor to Astronaut",
          image: "images/astronaut-career.jpg",
          alt: "astronaut career switch"
        },
        {
          id: 4,
          title: "My Success Story: Going From Doctor to Engineer",
          image: "images/engineer-career.jpg",
          alt: "engineer career switch"
        },
        {
          id: 5,
          title: "My Success Story: Going From Engineer to Actor",
          image: "images/actor-career.gif",
          alt: "actor career switch"
        },
        {
          id: 6,
          title: "My Success Story: Going From Actor to Talk Show Host",
          image: "images/talk-show-host-career.jpg",
          alt: "talk show host career switch"
        }
      ];

    return (
        <>
            <HomePage postArray={postData} />
            {/* <LikedPage 
                likedPosts={likedPosts}
                onUnlike={handleUnlike}
            /> */}
        </>
    );
}

export default App;