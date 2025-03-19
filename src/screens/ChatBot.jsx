import React, { useState } from "react";
import axios from "axios";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const GEMINI_API_KEY = "AIzaSyAzRuWybKKWj6uqSj6NFptaGiqkpNqnk5M";
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  const SYSTEM_CONTEXT =
    "Você é um assistente virtual gentil integrado a um sistema seguro e já autenticado. " +
    "O sistema já está logado e seguro, portanto, não solicite autenticação. " +
    "Os serviços disponíveis são: paciente, olá mundo, endereço (por CEP ou ID), cidade. " +
    "Se um serviço for acionado, responda 'Demonstrando resultado de [serviço]'. " +
    "Evite responder perguntas irrelevantes.";

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: `${input}`, type: "user" };
    setMessages((prev) => [...prev, userMessage]);

    setInput(""); // Limpa input após enviar mensagem

    const MENSAGEM_CONTEXTO_USER = SYSTEM_CONTEXT + input;

    try {
      const response = await axios.post(GEMINI_API_URL, {
        contents: [{ role: "user", parts: [{ text: MENSAGEM_CONTEXTO_USER }] }],
      });

      console.log("Resposta da Gemini:", response.data);

      const candidates = response.data?.candidates;
      if (!candidates || candidates.length === 0) {
        setMessages((prev) => [
          ...prev,
          { text: "ChatBot: Não recebi resposta válida.", type: "bot" },
        ]);
        return;
      }

      const responseText =
        candidates[0]?.content?.parts?.[0]?.text || "Não entendi a requisição.";
      setMessages((prev) => [
        ...prev,
        { text: `${responseText}`, type: "bot" },
      ]);

      await handleApiRequests(responseText);
    } catch (error) {
      console.error("Erro na requisição:", error);
      setMessages((prev) => [
        ...prev,
        { text: "ChatBot: Erro ao processar a requisição.", type: "bot" },
      ]);
    }
  };

  const handleApiRequests = async (responseText) => {
    let apiUrl = "";
    let requestData = {};

    if (responseText.toLowerCase().includes("paciente")) {
      apiUrl = "http://localhost:8080/Server2/ObterPacientes";
    } else if (responseText.toLowerCase().includes("olá mundo")) {
      apiUrl = "http://localhost:8080/Server2/OlaMundo";
    } else if (
      responseText.toLowerCase().includes("endereço") &&
      responseText.toLowerCase().includes("cep")
    ) {
      const cep = prompt("Digite o CEP:");
      apiUrl = `http://localhost:8080/Server2/ObterEnderecoPorCEP?cep=${cep}`;
    } else if (
      responseText.toLowerCase().includes("endereço") &&
      responseText.toLowerCase().includes("id")
    ) {
      const id = prompt("Digite o ID do endereço:");
      apiUrl = `http://localhost:8080/Server2/ObterEnderecoPorID?id=${id}`;
    } else if (responseText.toLowerCase().includes("cidade")) {
      const id = prompt("Digite o ID da cidade:");
      apiUrl = `http://localhost:8080/Server2/ObterCidade?id=${id}`;
    } else if (responseText.toLowerCase().includes("cadastrar paciente")) {
      requestData = {
        nome_paciente: prompt("Nome do paciente:"),
        cpf: prompt("CPF:"),
        rg: prompt("RG:"),
        numero_endereco: prompt("Número do endereço:"),
        complemento_endereco: prompt("Complemento do endereço:"),
        data_nascimento_paciente: prompt("Data de nascimento (YYYY-MM-DD):"),
        cep: prompt("CEP:"),
      };
      apiUrl = "http://localhost:8080/Server2/CadastrarPaciente";
      postRequest(apiUrl, requestData);
      return;
    } else if (responseText.toLowerCase().includes("cadastrar endereço")) {
      requestData = {
        sigla_estado: prompt("Sigla do Estado:"),
        nome_estado: prompt("Nome do Estado:"),
        id_cidade: prompt("ID da Cidade:"),
        nome_cidade: prompt("Nome da Cidade:"),
        id_bairro: prompt("ID do Bairro:"),
        nome_bairro: prompt("Nome do Bairro:"),
        id_logradouro: prompt("ID do Logradouro:"),
        nome_logradouro: prompt("Nome do Logradouro:"),
        id_tipo_logradouro: prompt("ID do Tipo de Logradouro:"),
        nome_tipo_logradouro: prompt("Nome do Tipo de Logradouro:"),
        cep: prompt("CEP:"),
      };
      apiUrl = "http://localhost:8080/Server2/CadastrarEndereco";
      postRequest(apiUrl, requestData);
      return;
    }

    if (apiUrl) {
      try {
        const response = await axios.get(apiUrl);
        setMessages((prev) => [
          ...prev,
          {
            text: `ChatBot: ${JSON.stringify(response.data, null, 2)}`,
            type: "bot",
          },
        ]);
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          { text: "ChatBot: Erro ao obter os dados.", type: "bot" },
        ]);
      }
    }
  };

  const postRequest = async (url, requestData) => {
    try {
      const response = await axios.post(url, requestData);
      setMessages((prev) => [
        ...prev,
        { text: "ChatBot: Cadastro realizado com sucesso!", type: "bot" },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "ChatBot: Erro ao enviar os dados.", type: "bot" },
      ]);
    }
  };

  return (
    <div className="w-full mx-2 p-4">
      <h2 className="text-3xl font-bold mb-4">ChatBot</h2>
      <div className="border border-gray-300 p-0 h-100 overflow-y-auto">
        {messages.map((msg, index) => (
          <p
            key={index}
            className={
              msg.type === "user"
                ? "border-0 p-2 text-blue-700 "
                : "border-0 p-2 text-green-800 text-left"
            }
          >
            {msg.text}
          </p>
        ))}
      </div>
      <div className="flex flex-row">
        <input
          type="text"
          className="w-9/10 border-1 rounded-sm p-2 mt-2"
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="w-1/10 border-1 border-black rounded-sm bg-blue-600 text-white px-4 py-2 mt-2"
          onClick={sendMessage}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
