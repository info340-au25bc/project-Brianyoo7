function PostCard(props) {
    return (
        <div className="post">
            <div className="post-image-container">
                <img className="post-image" src={props.image} alt={props.alt} />
            </div>
            <p className="post-title">{props.title}</p>
        </div>
    );
}

export default PostCard;