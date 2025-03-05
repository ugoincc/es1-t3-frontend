package unioeste.geral.endereco;

import java.io.Serializable;

public class Logradouro implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private String sigla;
    private String nome;
    private TipoLogradouro tipoLogradouro;
    
    public Logradouro() {
    	
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
	public TipoLogradouro getTipoLogradouro() {
		return tipoLogradouro;
	}
	public void setTipoLogradouro(TipoLogradouro tipoLogradouro) {
		this.tipoLogradouro = tipoLogradouro;
	}
	
}
