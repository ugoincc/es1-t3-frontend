import React from "react";
import { useForm } from "react-hook-form";
import PersonalDataSection from "./parts/PersonalDataSection";
import AddressSection from "./parts/AddressSection";
import axios from "axios";

function PacienteForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const postPaciente = async (requestBody) => {
    const apiUrl = "http://localhost:8080/MyServicos/insertpac";

    try {
      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log("Paciente cadastrado com sucesso!", response.data);
      }
    } catch (error) {
      console.error("Erro ao cadastrar paciente:", error);
    }
  };

  const onSubmit = (formData) => {
    const requestBody = {
      nome: formData.name,
      cpf: formData.cpf,
      endereco: {
        cep: formData.cep,
        logradouro: {
          tipoLogradouro: formData.tipoLogradouro,
          nomeLogradouro: formData.logradouro,
          siglaLogradouro: formData.siglaLogradouro,
        },
        bairro: {
          nomeBairro: formData.bairro,
        },
        cidade: {
          nomeCidade: formData.cidade,
          unidadeFederativa: {
            siglaUF: formData.uf,
            nomeUF: formData.estado,
          },
        },
        numeroCasa: formData.numeroCasa,
        complementoCasa: formData.complementoCasa,
      },
      telefones: [
        {
          ddi: formData.ddi,
          ddd: formData.ddd,
          numero: formData.phone,
        },
      ],
      emails: [
        {
          email: formData.email,
        },
      ],
    };

    console.log("Form Submitted", requestBody);
    postPaciente(requestBody);
  };

  return (
    <form
      className={`flex flex-col gap-2 text-center text-lg-start bg-white shadow p-3 mb-5 rounded overflow-y-scroll`}
      id="curriculumForm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full text-center">
        <h3 className="font-bold text-gray-800 text-2xl">Registrar Paciente</h3>
      </div>
      <PersonalDataSection register={register} errors={errors} />
      <AddressSection register={register} errors={errors} setValue={setValue} />
      <div className="text-end">
        <button
          type="submit"
          className="border rounded p-2 bg-blue-900 text-white"
        >
          Registrar Paciente
        </button>
      </div>
    </form>
  );
}

export default PacienteForm;
