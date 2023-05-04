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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.getEventById = exports.getEvents = exports.createEvent = void 0;
const events_1 = require("../models/events");
const AppDataSource_1 = require("../AppDataSource");
const class_validator_1 = require("class-validator");
const repository = AppDataSource_1.AppDataSource.getRepository(events_1.Event);
//Create new event
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if all fields are sent
    if (!req.body.title || !req.body.message || !req.body.owner) {
        return res.status(400).json({ message: 'All inputs are required!' });
    }
    try {
        const newEvent = repository.create(req.body);
        // Check if owner is in the right format
        const errors = yield (0, class_validator_1.validate)(newEvent);
        if (errors.length > 0) {
            return res.status(400).json({ OwnerError: "Owner should be {Letter+Number}!" });
        }
        // Save new event
        yield repository.save(newEvent);
        return res.status(201).json(newEvent);
    }
    catch (error) {
        const anyError = error;
        return res.status(500).json({ message: anyError.message });
    }
});
exports.createEvent = createEvent;
//Find all events
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield repository.find();
        return res.status(200).json(events);
    }
    catch (error) {
        const anyError = error;
        return res.status(500).json({ message: anyError.message });
    }
});
exports.getEvents = getEvents;
//Find event by id
const getEventById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.findId;
    try {
        const event = yield repository.findOne({ where: { id: parseInt(id) } });
        // Check if event exists
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        return res.status(200).json(event);
    }
    catch (error) {
        const anyError = error;
        return res.status(500).json({ message: anyError.message });
    }
});
exports.getEventById = getEventById;
//Update event by id
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.updateId;
    try {
        const event = yield repository.findOne({ where: { id: parseInt(id) } });
        // Check if event exists
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        // Check if all fields are sent
        if (!req.body.title || !req.body.message || !req.body.owner) {
            return res.status(400).json({ message: 'All inputs are required!' });
        }
        // Check if owner is in the right format
        repository.merge(event, req.body);
        const errors = yield (0, class_validator_1.validate)(event);
        if (errors.length > 0) {
            return res.status(400).json({ OwnerError: "Owner should be {Letter+Number}!" });
        }
        // Save and return updated event
        yield repository.save(event);
        return res.status(200).json(event);
    }
    catch (error) {
        const anyError = error;
        return res.status(500).json({ message: anyError.message });
    }
});
exports.updateEvent = updateEvent;
//Delete event by id
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.deleteId;
    try {
        const event = yield repository.findOne({ where: { id: parseInt(id) } });
        // Check if event exists
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        // Delete event
        yield repository.remove(event);
        return res.status(200).json({ message: 'Event deleted' });
    }
    catch (error) {
        const anyError = error;
        return res.status(500).json({ message: anyError.message });
    }
});
exports.deleteEvent = deleteEvent;
