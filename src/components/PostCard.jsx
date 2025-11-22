import { useNavigate} from "react-router-dom";

function PostCard(props) {
    const navigate = useNavigate();
    const handlePostClick = () => {
        navigate(`/postview/${props.id}`);
    }

    return (
        <div className="post" onClick={handlePostClick}>
            <div className="post-image-container">
                <img className="post-image" src={props.image} alt={props.alt} />
            </div>
            <p className="post-title">{props.title}</p>
        </div>
    );
}

export default PostCard;