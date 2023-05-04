import { Request, Response } from 'express';
import { Event } from '../models/events';
import { AppDataSource } from "../AppDataSource";
import { validate } from 'class-validator';

const repository = AppDataSource.getRepository(Event);

//Create new event
export const createEvent = async (req: Request, res: Response) => {
  // Check if all fields are sent
  if (!req.body.title || !req.body.message || !req.body.owner) {
    return res.status(400).json({ message: 'All inputs are required!' });
  }
  try {
    const newEvent = repository.create(req.body);

    // Check if owner is in the right format
    const errors = await validate(newEvent);
    if (errors.length > 0) {
      return res.status(400).json({ OwnerError: "Owner should be {Letter+Number}!" });
    }

    // Save new event
    await repository.save(newEvent);
    return res.status(201).json(newEvent);
  } catch (error) {
    const anyError = error as Error;
    return res.status(500).json({ message: anyError.message });
  }
};

//Find all events
export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await repository.find();
    return res.status(200).json(events);
  } catch (error) {
    const anyError = error as Error;
    return res.status(500).json({ message: anyError.message });
  }
};

//Find event by id
export const getEventById = async (req: Request, res: Response) => {
  const id = req.query.findId as string;
  try {
    const event = await repository.findOne({where: {id: parseInt(id)}});

    // Check if event exists
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    return res.status(200).json(event);
  } catch (error) {
    const anyError = error as Error;
    return res.status(500).json({ message: anyError.message });
  }
};

//Update event by id
export const updateEvent = async (req: Request, res: Response) => {
  const id = req.body.updateId as string;
  try {
    const event = await repository.findOne({where: {id: parseInt(id)}});

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
    const errors = await validate(event);
    if (errors.length > 0) {
      return res.status(400).json({ OwnerError: "Owner should be {Letter+Number}!" });
    }

    // Save and return updated event
    await repository.save(event);
    return res.status(200).json(event);
  } catch (error) {
    const anyError = error as Error;
    return res.status(500).json({ message: anyError.message });
  }
};

//Delete event by id
export const deleteEvent = async (req: Request, res: Response) => {
  const id = req.query.deleteId as string;
  try {
    const event = await repository.findOne({where: {id: parseInt(id)}});

    // Check if event exists
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Delete event
    await repository.remove(event);
    return res.status(200).json({ message: 'Event deleted' });
  } catch (error) {
    const anyError = error as Error;
    return res.status(500).json({ message: anyError.message });
  }
};

