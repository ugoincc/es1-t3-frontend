import React, { useEffect } from "react";
import useAddress from "../../../api/hooks/useAddress";

function AddressSection({ register, errors, setValue }) {
  const { cep, erroCep, endereco, handleCepChange } = useAddress();

  useEffect(() => {
    if (cep && endereco) {
      setValue("cep", cep);
      setValue("logradouro", endereco.logradouro?.nome);
      setValue("bairro", endereco.bairro?.nome);
      setValue("cidade", endereco.cidade?.nome);
      setValue("estado", endereco.estado?.nome);
      setValue("uf", endereco.uf?.nome);
      setValue("complemento", endereco.complemento);
    }
  }, [cep, endereco, setValue]);

  return (
    <div className="flex flex-wrap">
      <div className="w-full md:w-1/2 text-left mb-3 p-1">
        <label htmlFor="inputCEP" className="form-label text-black">
          CEP
        </label>
        <input
          type="text"
          className="border rounded p-1 bg-gray-100 w-full"
          id="inputCEP"
          {...register("cep")}
        />
        {errors.cep && (
          <span className="text-red-600 text-sm block">
            {errors.cep.message}
          </span>
        )}
      </div>

      <div className="w-full md:w-1/2 text-left mb-3 p-1">
        <label htmlFor="inputTipoLogradouro" className="form-label text-black">
          Tipo de Logradouro
        </label>
        <input
          type="text"
          className="border rounded p-1 bg-gray-100 w-full"
          id="inputTipoLogradouro"
          {...register("tipoLogradouro")}
        />
        {errors.tipoLogradouro && (
          <span className="text-red-600 text-sm block">
            {errors.tipoLogradouro.message}
          </span>
        )}
      </div>

      <div className="w-full md:w-1/2 text-left mb-3 p-1">
        <label htmlFor="inputLogradouro" className="form-label text-black">
          Logradouro
        </label>
        <input
          type="text"
          className="border rounded p-1 bg-gray-100 w-full"
          id="inputLogradouro"
          {...register("logradouro")}
        />
        {errors.logradouro && (
          <span className="text-red-600 text-sm block">
            {errors.logradouro.message}
          </span>
        )}
      </div>

      <div className="w-full md:w-1/2 text-left mb-3 p-1">
        <label htmlFor="inputBairro" className="form-label text-black">
          Bairro
        </label>
        <input
          type="text"
          className="border rounded p-1 bg-gray-100 w-full"
          id="inputBairro"
          {...register("bairro")}
        />
        {errors.bairro && (
          <span className="text-red-600 text-sm block">
            {errors.bairro.message}
          </span>
        )}
      </div>

      <div className="w-full md:w-1/2 text-left mb-3 p-1">
        <label htmlFor="inputCidade" className="form-label text-black">
          Cidade
        </label>
        <input
          type="text"
          className="border rounded p-1 bg-gray-100 w-full"
          id="inputCidade"
          {...register("cidade")}
        />
        {errors.cidade && (
          <span className="text-red-600 text-sm block">
            {errors.cidade.message}
          </span>
        )}
      </div>

      <div className="w-full md:w-1/2 text-left mb-3 p-1">
        <label htmlFor="inputEstado" className="form-label text-black">
          Estado
        </label>
        <input
          type="text"
          className="border rounded p-1 bg-gray-100 w-full"
          id="inputEstado"
          {...register("estado")}
        />
        {errors.estado && (
          <span className="text-red-600 text-sm block">
            {errors.estado.message}
          </span>
        )}
      </div>

      <div className="w-full md:w-1/2 text-left mb-3 p-1">
        <label htmlFor="inputUF" className="form-label text-black">
          UF
        </label>
        <input
          type="text"
          className="border rounded p-1 bg-gray-100 w-full"
          id="inputUF"
          {...register("uf")}
        />
        {errors.uf && (
          <span className="text-red-600 text-sm block">
            {errors.uf.message}
          </span>
        )}
      </div>

      <div className="w-full md:w-1/2 text-left mb-3 p-1">
        <label htmlFor="inputNumeroCasa" className="form-label text-black">
          Número da Casa
        </label>
        <input
          type="text"
          className="border rounded p-1 bg-gray-100 w-full"
          id="inputNumeroCasa"
          {...register("numeroCasa")}
        />
        {errors.numeroCasa && (
          <span className="text-red-600 text-sm block">
            {errors.numeroCasa.message}
          </span>
        )}
      </div>

      <div className="w-full md:w-1/2 text-left mb-3 p-1">
        <label htmlFor="inputComplementoCasa" className="form-label text-black">
          Complemento da Casa
        </label>
        <input
          type="text"
          className="border rounded p-1 bg-gray-100 w-full"
          id="inputComplementoCasa"
          {...register("complementoCasa")}
        />
        {errors.complementoCasa && (
          <span className="text-red-600 text-sm block">
            {errors.complementoCasa.message}
          </span>
        )}
      </div>
    </div>
  );
}

export default AddressSection;
