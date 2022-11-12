import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    dateInput: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    daysValue: document.querySelector('[data-days]'),
    hoursValue: document.querySelector('[data-hours]'),
    minutesValue: document.querySelector('[data-minutes]'),
    secondsValue: document.querySelector('[data-seconds]'),
};

let dateSelection = null;
let deltaTime = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        dateSelection = selectedDates[0];
        if (dateSelection < options.defaultDate) {
            return Notify.failure("Please choose a date in the future")
        } else {
            refs.startBtn.disabled = false;
        }
    },
};

const timer = {
    intervalID: null,
    start() {
        this.intervalID = setInterval(() => {
            deltaTime = dateSelection - Date.now();
            if (deltaTime < 0) {
                return this.stop()
            }
            const time = convertMs(deltaTime);
            updateTimerValues(time)
        }, 1000);
    },
    stop() {
        clearInterval(this.intervalID);
    },
};

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', () => {
    timer.start();
    refs.dateInput.disabled = true;
    refs.startBtn.disabled = true;
});

flatpickr(refs.dateInput, options);

function addLeadingZero(value) {
    return String(value).padStart(2, '0')
};

function updateTimerValues({ days, hours, minutes, seconds }) {
    refs.daysValue.textContent = days;
    refs.hoursValue.textContent = hours;
    refs.minutesValue.textContent = minutes;
    refs.secondsValue.textContent = seconds;
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = addLeadingZero(Math.floor(ms / day)); // Remaining days
    const hours = addLeadingZero(Math.floor((ms % day) / hour)); // Remaining hours
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute)); // Remaining minutes
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second)); // Remaining seconds

    return { days, hours, minutes, seconds };
};