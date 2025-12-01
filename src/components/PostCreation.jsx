import NavBar from "./NavBar"
import Header from "./Header";
import Footer from "./Footer";
import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import {useDropzone} from 'react-dropzone'

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
                if (props.postData[i].id === parseInt(id)) {
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
    const handleSubmit = (event) => {
        event.preventDefault();

        // create a new post
        if (id === undefined) {
            props.setPostData([...props.postData, {
                id: props.postId,
                title: title,
                image: URL.createObjectURL(image),
                alt: alt,
                description: description,
                career: careerType,
                transition: transitionType
            }]);
        }
        else {
            const modifiedPost = props.postData.map((post) => {
                if (post.id === parseInt(id)) {
                    return {
                        id: post.id,
                        title: title,
                        image: image,
                        alt: alt,
                        description: description,
                        career: careerType,
                        transition: transitionType
                    }
                }
                else {
                    return post;
                }
            });

            props.setPostData(modifiedPost);
        }

        // update the id for the next post
        // if the id url param doesn't exit. (in create mode)
        if (id === undefined) {
            props.setPostId(props.postId + 1);
        }
        console.log(props.postData);

        navigate("/");
    }

    return (
        <>
            <NavBar navLinks={navLinksArray} />
            <Header summary={headerText} />
            <main>
                <form className="post-creation-form" onSubmit={handleSubmit}>
                    <div className="form-column">
                        <label className="image-upload-label-style" htmlFor="image-input">Upload the cover image for your post</label>
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
                                <option value="creative">Design</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="transition-input">Transition Type</label>
                            <select type="select" id="transition-input" name="transition-input" onChange={handleTransitionChange} value={transitionType} required>
                                <option value="">Select an option</option>
                                <option value="career-pivot">Career Pivot (New Field)</option>
                                <option value="upskilling">Upskilling/Reskilling</option>
                                <option value="entrepreneurship">Starting a Business</option>
                                <option value="freelance">Transitioning to Freelance</option>
                                <option value="retirement-prep">Pre-Retirement Transition</option>
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