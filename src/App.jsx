// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Home"
import Container from "./components/items/container"
import KPR from "./pages/KPR";
import Calculator from "./pages/Calc";
import PENSI from "./pages/Pensi";
import DanaDarurat from "./pages/DD";
import DpProp from "./pages/DpProp";
import { ThemeProvider } from "./components/contexts/ThemeContext";
import 'boxicons';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Container><Homepage /></Container>} />
          <Route path="/KPR" element={<Container><KPR /></Container>} />
          <Route path="/Calc" element={<Container><Calculator /></Container>} />
          <Route path="/Pensiun" element={<Container><PENSI /></Container>}/>
          <Route path="/Dana-Darurat" element={<Container><DanaDarurat /></Container>}/>
          <Route path="/Dp-Prop" element={<Container><DpProp /></Container>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;