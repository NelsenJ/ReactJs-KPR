// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Home"
import Container from "./components/items/container"
import KPR from "./pages/KPR";
import Calculator from "./pages/Calc";
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
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;