import NavBar from "./NavBar";
import Header from "./Header";
import Footer from "./Footer";
import { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { getDatabase, ref as databaseRef, set as firebaseSet, onValue, update } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

function CollectionEdit() {
  const navLinksArray = [{ name: "Home", url: "/" }];
  const headerText = "Edit Your Collection";
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [alt, setAlt] = useState("");
  const [description, setDescription] = useState("");
  const [careerType, setCareerType] = useState("");
  const [transitionType, setTransitionType] = useState("");
  const [selectedCollection, setSelectedCollection] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const collectionRef = databaseRef(db, "collections/" + id);

    const unregister = onValue(collectionRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSelectedCollection(data);
        setTitle(data.title || "");
        setImage(data.image || null);
        setAlt(data.alt || "");
        setDescription(data.description || "");
        setCareerType(data.careerType || "");
        setTransitionType(data.transitionType || "");
      }
    });

    return () => unregister();
  }, [id]);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setImage(acceptedFiles[0]);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleDiscard = () => {
    navigate("/collections");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const db = getDatabase();
    const collectionRef = databaseRef(db, "collections/" + id);

    const storage = getStorage();
    let url = image;
    let imagePath = "";

    if (image && typeof image !== "string") {
      imagePath = `collectionImages/${image.name}_${Date.now()}`;
      const collectionImageRef = storageRef(storage, imagePath);
      try {
        await uploadBytes(collectionImageRef, image);
        url = await getDownloadURL(collectionImageRef);
      } catch (err) {
        console.log("Collection Image Upload Failed", err);
      }
    }

    const modifiedCollection = {
      ...selectedCollection,
      id,
      title,
      image: url || "",
      imagePath,
      alt,
      description,
      careerType,
      transitionType,
    };

    try {
      await firebaseSet(collectionRef, modifiedCollection);
    } catch (err) {
      console.log("Collection edit failed", err);
    }

    navigate("/collections");
  };

  return (
    <>
      <NavBar navLinks={navLinksArray} />
      <Header summary={headerText} />
      <main>
        <form className="collection-edit-form" onSubmit={handleSubmit}>
          <div className="form-column">
            <label className="image-upload-label-style">Upload the cover image for your collection</label>
            {image && typeof image !== "string" ? (
              <div className="image-upload-success-style">
                <p>{image.name}</p>
                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="image-upload-btn-style"
                >
                  Delete Image
                </button>
              </div>
            ) : image && typeof image === "string" ? (
              <div className="image-upload-success-style">
                <img src={image} alt={alt} className="edit-preview-image" />
                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="image-upload-btn-style"
                >
                  Replace Image
                </button>
              </div>
            ) : (
              <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} id="image-input" />
                {isDragActive ? (
                  <p>Drop your collection image here ...</p>
                ) : (
                  <p>Drag and drop your collection image here, or click to select</p>
                )}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="collection-alt-input">Image Alt Text</label>
              <textarea
                id="collection-alt-input"
                rows="2"
                onChange={(e) => setAlt(e.target.value)}
                value={alt}
                placeholder="Provide alt text for your uploaded image"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="collection-title-input">Collection Title</label>
              <textarea
                id="collection-title-input"
                rows="2"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="This is your collection's title"
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="collection-description-input">Collection Description</label>
              <textarea
                id="collection-description-input"
                rows="10"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder="Describe your collection here"
                required
              ></textarea>
            </div>
          </div>

          <div className="form-column">
            <div className="form-group">
              <label htmlFor="career-input">Career Type</label>
              <select
                id="career-input"
                onChange={(e) => setCareerType(e.target.value)}
                value={careerType}
                required
              >
                <option value="">Select an option</option>
                <option value="technology">Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="business">Business & Finance</option>
                <option value="education">Education</option>
                <option value="design">Design</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="transition-input">Transition Type</label>
              <select
                id="transition-input"
                onChange={(e) => setTransitionType(e.target.value)}
                value={transitionType}
                required
              >
                <option value="">Select an option</option>
                <option value="career-pivot">Career Pivot (New Field)</option>
                <option value="upskilling">Upskilling/Reskilling</option>
                <option value="entrepreneurship">Starting a Business</option>
                <option value="freelance">Transitioning to Freelance</option>
                <option value="retirement-prep">Pre-Retirement Transition</option>
              </select>
            </div>

            <div className="button-group">
              <button className="discard-btn" type="button" onClick={handleDiscard}>
                Discard Edit
              </button>
              <button className="submit-btn" type="submit">
                Finish Edit
              </button>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}

export default CollectionEdit;
