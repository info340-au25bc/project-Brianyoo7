import HomePage from "./HomePage";
import { Routes, Route } from 'react-router' 
import PostCardFullView from './PostCardFullView';
import PostCreation from './PostCreation';
import LikedPage from './LikedPage';

function App(props) {
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
        <Routes>
          <Route path="/" element={<HomePage postArray={postData} />} />
          <Route path="/postcreation" element={<PostCreation />} />
          <Route path="/postview/:id" element={<PostCardFullView />} />
          <Route path="/likedpage" element={<LikedPage />}/>
        </Routes>
    );
}

export default App;