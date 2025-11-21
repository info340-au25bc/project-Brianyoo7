function LikedPostCard(props) {
    const post = props.post;
    const onUnlike = props.onUnlike;

    function handleUnlikeClick() {
        onUnlike(post.id);
    }

    return (
        <div className="liked-post-card">
            <div className="liked-card-image-container">
                <img 
                    className="liked-card-image" 
                    src={post.image} 
                    alt={post.alt}
                />
            </div>
            <p className="liked-card-title">{post.title}</p>
            <button className="unlike-btn" onClick={handleUnlikeClick}>
                ❤️ Unlike
            </button>
        </div>
    );
}

export default LikedPostCard;