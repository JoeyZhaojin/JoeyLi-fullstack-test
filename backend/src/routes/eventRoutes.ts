import { Router } from "express";
import { createEvent, deleteEvent, getEventById, getEvents, updateEvent } from "../controllers/eventController";

const router = Router();

//Find all or one by id
router.get("/",async (req, res) =>{
    if(req.query.findId){
        await getEventById(req, res);
        console.log("getEventById");
    }else{
        getEvents(req, res);
        console.log("getEvents");
    }
});

//Create new event
router.post('/', async (req, res) => {
    console.log("api/create");
    await createEvent(req, res);
});

//Update event by id
router.post('/update', async (req, res) =>{
    console.log("api/update");
    if(req.body.updateId){
        await updateEvent(req, res);
    }
    });

//Delete event by id
router.get('/delete', async (req, res) =>{
    console.log("api/delete");
    if(req.query.deleteId){
        await deleteEvent(req, res);
    }
  });

export default router;