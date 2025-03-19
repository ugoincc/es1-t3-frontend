import { useState, useEffect } from "react";
import axios from "axios";

export function useReceitas(cpfPaciente) {
  const [receitas, setReceitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReceitas = async () => {
      try {
        const endpoint = `http://localhost:8080/MyServicos/BuscarReceita?cpf=${encodeURIComponent(
          cpfPaciente
        )}`;
        const response = await axios.get(endpoint);
        setReceitas(response.data);
      } catch (err) {
        setError(err.message || "Erro ao carregar pacientes");
      } finally {
        setLoading(false);
      }
    };

    fetchReceitas();
  }, [cpfPaciente]);

  return { receitas, loading, error };
}

export default useReceitas;
