import NavBar from "./NavBar";
import Header from "./Header";
import Footer from "./Footer";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { getDatabase, ref as databaseRef, push as firebasePush } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

function CollectionCreation() {
  const navLinksArray = [{ name: "Home", url: "/" },
                        { name: "Collections", url: "/collections "}];
  const headerText = "Create Your Collection Here";
  const navigate = useNavigate();

  // states for collection
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [alt, setAlt] = useState("");
  const [description, setDescription] = useState("");
  const [careerType, setCareerType] = useState("");
  const [transitionType, setTransitionType] = useState("");

  // states for posts inside collection
  const [posts, setPosts] = useState([]);

  // dropzone for collection image
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setImage(acceptedFiles[0]);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // add a new post inline
  const handleAddPost = () => {
    const newPost = {
      id: Date.now().toString(),
      title: "",
      description: "",
      careerType: "",
      transitionType: "",
      image: "",
      alt: ""
    };
    setPosts([...posts, newPost]);
  };

  // update post inline
  const handleUpdatePost = (postId, field, value) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, [field]: value } : p))
    );
  };

  // remove post
  const handleRemovePost = (postId) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  // discard handler
  const handleDiscard = () => {
    navigate("/collections");
  };

  // submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    const db = getDatabase();
    const collectionsRef = databaseRef(db, "collections");

    const storage = getStorage();
    let url = "";
    let imagePath = "";

    if (image) {
      imagePath = `collectionImages/${image.name}_${Date.now()}`;
      const collectionImageRef = storageRef(storage, imagePath);
      try {
        await uploadBytes(collectionImageRef, image);
        url = await getDownloadURL(collectionImageRef);
      } catch (err) {
        console.log("Collection Image Upload Failed", err);
      }
    }

    const newCollection = {
      title,
      image: url,
      imagePath,
      alt,
      description,
      careerType,
      transitionType,
      posts 
    };

    try {
      await firebasePush(collectionsRef, newCollection);
    } catch (err) {
      console.log("Collection creation failed", err);
    }

    navigate("/collections");
  };

  return (
    <>
      <NavBar navLinks={navLinksArray} />
      <Header summary={headerText} />
      <main>
        <form className="post-creation-form" onSubmit={handleSubmit}>
          <div className="form-column">
            <label className="image-upload-label-style">Upload the cover image for your collection</label>
            {image ? (
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
            ) : (
              <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} id="image-input" required />
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
                required
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

            {/* ✅ Inline post management */}
            <section className="edit-posts-section">
              <h3>Posts in this Collection</h3>
              {posts.map((post) => (
                <div key={post.id} className="edit-post-card">
                  <input
                    type="text"
                    value={post.title}
                    placeholder="Post Title"
                    onChange={(e) => handleUpdatePost(post.id, "title", e.target.value)}
                  />
                  <textarea
                    value={post.description}
                    placeholder="Post Description"
                    onChange={(e) => handleUpdatePost(post.id, "description", e.target.value)}
                  />
                  <input
                    type="text"
                    value={post.careerType}
                    placeholder="Career Type"
                    onChange={(e) => handleUpdatePost(post.id, "careerType", e.target.value)}
                  />
                  <input
                    type="text"
                    value={post.transitionType}
                    placeholder="Transition Type"
                    onChange={(e) => handleUpdatePost(post.id, "transitionType", e.target.value)}
                  />
                  <button type="button" onClick={() => handleRemovePost(post.id)}>Remove Post</button>
                </div>
              ))}
              <button type="button" onClick={handleAddPost}>Add New Post</button>
            </section>

            <div className="button-group">
              <button className="discard-btn" type="button" onClick={handleDiscard}>
                Discard
              </button>
              <button className="submit-btn" type="submit">
                Create Collection
              </button>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}

export default CollectionCreation;
