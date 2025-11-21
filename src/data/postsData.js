const POSTS_DATA = [
  {
    id: 1,
    title: "My Success Story: Going From Sales to SWE",
    image: "images/software-engineer-career.jpg",
    alt: "software engineer career switch"
  },
  {
    id: 2,
    title: "My Success Story: Going From SWE to Doctor",
    image: "images/doctor-career.jpg",
    alt: "medical doctor career switch"
  },
  {
    id: 3,
    title: "My Success Story: Going From Doctor to Astronaut",
    image: "images/astronaut-career.jpg",
    alt: "astronaut career switch"
  },
  {
    id: 4,
    title: "My Success Story: Going From Doctor to Engineer",
    image: "images/engineer-career.jpg",
    alt: "engineer career switch"
  },
  {
    id: 5,
    title: "My Success Story: Going From Engineer to Actor",
    image: "images/actor-career.gif",
    alt: "actor career switch"
  },
  {
    id: 6,
    title: "My Success Story: Going From Actor to Talk Show Host",
    image: "images/talk-show-host-career.jpg",
    alt: "talk show host career switch"
  }
];

export default POSTS_DATA;

/LikedPostCard.jsx/

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