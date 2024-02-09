import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navs from "./Components/Navs";
import Blog from "./Views/Blog/Index";
import Entradas from "./Views/Entradas/Index";
import Create from "./Views/Entradas/Create";
import Edit from "./Views/Entradas/Edit";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Navs />
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/entradas" element={<Entradas />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
