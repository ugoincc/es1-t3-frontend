import React, { useState } from "react";
import { pacienteSchema } from "./validation/pacienteSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PersonalDataSection from "./parts/PersonalDataSection";
import AddressSection from "./parts/AddressSection";

function PacienteForm() {
  const [isLoading, setIsLoading] = useState(false);

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
      street: "",
      neighborhood: "",
      city: "",
      state: "",
      cep: "",
      addressNumber: "",
    },
  });

  const onSubmit = async (formData) => {
    console.log(formData);
  };

  return (
    <>
      <form
        className={`flex ${
          isLoading ? "opacity-60" : "opacity-100"
        } flex-col gap-3 text-center text-lg-start bg-white shadow p-3 mb-5 rounded`}
        id="curriculumForm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full text-center">
          <section className="p-4">
            <h3 className="font-bold text-gray-800 text-2xl">
              Registrar Paciente
            </h3>
          </section>
        </div>
        <PersonalDataSection register={register} errors={errors} />
        <AddressSection
          register={register}
          errors={errors}
          setValue={setValue}
        />
        <div className="w-full text-end border-top p-3">
          <button
            type="submit"
            className="border rounded p-2 bg-blue-900 text-white disabled:bg-gray-400 disabled:text-black disabled:opacity-50 disabled:cursor:not-allowed transition duration-400"
            onClick={onSubmit}
          >
            Registrar Paciente
          </button>
        </div>
      </form>
      {isLoading && (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-10 flex items-center justify-center z-50 transition duration-500">
          <div className="text-white text-lg font-bold">Carregando...</div>
        </div>
      )}
    </>
  );
}

export default PacienteForm;
