const db = require('../models/db.js'); // importa models/sequelize

beforeAll(async () => {
  await db.sequelize.sync({ force: true }); // limpar BD antes dos testes
});

afterAll(async () => {
  await db.sequelize.close(); // fechar conexão depois dos testes
});
// verificar se a base de dados retorna a informação correta

test('')
// describe('API /api/utilizadores', () => {
//   it('Deve criar um utilizador', async () => {
//     const res = await request(app).post('/api/utilizadores').send({
//       nome: 'João Teste',
//       email: 'joao@teste.com',
//       password: '123456'
//     });

//     expect(res.statusCode).toBe(201);
//     expect(res.body.email).toBe('joao@teste.com');
//   });

//   it('Deve devolver lista de utilizadores', async () => {
//     const res = await request(app).get('/api/utilizadores');
//     expect(res.statusCode).toBe(200);
//     expect(Array.isArray(res.body)).toBe(true);
//     expect(res.body.length).toBeGreaterThan(0);
//   });
// });
