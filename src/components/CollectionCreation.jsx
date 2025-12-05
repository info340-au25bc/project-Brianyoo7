import React, { useState } from "react";
import NavBar from "./NavBar";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router";
import { getDatabase, ref, push, set as firebaseSet } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

function CollectionCreation() {
  const navLinksArray = [{ name: "Home", url: "/" }];
  const headerText = "Create a New Collection";
  const navigate = useNavigate();
  const db = getDatabase();
  const storage = getStorage();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [careerType, setCareerType] = useState("");
  const [transitionType, setTransitionType] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newCollectionRef = push(ref(db, "collections"));
      const newId = newCollectionRef.key;

      let imageUrl = "";
      let imagePath = "";

      if (imageFile) {
        imagePath = `collections/${newId}/${imageFile.name}`;
        const imageStorageRef = storageRef(storage, imagePath);
        await uploadBytes(imageStorageRef, imageFile);
        imageUrl = await getDownloadURL(imageStorageRef);
      }

      await firebaseSet(newCollectionRef, {
        id: newId,
        title,
        description,
        careerType,
        transitionType,
        image: imageUrl,
        imagePath,
        posts: [] 
      });

      navigate("/collections");
    } catch (err) {
      console.error("Error creating collection:", err);
    }
  };

  return (
    <>
      <NavBar navLinks={navLinksArray} />
      <Header summary={headerText} />
      <main>
        <form className="collection-creation-form" onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <label>
            Career Type:
            <input
              type="text"
              value={careerType}
              onChange={(e) => setCareerType(e.target.value)}
            />
          </label>
          <label>
            Transition Type:
            <input
              type="text"
              value={transitionType}
              onChange={(e) => setTransitionType(e.target.value)}
            />
          </label>
          <label>
            Image:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </label>
          <button type="submit">Create Collection</button>
        </form>
      </main>
      <Footer />
    </>
  );
}

export default CollectionCreation;
