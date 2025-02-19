import React from "react";
import { useNavigate } from "react-router-dom";

function PacienteCard({ paciente }) {
  return (
    <>
      <div className="border border-2 border-gray-300 justify-between items-center flex flex-col sm:flex-row gap-2 text-center rounded-lg p-4 my-2 shadow-md">
        <div className="flex-1 text-center">
          <h4 className="text-xl font-bold text-gray-700">{paciente.nome}</h4>
          <p className="text-gray-600">
            <strong>Paciente:</strong> {paciente.nome}
          </p>
        </div>
        <div className="flex-1 max-w-md text-gray-600">
          <p>
            <strong>Cidade:</strong> {paciente.cidade}
          </p>
        </div>
        <div className="flex-1 text-right">
          <button
            className="rounded p-3 bg-blue-900 text-white"
            //onClick={handleClick}
          >
            Selecionar
          </button>
        </div>
      </div>
    </>
  );
}

export default PacienteCard;
