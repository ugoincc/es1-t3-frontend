package unioeste.geral.endereco;

import java.io.Serializable;

public class UnidadeFederativa implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String sigla;
    private String nome;
    
    public UnidadeFederativa() {
    	
    }
	public String getSigla() {
		return sigla;
	}
	public void setSigla(String sigla) {
		this.sigla = sigla;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	
    
}
