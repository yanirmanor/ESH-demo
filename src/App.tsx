import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/Search";
import CategoryPage from "./pages/Category";
import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="flex justify-center">
        <span className="text-3xl font-bold bg-stone-400 p-4 w-full">
          ESH App
        </span>
      </div>
      <div className="p-4">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
        </Routes>
      </div>
    </Router>
  );
}
