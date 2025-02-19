import React, { useEffect } from "react";
import useAddress from "../../../api/hooks/useAddress";

function AddressSection({ register, errors, setValue }) {
  const { cep, erroCep, endereco, handleCepChange } = useAddress();

  useEffect(() => {
    if (cep && endereco) {
      setValue("cep", cep);
      setValue("logradouro", endereco.logradouro);
      setValue("bairro", endereco.bairro);
      setValue("cidade", endereco.cidade);
      setValue("estado", endereco.estado);
      setValue("uf", endereco.uf);
      setValue("complemento", endereco.complemento);
    }
  }, [cep, endereco, setValue]);

  return (
    <div className="flex flex-wrap">
      <div className="w-full text-xl font-bold pt-3 border-t text-xl">
        Endereço
      </div>

      <div className="w-full md:w-2/8 text-left mb-3 p-1 min-h-[80px]">
        <label htmlFor="inputZip" className="form-label text-black">
          CEP
        </label>
        <input
          type="text"
          className="border rounded p-1 bg-gray-100 w-full"
          id="inputZip"
          placeholder="Ex: 85865140"
          {...register("cep")}
          value={cep}
          onChange={handleCepChange}
        />
        {erroCep && <span className="text-danger">{erroCep}</span>}
        {errors.cep && (
          <span className="text-red-600 text-sm block ">
            {errors.cep.message}
          </span>
        )}
      </div>

      <div className="w-full md:w-1/4 text-start mb-3 p-1 min-h-[80px]">
        <label htmlFor="inputCidade" className="form-label text-black">
          Cidade
        </label>
        <input
          type="text"
          className="border rounded p-1 bg-gray-100 w-full"
          id="inputCidade"
          {...register("cidade")}
          value={endereco.cidade || ""}
        />
      </div>

      <div className="w-full md:w-3/8 text-start mb-3 p-1">
        <label htmlFor="inputEstado" className="form-label text-black">
          Estado
        </label>
        <input
          type="text"
          className="border rounded p-1 bg-gray-100 w-full"
          id="inputEstado"
          {...register("estado")}
          value={endereco.estado || ""}
          readOnly
        />
      </div>

      <div className="w-full md:w-1/8 text-start mb-3 p-1">
        <label htmlFor="inputUf" className="form-label text-black">
          UF
        </label>
        <input
          type="text"
          className="border rounded p-1 bg-gray-100 w-full"
          id="inputUf"
          {...register("uf")}
          value={endereco.uf || ""}
          readOnly
        />
      </div>

      <div className="w-full md:w-4/12 text-left mb-3 p-1">
        <label htmlFor="inputAddress" className="form-label text-black">
          Rua
        </label>
        <input
          type="text"
          className="border rounded p-1 bg-gray-100 w-full"
          id="inputAddress"
          {...register("logradouro")}
          value={endereco.logradouro || ""}
          readOnly
        />
      </div>

      <div className="w-full md:w-4/12 text-left mb-3 p-1">
        <label htmlFor="inputComplemento" className="form-label text-black">
          Complemento
        </label>
        <input
          type="text"
          className="border rounded p-1 bg-gray-100 w-full"
          id="inputComplemento"
          {...register("complemento")}
          value={endereco.complemento || ""}
          readOnly
        />
      </div>

      <div className="w-full md:w-2/12 text-left mb-3 p-1">
        <label htmlFor="inputNeighborhood" className="form-label text-black">
          Bairro
        </label>
        <input
          type="text"
          className="border rounded p-1 bg-gray-100 w-full"
          id="inputNeighborhood"
          {...register("bairro")}
          value={endereco.bairro || ""}
          readOnly
        />
      </div>

      <div className="w-full md:w-2/12 text-left mb-3 p-1">
        <label htmlFor="inputAddressNumber" className="form-label text-black">
          Nº
        </label>
        <input
          type="number"
          className="border rounded p-1 bg-gray-100 w-full"
          id="inputAddressNumber"
          {...register("addressNumber")}
        />
      </div>
    </div>
  );
}

export default AddressSection;
