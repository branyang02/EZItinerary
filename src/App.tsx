import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} /> */}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
