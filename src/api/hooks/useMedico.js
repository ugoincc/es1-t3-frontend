import { useState, useEffect } from "react";
import axios from "axios";

export function useMedico() {
  const [medicoArray, setMedicoArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const endpoint = "/endpointer";
        console.log(medicoArray);
        const response = await axios.get(endpoint);
        setMedicoArray(response.data);
      } catch (err) {
        setError(err.message || "Erro ao carregar dados do paciente");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicos();
  });

  return { medicoArray, loading, error };
}

export default usePacienteByQuery;
