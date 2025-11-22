function LikedPostCard(props) {
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
            <button className="unlike-btn">
                ❤️ Unlike
            </button>
        </div>
    );
}

export default LikedPostCard;