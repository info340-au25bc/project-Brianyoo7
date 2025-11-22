import NavBar from './NavBar';
import Footer from './Footer';
import LikedPostCard from './LikedPostCard';

function LikedPage(props) {
    // const likedPosts = props.likedPosts;
    // const onUnlike = props.onUnlike;
    // const hasLikedPosts = likedPosts.length > 0;
    const navLinksArray = [
        { name: "Home", url: "/" },
    ];
    const headerText = "Liked Posts";

    const postData = [
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

    return (
        <>
            <NavBar navLinks={navLinksArray} />
            <Header summary={headerText} />
            <main class="liked-posts-main">
                <section class="liked-posts-section">
                    <h1 class="liked-posts-page-title">Liked Posts</h1>
                    <div class="liked-posts-grid">
                        {postData.map((post) => {
                            <LikedPostCard key={post.id} image={post.image} alt={post.alt} title={post.title} />
                        })}
                    </div>

                    <div class="view-more-container">
                        <button class="view-more-btn">
                            View More
                            <span class="arrow-down">▼</span>
                        </button>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default LikedPage;