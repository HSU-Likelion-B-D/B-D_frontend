import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignupPage from "./pages/SignupPage.jsx";

import MainPage from "./pages/MainPage";
import { BubbleLayout } from "./components/BubbleLayout";
import { SimpleLayout } from "./components/SimpleLayout";
import { LoginPage } from "./pages/LoginPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BubbleLayout />}>
          <Route path="/" element={<MainPage />} />
        </Route>
        <Route element={<SimpleLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
