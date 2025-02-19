import React from "react";
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

  return (
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
      <AddressSection register={register} errors={errors} setValue={setValue} />

      <div className="text-end">
        <button
          type="submit"
          className="border rounded p-2 bg-blue-900 text-white max-w-1/8"
        >
          Registrar Endereço
        </button>
      </div>
    </form>
  );
}

export default Endereços;
