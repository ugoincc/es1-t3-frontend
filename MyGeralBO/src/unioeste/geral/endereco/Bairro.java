package unioeste.geral.endereco;

import java.io.Serializable;

public class Bairro implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private String nome;

	public Bairro() {
		
	}
	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
	
}
