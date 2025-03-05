package unioeste.geral.endereco.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import unioeste.apoio.infraestrutura.ConexaoBD;
import unioeste.geral.endereco.Cidade;
import unioeste.geral.endereco.Endereco;
import unioeste.geral.endereco.dao.UCManterEndereco;
import unioeste.geral.endereco.dao.UCObterCidade;
import unioeste.geral.endereco.dao.UCObterEnderecoPorCEP;
import unioeste.geral.endereco.dao.UCObterEnderecoPorID;
import unioeste.geral.endereco.infra.GlobalApp;

@WebServlet(urlPatterns = { "/CadEndereco", "/EndID/*", "/RecuperaPorCep/*", "/ObterCidade/*" })
public class ServicosEndereco extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public ServicosEndereco() {
		super();

	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
	        throws ServletException, IOException {
	    String action = request.getServletPath();

	    if (action.equals("/CadEndereco")) {
	        cadastroEndereco(request, response);
	    }
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
	        throws ServletException, IOException {
	    System.out.println("Estou no doGet");
	    
	    response.setHeader("Access-Control-Allow-Origin", "*");
	    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	    response.setHeader("Access-Control-Allow-Headers",
	            "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	    response.setHeader("Access-Control-Allow-Credentials", "true");

	    String action = request.getServletPath();
	    String id = request.getParameter("id"); // Obtém o parâmetro id da query string
	    String CEP = request.getParameter("CEP");
	    String Cidade = request.getParameter("Cidade");

	    if (action.equals("/EndID") && id != null) {
	        request.setAttribute("id", id); 
	        RecuperaEndID(request, response);
	    } else if (action.equals("/RecuperaPorCep")) {
	    	request.setAttribute("Cep", CEP);
	        RecuperaEndCEP(request, response);
	    } else if(action.equals("/ObterCidade")){
	    	request.setAttribute("Cidade", Cidade);
	    	ObtemCidadePorNome(request, response);
	    }
	    	else {
	    }
	        response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Parâmetro id ausente ou inválido.");
	}


	// Entrada: Request do front contendo elementos que compõe o objeto endereco
	// Saída: Print de sucesso caso seja possível cadastrar o endereco senao erro
	protected void cadastroEndereco(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
		response.setHeader("Access-Control-Allow-Headers",
				"Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		response.setHeader("Access-Control-Allow-Credentials", "true");

		BufferedReader reader = request.getReader();
		Gson gson = new Gson();
		
		Endereco end = gson.fromJson(reader, Endereco.class);
		end.setBairro(request.getParameter("CEP"));


		// Chama a lógica de cadastro
		UCManterEndereco service = new UCManterEndereco();
		try {
			ConexaoBD conexao = GlobalApp.getConexaoBD();
			service.cadastrarEndereco(conexao, end);

			// Redireciona para uma página de sucesso
			response.setStatus(HttpServletResponse.SC_OK);
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}

	protected void RecuperaEndID(HttpServletRequest request, HttpServletResponse response)
	        throws ServletException, IOException {
	    System.out.println("Entrei no RecuperaID");

	    String id = request.getAttribute("id").toString(); // Pegando o id corretamente
	    System.out.println("Esse é o id: " + id);

	    try {
	        int enderecoID = Integer.parseInt(id); // Converte para inteiro
	        Endereco end = new Endereco();
	        end.setEnderecoID(enderecoID);

	        UCObterEnderecoPorID UC = new UCObterEnderecoPorID();
	        end = UC.recuperaEnderecoPorID(end);

	        Gson gson = new Gson();
	        String enderecoJSON = gson.toJson(end);
	        response.setContentType("application/json");
	        response.setCharacterEncoding("UTF-8");

	        PrintWriter printWriter = response.getWriter();
	        printWriter.write(enderecoJSON);
	        printWriter.close();

	    } catch (NumberFormatException e) {
	        System.err.println("Erro ao converter id para inteiro.");
	        response.sendError(HttpServletResponse.SC_BAD_REQUEST, "ID inválido.");
	    } catch (Exception e) {
	        e.printStackTrace();
	        response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Erro ao recuperar endereço.");
	    }
	}
	
	protected void ObtemCidadePorNome(HttpServletRequest request, HttpServletResponse response)
	        throws ServletException, IOException {
	    System.out.println("Entrei no Obter");

	    String Cidade = request.getAttribute("Cidade").toString(); // Pegando o id corretamente
	    System.out.println("Esse é o Cidade: " + Cidade);

	    try {

	    	UCObterCidade UC = new UCObterCidade();
	        Cidade cid = UC.recuperaCidadePorNome(Cidade);

	        Gson gson = new Gson();
	        String enderecoJSON = gson.toJson(cid);
	        response.setContentType("application/json");
	        response.setCharacterEncoding("UTF-8");

	        PrintWriter printWriter = response.getWriter();
	        printWriter.write(enderecoJSON);
	        printWriter.close();

	    }  catch (Exception e) {
	        e.printStackTrace();
	        response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Erro ao recuperar endereço.");
	    }
	}
	
	protected void RecuperaEndCEP(HttpServletRequest request, HttpServletResponse response)
	        throws ServletException, IOException {
	    System.out.println("Entrei no RecuperaCEP");

	    String CEP = request.getAttribute("Cep").toString(); // Pegando o id corretamente
	    System.out.println("Esse é o CEP: " + CEP);

	    try {

	        UCObterEnderecoPorCEP UC = new UCObterEnderecoPorCEP();
	        Endereco end = UC.recuperaEnderecoPorCEP(CEP);

	        Gson gson = new Gson();
	        String enderecoJSON = gson.toJson(end);
	        response.setContentType("application/json");
	        response.setCharacterEncoding("UTF-8");

	        PrintWriter printWriter = response.getWriter();
	        printWriter.write(enderecoJSON);
	        printWriter.close();

	    }  catch (Exception e) {
	        e.printStackTrace();
	        response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Erro ao recuperar endereço.");
	    }
	}


	

}
