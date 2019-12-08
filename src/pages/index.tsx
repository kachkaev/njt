import React from "react";

const IndexPage = () => (
  <div>
    <div className="hero">
      <h1 className="title">🐸 njt 🐸</h1>
      <p className="description">npm 🐸 jump 🐸 to</p>

      <div className="wip">
        work in progress
        <br />
        <a href="https://github.com/kachkaev/njt">
          https://github.com/kachkaev/njt
        </a>
      </div>

      <style jsx>{`
        :global(body) {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
            Helvetica, sans-serif;
        }
        nav {
          text-align: center;
        }
        ul {
          display: flex;
          justify-content: space-between;
        }
        nav > ul {
          padding: 4px 16px;
        }
        li {
          display: flex;
          padding: 6px 8px;
        }
        a {
          color: #067df7;
          text-decoration: none;
          font-size: 13px;
        }

        .hero {
          width: 100%;
          color: #333;
        }
        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
        }
        .title,
        .description {
          text-align: center;
        }
        .wip {
          max-width: 880px;
          margin: 80px auto 40px;
          text-align: center;
        }
      `}</style>
    </div>
  </div>
);

export default IndexPage;
