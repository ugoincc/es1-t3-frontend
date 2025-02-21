import { useState, useEffect } from "react";
import axios from "axios";

export function usePacienteByQuery(cpfPaciente) {
  const [pacienteData, setPacienteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const endpoint = cpfPaciente
          ? `http://localhost:8080/ServicosPaciente/consultarpac?cpfPaciente=${encodeURIComponent(
              cpfPaciente
            )}`
          : "http://localhost:8080/ServicosPaciente/paciente";
        const response = await axios.get(endpoint);
        setPacienteData(response.data);
      } catch (err) {
        setError(err.message || "Erro ao carregar dados do paciente");
      } finally {
        setLoading(false);
      }
    };

    fetchPaciente();
  }, [cpfPaciente]);

  return { pacienteData, loading, error };
}

export default usePacienteByQuery;
