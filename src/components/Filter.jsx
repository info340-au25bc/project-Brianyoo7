import React from "react";
import Header from './Header';
import Footer from './Footer';
import NavBar from './NavBar';
import { Link } from 'react-router';

export default function FilterPosts() {
  return (
    <div>
      <nav>
        <img src="images/app-logo.jpg" alt="App Logo" />
        <ul>
          <li><Link to="/">Home</Link></li>
          <li aria-current="page"><a href="filter.html">Filter</a></li>
          <li><Link to="/collections">Collections</Link></li>
        </ul>
      </nav>

      <header className="base-header-style">
        <h1>Filter Posts</h1>
        <p>Narrow posts by field and type.</p>
      </header>

      <main className="main-feed">
        <h2>Filters</h2>

        <form id="filterForm">
          <fieldset>
            <legend>Career Field</legend>
            <label htmlFor="careerField">Field</label>
            <input
              id="careerField"
              type="text"
              placeholder="Tech, Healthcare, etc."
            />
          </fieldset>

          <fieldset>
            <legend>Transition Type</legend>
            <label>
              <input type="checkbox" value="switch" /> Career Switch
            </label>
            <br />
            <label>
              <input type="checkbox" value="skill" /> Skill Building
            </label>
            <br />
            <label>
              <input type="checkbox" value="first" /> First Job
            </label>
            <br />
            <label>
              <input type="checkbox" value="return" /> Return to Work
            </label>
          </fieldset>

          <fieldset>
            <legend>Date Range</legend>
            <label htmlFor="startDate">From</label>
            <input id="startDate" type="date" />
            <br />
            <br />
            <label htmlFor="endDate">To</label>
            <input id="endDate" type="date" />
          </fieldset>

          <button type="submit" className="collection-button">
            Apply Filters
          </button>
          <button type="reset" className="collection-button">
            Clear
          </button>
        </form>

        <h2>Results</h2>
        <p id="result-count">0 posts match your filters.</p>
      </main>

      <Footer />
    </div>
  );
}