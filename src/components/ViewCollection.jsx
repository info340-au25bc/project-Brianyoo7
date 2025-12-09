import React from "react";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router";
import NavBar from "./NavBar";
import Header from "./Header";
import Footer from "./Footer";
import PostCard from "./PostCard";
import CollectionsPostCard from './CollectionsPostCard';
import { getDatabase, ref, onValue, remove } from "firebase/database";


function ViewCollection(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedCollection, setSelectedCollection] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const collectionRef = ref(db, "collections/" + id);
    const unsubscribe = onValue(collectionRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setSelectedCollection(data);
    });
    return () => unsubscribe();
  }, [id]);

  if (!selectedCollection) {
    return <div>Loading collection...</div>;
  }
  
  const postsInCollection = selectedCollection.posts
  ? selectedCollection.posts
      .map((postId) => props.postData.find((p) => p.id === postId))
      .filter(Boolean) : [];

  const handleEditClick = () => {
    navigate("/editcollection/" + selectedCollection.id);
  };

  const handleDeleteClick = async () => {
    try {
      const db = getDatabase();
      const collectionsRef = ref(db, "collections/" + selectedCollection.id);
      await remove(collectionsRef);
      console.log("Collection delete: ", selectedCollection.id);
      navigate("/collections");
    } catch (err) {
      console.error("Error deleting collection: ", err);
    }
  };

  return (
    <>
      <NavBar navLinks={[{ name: "Home", url: "/" }]} />
      <Header summary={`Viewing Collection: ${selectedCollection.title}`} />
      <main className="main-feed">

      <section>
        <h2 className="collection-detail-title">{selectedCollection.title}</h2>
        <img
          className="detail-image"
          src={selectedCollection.image}
          alt={selectedCollection.alt}
        />
        <p>{selectedCollection.description}</p>

        <div> 

          <button className="collections-btn" onClick={handleEditClick}>Edit Collection</button>
          <button className="collections-btn collections-delete" onClick={handleDeleteClick}>Delete Collection</button>
        </div>
      </section>

      <section className="collection-posts">
          <h3>Posts in this Collection</h3>
          {postsInCollection.length > 0 ? (
            postsInCollection.map((post, idx) => (
              <CollectionsPostCard
                key={post.id}
                post={post}
                collectionId={selectedCollection.id}
                collectionData={selectedCollection}
                currentPosts={selectedCollection.posts}
                index={idx}
                totalPosts={postsInCollection.length}
              />
            ))
          ) : (
            <p>No posts in this collection yet.</p>
          )}
      </section>
      </main>
      <Footer />
    </>
  );
}

export default ViewCollection;
