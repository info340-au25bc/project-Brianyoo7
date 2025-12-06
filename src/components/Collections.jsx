import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import NavBar from './NavBar';
import CollectionCard from './CollectionCard';
import CollectionEdit from './CollectionEdit';
import { Link } from 'react-router';
import { getDatabase, ref, onValue, set as firebaseSet } from "firebase/database"

function CollectionsMain() {
    const navLinksArray = [
        { name: "Create Post", url: "/postcreation" },
        { name: "Filter Posts", url: "/filter" },
        { name: "Collections", url: "/collections" }, 
        { name: "Liked Pages", url: "/likedpage"},
        { name: "Home", url: "/"},
    ];

    const [collections, setCollections] = useState([]);
    const [editingCollection, setEditingCollection] = useState(null);

    useEffect(() => {
      const db = getDatabase();
      const collectionsRef = ref(db, "collections");

      const unregister = onValue(collectionsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const currentCollections = Object.keys(data).map((key) => ({
            ...data[key],
            id: key,
            url: `/viewcollection/${key}`,
          }));
          setCollections(currentCollections);
        } else {
          setCollections([]);
        }
      });

      return () => unregister();
    }, []);

    const handleEdit = (collection) => {
        setEditingCollection(collection);
    };

    const handleSave = (id, updatedData) => {
        setCollections((prev) =>
        prev.map((col) => (col.id === id ? {...col, ...updatedData} : col)));
        setEditingCollection(null);
    };
    

    const collectionsTest = {key:1, title:"test", url:"1", imageSrc:"public/images/doctor-career.jpg", imageAlt:"", }
    const headerText = "My Collections"
    return (
    <>
      <NavBar navLinks={navLinksArray}/>
      <Header summary={headerText}/>
      <section className="main-feed">
        <button className="collection-btn">
        <Link to="/newcollection">New Collection</Link>
        </button>
        <div className="collection-layout">
          {collections.map((col, index) => (
            <CollectionCard
              key={index}
              title={col.title}
              url={col.url}
              imageSrc={col.imageSrc}
              imageAlt={col.imageAlt}
              onEdit={() => handleEdit(col)}
            />
          ))}
        </div>
      </section>
      <Footer />
    </>
    );
}

export default CollectionsMain;