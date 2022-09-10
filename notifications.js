// DOM elements
const notificationCountDOM = document.querySelector('.badge.badge-warning.navbar-badge');
const notificationsContentDOM = document.querySelector('#notifications .dropdown-menu');

setInterval(updateNotification, 5000);

async function updateNotification() {
    // Fetch notifications count
    const date = new Date();
    const count = date.getMinutes();
    
    if (notificationCountDOM.textContent !== count.toString()) {
        notificationCountDOM.textContent = count;
        
        animateNotificationCount();

        notificationsContentDOM.innerHTML = '';

        const header = createHeader(count);

        const dropdownDivider = createDropDownDivider();

        notificationsContentDOM.append(header, dropdownDivider);

        // Fetch notifications content
        const notifications = [
            {content: `Content nr: ${count}`, time: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`},
            {content: `Content nr: ${count + 1}`, time: `${date.getHours() + 1}:${date.getMinutes() + 1}:${date.getSeconds() + 1}`},
            {content: `Content nr: ${count + 2}`, time: `${date.getHours() + 2}:${date.getMinutes() + 2}:${date.getSeconds() + 2}`},
            {content: `Content nr: ${count + 3}`, time: `${date.getHours() + 3}:${date.getMinutes() + 3}:${date.getSeconds() + 3}`},
            {content: `Content nr: ${count + 4}`, time: `${date.getHours() + 4}:${date.getMinutes() + 4}:${date.getSeconds() + 4}`},
            {content: `Content nr: ${count + 5}`, time: `${date.getHours() + 5}:${date.getMinutes() + 5}:${date.getSeconds() + 5}`},
        ];
        // Simulate time to fetch (500ms)
        await new Promise(x => setTimeout(x, 500));

        appendNotifications(notifications, notificationsContentDOM);

        const seeAll = createSeeAll();

        notificationsContentDOM.appendChild(seeAll);
    } 
}

function animateNotificationCount() {
    const growing = [
        { transform: 'translate(0, 0) scale(1)' },
        { transform: 'translate(0, -4px) scale(1.2)' },
        { transform: 'translate(0, 0) scale(1)' }
    ]

    const timing = {
        duration: 500,
        iterations: 1
    }

    notificationCountDOM.animate(growing, timing);
}

function createHeader(count) {
    const header = document.createElement('span');
    header.classList.add('dropdown-header');
    header.textContent = `${count} Notifications`;
    return header;
}

function createDropDownDivider() {
    const dropdownDivider = document.createElement('div');
    dropdownDivider.classList.add('dropdown-divider');
    return dropdownDivider;
}

function appendNotifications(notifications, notificationsContentDOM) {
    notifications.forEach(notification => {
        const item = document.createElement('a');
        item.classList.add('dropdown-item');

        const icon = document.createElement('i');
        icon.classList.add('fas', 'fa-users', 'mr-2');

        const text = document.createElement('span');
        text.textContent = notification.content;

        const time = document.createElement('span');
        time.classList.add('float-right', 'text-muted', 'text-sm');
        time.textContent = notification.time;
        
        const dropdownDivider = createDropDownDivider();

        item.append(icon, text, time);
        notificationsContentDOM.append(item, dropdownDivider);
    });
}

function createSeeAll() {
    const seeAll = document.createElement('a');
    seeAll.classList.add('dropdown-item', 'dropdown-footer');
    seeAll.textContent = 'See All Notifications';
    return seeAll;
}
