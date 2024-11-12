require('dotenv').config();
const server = require('./server');
const clientesRoutes = require('./routes/clientes');
const produtosRoutes = require('./routes/produtos');
const pdvRoutes = require('./routes/ponto_de_venda');

// Importa as funções de upsert
const { upsertClientes } = require('./collection_clientes'); // Importa a função upsertClientes de collection_clientes.js
const { upsertProdutos } = require('./collection_produtos'); // Importa a função upsertProdutos de collection_produtos.js

const PORT = process.env.PORT || 3000;

// Função para inicializar o banco de dados e o servidor
async function initialize() {
  try {
    // Executa o upsert das coleções de clientes e produtos
    await upsertClientes();
    await upsertProdutos();

    // Configuração das rotas
    clientesRoutes(server);
    produtosRoutes(server);
    pdvRoutes(server);

    // Inicia o servidor
    server.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao inicializar o servidor:", error);
  }
}

// Chama a função de inicialização
initialize();
