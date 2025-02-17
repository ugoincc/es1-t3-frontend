import React from "react";
import { pacienteSchema } from "./validation/pacienteSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PersonalDataSection from "./parts/PersonalDataSection";
import AddressSection from "./parts/AddressSection";

function PacienteForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(pacienteSchema),
    mode: "all",
    defaultValues: {
      name: "",
      cpf: "",
      email: "",
      phone: "",
      cep: "",
      logradouro: "",
      bairro: "",
      cidade: "",
      estado: "",
      addressNumber: "",
      uf: "",
      complemento: "",
    },
  });

  const onSubmit = (formData) => {
    console.log("Form Submitted", formData);
  };

  return (
    <form
      className={`flex flex-col gap-8 text-center text-lg-start bg-white shadow p-3 mb-5 rounded`}
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
