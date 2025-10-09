import { useRef, useEffect } from "react";
import { Helmet } from "react-helmet";

const Home = () => {
  const headingRef = useRef(null);

  useEffect(() => {
    // 2. Focus the heading for keyboard/SR users
    if (headingRef.current) {
      headingRef.current.focus();
    }

    // 3. Create live region dynamically
    const liveRegion = document.createElement("div");
    liveRegion.setAttribute("role", "alert");
    liveRegion.className = "sr-only";

    // Add to DOM first (empty)
    document.body.appendChild(liveRegion);

    // 4. Announce after delay to ensure SR detects change
    const timeoutId = setTimeout(() => {
      liveRegion.textContent = "Navigated to Home page";
    }, 1000);

    // 5. Cleanup - remove live region and clear timeout
    return () => {
      clearTimeout(timeoutId);
      if (document.body.contains(liveRegion)) {
        document.body.removeChild(liveRegion);
      }
    };
  }, []);

  return (
    <div className="page-content">
      <head>
        <title>Home - React Router Dom</title>
      </head>
      <h1
        id="home-title"
        aria-labelledby="title-doc home-title"
        ref={headingRef}
        tabIndex="-1"
        className="page-heading"
      >
        Home Page
      </h1>
      <span id="title-doc" className="sr-only">
        Home - React Demo
      </span>

      <section aria-labelledby="welcome">
        <h2 id="welcome">Welcome to React Router Demo</h2>
        <p>
          This is a simple React application demonstrating proper document title
          management with React Router for accessibility.
        </p>
      </section>

      <section aria-labelledby="features">
        <h2 id="features">Key Features</h2>
        <ul>
          <li>
            <strong>Dynamic Document Titles:</strong> Each page has a unique,
            descriptive title that updates when navigating
          </li>
          <li>
            <strong>Screen Reader Announcements:</strong> Page changes are
            announced to assistive technologies using ARIA live regions
          </li>
          <li>
            <strong>Focus Management:</strong> Focus moves to the main heading
            when navigating to a new page, helping screen reader users
            understand context
          </li>
          <li>
            <strong>Semantic HTML:</strong> Proper use of landmarks and heading
            hierarchy
          </li>
          <li>
            <strong>Keyboard Navigation:</strong> Fully accessible via keyboard
          </li>
        </ul>
      </section>

      <section aria-labelledby="testing">
        <h2 id="testing">Testing Accessibility</h2>
        <p>To test the accessibility features:</p>
        <ol>
          <li>
            Navigate between Home and About pages using the navigation menu
          </li>
          <li>Watch the browser tab title change with each navigation</li>
          <li>
            Use a screen reader (NVDA, JAWS, or VoiceOver) to hear page
            announcements
          </li>
          <li>Try keyboard-only navigation using Tab and Enter keys</li>
          <li>
            Verify focus indicators are visible on all interactive elements
          </li>
        </ol>
      </section>

      <section aria-labelledby="wcag">
        <h2 id="wcag">WCAG Compliance</h2>
        <p>This implementation follows WCAG 2.1 guidelines, specifically:</p>
        <ul>
          <li>
            <strong>2.4.2 Page Titled (Level A):</strong> Web pages have titles
            that describe topic or purpose
          </li>
          <li>
            <strong>2.4.3 Focus Order (Level A):</strong> Sequential navigation
            follows a logical order
          </li>
          <li>
            <strong>4.1.3 Status Messages (Level AA):</strong> Status messages
            can be programmatically determined through role or properties
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
