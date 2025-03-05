package unioeste.geral.paciente.bo;

import java.io.Serializable;

public class Paciente implements Serializable {
    private static final long serialVersionUID = 1L;

    private int idPaciente;
    private String nomePaciente;
    private String cpfPaciente;
    private int idEndereco;
    private String nroCasa;
    private String complementoCasa;

    public Paciente() {}

    public Paciente(int idPaciente, String nomePaciente, String cpfPaciente, int idEndereco, String nroCasa, String complementoCasa) {
        this.idPaciente = idPaciente;
        this.nomePaciente = nomePaciente;
        this.cpfPaciente = cpfPaciente;
        this.idEndereco = idEndereco;
        this.nroCasa = nroCasa;
        this.complementoCasa = complementoCasa;
    }

    public int getIdPaciente() {
        return idPaciente;
    }

    public void setIdPaciente(int idPaciente) {
        this.idPaciente = idPaciente;
    }

    public String getNomePaciente() {
        return nomePaciente;
    }

    public void setNomePaciente(String nomePaciente) {
        this.nomePaciente = nomePaciente;
    }

    public String getCpfPaciente() {
        return cpfPaciente;
    }

    public void setCpfPaciente(String cpfPaciente) {
        this.cpfPaciente = cpfPaciente;
    }

    public int getIdEndereco() {
        return idEndereco;
    }

    public void setIdEndereco(int idEndereco) {
        this.idEndereco = idEndereco;
    }

    public String getNroCasa() {
        return nroCasa;
    }

    public void setNroCasa(String nroCasa) {
        this.nroCasa = nroCasa;
    }

    public String getComplementoCasa() {
        return complementoCasa;
    }

    public void setComplementoCasa(String complementoCasa) {
        this.complementoCasa = complementoCasa;
    }
}
