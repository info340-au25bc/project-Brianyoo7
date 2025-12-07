import { useState, useEffect } from "react";
import { Routes, Route, useParams } from 'react-router'
import { getDatabase, ref, onValue } from 'firebase/database';
import HomePage from "./HomePage";
import PostCardFullView from './PostCardFullView';
import PostCreation from './PostCreation';
import LikedPage from './LikedPage';
import CollectionsMain from "./Collections";
import ViewCollection from "./ViewCollection";
import CollectionCreation from './CollectionCreation';
import CollectionEdit from "./CollectionEdit";
import Filter from './Filter';

function App(props) {

    // collectionData = [{id, title, image, alt, description, posts[]}]
    // postData = [{id, title, image, alt, description, Career Type, Transition Type}]

    // set up states
    const [postData, setPostData] = useState([]);
    const [postId, setPostId] = useState(0);
    const [likedPostData, setlikedPostData] = useState([]);
    const [collectionsData, setCollectionsData] = useState([]);

    // use firebase to manage post data
    useEffect(() => {
      const db = getDatabase();
      const postRef = ref(db, "posts");

      const unregisterFunction = onValue(postRef, (snapshot) => {
        const postDataJson = snapshot.val();

        if (postDataJson) {
          const currentPostData = Object.keys(postDataJson).map((key) => {
                                    return {...postDataJson[key], id : key}
                                  })
          setPostData(currentPostData);
        }
        else {
          setPostData([]);
        }
      })

      function cleanup() {
        unregisterFunction();
      }
      return cleanup;
    }, []);


    // use firebase to manage liked post data
    useEffect(() => {
      const db = getDatabase();
      const likepostRef = ref(db, "likedPosts");

      const unregisterFunction = onValue(likepostRef, (snapshot) => {
        const likepostDataJson = snapshot.val();

        if (likepostDataJson) {
          const currentlikePostData = Object.keys(likepostDataJson).map((key) => {
                                    return {...likepostDataJson[key], id : key}
                                  })
          setlikedPostData(currentlikePostData);
        }
        else {
          setlikedPostData([]);
        }
      })

      function cleanup() {
        unregisterFunction();
      }
      return cleanup;
    }, [])

    useEffect(() => {
      const db = getDatabase();
      const collectionsRef = ref(db, "collections");

      const unregisterFunction = onValue(collectionsRef, (snapshot) => {
        const collectionsJson = snapshot.val();

        if (collectionsJson) {
          const currentCollections = Object.keys(collectionsJson).map((key) => {
            return { ...collectionsJson[key], id: key};
          });
          setCollectionsData(currentCollections);
        } else {
          setCollectionsData([]);
        }
      });
      return () => unregisterFunction();
    }, []);

    return (
        <Routes>
          <Route path="/" element={<HomePage postArray={postData} collectionsData={collectionsData}/>} />
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
          <Route path="/collections" element={<CollectionsMain
                                                    collectionsData={collectionsData}/>} />
          <Route path="/newcollection" element={<CollectionCreation 
                                                    postArray={postData}
                                                    likedPostData={likedPostData}
                                                    setlikedPostData={setlikedPostData}/>} />
          <Route path="/viewcollection/:id" element={<ViewCollection 
                                                    collectionsData={collectionsData}
                                                    postData={postData}/>} />
          <Route path="/editcollection/:id" element={<CollectionEdit 
                                                    collectionsData={collectionsData}
                                                    postData={postData}/>} />
          <Route path="/filter" element={<Filter />} />
        </Routes>
    );
}

// helper function for the postview page, don't touch this!
function PostCardFullViewWrapper( {postArray, likedPostData, setlikedPostData, setPostData} ) {
  const idSelected = useParams().id;
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