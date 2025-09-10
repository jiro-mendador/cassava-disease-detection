import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SecondPage from "./pages/SecondPage";
import RoutePageNotFound404 from "./pages/RoutePageNotFound404";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/second-page" element={<SecondPage />} />
      {/* IF USER ACCESSED UNAVAILABLE PAGE */}
      <Route path="*" element={<RoutePageNotFound404 />} />
    </Routes>
  );
}

export default App;
