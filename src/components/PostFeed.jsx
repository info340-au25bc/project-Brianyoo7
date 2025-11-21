import PostCard from "./PostCard";

function PostFeed(props) {
    return (
        <main>
            <section className="main-feed">
                <h2>Posts</h2>
                <div className="posts-layout">
                    {
                        props.postArray.map((postObj, index) => {
                            return <PostCard image={postObj.image} alt={postObj.alt} title={postObj.title}/>
                        })
                    }
                </div>
            </section>
        </main>
    );
}

export default PostFeed;