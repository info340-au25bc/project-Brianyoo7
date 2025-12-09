import React from "react";
import { useParams, useNavigate } from "react-router";
import NavBar from "./NavBar";
import Header from "./Header";
import Footer from "./Footer";
import PostCard from "./PostCard";
import CollectionsPostCard from './CollectionsPostCard';

function ViewCollection(props) {
  const { id } = useParams();
  const navigate = useNavigate();

  const selectedCollection = props.collectionsData.find(
    (col) => col.id === id
  );

  if (!selectedCollection) {
    return <div>Loading collection...</div>;
  }

  const postsInCollection = selectedCollection.posts
  ? selectedCollection.posts
      .map((postId) => props.postData.find((p) => p.id === postId))
      .filter(Boolean)
  : [];

  const handleEditClick = () => {
    navigate("/editcollection/" + selectedCollection.id);
  };

  const handleDeleteClick = () => {
    console.log("Delete collection:", selectedCollection.id);
    navigate("/collections");
  };

  return (
    <>
      <NavBar navLinks={[{ name: "Home", url: "/" }]} />
      <Header summary={`Viewing Collection: ${selectedCollection.title}`} />
      <main>
        <h2 className="collection-detail-title">{selectedCollection.title}</h2>
        <img
          className="detail-image"
          src={selectedCollection.image}
          alt={selectedCollection.alt}
        />
        <p>{selectedCollection.description}</p>

        <button onClick={handleEditClick}>Edit Collection</button>
        <button onClick={handleDeleteClick}>Delete Collection</button>


        <section className="collection-posts">
      <h3>Posts in this Collection</h3>
      {postsInCollection.length > 0 ? (
        postsInCollection.map((post, idx) => (
          <CollectionsPostCard
            key={post.id}
            post={{ ...post, collectionPosts: selectedCollection.posts }}
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
