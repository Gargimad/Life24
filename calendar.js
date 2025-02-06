document.addEventListener('DOMContentLoaded', () => {
    const calendarContainer = document.getElementById('calendar');
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
            dayCell.addEventListener('click', () => addEvent(dayCell));
            calendarContainer.appendChild(dayCell);
        }
    }

    function addEvent(dayCell) {
        const eventText = prompt('Enter event details:');
        if (eventText) {
            const eventElement = document.createElement('div');
            eventElement.className = 'event';
            eventElement.textContent = eventText;
            dayCell.appendChild(eventElement);
            
        }
    }

    createCalendar(currentMonth, currentYear);
    createCalendar(currentMonth + 1, currentYear);
});
