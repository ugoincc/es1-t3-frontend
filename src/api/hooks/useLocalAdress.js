import { useState, useEffect } from "react";
import axios from "axios";

export default function useLocalAddress() {
  const [cep, setCep] = useState("");
  const [erroCep, setErroCep] = useState("");
  const [endereco, setEndereco] = useState({
    logradouro: "",
    bairro: "",
    cidade: "",
    estado: "",
    uf: "",
    complemento: "",
  });

  const buscarEndereco = async (novoCep) => {
    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${novoCep}/json/`
      );
      const dados = response.data;

      if (dados.erro) {
        setErroCep("Endereço não encontrado para o CEP informado.");
        setEndereco({
          logradouro: "",
          bairro: "",
          cidade: "",
          estado: "",
          uf: "",
          complemento: "",
        });
      } else {
        setErroCep("");
        setEndereco({
          logradouro: dados.logradouro || "",
          bairro: dados.bairro || "",
          cidade: dados.localidade || "",
          estado: dados.estado || "",
          uf: dados.uf || "",
          complemento: dados.complemento || "",
        });
      }
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
      setErroCep("Erro ao buscar endereço. Tente novamente.");
    }
  };

  useEffect(() => {
    if (cep.length === 8) {
      buscarEndereco(cep);
    } else {
      setErroCep("");
      setEndereco({
        logradouro: "",
        complemento: "",
        bairro: "",
        estado: "",
        cidade: "",
        uf: "",
      });
    }
  }, [cep]);

  const handleCepChange = (e) => {
    const novoCep = e.target.value.replace(/\D/g, "");
    if (novoCep.length <= 8) setCep(novoCep);
  };

  return { cep, erroCep, endereco, handleCepChange };
}
