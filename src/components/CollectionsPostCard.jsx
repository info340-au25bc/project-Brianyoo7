import { useNavigate } from "react-router-dom";
import { getDatabase, ref, update } from "firebase/database";

export default function CollectionsPostCard(props) {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/postview/${props.post.id}`);
  };

  const handleMove = async (direction) => {
    const db = getDatabase();
    const collectionRef = ref(db, "collections/" + props.collectionId);

    const currentPosts = [...props.currentPosts];
    const index = props.index;
    const totalPosts = props.totalPosts;

    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= totalPosts) return;

    [currentPosts[index], currentPosts[newIndex]] = [currentPosts[newIndex], currentPosts[index]];

    await update(collectionRef, {
      ...props.collectionData,
      posts: currentPosts,
    });
  };

  return (
    <div className="collection-post-card">
        <div className="post-image-container" onClick={handleViewClick}>
            <img src={props.post.image} alt={props.post.alt} />
        </div>
        <div className="post-content">
            <h4>{props.post.title}</h4>
            <p>{props.post.description}</p>
            <div className="reorder-controls">
                <button disabled={props.index === 0} onClick={() => handleMove("up")}>
                    ↑ Move Up
                </button>
                <button disabled={props.index === props.totalPosts - 1} onClick={() => handleMove("down")}>
                    ↓ Move Down
                </button>
            </div>
        </div>
    </div>
  );
}
