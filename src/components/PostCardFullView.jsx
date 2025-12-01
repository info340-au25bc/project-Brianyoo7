import NavBar from "./NavBar"
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from 'react-router';

function PostCardFullView(props) {
    const navLinksArray = [{ name: "Home", url: "/" }];
    const headerText = "See the full content of the post below!";
    const selectedPostData = props.selectedPostData;
    const postsArray = props.postArray;
    const setPostsData = props.setPostsData;
    const likedPosts = props.likedPosts
    const setlikedPostData = props.setlikedPostData;
    const navigate = useNavigate();

    const handleLikeClick = () => {
        let hasLiked = false;
        likedPosts.forEach((post) => {
            if (post.id === selectedPostData.id) {
                hasLiked = true;
            }
        });

        if (!hasLiked) {
            setlikedPostData([...likedPosts, selectedPostData]);
        }

        navigate("/likedpage");
    }

    const handleDeleteClick = () => {
        let filteredArray = postsArray.filter((post) => {
            if (post.id !== selectedPostData.id) {
                return post;
            }
        })
        setPostsData(filteredArray);
        navigate("/");
    }

    const handleEditClick = () => {
        navigate("/postcreation/" + `${selectedPostData.id}`);
    }
    
    return (
        <>
            <NavBar navLinks={navLinksArray} />
            <Header summary={headerText} />
            <main>
                <h2 className="post-detail-title">{selectedPostData.title}</h2>
                <div className="post-detail-layout">
                    <div className="base-column-style card-column-1">
                        <img className="detail-image" src={selectedPostData.image} alt={selectedPostData.alt} />
                        <div className="post-detail-description">
                            <p>{selectedPostData.description}</p>
                        </div>
                    </div>
                    <div className="base-column-style card-column-2">
                        <p className="career-description">Career Type: Career Pivot (New Field)</p>
                        <p className="transition-description">Transition Type: Upskilling/Reskilling</p>
                        <div className="like-section">
                            <p>Like The Post: </p>
                            <button className="like-btn-style" type="button" onClick={handleLikeClick}>❤️</button>
                        </div>
                        <button className="edit-post-btn-style" type="button" onClick={handleEditClick}>Edit Post</button>
                        <button className="delete-post-btn-style" type="button" onClick={handleDeleteClick}>Delete Post</button>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default PostCardFullView;