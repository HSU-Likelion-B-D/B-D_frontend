import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage";
import { BubbleLayout } from "./components/BubbleLayout";
import { SimpleLayout } from "./components/SimpleLayout";
import { LoginPage } from "./pages/LoginPage";

import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";

import { FindPWPage } from "./pages/FindPWPage";
import { NewPWPage } from "./pages/NewPWPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BubbleLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/profile" element={<ProfilePage />} />
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
