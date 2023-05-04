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
const express_1 = require("express");
const eventController_1 = require("../controllers/eventController");
const router = (0, express_1.Router)();
//Find all or one by id
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.query.findId) {
        yield (0, eventController_1.getEventById)(req, res);
        console.log("getEventById");
    }
    else {
        (0, eventController_1.getEvents)(req, res);
        console.log("getEvents");
    }
}));
//Create new event
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("api/create");
    yield (0, eventController_1.createEvent)(req, res);
}));
//Update event by id
router.post('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("api/update");
    if (req.body.updateId) {
        yield (0, eventController_1.updateEvent)(req, res);
    }
}));
//Delete event by id
router.get('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("api/delete");
    if (req.query.deleteId) {
        yield (0, eventController_1.deleteEvent)(req, res);
    }
}));
exports.default = router;
