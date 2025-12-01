import HomePage from "./HomePage";
import PostCardFullView from './PostCardFullView';
import PostCreation from './PostCreation';
import LikedPage from './LikedPage';
import CollectionsMain from "./Collections";
import { useState } from "react";
import { Routes, Route, useParams } from 'react-router'
import ViewCollection from "./ViewCollection";
import Filter from './Filter';

function App(props) {
    
    // postData = [{id, title, image, alt, description, Career Type, Transition Type}]
    const [postData, setPostData] = useState([]);
    const [postId, setPostId] = useState(0);
    const [likedPostData, setlikedPostData] = useState([]);

    return (
        <Routes>
          <Route path="/" element={<HomePage postArray={postData} />} />
          <Route path="/postcreation/:id?" element={<PostCreation 
                                                    postId={postId}
                                                    postData={postData}
                                                    setPostId={setPostId}
                                                    setPostData={setPostData} />} />
          <Route path="/postview/:id" element={<PostCardFullViewWrapper
                                                    postArray={postData}
                                                    likedPostData={likedPostData}
                                                    setlikedPostData={setlikedPostData}
                                                    setPostData={setPostData} />} />
          <Route path="/likedpage" element={<LikedPage 
                                                    likedPostData={likedPostData}
                                                    setlikedPostData={setlikedPostData} />}/>
          <Route path="/collections" element={<CollectionsMain />} />
          <Route path="/viewcollection" element={<ViewCollection />} />
          <Route path="/filter" element={<Filter />} />
        </Routes>
    );
}

// helper function for the postview page, don't touch this!
function PostCardFullViewWrapper( {postArray, likedPostData, setlikedPostData, setPostData} ) {
  const idSelected = parseInt(useParams().id);
  const selectedPostData = postArray.find((post) => {
    return post.id === idSelected;
  });
  return <PostCardFullView selectedPostData={selectedPostData}
                           likedPosts={likedPostData}
                           setlikedPostData={setlikedPostData}
                           postArray={postArray}
                           setPostsData={setPostData} />
}

export default App;