import { BrowserRouter, Routes, Route } from "react-router-dom";
// Layout
import { BubbleLayout } from "./components/BubbleLayout";
import { SimpleLayout } from "./components/SimpleLayout";
import { MainLayout } from "./components/MainLayout";
// Pages
import LoginPage from "./pages/LoginPage";
import StartPage from "./pages/StartPage";
import MainPage from "./pages/MainPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import AddressPage from "./pages/AddressPage";
import SelectKWPage from "./pages/SelectKWPage";
import FindPWPage from "./pages/FindPWPage";
import NewPWPage from "./pages/NewPWPage";
import CompletePage from "./pages/CompletePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BubbleLayout />}>
          <Route path="/" element={<StartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/address" element={<AddressPage />} />
          <Route path="/select-keyword" element={<SelectKWPage />} />
          <Route path="/complete" element={<CompletePage />} />
        </Route>
        <Route element={<SimpleLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/find-password" element={<FindPWPage />} />
          <Route path="/new-password" element={<NewPWPage />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/main" element={<MainPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
