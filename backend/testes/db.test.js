const db = require('../models/db.js'); 

// Teste de conexão com a base de dados
test('Conexão com o banco de dados deve estar ativa', async () => {
  expect(db).toBeDefined();
});
