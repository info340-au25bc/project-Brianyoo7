import NavBar from "./NavBar"
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from 'react-router';
import { getDatabase, ref, set as firebaseSet, remove as firebaseRemove } from 'firebase/database';
import { getStorage, ref as storageRef, deleteObject, uploadBytes, getDownloadURL } from "firebase/storage";

function PostCardFullView(props) {
    const navLinksArray = [{ name: "Home", url: "/" }];
    const headerText = "See the full content of the post below!";
    const selectedPostData = props.selectedPostData;
    const navigate = useNavigate();
    const db = getDatabase();

    if (!selectedPostData) {
        return <div>Loading...</div>;
    }

    const handleLikeClick = async () => {
        const toBeLikedRef = ref(db, "likedPosts/" + selectedPostData.id);

        try {
            await firebaseSet(toBeLikedRef, {...selectedPostData});
        }   
        catch (err) {
            console.log("Failure to add liked post" + err);
        }     
        navigate("/likedpage");
    }

    const handleDeleteClick = async () => {
        const storage = getStorage();
        const toBeDeletedImageRef = storageRef(storage, selectedPostData.imagePath);
        try {
            await deleteObject(toBeDeletedImageRef);
        }
        catch (err) {
            console.log("Failure to delete post image" + err);
        }

        const toBeDeletedRef = ref(db, "posts/" + selectedPostData.id);
        try {
            await firebaseRemove(toBeDeletedRef);
        }
        catch (err) {
            console.log("Failure to delete post" + err);
        }
        navigate("/");
    }

    const handleEditClick = () => {
        navigate("/postcreation/" + `${selectedPostData.id}`);
    }

    const handleAddToCollection = async (e) => {
        e.stopPropagation();
        if (!selectedCollection) return;

        const collectionRef = ref(db, "collections/" + selectedCollection);
        const collection = props.collectionsData?.find((c) => c.id === selectedCollection);
        if (!collection) return;

        const updatedPosts = collection.posts
        ? collection.posts.includes(selectedPostData.id)
            ? collection.posts
            : [...collection.posts, selectedPostData.id]
        : [selectedPostData.id];

        await update(collectionRef, { ...collection, posts: updatedPosts });
    };

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
                        <p className="career-description">Career Type: {selectedPostData.career} </p>
                        <p className="transition-description">Transition Type: {selectedPostData.transition} </p>
                        <div className="like-section">
                            <p>Like The Post: </p>
                            <button className="like-btn-style" type="button" onClick={handleLikeClick}>❤️</button>
                        </div>
                        <button className="edit-post-btn-style" type="button" onClick={handleEditClick}>Edit Post</button>
                        <button className="delete-post-btn-style" type="button" onClick={handleDeleteClick}>Delete Post</button>

                        <div className="add-to-collection" onClick={(e) => e.stopPropagation()}>
                            <p>Add to Collection:</p>
                            <select
                                value={props.sselectedCollection}
                                onChange={(e) => setSelectedCollection(e.target.value)}
                            >
                                <option value="">Select Collection</option>
                                {Array.isArray(props.collectionsData) &&
                                props.collectionsData.map((c) => (
                                    <option key={c.id} value={c.id}>
                                    {c.title}
                                    </option>
                                ))}
                            </select>
                            <button onClick={handleAddToCollection}>Add</button>
                            </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default PostCardFullView;