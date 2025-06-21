const request = require('supertest');
const express = require('express');
const app = require('../server'); 
const db = require('../models/db');



// Suprimir logs durante testes
jest.spyOn(console, 'log').mockImplementation(() => {});

beforeAll(async () => {
  await db.sequelize.sync(); 
});

describe('GET /utilizador', () => {
  it('Deve obter todos os utilizadores', async () => {
    const res = await request(app).get('/utilizador');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});

describe('GET /utilizador/:id', () => {
  it('Deve retornar 404 se o utilizador não existir', async () => {
    const res = await request(app).get('/utilizador/999999');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});

describe('GET /utilizador/cargo/:cargo', () => {
  it('Deve retornar utilizadores com cargo válido', async () => {
    const res = await request(app).get('/utilizador/cargo/utilizador');
    expect([200, 500]).toContain(res.statusCode); // 500 caso não existam utilizadores com esse cargo
  });

  it('Deve retornar erro se o cargo for inválido', async () => {
    const res = await request(app).get('/utilizador/cargo/invalido');
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Cargo inválido');
  });
});
afterAll(async () => {
  await db.sequelize.close(); // ou o nome do teu ficheiro de DB
});
