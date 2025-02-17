import React, { useEffect } from "react";
import useAddress from "../../../api/hooks/useAddress";

function AddressSection({ register, errors, setValue }) {
  const { cep, erroCep, endereco, handleCepChange } = useAddress();

  useEffect(() => {
    setValue("cep", cep);
    setValue("street", endereco.logradouro);
    setValue("neighborhood", endereco.bairro);
    setValue("city", endereco.cidade);
    setValue("state", endereco.estado);
    setValue("uf", endereco.uf);
  }, [cep, endereco, setValue]);

  return (
    <div className="flex flex-wrap">
      <div className="w-full text-xl font-bold pt-3 border-t text-xl">
        Endereço
      </div>

      <div className="w-full md:w-2/8 text-left mb-3 p-1">
        <label htmlFor="inputZip" className="form-label text-black">
          CEP
        </label>
        <input
          type="number"
          className="border rounded p-1 bg-gray-100 w-full"
          id="inputZip"
          placeholder="Ex: 85865140"
          {...register("cep")}
          value={cep}
          onChange={handleCepChange}
        />
        {erroCep && <span className="text-danger">{erroCep}</span>}
        {errors.cep && (
          <span className="text-red-600 text-sm block mt-1">
            {errors.cep.message}
          </span>
        )}
      </div>

      <div className="w-full md:w-1/4 text-start mb-3 p-1">
        <label htmlFor="inputCity" className="form-label text-black">
          Cidade
        </label>
        <input
          type="text"
          className="border rounded p-1 bg-gray-100 w-full"
          id="inputCity"
          {...register("city")}
          value={endereco.cidade || ""}
          readOnly
        />
      </div>

      <div className="w-full md:w-3/8 text-start mb-3 p-1">
        <label htmlFor="inputState" className="form-label text-black">
          Estado
        </label>
        <input
          type="text"
          className="border rounded p-1 bg-gray-100 w-full"
          id="inputState"
          {...register("state")}
          value={endereco.estado || ""}
          readOnly
        />
      </div>

      <div className="w-full md:w-1/8 text-start mb-3 p-1">
        <label htmlFor="inputState" className="form-label text-black">
          UF
        </label>
        <input
          type="text"
          className="border rounded p-1 bg-gray-100 w-full"
          id="inputState"
          {...register("uf")}
          value={endereco.uf || ""}
          readOnly
        />
      </div>

      <div className="w-full md:w-1/2 text-left mb-3 p-1">
        <label htmlFor="inputAddress" className="form-label text-black">
          Rua
        </label>
        <input
          type="text"
          className="border rounded p-1 bg-gray-100 w-full"
          id="inputAddress"
          {...register("street")}
          value={endereco.logradouro || ""}
          readOnly
        />
      </div>

      <div className="w-full md:w-4/12 text-left mb-3 p-1">
        <label htmlFor="inputNeighborhood" className="form-label text-black">
          Bairro
        </label>
        <input
          type="text"
          className="border rounded p-1 bg-gray-100 w-full"
          id="inputNeighborhood"
          {...register("neighborhood")}
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
        {errors.addressNumber && (
          <span className="text-red-600 text-sm block mt-1">
            {errors.addressNumber.message}
          </span>
        )}
      </div>
    </div>
  );
}

export default AddressSection;
