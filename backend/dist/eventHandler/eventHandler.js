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
document.addEventListener('DOMContentLoaded', () => {
    // Get all events
    const findAllEventsForm = document.getElementById('findAllEventsForm');
    const createEventForm = document.getElementById('createEventForm');
    const updateEventForm = document.getElementById('updateEventForm');
    const findEventByIdForm = document.getElementById('findEventByIdForm');
    const deleteEventForm = document.getElementById('deleteEventForm');
    // Add listener for findAll
    findAllEventsForm.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const target = event.target;
        // Fetch data from API
        const response = yield fetch(target.action, { method: 'GET' });
        const events = yield response.json();
        // Display events
        displayEvents(events);
        if (events.length === 0) {
            alert('No events!');
        }
    }));
    // Add listener for create
    createEventForm.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const target = event.target;
        // Get form data
        const formData = new FormData(target);
        // Send POST request to create event
        const response = yield fetch(target.action, {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: { 'Content-Type': 'application/json' },
        });
        // Get response
        if (response.ok) {
            // Display all events including the new one
            const response = yield fetch("/api/events", { method: 'GET' });
            const events = yield response.json();
            displayEvents(events);
            //return the created id
            const event = yield response.json();
            alert(`Event created with ID: ${event.id}`);
        }
        else {
            const error = yield response.json();
            alert(`Error: ${error.message}`);
        }
    }));
    // Add listener for update
    updateEventForm.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const target = event.target;
        // Get form data
        const formData = new FormData(target);
        // Send PUT request to update event
        const response = yield fetch(target.action, {
            method: 'PUT',
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: { 'Content-Type': 'application/json' },
        });
        // Get response
        if (response.ok) {
            //Show updated event
            const event = yield response.json();
            displayEvents([event]);
            alert(`Event updated with ID: ${event.id}`);
        }
        else {
            const error = yield response.json();
            alert(`Error: ${error.message}`);
        }
    }));
    // Add listener for findById
    findEventByIdForm.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const target = event.target;
        const formData = new FormData(target);
        const findId = document.getElementById('findEventById').value;
        const response = yield fetch(`${target.action}?findId=${findId}`, {
            method: 'GET',
        });
        if (response.ok) {
            const event = yield response.json();
            displayEvents([event]);
        }
        else {
            const error = yield response.json();
            alert(`Error: ${error.message}`);
        }
    }));
    // Add listener for delete
    deleteEventForm.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const target = event.target;
        const formData = new FormData(target);
        const deleteId = document.getElementById('deleteById').value;
        const response = yield fetch(`${target.action}?deleteId=${deleteId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            alert(`Event deleted with ID: ${deleteId}`);
            const response = yield fetch("/api/events", { method: 'GET' });
            const events = yield response.json();
            displayEvents(events);
        }
        else {
            const error = yield response.json();
            alert(`Error: ${error.message}`);
        }
    }));
});
// Show results on frontend
function displayEvents(events) {
    const eventsContainer = document.getElementById('events');
    eventsContainer.innerHTML = '';
    for (const event of events) {
        const eventDiv = document.createElement('div');
        eventDiv.innerHTML = `
        <p>ID: ${event.id} &nbsp&nbsp
        Title: ${event.title} &nbsp&nbsp
        Message: ${event.message} &nbsp&nbsp
        Owner: ${event.owner}</p>
        <br>
      `;
        eventsContainer.appendChild(eventDiv);
    }
}
