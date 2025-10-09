import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import About from "./pages/About";
import "./App.css";

function App() {
  return (
    <Router>
      <div className='app'>
        {/* Skip link for keyboard navigation */}
        <a href='#main-content' className='skip-link'>
          Skip to main content
        </a>

        <Navigation />

        <main id='main-content' role='main' aria-label='Main content'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </main>

        <footer role='contentinfo'>
          <p>&copy; 2025 AccessibleLab - React Router Demo</p>
          <p>Created by Michele Dellaquila</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
