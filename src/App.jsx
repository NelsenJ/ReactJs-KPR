// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/homepage"
import Container from "./components/items/container"
import KPR from "./components/kpr";
import PENSI from "./components/pensiun";
import { ThemeProvider } from "./components/contexts/themeContext";
import 'boxicons'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Container><Homepage /></Container>} />
          <Route path="/KPR" element={<Container><KPR /></Container>} />
          <Route path="/PENSI" element={<Container><PENSI /></Container>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;