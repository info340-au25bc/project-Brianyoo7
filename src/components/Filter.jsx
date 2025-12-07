import { useState } from "react";
import { Link } from "react-router-dom";

export default function Filter({ postArray }) {
  const [careerType, setCareerType] = useState("");
  const [transitionType, setTransitionType] = useState("");

  const filteredPosts = postArray.filter((post) => {
    const matchesCareer = careerType === "" || post.career === careerType;
    const matchesTransition =
      transitionType === "" || post.transition === transitionType;
    return matchesCareer && matchesTransition;
  });

  return (
    <>
      <nav>
        <img src="/images/app-logo.jpg" alt="App Logo" />
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/collections">Collections</Link></li>
          <li><Link to="/likedpage">Liked Pages</Link></li>
          <li><Link to="/postcreation">Create Post</Link></li>
        </ul>
      </nav>

      <header className="base-header-style">
        <h1>Filter Posts</h1>
      </header>

      <main className="main-feed">

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "2rem",
            marginBottom: "1.5rem"
          }}
        >
          <h2 style={{ flex: 1, textAlign: "center", margin: 0 }}>Filters</h2>

          <span style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
            Results: {filteredPosts.length}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "flex-start",
            flexWrap: "wrap"
          }}
        >
          <section
            style={{
              flex: "0 0 280px",
              backgroundColor: "white",
              padding: "1.5rem",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
            }}
          >
            <form>
              <label style={{ display: "block", fontWeight: 600 }}>
                Career Type
                <select
                  value={careerType}
                  onChange={(e) => setCareerType(e.target.value)}
                  style={{
                    display: "block",
                    width: "100%",
                    marginTop: "0.35rem",
                    padding: "0.5rem",
                    borderRadius: "4px",
                    border: "1px solid #ccc"
                  }}
                >
                  <option value="">All</option>
                  <option value="technology">Technology</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="business-finance">Business & Finance</option>
                  <option value="education">Education</option>
                  <option value="design">Design</option>
                </select>
              </label>

              <label
                style={{
                  display: "block",
                  fontWeight: 600,
                  marginTop: "1.3rem"
                }}
              >
                Transition Type
                <select
                  value={transitionType}
                  onChange={(e) => setTransitionType(e.target.value)}
                  style={{
                    display: "block",
                    width: "100%",
                    marginTop: "0.35rem",
                    padding: "0.5rem",
                    borderRadius: "4px",
                    border: "1px solid #ccc"
                  }}
                >
                  <option value="">All</option>
                  <option value="career-pivot">Career Pivot</option>
                  <option value="upskilling">Upskilling</option>
                  <option value="reskilling">Reskilling</option>
                  <option value="starting-business">Starting a Business</option>
                  <option value="transition-freelance">
                    Transition to Freelance
                  </option>
                  <option value="pre-retirement">Pre-retirement Transition</option>
                </select>
              </label>
            </form>
          </section>

          <section style={{ flex: "1 1 0px" }}>
            {filteredPosts.length === 0 ? (
              <p>No posts match these filters yet.</p>
            ) : (
              <div className="posts-layout">
                {filteredPosts.map((post) => (
                  <article key={post.id} className="post">
                    <div className="post-image-container">
                      <img
                        className="post-image"
                        src={post.image}
                        alt={post.alt ?? "career story"}
                      />
                    </div>
                    <h3 className="post-title">{post.title}</h3>
                    <p>{post.description}</p>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <footer>
        <p className="author">© 2025 Lunjia Dai, Tresan Alcorta, Rui Wang, Brian Yoo.</p>
        <address>
          Email: <a href="mailto:lunjia@uw.edu">lunjia@uw.edu</a>,{" "}
          <a href="mailto:tresan33@uw.edu">tresan33@uw.edu</a>
        </address>
      </footer>
    </>
  );
}
