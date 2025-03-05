package unioeste.geral.paciente.col;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import unioeste.geral.endereco.infra.GlobalApp;
import unioeste.geral.paciente.bo.Paciente;


public class ColPaciente {

    public ColPaciente() {}

    // Obtém ou cria um paciente pelo CPF
    public int obterOuCriarPaciente(Paciente paciente) throws Exception {
        try (Connection connection = GlobalApp.getConexaoBD().getConnection()) { // Obtém conexão existente
            int id = buscarIdPorCPF(paciente.getCpfPaciente(), connection);
            if (id == -1) {
                id = inserirEObterIdPaciente(paciente, connection);
            }
            return id;
        }
    }

    // Busca o ID de um paciente pelo CPF
    public int buscarIdPorCPF(String cpf, Connection connection) throws Exception {
        String sql = "SELECT id_paciente FROM Paciente WHERE cpf_paciente = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, cpf);
            try (ResultSet result = stmt.executeQuery()) {
                if (result.next()) {
                    return result.getInt(1);
                }
            }
        }
        return -1; // Não encontrado
    }

    // Insere um novo paciente e retorna o ID gerado
    public int inserirEObterIdPaciente(Paciente paciente, Connection connection) throws Exception {
        String sql = "INSERT INTO Paciente (nome_paciente, cpf_paciente, id_endereco, nro_casa, complemento_casa) " +
                     "VALUES (?, ?, ?, ?, ?) RETURNING id_paciente";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, paciente.getNomePaciente());
            stmt.setString(2, paciente.getCpfPaciente());
            stmt.setInt(3, paciente.getIdEndereco());
            stmt.setString(4, paciente.getNroCasa());
            stmt.setString(5, paciente.getComplementoCasa());

            try (ResultSet result = stmt.executeQuery()) {
                if (result.next()) {
                    return result.getInt(1);
                }
            }
        }
        throw new Exception("Erro ao inserir paciente no banco de dados.");
    }

    // Validação dos dados do paciente
    public void validarPaciente(Paciente paciente) throws Exception {
        if (paciente.getNomePaciente() == null || paciente.getNomePaciente().isEmpty()) {
            throw new Exception("Nome do paciente não pode estar vazio.");
        }
        if (paciente.getCpfPaciente() == null || paciente.getCpfPaciente().length() != 11) {
            throw new Exception("CPF inválido.");
        }
        if (paciente.getIdEndereco() <= 0) {
            throw new Exception("Endereço inválido.");
        }
        if (paciente.getNroCasa() == null || paciente.getNroCasa().isEmpty()) {
            throw new Exception("Número da casa não pode estar vazio.");
        }
    }
}
