import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UploadForm from "./components/UploadForm";
import ImagesPage from "./components/ImagesPage";

function App() {
  return (
    <Router>
      <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
        <Link to="/" style={{ marginRight: "1rem" }}>Upload</Link>
        <Link to="/images">View Images</Link>
      </nav>

      <Routes>
        <Route path="/" element={<UploadForm />} />
        <Route path="/images" element={<ImagesPage />} />
      </Routes>
    </Router>
  );
}

// Optional wrapper to navigate after upload
// function UploadFormWithNav() {
//   const navigate = useNavigate();
//   return <UploadForm onUploadSuccess={() => navigate("/images")} />;
// }

export default App;