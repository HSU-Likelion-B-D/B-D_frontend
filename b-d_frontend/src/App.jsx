import { BrowserRouter, Routes, Route } from "react-router-dom";
// Layout
import { BubbleLayout } from "./components/BubbleLayout";
import { SimpleLayout } from "./components/SimpleLayout";
import { MainLayout } from "./components/MainLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
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
import CreateProposalPage from "./pages/CreateProposalPage";
import PaymentManagePage from "./pages/PaymentManagePage";
import InfluencerMatchingPage from "./pages/InfluencerMatchingPage";
import InfluencerMainPage from "./pages/InfluencerMainPage";
import BusinessMatchingPage from "./pages/BusinessMatchingPage";
import InfluencerCreateProposalPage from "./pages/InfluencerCreateProposalPage";
import InfluencerProfilePage from "./pages/InfluencerProfilePage";
import InfluencerAccountPage from "./pages/InfluencerAccountPage";
import InfluencerIntroducePage from "./pages/InfluencerIntroducePage";
import InfluencerSelectKWPage from "./pages/InfluencerSelectKWPage";
import InfluencerCostPage from "./pages/InfluencerCostPage";
import InfluencerCompletePage from "./pages/InfluencerCompletePage";
import InfluencerPaymentManagePage from "./pages/InfluencerPaymentManagePage";
import StoreTimePage from "./pages/StoreTimePage";
import StoreCostPage from "./pages/StoreCostPage";
import InfoEditCompletePage from "./pages/InfoEditCompletePage";
import InfluencerInfoEditCompletePage from "./pages/InfluencerInfoEditCompletePage";
import BdStartPage from "./pages/BdStartPage";
import BusinessMyPage from "./pages/BusinessMyPage";
import InfluencerMyPage from "./pages/InfluencerMyPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<BubbleLayout />}>
            <Route path="/address" element={<AddressPage />} />
            <Route path="/select-keyword" element={<SelectKWPage />} />
            <Route path="/complete" element={<CompletePage />} />
            <Route path="/business-profile" element={<ProfilePage />} />

            <Route
              path="/influencer-profile"
              element={<InfluencerProfilePage />}
            />
            <Route
              path="/influencer-account"
              element={<InfluencerAccountPage />}
            />
            <Route
              path="/influencer-introduce"
              element={<InfluencerIntroducePage />}
            />
            <Route
              path="/influencer-select-keyword"
              element={<InfluencerSelectKWPage />}
            />
            <Route path="/influencer-cost" element={<InfluencerCostPage />} />
            <Route
              path="/influencer-complete"
              element={<InfluencerCompletePage />}
            />
            <Route path="/store-time" element={<StoreTimePage />} />
            <Route path="/store-cost" element={<StoreCostPage />} />
            <Route
              path="/info-edit-complete"
              element={<InfoEditCompletePage />}
            />
            <Route
              path="/influencer-info-edit-complete"
              element={<InfluencerInfoEditCompletePage />}
            />
          </Route>
          <Route element={<MainLayout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/influencer-main" element={<InfluencerMainPage />} />
            <Route path="/create-proposal" element={<CreateProposalPage />} />
            <Route
              path="/influencer-create-proposal"
              element={<InfluencerCreateProposalPage />}
            />
            <Route path="/payment-manage" element={<PaymentManagePage />} />
            <Route
              path="/influencer-matching"
              element={<InfluencerMatchingPage />}
            />
            <Route
              path="/business-matching"
              element={<BusinessMatchingPage />}
            />
            <Route
              path="/influencer-payment-manage"
              element={<InfluencerPaymentManagePage />}
            />
            <Route path="/business-mypage" element={<BusinessMyPage />} />
            <Route path="/influencer-mypage" element={<InfluencerMyPage />} />
          </Route>
        </Route>
        <Route element={<SimpleLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/find-password" element={<FindPWPage />} />
          <Route path="/new-password" element={<NewPWPage />} />
        </Route>
        <Route element={<BubbleLayout />}>
          <Route path="/bd-start" element={<BdStartPage />} />
          <Route path="/start" element={<StartPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
