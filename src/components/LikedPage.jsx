import NavBar from './NavBar';
import Footer from './Footer';
import Header from './Header';
import LikedPostCard from './LikedPostCard';

function LikedPage(props) {
    const navLinksArray = [
        { name: "Home", url: "/" },
    ];
    const likedPostData = props.likedPostData;
    console.log(likedPostData);

    return (
        <>
            <NavBar navLinks={navLinksArray} />
            <Header headerText=""/>
            <main className="liked-posts-main">
                <section className="liked-posts-section">
                    <h1 className="liked-posts-page-title">Liked Posts</h1>
                    <div className="liked-posts-grid">
                        {likedPostData.map((post) => {
                            return <LikedPostCard key={post.id}
                                                  id={post.id}
                                                  image={post.image}
                                                  imagePath={post.imagePath}
                                                  alt={post.alt}
                                                  title={post.title}
                                                  likedPostData={likedPostData}
                                                  setlikedPostData={props.setlikedPostData}/>
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