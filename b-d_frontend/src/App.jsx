import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import { BubbleLayout } from "./components/BubbleLayout";
import { SimpleLayout } from "./components/SimpleLayout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BubbleLayout />}>
          <Route path="/" element={<MainPage />} />
        </Route>
        <Route element={<SimpleLayout />}>
          {/* <Route path="/main" element={<MainPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
