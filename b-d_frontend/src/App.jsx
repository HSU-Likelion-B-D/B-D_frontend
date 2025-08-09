import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignupPage from "./pages/SignupPage.jsx";

import MainPage from "./pages/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<SignupPage />} />

        <Route path="/" element={<MainPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
