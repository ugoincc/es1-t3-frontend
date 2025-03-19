import React from "react";

function ReceitaCard({ receita }) {
  // Convertendo a data para um formato legível
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="border border-2 border-gray-300 flex flex-col sm:flex-row gap-4 text-center rounded-lg p-4 my-2 shadow-md">
      <div className="flex-1 text-center">
        <h4 className="text-xl font-bold text-gray-700">
          Receita {receita.num_receita}
        </h4>
        <p className="text-gray-600">
          <strong>Paciente:</strong> {receita.paciente.nomePaciente}
        </p>
        <p className="text-gray-600">
          <strong>CPF:</strong> {receita.paciente.cpfPaciente}
        </p>
        <p className="text-gray-600">
          <strong>Médico:</strong> Dr. {receita.medico.primeiroNome} - CRM{" "}
          {receita.medico.CRM}
        </p>
        <p className="text-gray-600">
          <strong>Data de Emissão:</strong> {formatDate(receita.data_emissao)}
        </p>
      </div>
      <div className="flex-1 max-w-md text-gray-600">
        <p>
          <strong>Prescrição:</strong>
        </p>
        {receita.prescricao.map((item, index) => (
          <div key={index} className="mb-2">
            <p>
              <strong>Medicamento:</strong> {item.Medicamento}
            </p>
            <p>
              <strong>Bula:</strong> {item.Bula}
            </p>
            <p>
              <strong>Início do Uso:</strong> {formatDate(item.inicioUso)}
            </p>
            <p>
              <strong>Fim do Uso:</strong> {formatDate(item.fimUso)}
            </p>
            <p>
              <strong>Posologia:</strong> {item.posologia}
            </p>
          </div>
        ))}
        <p>
          <strong>Observação:</strong> {receita.Observação}
        </p>
        <p>
          <strong>CID:</strong> {receita.CID.codigoCid} - {receita.CID.NomeCid}
        </p>
      </div>
    </div>
  );
}

export default ReceitaCard;
