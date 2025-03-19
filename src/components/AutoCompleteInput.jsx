import { useState } from "react";

const AutoCompleteInput = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }
  };

  const handleSelect = (nome) => {
    setQuery(nome);
    setSuggestions([]);
  };

  return (
    <div className="w-3/4 p-1 h-full">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Digite o nome do médico..."
        className="border rounded p-1 bg-gray-100 w-full"
      />
      {suggestions.length > 0 && (
        <div
          style={{
            position: "absolute",
            border: "1px solid #ccc",
            background: "white",
            width: "100%",
            maxHeight: "150px",
            overflowY: "auto",
            zIndex: 1000,
          }}
        >
          {suggestions.map((medico) => (
            <div
              key={medico.id}
              onClick={() => handleSelect(medico.nome)}
              style={{ padding: "8px", cursor: "pointer" }}
            >
              {medico.nome}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutoCompleteInput;
