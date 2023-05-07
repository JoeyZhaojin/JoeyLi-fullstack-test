
document.addEventListener('DOMContentLoaded', () => {
    // Get all events
    const findAllEventsForm = document.getElementById('findAllEventsForm') as HTMLFormElement;
    const createEventForm = document.getElementById('createEventForm') as HTMLFormElement;
    const updateEventForm = document.getElementById('updateEventForm') as HTMLFormElement;
    const findEventByIdForm = document.getElementById('findEventByIdForm') as HTMLFormElement;
    const deleteEventForm = document.getElementById('deleteEventForm') as HTMLFormElement;
  
    // Add listener for findAll
    findAllEventsForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const target = event.target as HTMLFormElement;
    
        // Fetch data from API
        const response = await fetch(target.action, { method: 'GET' });
        const events = await response.json();

        // Display events
        displayEvents(events);
        if (events.length === 0) {
            alert('No events!Please create!');
      }
    });
  
    // Add listener for create
    createEventForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const target = event.target as HTMLFormElement;
  
      // Get form data
      const formData = new FormData(target);
  
      // Send POST request to create event
      const response = await fetch(target.action, {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: { 'Content-Type': 'application/json' },
      });
  
      // Get response
      if (response.ok) {
        // Display all events including the new one
        const response = await fetch("/api/events", { method: 'GET' });
        const events = await response.json();
        displayEvents(events);

        //return the created id
        const event = await response.json();
        alert(`Event created with ID: ${event.id}`);
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    });
  
    // Add listener for update
    updateEventForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const target = event.target as HTMLFormElement;
    
        // Get form data
        const formData = new FormData(target);
    
        // Send PUT request to update event
        const response = await fetch(target.action, {
            method: 'PUT',
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: { 'Content-Type': 'application/json' },
        });
    
        // Get response
        if (response.ok) {
            //Show updated event
            const event = await response.json();
            displayEvents([event]);
            alert(`Event updated with ID: ${event.id}`);
        } else {
            const error = await response.json();
            alert(`Error: ${error.message}`);
        }
        }
    );

    // Add listener for findById
    findEventByIdForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const target = event.target as HTMLFormElement;
    
        const formData = new FormData(target);
        const findId = (document.getElementById('findEventById') as HTMLInputElement).value;
    
        const response = await fetch(`${target.action}?findId=${findId}`, {
            method: 'GET',
          });
    
        if (response.ok) {
            const event = await response.json();
            displayEvents([event]);
        } else {
            const error = await response.json();
            alert(`Error: ${error.message}`);
        }
        }
    );

    // Add listener for delete
    deleteEventForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const target = event.target as HTMLFormElement;
    
        const formData = new FormData(target);
        const deleteId = (document.getElementById('deleteById') as HTMLInputElement).value;
    
        const response = await fetch(`${target.action}?deleteId=${deleteId}`, {
            method: 'DELETE',
          });
    
        if (response.ok) {
            alert(`Event deleted with ID: ${deleteId}`);
            const response = await fetch("/api/events", { method: 'GET' });
            const events = await response.json();
            displayEvents(events);
        } else {
            const error = await response.json();
            alert(`Error: ${error.message}`);
        }
        }
    );
  });

  
  // 显示事件的函数
  function displayEvents(events: any[]) {
    const eventsContainer = document.getElementById('events') as HTMLFormElement;
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
  
