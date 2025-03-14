document.addEventListener('DOMContentLoaded', () => {
    const calendarContainer = document.getElementById('calendar');
    calendarContainer.style.backgroundColor = 'lightgray'; // Change background color to light gray
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    function createCalendar(month, year) {
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const monthHeader = document.createElement('div');
        monthHeader.className = 'month-header';
        monthHeader.textContent = `${monthNames[month]} ${year}`;
        calendarContainer.appendChild(monthHeader); 

        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'day';
            calendarContainer.appendChild(emptyCell);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'day';
            dayCell.textContent = day;
            dayCell.addEventListener('click', () => addEvent(dayCell, month, year, day));
            calendarContainer.appendChild(dayCell);

            // Load saved events
            const savedEvent = localStorage.getItem(`event-${year}-${month}-${day}`);
            if (savedEvent) {
                const eventElement = document.createElement('div');
                eventElement.className = 'event';
                eventElement.textContent = savedEvent;
                eventElement.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showEventOptions(eventElement, year, month, day);
                });
                dayCell.appendChild(eventElement);
            }
        }
    }

    function addEvent(dayCell, month, year, day) {
        const eventText = prompt('Enter event details:');
        if (eventText) {
            const eventElement = document.createElement('div');
            eventElement.className = 'event';
            eventElement.textContent = eventText;
            eventElement.addEventListener('click', (e) => {
                e.stopPropagation();
                showEventOptions(eventElement, year, month, day);
            });
            dayCell.appendChild(eventElement);

            // Save event to localStorage
            localStorage.setItem(`event-${year}-${month}-${day}`, eventText);
        }
    }

    function showEventOptions(eventElement, year, month, day) {
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'event-options';

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', (e) => {
            e.stopPropagation();
            editEvent(eventElement, year, month, day);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteEvent(eventElement, year, month, day);
        });

        optionsContainer.appendChild(editButton);
        optionsContainer.appendChild(deleteButton);
        eventElement.appendChild(optionsContainer);
    }

    function editEvent(eventElement, year, month, day) {
        const newEventText = prompt('Edit event details:');
        if (newEventText) {
            eventElement.textContent = newEventText;
            // Update event in localStorage
            localStorage.setItem(`event-${year}-${month}-${day}`, newEventText);
        }
    }

    function deleteEvent(eventElement, year, month, day) {
        if (confirm('Are you sure you want to delete this event?')) {
            eventElement.remove();
            // Remove event from localStorage
            localStorage.removeItem(`event-${year}-${month}-${day}`);
        }
    }

    createCalendar(currentMonth, currentYear);
    createCalendar(currentMonth + 1, currentYear);
});