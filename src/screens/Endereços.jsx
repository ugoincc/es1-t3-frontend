import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AddressSection from "../components/forms/parts/AddressSection";
import { addressSchema } from "../components/forms/validation/addressSchema";

function Endereços() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    console.log("Form Submitted", formData);
  };

  const [cepData, setCepData] = useState(null); // Estado para os dados do CEP do banco de dados
  const [cepInput, setCepInput] = useState(""); // Estado para o input do CEP

  return (
    <>
      <form
        className={`flex flex-col gap-8 text-center text-lg-start bg-white shadow p-3 mb-5 rounded overflow-y-hidden`}
        id="curriculumForm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full text-center">
          <h3 className="font-bold text-gray-800 text-2xl">
            Consulta Externa 'ViaCEP'
          </h3>
        </div>
        <AddressSection
          register={register}
          errors={errors}
          setValue={setValue}
        />

        <div className="text-end">
          <button
            type="submit"
            className="border rounded p-2 bg-blue-900 text-white max-w-1/8"
          >
            Registrar Endereço
          </button>
        </div>
      </form>
      <div
        className={`flex flex-col gap-8 text-center text-lg-start bg-white shadow p-3 mb-5 rounded overflow-y-hidden`}
        id="curriculumForm"
      >
        <div className="w-full text-center">
          <h3 className="font-bold text-gray-800 text-2xl">
            Consulta ao Banco de dados
          </h3>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Digite o CEP"
              className="border rounded p-2 flex-grow"
              value={cepInput}
              onChange={(e) => setCepInput(e.target.value)}
            />
            <button
              type="button"
              className="border rounded p-2 bg-blue-900 text-white"
              onClick={() => {
                // Aqui você pode adicionar a lógica para buscar o CEP no banco de dados
                console.log("Buscar CEP no banco de dados:", cepInput);
              }}
            >
              Buscar CEP
            </button>
            {cepData && (
              <div className="border rounded p-4 bg-gray-50">
                <h4 className="font-bold text-gray-800 text-xl mb-2">
                  Dados do CEP
                </h4>
                <p>
                  <strong>CEP:</strong> {cepData.cep}
                </p>
                <p>
                  <strong>Logradouro:</strong> {cepData.logradouro}
                </p>
                <p>
                  <strong>Bairro:</strong> {cepData.bairro}
                </p>
                <p>
                  <strong>Cidade:</strong> {cepData.localidade}
                </p>
                <p>
                  <strong>Estado:</strong> {cepData.uf}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Endereços;
