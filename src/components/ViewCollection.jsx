import React from "react";
import { useParams, useNavigate } from "react-router";
import NavBar from "./NavBar";
import Header from "./Header";
import Footer from "./Footer";

function ViewCollection({ collectionsData }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const selectedCollection = collectionsData.find(
    (col) => col.id === id
  );

  if (!selectedCollection) {
    return <div>Loading collection...</div>;
  }

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
          {selectedCollection.posts && selectedCollection.posts.length > 0 ? (
            selectedCollection.posts.map((post) => (
              <div key={post.id} className="collection-post-card">
                <img src={post.image} alt={post.alt} className="post-image" />
                <h4>{post.title}</h4>
                <p>{post.description}</p>
                <p><strong>Career:</strong> {post.careerType}</p>
                <p><strong>Transition:</strong> {post.transitionType}</p>
                <button onClick={() => navigate("/postview/" + post.id)}>
                  View Post
                </button>
              </div>
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
