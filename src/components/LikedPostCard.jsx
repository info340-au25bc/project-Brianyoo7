import { getDatabase, ref, remove as firebaseRemove } from 'firebase/database';

function LikedPostCard(props) {
    const db = getDatabase();

    const handleUnlike = async () => {
        const unlikeRef = ref(db, "likedPosts/" + props.id);

        try {
            await firebaseRemove(unlikeRef);
        }
        catch (err) {
            console.log("error when removing liked post" + err);
        }
    }

    return (
        <div className="liked-post-card">
            <div className="liked-card-image-container">
                <img 
                    className="liked-card-image" 
                    src={props.image} 
                    alt={props.alt}
                />
            </div>
            <p className="liked-card-title">{props.title}</p>
            <button className="unlike-btn" onClick={handleUnlike} >
                ❤️ Unlike
            </button>
        </div>
    );
}

export default LikedPostCard;