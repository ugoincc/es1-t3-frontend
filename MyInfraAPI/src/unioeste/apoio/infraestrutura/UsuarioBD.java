package unioeste.apoio.infraestrutura;


import java.io.Serializable;

public class UsuarioBD implements Serializable {

  public final static long serialVersionUID = 1;
	
	
  private String senha;
  private String usuario;
  private String banco;
 
  public UsuarioBD(String usu, String passw, String banco) {
     usuario = usu;
     senha = passw;
     this.banco = banco;
  }

  public UsuarioBD() {
  }


  public String getSenha() { return senha; }
  public String getUsuario() { return usuario; }
  public String getBanco() { return banco; }
  
  public void setSenha(String sen) { this.senha = sen; }
  public void setUsuario(String usu) { this.usuario = usu; }
  public void setBanco(String bc) { this.banco = bc; }

}
