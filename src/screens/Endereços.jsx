import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AddressSection from "../components/forms/parts/AddressSection";
import { useLocalAddress } from "../api/hooks/useLocalAddress";

function Endereços() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { cep, erroCep, endereco, handleCepChange, buscarEndereco } =
    useLocalAddress();

  const [cepData, setCepData] = useState(null);
  const [cepInput, setCepInput] = useState("");

  const onSubmit = (formData) => {
    console.log("Form Submitted", formData);
  };

  const handleBancoBuscaCep = async () => {
    try {
      await buscarEndereco(cepInput); // Chama o hook para buscar o endereço
      setCepData(endereco); // Atualiza o estado com os dados retornados
    } catch (error) {
      console.error("Erro ao buscar CEP no banco:", error);
      setCepData(null); // Limpa o estado em caso de erro
    }
  };

  return (
    <>
      <form
        className={`flex flex-col gap-8 text-center text-lg-start bg-white shadow p-3 mb-5 rounded overflow-y-hidden`}
        id="curriculumForm"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/*

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
        */}
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
              onClick={handleBancoBuscaCep}
            >
              Buscar CEP
            </button>
          </div>
          {cepData && (
            <div className="border rounded p-4 bg-gray-50">
              <h4 className="font-bold text-gray-800 text-xl mb-2">
                Dados do CEP
              </h4>
              <p>
                <strong>CEP:</strong> {cepData.cep || cepInput}
              </p>
              <p>
                <strong>Logradouro:</strong> {cepData.logradouro}
              </p>
              <p>
                <strong>Bairro:</strong> {cepData.bairro}
              </p>
              <p>
                <strong>Cidade:</strong> {cepData.cidade}
              </p>
              <p>
                <strong>Estado:</strong> {cepData.uf}
              </p>
            </div>
          )}
          {erroCep && <p className="text-red-500">{erroCep}</p>}
        </div>
      </div>
    </>
  );
}

export default Endereços;
