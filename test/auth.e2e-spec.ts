import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  const email = `test-${Date.now()}@example.com`;
  const password = 'password123';
  let jwtToken: string;
  let eventId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/register (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({ email, password, name: 'Test User' })
      .expect(201)
      .expect((res) => {
        expect(res.body.email).toEqual(email);
        expect(res.body).not.toHaveProperty('password');
      });
  });

  it('/auth/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, password })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('access_token');
        jwtToken = res.body.access_token;
      });
  });

  it('/events (POST) - Protected Route', () => {
    return request(app.getHttpServer())
      .post('/events')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        title: 'Test Event',
        capacity: 10,
        date: new Date().toISOString(),
        location: 'Test Location',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        eventId = res.body.id;
      });
  });

  it('/bookings (POST) - Create Booking', () => {
    return request(app.getHttpServer())
      .post('/bookings')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        eventId: eventId,
      })
      .expect(201);
  });

  it('/events (POST) - Unauthorized', () => {
    return request(app.getHttpServer())
      .post('/events')
      .send({
        title: 'Test Event 2',
        capacity: 10,
        date: new Date().toISOString(),
        location: 'Test Location',
      })
      .expect(401);
  });
});
