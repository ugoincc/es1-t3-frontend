package unioeste.geral.endereco;

import java.io.Serializable;

public class Endereco implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String CEP;
    private  String  logradouro;
    private String bairro;
    private String cidade;
    private int EnderecoID;
    
    
    public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public int getEnderecoID() {
		return EnderecoID;
	}

	public void setEnderecoID(int enderecoID) {
		EnderecoID = enderecoID;
	}

	public Endereco() {}
    
	public String getCEP() {
		return CEP;
	}
	public void setCEP(String cEP) {
		CEP = cEP;
	}
	public String getLogradouro() {
		return logradouro;
	}
	public void setLogradouro(String logradouro) {
		this.logradouro = logradouro;
	}
	public String getBairro() {
		return bairro;
	}
	public void setBairro(String bairro) {
		this.bairro = bairro;
	}
	
}
