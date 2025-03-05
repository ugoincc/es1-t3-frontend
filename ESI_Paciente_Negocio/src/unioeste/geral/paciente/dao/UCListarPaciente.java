package unioeste.geral.paciente.dao;

import unioeste.geral.paciente.bo.Paciente;
import unioeste.apoio.infraestrutura.*;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class UCListarPaciente {

    public UCListarPaciente() {}

    public List<Paciente> listarTodosPacientes(ConexaoBD conexao) throws Exception {
        List<Paciente> pacientes = new ArrayList<>();
        String sql = "SELECT * FROM Paciente";

        Connection conn = null;
        boolean conexaoInterna = false;

        try {
            if (conexao != null) {
                conn = conexao.getConnection();
            } else {
                throw new Exception("Conexão com o banco de dados não fornecida.");
            }

            try (PreparedStatement stmt = conn.prepareStatement(sql);
                 ResultSet result = stmt.executeQuery()) {

                while (result.next()) {
                    Paciente paciente = new Paciente();
                    paciente.setIdPaciente(result.getInt("id_paciente"));
                    paciente.setNomePaciente(result.getString("nome_paciente"));
                    paciente.setCpfPaciente(result.getString("cpf_paciente"));
                    paciente.setIdEndereco(result.getInt("id_endereco"));
                    paciente.setNroCasa(result.getString("nro_casa"));
                    paciente.setComplementoCasa(result.getString("complemento_casa"));

                    pacientes.add(paciente);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Erro ao listar pacientes.", e);
        } finally {
            if (conexaoInterna && conn != null) {
                conn.close();
            }
        }

        return pacientes;
    }
}
