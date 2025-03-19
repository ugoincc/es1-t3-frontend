import { useState, useEffect } from "react";
import axios from "axios";

export function useReceitas() {
  const [receitas, setReceitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReceitas = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/MyServicos/receitas"
        );
        setReceitas(response.data);
      } catch (err) {
        setError(err.message || "Erro ao carregar pacientes");
      } finally {
        setLoading(false);
      }
    };

    fetchReceitas();
  }, []);

  return { receitas, loading, error };
}

export default useReceitas;
