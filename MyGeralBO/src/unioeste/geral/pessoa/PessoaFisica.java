package unioeste.geral.pessoa;

import java.io.Serializable;

public class PessoaFisica extends Pessoa implements Serializable{
	
	private String primeiroNome;
    private String sobrenome;
    private String cpf;
    
	private static final long serialVersionUID = 1L;
	
	public PessoaFisica() {
		
	}
	
	public String getPrimeiroNome() {
		return primeiroNome;
	}
	public void setPrimeiroNome(String primeiroNome) {
		this.primeiroNome = primeiroNome;
	}
	public String getSobrenome() {
		return sobrenome;
	}
	public void setSobrenome(String sobrenome) {
		this.sobrenome = sobrenome;
	}
	public String getCpf() {
		return cpf;
	}
	public void setCpf(String cpf) {
		this.cpf = cpf;
	}


	
}
