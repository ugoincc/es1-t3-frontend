package unioeste.geral.paciente.controller;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import java.io.IOException;

import unioeste.geral.endereco.infra.GlobalApp;
import unioeste.geral.paciente.bo.Paciente;
import unioeste.geral.paciente.dao.UCListarPaciente;
import unioeste.geral.paciente.dao.UCCadastrarPaciente;
import unioeste.geral.paciente.dao.UCConsultarPacientePorCpf;
import unioeste.apoio.infraestrutura.*;

import java.io.BufferedReader;
import java.util.List;

import com.google.gson.Gson;

/**
 * Servlet implementation class ControllerPaciente
 */
@WebServlet(urlPatterns = {"/paciente", "/insertpac", "/consultarpac"})
public class ServicosPaciente extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public ServicosPaciente() {
        super();
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setStatus(HttpServletResponse.SC_OK);
    }
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    	response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        String action = request.getServletPath();
        if (action.equals("/insertpac")) {
            cadastroPaciente(request, response);
        } else if (action.equals("/paciente")) {
            listarPacientes(request, response);
        } else if (action.equals("/consultarpac")) {
            consultarPaciente(request, response);
        }
    }

    protected void cadastroPaciente(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers",
                "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
        response.setHeader("Access-Control-Allow-Credentials", "true");

        // Criar um novo objeto Paciente
        BufferedReader reader = request.getReader();
        Gson gson = new Gson();
        Paciente paciente = gson.fromJson(reader, Paciente.class);

        // Atribuir manualmente os parâmetros quando necessários
        paciente.setNomePaciente(request.getParameter("nomePaciente"));
        paciente.setCpfPaciente(request.getParameter("cpfPaciente"));
        
        // Convertendo idEndereco de String para int
        String idEnderecoStr = request.getParameter("idEndereco");
        if (idEnderecoStr != null && !idEnderecoStr.isEmpty()) {
            paciente.setIdEndereco(Integer.parseInt(idEnderecoStr));
        }

        paciente.setNroCasa(request.getParameter("nroCasa"));
        paciente.setComplementoCasa(request.getParameter("complementoCasa"));

        // Chama a lógica de cadastro
        UCCadastrarPaciente service = new UCCadastrarPaciente();
        try {

            ConexaoBD conexao = GlobalApp.getConexaoBD();
            service.cadastrarPaciente(conexao, paciente);

            // Resposta de sucesso
            response.setStatus(HttpServletResponse.SC_OK);
            response.setContentType("application/json");
            response.getWriter().write("{\"message\": \"Paciente cadastrado com sucesso.\"}");
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\": \"Erro ao cadastrar paciente.\"}");
        }
    }

    protected void consultarPaciente(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Configuração de CORS
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
        response.setHeader("Access-Control-Allow-Credentials", "true");

        String cpfPaciente = request.getParameter("cpfPaciente");

        if (cpfPaciente == null || cpfPaciente.trim().isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"error\": \"CPF do paciente não pode ser nulo ou vazio.\"}");
            return;
        }

        UCConsultarPacientePorCpf service = new UCConsultarPacientePorCpf();
        Paciente paciente;

        try {
            ConexaoBD conexao = GlobalApp.getConexaoBD(); // Obtém a conexão
            paciente = service.consultarPacientePorCPF(cpfPaciente, conexao);

            if (paciente != null) {
                String json = new Gson().toJson(paciente);
                response.setStatus(HttpServletResponse.SC_OK);
                response.getWriter().write(json);
            } else {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                response.getWriter().write("{\"error\": \"Nenhum paciente encontrado.\"}");
            }

        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\": \"Erro ao consultar paciente.\"}");
            e.printStackTrace();
        }
    }

    
    protected void listarPacientes(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        // Configuração de CORS
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
        response.setHeader("Access-Control-Allow-Credentials", "true");

        UCListarPaciente service = new UCListarPaciente();
        List<Paciente> pacientes;
        
        try {

            ConexaoBD conexao = GlobalApp.getConexaoBD();
            pacientes = service.listarTodosPacientes(conexao);
            
            String json = new Gson().toJson(pacientes);
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write(json);
            
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\": \"Erro ao listar pacientes.\"}");
            e.printStackTrace();
        }
    }

}
