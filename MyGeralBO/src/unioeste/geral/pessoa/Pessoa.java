package unioeste.geral.pessoa;

import java.io.Serializable;

import unioeste.geral.endereco.EnderecoEspecifico;

public class Pessoa implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private String nome;
    private String nomeSocial;
    private EnderecoEspecifico enderecoResidencial;
    private String telefones;
    private String emails;
    
    public Pessoa() {
    	
    }
    
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getNomeSocial() {
		return nomeSocial;
	}
	public void setNomeSocial(String nomeSocial) {
		this.nomeSocial = nomeSocial;
	}
	public EnderecoEspecifico getEnderecoResidencial() {
		return enderecoResidencial;
	}
	public void setEnderecoResidencial(EnderecoEspecifico enderecoResidencial) {
		this.enderecoResidencial = enderecoResidencial;
	}

	public String getTelefones() {
		return telefones;
	}

	public void setTelefones(String telefones) {
		this.telefones = telefones;
	}

	public String getEmails() {
		return emails;
	}

	public void setEmails(String emails) {
		this.emails = emails;
	}

    
	
}
