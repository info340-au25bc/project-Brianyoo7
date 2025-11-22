function LikedPostCard(props) {
    const likedPostData = props.likedPostData;
    const setlikedPostData = props.setlikedPostData

    const handleUnlike = () => {
        // setlikedPostData
        const filteredData = likedPostData.filter((post) => {
            return post.id !== props.id;
        });

        setlikedPostData(filteredData);
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