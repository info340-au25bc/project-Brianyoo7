import { useNavigate} from "react-router-dom";
import { getDatabase, ref, update } from 'firebase/database';
import { useState } from 'react';

function PostCard(props) {
    const navigate = useNavigate();
    const [selectedCollection, setSelectedCollection] = useState("");

    const handlePostClick = () => {
        navigate(`/postview/${props.id}`);
    }

     const handleAddToCollection = async (e) => {
    e.stopPropagation(); 
    if (!selectedCollection) return;

    const db = getDatabase();
    const collectionRef = ref(db, "collections/" + selectedCollection);

    const collection = props.collectionsData.find((c) => c.id === selectedCollection);
    if (!collection) return;

    const updatedPosts = collection.posts
      ? collection.posts.includes(props.id)
        ? collection.posts
        : [...collection.posts, props.id]
      : [props.id];

    await update(collectionRef, { ...collection, posts: updatedPosts });
  };

    return (
        <div className="post" onClick={handlePostClick}>
            <div className="post-image-container">
                <img className="post-image" src={props.image} alt={props.alt} />
            </div>
            <p className="post-title">{props.title}</p>

            <div className="add-to-collection" onClick={(e) => e.stopPropagation()}>
                <select
                value={selectedCollection}
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
                <button onClick={handleAddToCollection}>Add to Collection</button>
            </div>
        </div>
    );
}

export default PostCard;