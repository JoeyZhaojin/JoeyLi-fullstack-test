# Event Management API

This is a simple restFUL event management API built with TypeScript, Express, and TypeORM. It provides CRUD operations for events and allows users to query and manipulate events data. The API also includes validation and error handling. The project contains a `test.ts` file for testing purposes and an `index.html` for interaction with the API.

## Features

- Create, read, update, and delete events.
- Query events by ID.
- Input validation and error handling.
- CORS support.
- Test cases with `test.ts`.
- Simple front-end interaction with `index.html`.


## API Endpoints

| Endpoint              | Method | Description                                       |
| --------------------- | ------ | ------------------------------------------------- |
| `/api/events`         | GET    | Retrieve all events or a specific event by ID     |
| `/api/events`         | POST   | Create a new event                                |
| `/api/events/update`  | PUT    | Update an existing event by ID                    |
| `/api/events/delete`  | DELETE | Delete an existing event by ID                    |

## Technologies Used

- TypeScript
- Express
- TypeORM
- CORS
- Jest
