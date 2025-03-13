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
                    editEvent(eventElement, year, month, day);
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
                editEvent(eventElement, year, month, day);
            });
            dayCell.appendChild(eventElement);

            // Save event to localStorage
            localStorage.setItem(`event-${year}-${month}-${day}`, eventText);
        }
    }

    function editEvent(eventElement, year, month, day) {
        const newEventText = prompt('Edit event details:', eventElement.textContent);
        if (newEventText) {
            eventElement.textContent = newEventText;
            // Update event in localStorage
            localStorage.setItem(`event-${year}-${month}-${day}`, newEventText);
        }
    }

    createCalendar(currentMonth, currentYear);
    createCalendar(currentMonth + 1, currentYear);
});