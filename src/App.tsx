import { StrictMode } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./screens/HomePage";
import AppLayout from "./layout/AppLayout";

function App() {
  return (
    <StrictMode>
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/homepage" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/homepage" replace />} />
          </Route>
        </Routes>
      </Router>
    </StrictMode>
  );
}

export default App;
