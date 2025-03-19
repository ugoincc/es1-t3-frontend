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

        if (response.status === 200) {
          setReceitas(response.data);
        } else {
          setError("Erro ao carregar receitas.");
        }
      } catch (err) {
        setError(err.message || "Erro ao carregar receitas.");
      } finally {
        setLoading(false);
      }
    };

    if (cpfPaciente) {
      fetchReceitas();
    }
  }, [cpfPaciente]);

  return { receitas, loading, error };
}

export default useReceitas;
