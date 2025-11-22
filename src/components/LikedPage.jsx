import NavBar from './NavBar';
import Footer from './Footer';
import Header from './Header';
import LikedPostCard from './LikedPostCard';

function LikedPage(props) {
    const navLinksArray = [
        { name: "Home", url: "/" },
    ];
    const likedPostData = props.likedPostData;

    return (
        <>
            <NavBar navLinks={navLinksArray} />
            <Header />
            <main className="liked-posts-main">
                <section className="liked-posts-section">
                    <h1 className="liked-posts-page-title">Liked Posts</h1>
                    <div className="liked-posts-grid">
                        {likedPostData.map((post) => {
                            <LikedPostCard key={post.id} image={post.image} alt={post.alt} title={post.title} />
                        })}
                    </div>

                    <div className="view-more-container">
                        <button className="view-more-btn">
                            View More
                            <span className="arrow-down">▼</span>
                        </button>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default LikedPage;