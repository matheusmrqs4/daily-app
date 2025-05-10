import request from 'supertest';
import app from '../src/app';
import mongoose from 'mongoose';

const userData = {
  name: 'Usuário Teste',
  email: 'teste@example.com',
  password: '123456',
};

const dailyData = {
  title: 'Titulo do Daily',
  description: 'Descrição do Daily',
  date: new Date().toISOString(),
};

let token: string;

beforeAll(async () => {
  const res = await request(app)
    .post('/api/users/register')
    .send(userData)
    .expect(201);

  token = res.body.token;
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Daily Controller', () => {
    beforeEach(async () => {
        await request(app)
        .post('/api/dailies/create')
        .set('Authorization', `Bearer ${token}`)
        .send(dailyData)
        .expect(201);
    });

  it('POST /api/dailies/create - should create a new daily', async () => {
        const res = await request(app)
        .post('/api/dailies/create')
        .set('Authorization', `Bearer ${token}`)
        .send(dailyData)
        .expect(201);

        expect(res.body.title).toBe(dailyData.title);
        expect(res.body.description).toBe(dailyData.description);
        expect(new Date(res.body.date).toISOString()).toBe(dailyData.date);
        expect(res.body._id).toBeDefined();
    });

  it('GET /api/dailies - should get all dailies', async () => {
        const res = await request(app)
        .get('/api/dailies')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);

        const found = res.body.find((d: any) => d.title === dailyData.title);
        expect(found).toBeDefined();
        expect(found.description).toBe(dailyData.description);
    });

  it('GET /api/dailies/:id - should get a daily by ID', async () => {
        const res = await request(app)
        .get('/api/dailies')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

        const dailyId = res.body[0]._id;

        const dailyRes = await request(app)
        .get(`/api/dailies/${dailyId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

        expect(dailyRes.body._id).toBe(dailyId);
        expect(dailyRes.body.title).toBe(dailyData.title);
    });

  it('PUT /api/dailies/update/:id - should update a daily', async () => {
        const res = await request(app)
        .get('/api/dailies')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

        const dailyId = res.body[0]._id;

        const updatedData = {
        title: 'Titulo Atualizado',
        description: 'Descrição Atualizada',
        };

        const updateRes = await request(app)
        .put(`/api/dailies/update/${dailyId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedData)
        .expect(200);

        expect(updateRes.body.title).toBe(updatedData.title);
        expect(updateRes.body.description).toBe(updatedData.description);
    });

    it('DELETE /api/dailies/delete/:id - should delete a daily', async () => {
            const createRes = await request(app)
                .post('/api/dailies/create')
                .set('Authorization', `Bearer ${token}`)
                .send(dailyData)
                .expect(201);

            const dailyId = createRes.body._id;
            expect(dailyId).toBeDefined();

            const deleteRes = await request(app)
                .delete(`/api/dailies/delete/${dailyId}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            expect(deleteRes.body.message).toBe('Daily deleted');

            const getRes = await request(app)
                .get(`/api/dailies/${dailyId}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(404);

            expect(getRes.body.message).toBe('Daily not found');
        });
});

describe('Daily Controller - Unauthorized Access', () => {
    it('POST /api/dailies/create - should NOT allow creating a daily without a token', async () => {
        await request(app)
            .post('/api/dailies/create')
            .send(dailyData)
            .expect(401);
    });

    it('GET /api/dailies - should NOT allow getting all dailies without a token', async () => {
        await request(app)
            .get('/api/dailies')
            .expect(401);
    });

    it('GET /api/dailies/:id - should NOT allow getting a daily by ID without a token', async () => {
        const res = await request(app)
            .post('/api/dailies/create')
            .set('Authorization', `Bearer ${token}`)
            .send(dailyData)
            .expect(201);

        const dailyId = res.body._id;

        await request(app)
            .get(`/api/dailies/${dailyId}`)
            .expect(401);
    });

    it('PUT /api/dailies/update/:id - should NOT allow updating a daily without a token', async () => {
        const res = await request(app)
            .post('/api/dailies/create')
            .set('Authorization', `Bearer ${token}`)
            .send(dailyData)
            .expect(201);

        const dailyId = res.body._id;

        await request(app)
            .put(`/api/dailies/update/${dailyId}`)
            .send({ title: 'Updated Title' })
            .expect(401);
    });

    it('DELETE /api/dailies/delete/:id - should NOT allow deleting a daily without a token', async () => {
        const res = await request(app)
            .post('/api/dailies/create')
            .set('Authorization', `Bearer ${token}`)
            .send(dailyData)
            .expect(201);

        const dailyId = res.body._id;

        await request(app)
            .delete(`/api/dailies/delete/${dailyId}`)
            .expect(401);
    });
});
