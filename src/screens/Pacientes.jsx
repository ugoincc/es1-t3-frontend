import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import PacienteCard from "../components/PacienteCard";
import { usePacienteByQuery } from "../api/hooks/usePacienteByQuery";

function Pacientes() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [isDebouncing, setIsDebouncing] = useState(false);
  const { pacienteData, loading, error } = usePacienteByQuery(debouncedTerm);

  useEffect(() => {
    if (searchTerm) {
      setIsDebouncing(true);
    }

    const debounceTimer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
      setIsDebouncing(false);
    }, 1200);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleNavigation = (path) => {
    if (path) navigate(path);
  };

  const renderResults = () => {
    if (isDebouncing || loading)
      return <p className="text-blue-500">Carregando dados...</p>;
    if (error) return <p className="text-red-600">{error}</p>;
    if (Array.isArray(pacienteData) && pacienteData.length === 0) {
      return (
        <p className="text-gray-600">Não há pacientes com esta descrição...</p>
      );
    }
    if (Array.isArray(pacienteData)) {
      return pacienteData.map((paciente) => (
        <PacienteCard key={paciente.id} paciente={paciente} />
      ));
    }
    return null;
  };

  return (
    <div className="flex flex-row-reverse h-full w-full gap-6">
      <div className="flex flex-col gap-2 border border-2 p-2 border-gray-300 rounded-lg h-full shadow-md">
        <button
          className="flex flex-col w-full max-w-sm rounded p-3 bg-blue-900 text-white hover:bg-blue-700 transition"
          onClick={() => handleNavigation("/cadastrarPaciente")}
        >
          <div className="text-2xl">Cadastrar Paciente</div>
          <div className="text-md text-gray-200 p-1">
            Registre um novo paciente e seu endereço
          </div>
        </button>

        <div className="patientcard border border-2 border-gray-300 rounded-lg h-full shadow-md"></div>
      </div>
      <div className="flex flex-col w-[80%] h-full justify-center border border-2 border-gray-300 text-center rounded-lg p-2 shadow-md gap-2">
        <form
          className="align-items-center w-full"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Busque por pacientes pelo nome ou CPF..."
            aria-label="Campo de busca de pacientes"
            className="w-full p-2 border rounded"
          />
        </form>

        <div className="cardlist border border-2 border-gray-300 rounded-lg h-full overflow-y-scroll">
          <section className="p-2">{renderResults()}</section>
        </div>
      </div>
    </div>
  );
}

export default Pacientes;
