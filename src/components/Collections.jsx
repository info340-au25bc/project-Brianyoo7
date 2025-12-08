import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import NavBar from "./NavBar";
import CollectionCard from "./CollectionCard";
import { Link } from "react-router-dom";

function CollectionsMain({ collectionsData }) {
  const navLinksArray = [
    { name: "Create Post", url: "/postcreation" },
    { name: "Filter Posts", url: "/filter" },
    { name: "Liked Pages", url: "/likedpage" },
    { name: "Home", url: "/" },
  ];

  const headerText = "My Collections";

  return (
    <>
      <NavBar navLinks={navLinksArray} />
      <Header summary={headerText} />
      <section className="main-feed">
        <button className="collection-btn">
          <Link to="/newcollection">New Collection</Link>
        </button>
        <div className="collection-layout">
          {collectionsData.length === 0 ? (
            <p>No collections yet. Create one to get started!</p>
          ) : (
            collectionsData.map((col) => (
              <CollectionCard
                key={col.id}
                id={col.id}
                title={col.title}
                image={col.image}
                alt={col.alt}
              />
            ))
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default CollectionsMain;
