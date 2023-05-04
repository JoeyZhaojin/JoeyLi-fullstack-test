"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const AppDataSource_1 = require("../AppDataSource");
const index_1 = require("../index");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield AppDataSource_1.AppDataSource.initialize();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield AppDataSource_1.AppDataSource.close();
}));
//Check index.html
describe('GET /', () => {
    it('should respond with the index.html file', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.app).get('/');
        expect(response.status).toBe(200);
        expect(response.type).toBe('text/html');
    }));
});
//Find all events
describe('GET /api/events', () => {
    it('should respond with an array of events', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.app).get('/api/events');
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(Number),
                title: expect.any(String),
                message: expect.any(String),
                owner: expect.any(String),
            }),
        ]));
    }));
});
//Find by id
describe('GET /api/events/:id', () => {
    //Find the right id
    it('should respond with a single event', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.app).get('/api/events?findId=1');
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            message: expect.any(String),
            owner: expect.any(String),
        }));
    }));
    //Find the wrong id
    it('should respond with a 404 when event is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.app).get('/api/events/999999');
        expect(response.status).toBe(404);
    }));
});
//Create new event
describe('POST /api/events', () => {
    //Create new event successfully
    it('should create a new event', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.app)
            .post('/api/events')
            .send({
            title: 'test',
            message: 'test',
            owner: 'owner12',
        });
        expect(response.status).toBe(201);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(Number),
            title: 'test',
            message: 'test',
            owner: 'owner12',
        }));
    }));
    //Create new event with missing fields
    it('should respond with a 400 when title is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.app)
            .post('/api/events')
            .send({
            message: 'test',
            owner: 'owner12',
        });
        expect(response.status).toBe(400);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expect.objectContaining({
            message: 'All inputs are required!',
        }));
    }));
});
//Update event
describe('POST /api/events/:id', () => {
    it('should respond with a 404 when event is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.app).get('/api/events/999999');
        expect(response.status).toBe(404);
    }));
});
//Delete event
describe('DELETE /api/events/:id', () => {
    //Delete event successfully
    it('should delete an event', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.app).get('/api/events/delete?deleteId=1');
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expect.objectContaining({
            message: "Event deleted",
        }));
    }));
    //Delete event with wrong id
    it('should respond with a 404 when event is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.app).delete('/api/events/delete?deleteId=999999');
        expect(response.status).toBe(404);
    }));
});
