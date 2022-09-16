import { Routes, Route} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Principal from "./Pages/Principal/Principal";


function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Principal/>}/>
      <Route exact path="/home" element={<Home/>}/>
    </Routes>
  );
}

export default App;