import request from 'supertest';
import app from '../src/app';
import mongoose from 'mongoose';

const userData = {
  name: 'Usuário Teste',
  email: 'teste@example.com',
  password: '123456',
};

let token: string;

describe('Auth Controller', () => {
  it('POST /api/users/register - should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send(userData)
      .expect(201);

      expect(res.body.token).toBeDefined();

      token = res.body.token;
    });

  it('POST /api/users/register - shouldnt register with duplicated email', async () => {
    await request(app).post('/api/users/register').send(userData);

    const res = await request(app)
      .post('/api/users/register')
      .send(userData)
      .expect(400);

      expect(res.body.error).toBe('User already exists');
    });

  it('POST /api/users/login - should log in with valid credentials', async () => {
    await request(app).post('/api/users/register').send(userData);

    const res = await request(app)
      .post('/api/users/login')
      .send({ email: userData.email, password: userData.password })
      .expect(200);

      expect(res.body.token).toBeDefined();
    });

  it('POST /api/users/login - returns error with wrong password', async () => {
    await request(app).post('/api/users/register').send(userData);

    const res = await request(app)
      .post('/api/users/login')
      .send({ email: userData.email, password: 'wrongPassword' })
      .expect(401);

      expect(res.body.error).toBe('Invalid credentials');
  });

  it('GET /api/users/profile - returns the profile of the authenticated user', async () => {

  const resRegister = await request(app)
    .post('/api/users/register')
    .send(userData)
    .expect(201);

  const authToken = resRegister.body.token;

  const res = await request(app)
    .get('/api/users/profile')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);

    expect(res.body.email).toBe(userData.email);
    expect(res.body.name).toBe(userData.name);
    expect(res.body.password).toBeUndefined();
  });
});
