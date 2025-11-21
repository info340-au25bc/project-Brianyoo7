import NavBar from './NavBar';
import Footer from './Footer';
import LikedPostCard from './LikedPostCard';

function LikedPage(props) {
    const likedPosts = props.likedPosts;
    const onUnlike = props.onUnlike;
    const hasLikedPosts = likedPosts.length > 0;

    return (
        <>
            <NavBar />
            
            <main className="liked-posts-main">
                <section className="liked-posts-section">
                    <h1 className="liked-posts-page-title">Liked Posts</h1>
                    
                    {!hasLikedPosts && (
                        <div className="no-posts-message">
                            <p>You haven't liked any posts yet!</p>
                            <p>Go to the home page and click the like button on posts you enjoy.</p>
                        </div>
                    )}

                    {hasLikedPosts && (
                        <div className="liked-posts-grid">
                            {likedPosts.map(function(post) {
                                return (
                                    <LikedPostCard 
                                        key={post.id}
                                        post={post}
                                        onUnlike={onUnlike}
                                    />
                                );
                            })}
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </>
    );
}

export default LikedPage;