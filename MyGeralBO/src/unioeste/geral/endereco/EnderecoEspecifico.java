package unioeste.geral.endereco;

import java.io.Serializable;

public class EnderecoEspecifico extends Endereco implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private String numCasa;
    private String complemento;
    
    public EnderecoEspecifico() {
    	
    }
    
	public String getNumCasa() {
		return numCasa;
	}
	public void setNumCasa(String numCasa) {
		this.numCasa = numCasa;
	}
	public String getComplemento() {
		return complemento;
	}
	public void setComplemento(String complemento) {
		this.complemento = complemento;
	}
	
    
}
