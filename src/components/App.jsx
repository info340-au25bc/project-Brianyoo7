import HomePage from "./HomePage";
import PostCardFullView from './PostCardFullView';
import PostCreation from './PostCreation';
import LikedPage from './LikedPage';
import CollectionsMain from "./Collections";
import { useState } from "react";
import { Routes, Route, useParams } from 'react-router'
import ViewCollection from "./ViewCollection";

function App(props) {
    const postData = [
        {
          id: 1,
          title: "My Success Story: Going From Sales to SWE",
          image: "/images/software-engineer-career.jpg",
          alt: "software engineer career switch",
          description: "I have made it"
        },
        {
          id: 2,
          title: "My Success Story: Going From SWE to Doctor",
          image: "/images/doctor-career.jpg",
          alt: "medical doctor career switch",
          description: "I have made it"
        },
        {
          id: 3,
          title: "My Success Story: Going From Doctor to Astronaut",
          image: "/images/astronaut-career.jpg",
          alt: "astronaut career switch",
          description: "I have made it"
        },
        {
          id: 4,
          title: "My Success Story: Going From Doctor to Engineer",
          image: "/images/engineer-career.jpg",
          alt: "engineer career switch",
          description: "I have made it"
        },
        {
          id: 5,
          title: "My Success Story: Going From Engineer to Actor",
          image: "/images/actor-career.gif",
          alt: "actor career switch",
          description: "I have made it"
        },
        {
          id: 6,
          title: "My Success Story: Going From Actor to Talk Show Host",
          image: "/images/talk-show-host-career.jpg",
          alt: "talk show host career switch",
          description: "I have made it"
        }
      ];
    
    const [likedPostData, setlikedPostData] = useState([]);

    return (
        <Routes>
          <Route path="/" element={<HomePage postArray={postData} />} />
          <Route path="/postcreation" element={<PostCreation />} />
          <Route path="/postview/:id" element={<PostCardFullViewWrapper postArray={postData} likedPostData={likedPostData} setlikedPostData={setlikedPostData}/>} />
          <Route path="/likedpage" element={<LikedPage likedPostData={likedPostData} setlikedPostData={setlikedPostData} />}/>
          <Route path="/collections" element={<CollectionsMain />} />
          <Route path="/viewcollection" element={<ViewCollection />} />
        </Routes>
    );
}

// helper function for the postview page, don't touch this!
function PostCardFullViewWrapper( {postArray, likedPostData, setlikedPostData} ) {
  const idSelected = parseInt(useParams().id);
  const selectedPostData = postArray.find((post) => {
    return post.id === idSelected;
  });
  return <PostCardFullView postData={selectedPostData} likedPosts={likedPostData} setlikedPostData={setlikedPostData} />
}

export default App;