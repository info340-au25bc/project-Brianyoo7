import NavBar from "./NavBar"
import Header from "./Header";
import Footer from "./Footer";

function PostCreation(props) {
    const navLinksArray = { name: "Home", url: "Home" };
    const headerText = "Create Your Post Here";

    return (
        <>
            <NavBar navLinks={navLinksArray} />
            <Header summary={headerText} />
            <main>
                <form className="post-creation-form" action="index.html" method="POST">
                    <div className="form-column">
                        <div className="form-group">
                            <label for="image-upload">Upload the cover image for your post</label>
                            <input type="file" id="image-upload" name="image-upload" accept="image/*"/>
                        </div>
                        <div className="form-group">
                            <label for="post-title-input">Post Title</label>
                            <textarea id="post-title-input" name="post-title-input" rows="2" col="40" placeholder="This is your lovely post's title!"></textarea>
                        </div>
                        <div className="form-group">
                            <label for="post-description-input">Post Title</label>
                            <textarea id="post-description-input" name="post-description-input" rows="10" col="80" placeholder="Share your story here!"></textarea>
                        </div>
                    </div>
                    <div className="form-column">
                        <div className="form-group">
                            <label for="career-input">Career Type</label>
                            <select type="select" id="career-input" name="career-input">
                                <option value="technology">Technology</option>
                                <option value="healthcare">Healthcare</option>
                                <option value="business">Business & Finance</option>
                                <option value="education">Education</option>
                                <option value="creative">Design</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label for="transition-input">Transition Type</label>
                            <select type="select" id="transition-input" name="transition-input" >
                                <option value="career-pivot">Career Pivot (New Field)</option>
                                <option value="upskilling">Upskilling/Reskilling</option>
                                <option value="entrepreneurship">Starting a Business</option>
                                <option value="freelance">Transitioning to Freelance</option>
                                <option value="retirement-prep">Pre-Retirement Transition</option>
                            </select>
                        </div>

                        <div className="button-group">
                            <a className="discard-btn"href="index.html">Discard Edit</a>
                            <button className="submit-btn" type="submit">Create Post</button>
                        </div>
                    </div>
                </form>
            </main>
            <Footer />
        </>
    );
}

export default PostCreation;