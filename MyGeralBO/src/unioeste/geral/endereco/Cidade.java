package unioeste.geral.endereco;

import java.io.Serializable;

public class Cidade implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private int codCidade;
    private String nome;
    private UnidadeFederativa estado;
    
    public Cidade() {
    	
    }
	public int getCodCidade() {
		return codCidade;
	}
	public void setCodCidade(int codCidade) {
		this.codCidade = codCidade;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public UnidadeFederativa getEstado() {
		return estado;
	}
	public void setEstado(UnidadeFederativa estado) {
		this.estado = estado;
	}
	
	
}
