import "./App.css";
import Header from "./containers/Header";
import MainContent from "./containers/MainContent";
import Footer from "./containers/Footer";

function App() {
  return (
    <div className="d-flex flex-column sticky-footer-wrapper min-vh-100">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
