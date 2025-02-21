import { useState, useEffect } from "react";
import axios from "axios";

export function useLocalAddress() {
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
        `http://localhost:8080/MyServicos/RecuperaCep?CEP=${novoCep}`
      );
      const dados = response.data;

      if (!dados || !dados.CEP) {
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
          cidade: dados.cidade || "",
          estado: "", // Não está presente no novo endpoint
          uf: "", // Não está presente no novo endpoint
          complemento: "", // Não está presente no novo endpoint
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

  return { cep, erroCep, endereco, handleCepChange, buscarEndereco };
}
