import Navbar from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";
import Routes from "./router/Routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      {/* <div className="flex">
        <Navbar />
      </div> */}

      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes />
      </BrowserRouter>
    </>
  );
}

export default App;
