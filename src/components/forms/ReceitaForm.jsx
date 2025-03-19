import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import AutoCompleteInput from "../autoCompleteInput";

function ReceitaForm() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      prescricoes: [
        {
          nomeMedicamento: "",
          bulaMedicamento: "",
          inicioUso: "",
          fimUso: "",
          posologia: "",
        },
      ],
    },
  });

  // Gerencia as prescrições dinamicamente
  const { fields, append, remove } = useFieldArray({
    control,
    name: "prescricoes",
  });

  useEffect(() => {
    setValue("dataEmissao", new Date().toISOString().split("T")[0]); // Define a data atual
  }, [setValue]);

  // Submissão do formulário
  const onSubmit = async (formData) => {
    const receitaData = {
      medico: { nome: formData.medico },
      paciente: { nome: formData.paciente },
      numeroReceita: formData.numeroReceita,
      dataEmissao: formData.dataEmissao,
      tratamento: {
        codigoCID: formData.codigoCID,
        nomeCID: formData.nomeCID,
      },
      observacaoMedica: formData.observacaoMedica,
      prescricoes: formData.prescricoes.filter((p) => p.nomeMedicamento), // Remove campos vazios
    };
    console.log(receitaData);

    try {
      const response = await fetch(
        "http://localhost:8080/MyServicos/insertRec",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(receitaData),
        }
      );

      if (!response.ok) throw new Error("Erro ao cadastrar receita");

      alert("Receita cadastrada com sucesso!");
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao enviar os dados");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap">
        <div className="flex flex-row w-full items-center">
          <AutoCompleteInput onSelect={(nome) => setValue("medico", nome)} />

          <div className="border rounded p-1 items-center bg-gray-100 flex justify-between md:w-1/4 ">
            <label className="form-label text-black">Data de Emissão</label>
            <input
              type="hidden"
              {...register("dataEmissao")}
              value={new Date().toISOString().split("T")[0]}
            />
            <p>{new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-1">
          <label className="form-label text-black">Nome do Paciente</label>
          <input
            type="text"
            className="border rounded p-1 bg-gray-100 w-full"
            {...register("paciente")}
          />
        </div>

        <div className="w-full md:w-1/2 p-1">
          <label className="form-label text-black">Número da Receita</label>
          <input
            type="text"
            className="border rounded p-1 bg-gray-100 w-full"
            {...register("numeroReceita")}
          />
        </div>

        <div className="w-full md:w-1/2 p-1">
          <label className="form-label text-black">Código CID</label>
          <input
            type="text"
            className="border rounded p-1 bg-gray-100 w-full"
            {...register("codigoCID")}
          />
        </div>

        <div className="w-full md:w-1/2 p-1">
          <label className="form-label text-black">Nome CID</label>
          <input
            type="text"
            className="border rounded p-1 bg-gray-100 w-full"
            {...register("nomeCID")}
          />
        </div>

        <div className="w-full p-1">
          <label className="form-label text-black">Observação Médica</label>
          <textarea
            className="border rounded p-1 bg-gray-100 w-full"
            {...register("observacaoMedica")}
          ></textarea>
        </div>

        {fields.map((item, index) => (
          <div key={item.id} className="w-5/10 p-1 border rounded mb-2">
            <h3 className="font-bold flex justify-between ">
              Prescrição {index + 1}
              {fields.length > 1 && (
                <button
                  type="button"
                  className="text-red-600"
                  onClick={() => remove(index)}
                >
                  ❌ Remover
                </button>
              )}
            </h3>
            <input
              type="text"
              placeholder="Nome do Medicamento"
              className="border rounded p-1 bg-gray-100 w-full"
              {...register(`prescricoes.${index}.nomeMedicamento`)}
            />
            <input
              type="text"
              placeholder="Bula do Medicamento"
              className="border rounded p-1 bg-gray-100 w-full"
              {...register(`prescricoes.${index}.bulaMedicamento`)}
            />
            <input
              type="date"
              placeholder="Início do Uso"
              className="border rounded p-1 bg-gray-100 w-full"
              {...register(`prescricoes.${index}.inicioUso`)}
            />
            <input
              type="date"
              placeholder="Fim do Uso"
              className="border rounded p-1 bg-gray-100 w-full"
              {...register(`prescricoes.${index}.fimUso`)}
            />
            <input
              type="text"
              placeholder="Posologia"
              className="border rounded p-1 bg-gray-100 w-full"
              {...register(`prescricoes.${index}.posologia`)}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() =>
          append({
            nomeMedicamento: "",
            bulaMedicamento: "",
            inicioUso: "",
            fimUso: "",
            posologia: "",
          })
        }
        className="border-2 border-black rounded p-2 bg-green-600 text-white"
      >
        ➕ Adicionar Prescrição
      </button>

      {/* Botão de Submissão */}
      <button
        type="submit"
        className={
          fields.length === 0
            ? "border-2 border-black-300 rounded p-2 bg-gray-300 text-gray-200 mt-2"
            : "border-2 border-black rounded p-2 bg-blue-900 text-white mt-2"
        }
        disabled={fields.length === 0 ? true : false}
      >
        Cadastrar Receita
      </button>
    </form>
  );
}

export default ReceitaForm;
