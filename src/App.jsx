import { StrictMode } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./screens/HomePage";
import AppLayout from "./layout/AppLayout";
import Receitas from "./screens/Receitas";
import Pacientes from "./screens/Pacientes";
import Endereços from "./screens/Endereços";
import PacienteForm from "./components/forms/PacienteForm";
import ChatBot from "./screens/ChatBot";
import ReceitaForm from "./components/forms/ReceitaForm";

function App() {
  return (
    <StrictMode>
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/chatbot" element={<ChatBot />} />
            <Route path="/cadastrarReceita" element={<ReceitaForm />} />

            <Route path="/receitas" element={<Receitas />} />
            <Route path="/pacientes" element={<Pacientes />} />
            <Route path="/enderecos" element={<Endereços />} />
            <Route path="/cadastrarPaciente" element={<PacienteForm />} />
            <Route path="*" element={<Navigate to="/homepage" replace />} />
          </Route>
        </Routes>
      </Router>
    </StrictMode>
  );
}

export default App;
