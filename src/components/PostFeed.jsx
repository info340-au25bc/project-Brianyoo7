<<<<<<< HEAD
import PostCard from "./PostCard";

=======
>>>>>>> f7b327c8dc77f9e397bcbbd53cf996c011b88b7b
function PostFeed(props) {
    return (
        <main>
            <section className="main-feed">
                <h2>Posts</h2>
<<<<<<< HEAD
                <div className="posts-layout">
                    {
                        props.postArray.map((postObj, index) => {
                            return <PostCard image={postObj.image} alt={postObj.alt} title={postObj.title}/>
                        })
                    }
                </div>
=======
>>>>>>> f7b327c8dc77f9e397bcbbd53cf996c011b88b7b
            </section>
        </main>
    );
}

export default PostFeed;