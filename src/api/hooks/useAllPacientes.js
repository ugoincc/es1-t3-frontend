import { useState, useEffect } from "react";
import axios from "axios";

export function useAllPacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/MyServicos/paciente"
        );
        setPacientes(response.data);
      } catch (err) {
        setError(err.message || "Erro ao carregar pacientes");
      } finally {
        setLoading(false);
      }
    };

    fetchPacientes();
  }, []);

  return { pacientes, loading, error };
}

export default useAllPacientes;
