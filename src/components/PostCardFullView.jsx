import NavBar from "./NavBar"
import Header from "./Header";
import Footer from "./Footer";

function PostCardFullView(props) {
    const navLinksArray = [{ name: "Home", url: "/" }];
    const headerText = "See the full content of the post below!";
    const postData = props.postData;
    
    return (
        <>
            <NavBar navLinks={navLinksArray} />
            <Header summary={headerText} />
            <main>
                <h2 className="post-detail-title">{postData.title}</h2>
                <div className="post-detail-layout">
                    <div className="base-column-style card-column-1">
                        <img className="detail-image" src={postData.image} alt={postData.alt} />
                        <div className="post-detail-description">
                            <p>{postData.description}</p>
                        </div>
                    </div>
                    <div className="base-column-style card-column-2">
                        <p className="career-description">Career Type: Career Pivot (New Field)</p>
                        <p className="transition-description">Transition Type: Upskilling/Reskilling</p>
                        <div className="like-section">
                            <p>Like The Post: </p>
                            <button className="like-btn-style" type="button">❤️</button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default PostCardFullView;