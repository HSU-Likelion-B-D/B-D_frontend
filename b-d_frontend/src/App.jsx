import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage.jsx";
import StartPage from "./pages/StartPage";
import { BubbleLayout } from "./components/BubbleLayout";
import { SimpleLayout } from "./components/SimpleLayout";
import { LoginPage } from "./pages/LoginPage";
import { FindPWPage } from "./pages/FindPWPage";
import { NewPWPage } from "./pages/NewPWPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BubbleLayout />}>
          <Route path="/" element={<StartPage />} />
        </Route>
        <Route element={<SimpleLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/find-password" element={<FindPWPage />} />
          <Route path="/new-password" element={<NewPWPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
