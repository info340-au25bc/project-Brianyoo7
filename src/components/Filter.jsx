import NavBar from "./NavBar";
import Footer from "./Footer";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Filter({ postArray }) {
  const navLinksArray = [
    { name: "Home", url: "/" },
    { name: "Collections", url: "/collections" },
    { name: "Liked Pages", url: "/likedpage" },
    { name: "Create Post", url: "/postcreation" },
  ];
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
      <NavBar navLinks={navLinksArray} />

      <header className="base-header-style">
        <h1>Filter Posts</h1>
      </header>

      <main className="main-feed">

        <div className="filter-header">
          <span className="results-count">
            Results: {filteredPosts.length}
          </span>
        </div>

        <div className="filter-container">
          <section className="filter-sidebar">
            <form>
              <label className="filter-label">
                Career Type
                <select
                  value={careerType}
                  onChange={(e) => setCareerType(e.target.value)}
                  className="filter-select"
                >
                  <option value="">All</option>
                  <option value="technology">Technology</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="business">Business & Finance</option>
                  <option value="education">Education</option>
                  <option value="design">Design</option>
                </select>
              </label>

              <label className="filter-label-spacing">
                Transition Type
                <select
                  value={transitionType}
                  onChange={(e) => setTransitionType(e.target.value)}
                  className="filter-select"
                >
                  <option value="">All</option>
                  <option value="career-pivot">Career Pivot</option>
                  <option value="upskilling">Upskilling</option>
                  <option value="reskilling">Reskilling</option>
                  <option value="starting-business">Starting a Business</option>
                  <option value="transition-freelance">
                    Transition to Freelance
                  </option>
                  <option value="retirement-prep">Pre-retirement Transition</option>
                </select>
              </label>
            </form>
          </section>

          <section className="filter-content">
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

      <Footer />
    </>
  );
}