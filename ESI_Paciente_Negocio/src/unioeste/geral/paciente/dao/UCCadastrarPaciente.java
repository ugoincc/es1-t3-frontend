package unioeste.geral.paciente.dao;

import unioeste.apoio.infraestrutura.ConexaoBD;
import unioeste.geral.paciente.bo.Paciente;

import java.sql.PreparedStatement;

public class UCCadastrarPaciente {

    public UCCadastrarPaciente() {}

    public void cadastrarPaciente(ConexaoBD conexaoBD, Paciente paciente) throws Exception {

        String sql = "INSERT INTO Paciente (id_paciente, nome_paciente, cpf_paciente, id_endereco, nro_casa, complemento_casa) " +
                     "VALUES (?, ?, ?, ?, ?, ?)";

        PreparedStatement stmt = conexaoBD.getConnection().prepareStatement(sql);
        stmt.setInt(1, paciente.getIdPaciente());
        stmt.setString(2, paciente.getNomePaciente());
        stmt.setString(3, paciente.getCpfPaciente());
        stmt.setInt(4, paciente.getIdEndereco());
        stmt.setString(5, paciente.getNroCasa());
        stmt.setString(6, paciente.getComplementoCasa());

        int linhasAfetadas = stmt.executeUpdate();
        stmt.close();

        if (linhasAfetadas == 0) {
            throw new Exception("Erro ao cadastrar paciente.");
        }
    }
}
