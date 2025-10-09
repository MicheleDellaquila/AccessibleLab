import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header role="banner">
      <nav role="navigation" aria-label="Main navigation">
        <div className="nav-container">
          <div className="nav-brand">
            <h1>React Router Demo</h1>
            <p className="subtitle">
              Document Title Management for Accessibility
            </p>
          </div>

          <ul className="nav-list">
            <li>
              <Link
                to="/"
                className={`nav-link ${isActive("/") ? "active" : ""}`}
                aria-current={isActive("/") ? "page" : undefined}
              >
                Home
                {isActive("/") && (
                  <span className="sr-only"> (current page)</span>
                )}
              </Link>
            </li>
            <li>
              <Link
                role="link"
                to="/about"
                className={`nav-link ${isActive("/about") ? "active" : ""}`}
                aria-current={isActive("/about") ? "page" : undefined}
              >
                About
                {isActive("/about") && (
                  <span className="sr-only"> (current page)</span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
