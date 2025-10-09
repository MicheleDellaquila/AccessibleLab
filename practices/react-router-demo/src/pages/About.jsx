import { useRef, useEffect } from "react";
import { Helmet } from "react-helmet";

const About = () => {
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
      liveRegion.textContent = "Navigated to About page";
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
    <>
      <head>
        <title>About - React Router Dom</title>
      </head>
      <div className="page-content">
        <h1
          id="home-title"
          ref={headingRef}
          aria-labelledby="title-doc home-title"
          tabIndex="-1"
          className="page-heading"
        >
          About This Project
        </h1>
        <span id="title-doc" className="sr-only">
          About | MD
        </span>

        <section aria-labelledby="project-info">
          <h2 id="project-info">About AccessibleLab</h2>
          <p>
            AccessibleLab is a repository dedicated to fostering learning and
            practical application of Web Content Accessibility Guidelines (WCAG)
            standards.
          </p>
          <p>
            This React Router demo is part of the practices folder, designed to
            help developers understand how to implement proper document title
            management in single-page applications.
          </p>
        </section>

        <section aria-labelledby="document-titles">
          <h2 id="document-titles">Why Document Titles Matter</h2>
          <p>Document titles are crucial for web accessibility because they:</p>
          <ul>
            <li>
              Help users understand what page they're on, especially when
              browsing multiple tabs
            </li>
            <li>
              Are the first thing screen readers announce when a page loads
            </li>
            <li>
              Appear in browser history, bookmarks, and search engine results
            </li>
            <li>Help users navigate back to specific pages</li>
            <li>Provide context for users with cognitive disabilities</li>
          </ul>
        </section>

        <section aria-labelledby="spa-challenge">
          <h2 id="spa-challenge">The Single-Page Application Challenge</h2>
          <p>
            In traditional multi-page websites, each page load automatically
            updates the document title. However, in single-page applications
            (SPAs) like those built with React Router, navigation happens
            without page reloads.
          </p>
          <p>
            This creates an accessibility challenge: users (especially those
            using assistive technologies) may not realize the page content has
            changed. The solution involves:
          </p>
          <ol>
            <li>
              Programmatically updating the document title on route changes
            </li>
            <li>Managing focus to help users understand context</li>
            <li>Using ARIA live regions to announce changes</li>
          </ol>
        </section>

        <section aria-labelledby="implementation">
          <h2 id="implementation">Implementation Approach</h2>
          <p>
            This demo uses React's <code>useEffect</code> hook to:
          </p>
          <ul>
            <li>
              <strong>Update the document title</strong> when the component
              mounts
            </li>
            <li>
              <strong>Focus the main heading</strong> to provide context for
              screen readers
            </li>
            <li>
              <strong>Create an ARIA live region</strong> to announce the page
              change
            </li>
            <li>
              <strong>Clean up properly</strong> when the component unmounts
            </li>
          </ul>

          <div className="code-example">
            <h3>Code Example:</h3>
            <pre aria-label="React useEffect example for document title management">
              <code>{`useEffect(() => {
  // Update document title
  document.title = 'About - React Router Demo'
  
  // Focus the main heading
  if (headingRef.current) {
    headingRef.current.focus()
  }

  // Announce to screen readers
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', 'polite')
  announcement.textContent = 'Navigated to About page'
  document.body.appendChild(announcement)

  // Cleanup
  return () => {
    if (document.body.contains(announcement)) {
      document.body.removeChild(announcement)
    }
  }
}, [])`}</code>
            </pre>
          </div>
        </section>

        <section aria-labelledby="best-practices">
          <h2 id="best-practices">Best Practices</h2>
          <ul>
            <li>
              <strong>Be descriptive:</strong> Titles should clearly describe
              the page content
            </li>
            <li>
              <strong>Be unique:</strong> Each page should have a different
              title
            </li>
            <li>
              <strong>Follow a pattern:</strong> Use consistent formatting like
              "Page Name - Site Name"
            </li>
            <li>
              <strong>Keep it concise:</strong> Aim for 60 characters or less
            </li>
            <li>
              <strong>Put important info first:</strong> The most specific
              information should come first
            </li>
          </ul>
        </section>

        <section aria-labelledby="author">
          <h2 id="author">Author</h2>
          <p>
            <strong>Michele Dellaquila</strong> - Passionate about web
            accessibility and creating inclusive web experiences.
          </p>
        </section>
      </div>
    </>
  );
};

export default About;
