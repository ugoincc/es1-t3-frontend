package unioeste.geral.paciente.dao;

import unioeste.geral.paciente.bo.Paciente;
import unioeste.apoio.infraestrutura.ConexaoBD;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class UCConsultarPacientePorCpf {

    public UCConsultarPacientePorCpf() {}

    public Paciente consultarPacientePorCPF(String cpfPaciente, ConexaoBD conexao) throws Exception {
        if (cpfPaciente == null || cpfPaciente.trim().isEmpty()) {
            throw new IllegalArgumentException("O CPF do paciente não pode ser nulo ou vazio.");
        }

        String sql = "SELECT * FROM Paciente WHERE cpf_paciente = ?";
        Connection conn = null;
        Paciente paciente = null;

        try {
            if (conexao != null) {
                conn = conexao.getConnection();
            } else {
                throw new Exception("Conexão com o banco de dados não fornecida.");
            }

            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setString(1, cpfPaciente);
                try (ResultSet result = stmt.executeQuery()) {
                    if (result.next()) {
                        paciente = new Paciente();
                        paciente.setIdPaciente(result.getInt("id_paciente"));
                        paciente.setNomePaciente(result.getString("nome_paciente"));
                        paciente.setCpfPaciente(result.getString("cpf_paciente"));
                        paciente.setIdEndereco(result.getInt("id_endereco"));
                        paciente.setNroCasa(result.getString("nro_casa"));
                        paciente.setComplementoCasa(result.getString("complemento_casa"));
                    }
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Erro ao consultar paciente.", e);
        }

        return paciente;
    }
}
