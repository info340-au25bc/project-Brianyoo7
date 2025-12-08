import NavBar from "./NavBar"
import Header from "./Header";
import Footer from "./Footer";
import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import { getDatabase, ref as databaseRef, push as firebasePush, set as firebaseSet } from 'firebase/database';
import {getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

function PostCreation(props) {
    const navLinksArray = [{ name: "Home", url: "/" }];
    const headerText = "Create Your Post Here";
    const navigate = useNavigate();

    // get the post id from the url
    const { id } = useParams();

    // set up states for creating a new post
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [alt, setAlt] = useState('');
    const [description, setDescription] = useState('');
    const [careerType, setCareerType] = useState('');
    const [transitionType, setTransitionType] = useState('');

    // edit mode
    useEffect(() => {
        if (id !== undefined) {
            for (let i = 0; i < props.postData.length; i++) {
                if (props.postData[i].id === id) {
                    setTitle(props.postData[i].title);
                    setImage(props.postData[i].image);
                    setAlt(props.postData[i].alt);
                    setDescription(props.postData[i].description);
                    setCareerType(props.postData[i].careerType);
                    setTransitionType(props.postData[i].transitionType);
                }
            }
        }
    }, []);

    // setter for the post states
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const handleAltUpload = (event) => {
        setAlt(event.target.value);
    }

    const handleCareerChange = (event) => {
        setCareerType(event.target.value);
    }

    const handleTransitionChange = (event) => {
        setTransitionType(event.target.value);
    }

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles.length > 0) {
            setImage(acceptedFiles[0]);
        }
      }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    // event handler for the discard btn
    const handleDiscard = (event) => {
        navigate("/");
    }

    // event handler for the submit btn
    const handleSubmit = async (event) => {
        event.preventDefault();

        const db = getDatabase();
        const postRef = databaseRef(db, "posts");

        const storage = getStorage();
        const uniqueImageName = `postImages/${image.name}_${Date.now()}`;
        const postImageRef = storageRef(storage, uniqueImageName);

        // create a new post
        if (id === undefined) {
            // upload the image for the post
            let url = "";
            try {
                await uploadBytes(postImageRef, image);
                url = await getDownloadURL(postImageRef);
            }
            catch (err) {
                console.log("Post Image Upload Failed" + err);
            }

            // upload the rest of the data to firebase
            try {
                await firebasePush(postRef, {
                    title: title,
                    image: url,
                    imagePath: uniqueImageName,
                    alt: alt,
                    description: description,
                    career: careerType,
                    transition: transitionType
                });
            }
            catch (err) {
                console.log("post creation failed" + err);
            }
        }
        else {
            let url = "";

            // If the image is not changed
            if (typeof(image) === "string") {
                url = image;
            }
            else {
                // If the user changes image
                try {
                    await uploadBytes(postImageRef, image);
                    url = await getDownloadURL(postImageRef);
                }
                catch (err) {
                    console.log("Post Image Upload Failed" + err);
                }
            }

            const selectedRef = databaseRef(db, "posts/" + id);
            const modifiedPost = {
                                    id: id,
                                    title: title,
                                    image: url,
                                    imagePath: uniqueImageName,
                                    alt: alt,
                                    description: description,
                                    career: careerType,
                                    transition: transitionType
                                };
            
            try {
                await firebaseSet(selectedRef, modifiedPost);
            }
            catch (err) {
                console.log("post edit failed" + err);
            }
        }

        navigate("/");
    }

    return (
        <>
            <NavBar navLinks={navLinksArray} />
            <Header summary={headerText} />
            <main>
                <form className="post-creation-form" onSubmit={handleSubmit}>
                    <div className="form-column">
                        <label className="image-upload-label-style">Upload the cover image for your post</label>
                        {image ? 
                        <div className="image-upload-success-style">
                            <p>{image.name}</p>
                            <button onClick={() => {setImage(null)}} className="image-upload-btn-style">Delete Image</button>
                        </div> 
                        :                         
                        <div {...getRootProps()} className="dropzone">
                            <input {...getInputProps()} id="image-input" required/>
                            {
                                isDragActive ?
                                <p>Drop your post image here ...</p> :
                                <p>Drag and drop your post image here, or click to select images from your computer</p>
                            }
                        </div>}
                        <div className="form-group">
                            <label htmlFor="post-alt-input">Image Alt Text</label>
                            <textarea id="post-alt-input" name="post-alt-input" rows="2" col="40" onChange={handleAltUpload} value={alt} placeholder="Provide some Alt text for your uploaded image!" required></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="post-title-input">Post Title</label>
                            <textarea id="post-title-input" name="post-title-input" rows="2" col="40" onChange={handleTitleChange} value={title} placeholder="This is your lovely post's title!" required></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="post-description-input">Post Description</label>
                            <textarea id="post-description-input" name="post-description-input" rows="10" col="80" onChange={handleDescriptionChange} value={description} placeholder="Share your story here!" required></textarea>
                        </div>
                    </div>
                    
                    <div className="form-column">
                        <div className="form-group">
                            <label htmlFor="career-input">Career Type</label>
                            <select type="select" id="career-input" name="career-input" onChange={handleCareerChange} value={careerType} required>
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
                            <select type="select" id="transition-input" name="transition-input" onChange={handleTransitionChange} value={transitionType} required>
                                <option value="">Select an option</option>
                                <option value="career-pivot">Career Pivot</option>
                                <option value="upskilling">Upskilling</option>
                                <option value="reskilling">Reskilling</option>
                                <option value="starting-business">Starting a Business</option>
                                <option value="transition-freelance">
                                    Transition to Freelance
                                </option>
                                <option value="retirement-prep">Pre-retirement Transition</option>
                                </select>
                        </div>

                        <div className="button-group">
                            <button className="discard-btn" type="button" onClick={handleDiscard}>Discard Edit</button>
                            <button className="submit-btn" type="submit">{id === undefined ? "Create Post" : "Finish Edit"}</button>
                        </div>
                    </div>
                </form>
            </main>
            <Footer />
        </>
    );
}

export default PostCreation;