import React from "react";
import { useState } from "react";
function PersonalDataSection({ register, errors }) {
  const [sexo, setSexo] = useState("masculino");

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full text-xl font-bold pt-3 border-t text-gray-800">
          Dados pessoais
        </div>

        <div className="w-full md:w-3/4 text-left mb-3 p-1 min-h-[90px]">
          <label htmlFor="inputName" className="form-label text-black m-1">
            Nome Completo
          </label>
          <input
            type="text"
            className="border rounded p-1 bg-gray-100 w-full"
            id="inputName"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-red-600 text-sm block">
              {errors.name.message}
            </span>
          )}
        </div>

        <div className="w-full md:w-1/4 text-left mb-3 p-1 min-h-[80px]">
          <label htmlFor="inputCPF" className="form-label text-black m-1">
            CPF
          </label>
          <input
            type="number"
            className="border rounded p-1 bg-gray-100 w-full"
            id="inputCPF"
            {...register("cpf")}
          />
          {errors.cpf && (
            <span className="text-red-600 text-sm block">
              {errors.cpf.message}
            </span>
          )}
        </div>

        <div className="w-full md:w-1/4 text-left mb-3 p-1 min-h-[80px]">
          <label htmlFor="inputPhone" className="form-label text-black">
            Telefone
          </label>
          <input
            type="number"
            className="border rounded p-1 bg-gray-100 w-full"
            id="inputPhone"
            {...register("phone")}
          />
          {errors.phone && (
            <span className="text-red-600 text-sm block">
              {errors.phone.message}
            </span>
          )}
        </div>

        <div className="w-full md:w-1/4 text-left mb-3 p-1">
          <label htmlFor="inputEmail" className="form-label text-black">
            E-mail
          </label>
          <input
            type="email"
            className="border rounded p-1 bg-gray-100 w-full"
            id="inputEmail"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-600 text-sm block">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="w-full md:w-1/4 text-left mb-3 p-1">
          <label htmlFor="inputEmail" className="form-label text-black">
            Nascimento
          </label>
          <input
            type="datetime-local"
            className="border rounded p-1 bg-gray-100 w-full"
            id="inputBirthday"
          />
        </div>
        <div className="w-full flex items-center justify-around md:w-1/4 text-left mb-3 p-1">
          <label>
            <input
              type="radio"
              name="sexo"
              value="masculino"
              checked={sexo === "masculino"}
              onChange={(e) => setSexo(e.target.value)}
            />
            Masculino
          </label>

          <label>
            <input
              type="radio"
              name="sexo"
              value="feminino"
              checked={sexo === "feminino"}
              onChange={(e) => setSexo(e.target.value)}
            />
            Feminino
          </label>
        </div>
      </div>
    </>
  );
}

export default PersonalDataSection;
