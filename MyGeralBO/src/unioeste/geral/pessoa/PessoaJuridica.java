package unioeste.geral.pessoa;

import java.io.Serializable;

public class PessoaJuridica extends Pessoa implements Serializable {
	
	private String cnpj;
	private static final long serialVersionUID = 1L;
	
	public PessoaJuridica() {
		
	}
	



	public String getCnpj() {
		return cnpj;
	}


	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}
	
}
