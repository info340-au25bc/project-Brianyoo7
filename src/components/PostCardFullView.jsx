import NavBar from "./NavBar"
import Header from "./Header";
import Footer from "./Footer";
import { useParams } from 'react-router';

function PostCardFullView(props) {
    const navLinksArray = [{ name: "Home", url: "/" }];
    const headerText = "See the full content of the post below!";
    const postId = useParams().id;
    
    return (
        <>
            <NavBar navLinks={navLinksArray} />
            <Header summary={headerText} />
            <main>
                <h2 className="post-detail-title">My Success Story: Going From Doctor to Astronaut</h2>
                <div className="post-detail-layout">
                    <div className="base-column-style card-column-1">
                        <img className="detail-image" src="images/astronaut-career.jpg" alt="astronaut career switch" />
                        <div className="post-detail-description">
                            <p>After years of designing spacecraft systems as an electrical engineer, I realized I
                            wanted to experience space firsthand rather than just build the technology. I pursued
                            a master's in aerospace engineering while maintaining my fitness and pilot certification.
                            NASA's astronaut selection process was grueling, but my technical background gave me an
                            edge in understanding complex spacecraft operations. Two years of intense training later,
                            I'm preparing for my first mission to the International Space Station, where I'll install
                            the very systems I once helped design from the ground.</p>
                        </div>
                    </div>
                    <div className="base-column-style card-column-2">
                        <p className="career-description">Career Type: Career Pivot (New Field)</p>
                        <p className="transition-description">Transition Type: Upskilling/Reskilling</p>
                        <div className="like-section">
                            <p>Like The Post: </p>
                            <button className="like-btn-style" type="button">❤️</button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default PostCardFullView;