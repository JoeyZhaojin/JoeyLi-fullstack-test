import request from 'supertest';
import { Application } from 'express';
import { AppDataSource } from '../AppDataSource';

import { app } from '../index';

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.close();
});

//Check index.html
describe('GET /', () => {
  it('should respond with the index.html file', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.type).toBe('text/html');
  });
});

//Find all events
describe('GET /api/events', () => {
  it('should respond with an array of events', async () => {
    const response = await request(app).get('/api/events');

    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          message: expect.any(String),
          owner: expect.any(String),
        }),
      ]),
    );
  });
});

//Find by id
describe('GET /api/events/:id', () => {
  //Find the right id
  it('should respond with a single event', async () => {
    const response = await request(app).get('/api/events?findId=1');

    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        message: expect.any(String),
        owner: expect.any(String),
      }),
    );
  });

  //Find the wrong id
  it('should respond with a 404 when event is not found', async () => {
    const response = await request(app).get('/api/events/999999');

    expect(response.status).toBe(404);
  });
});

//Create new event
describe('POST /api/events', () => {

  //Create new event successfully
  it('should create a new event', async () => {
    const response = await request(app)
      .post('/api/events')
      .send({
        title: 'test',
        message: 'test',
        owner: 'owner12',
      });

    expect(response.status).toBe(201);
    expect(response.type).toBe('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        title: 'test',
        message: 'test',
        owner: 'owner12',
      }),
    );
  });

  //Create new event with missing fields
  it('should respond with a 400 when title is missing', async () => {
    const response = await request(app)
      .post('/api/events')
      .send({
        message: 'test',
        owner: 'owner12',
      });

    expect(response.status).toBe(400);
    expect(response.type).toBe('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'All inputs are required!',
      }),
    );
  });
});

//Update event
describe('POST /api/events/:id', () => {
  it('should respond with a 404 when event is not found', async () => {
    const response = await request(app).get('/api/events/999999');
    
    expect(response.status).toBe(404);
  });
});

//Delete event
describe('DELETE /api/events/:id', () => {

  //Delete event successfully
  it('should delete an event', async () => {
    const response = await request(app).get('/api/events/delete?deleteId=1');

    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Event deleted",
      }),
    );
  });

  //Delete event with wrong id
  it('should respond with a 404 when event is not found', async () => {
    const response = await request(app).delete('/api/events/delete?deleteId=999999');

    expect(response.status).toBe(404);
  });
});
