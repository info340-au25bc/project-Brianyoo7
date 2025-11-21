import { useState } from 'react';
import HomePage from "./HomePage";
import LikedPage from "./LikedPage";
import POSTS_DATA from "./data/postsData";

function App(props) {
    const [likedPosts, setLikedPosts] = useState([
        POSTS_DATA[0],
        POSTS_DATA[1]
    ]);

    // remove a post from liked
    function handleUnlike(postId) {
        const confirmed = window.confirm('Remove this post from your liked posts?');
        if (confirmed) {
            setLikedPosts(likedPosts.filter(function(post) {
                return post.id !== postId;
            }));
        }
    }

    return (
        <LikedPage 
            likedPosts={likedPosts}
            onUnlike={handleUnlike}
        />
    );
}

export default App;