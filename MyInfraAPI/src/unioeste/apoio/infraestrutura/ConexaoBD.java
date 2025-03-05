package unioeste.apoio.infraestrutura;

import java.sql.*;

public class ConexaoBD {
    protected Connection connection;
    protected ResultSet tabela;

    // *************************************************
    public ConexaoBD()throws Exception{
    	String driver = "org.postgresql.Driver";
    	Class.forName(driver);
    }
    
     
    // *************************************************    
    public void conectar(UsuarioBD usuario) throws Exception{
    	String url = "jdbc:postgresql://localhost/" + usuario.getBanco() + "?";
    	String user = "user=" + usuario.getUsuario();
    	String password = "&password=" + usuario.getSenha();
    	connection = DriverManager.getConnection(url + user + password); 
    }
    
    // *************************************************
    public void close()throws Exception{
    	connection.close();
    }
    
    // *************************************************
    public ResultSet execSelect(String sql) throws Exception{
    	Statement s = connection.createStatement();
    	ResultSet result = s.executeQuery(sql);
    	return result;
    }
    
    // *************************************************
    public void execSQL(String sql) throws Exception{
    	Statement s = connection.createStatement();
    	s.execute(sql);
    }
    

	public Connection getConnection() {
		return connection;
	}


	public void setConnection(Connection connection) {
		this.connection = connection;
	}

	
}