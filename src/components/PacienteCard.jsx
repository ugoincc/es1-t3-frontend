import React from "react";

function PacienteCard({ paciente }) {
  return (
    <div className="border border-2 border-gray-300 flex flex-col sm:flex-row gap-4 text-center rounded-lg p-4 my-2 shadow-md">
      <div className="flex-1 text-center">
        <h4 className="text-xl font-bold text-gray-700">
          {paciente.nomePaciente}
        </h4>
        <p className="text-gray-600">
          <strong>Paciente:</strong> {paciente.nomePaciente}
        </p>
      </div>
      <div className="flex-1 max-w-md text-gray-600">
        <p>
          <strong>CPF:</strong> {paciente.cpfPaciente}
        </p>
        <p>
          <strong>Endereço ID:</strong> {paciente.idEndereco}
        </p>
        <p>
          <strong>Número da Casa:</strong> {paciente.nroCasa}
        </p>
        <p>
          <strong>Complemento:</strong> {paciente.complementoCasa}
        </p>
      </div>
    </div>
  );
}

export default PacienteCard;
