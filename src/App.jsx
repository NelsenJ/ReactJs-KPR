// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/homepage"
import Container from "./components/items/container"
import KPR from "./components/kpr";
import { ThemeProvider } from "./components/contexts/ThemeContext";
import 'boxicons'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Container><Homepage /></Container>} />
          <Route path="/KPR" element={<Container><KPR /></Container>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;