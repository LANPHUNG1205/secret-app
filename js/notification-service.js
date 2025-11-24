import {NotificationType} from "./model/notification-type.js";

const container = document.getElementById('notification-container');
const AUTODISMISS_TIME_MS = 5000;

/**
 * Generates the SVG icon based on the notification type.
 */
function getIcon(type) {
  let svgPath = '';
  switch (type) {
    case NotificationType.HINT:
      svgPath = '<path d="M12 22h4l1-1h-6"/><path d="M17 18H7V14h10z" /><path d="M12 18V6a4 4 0 0 0-4 4c0 1.25.75 2.52 1.5 3.5L12 18zM12 18V6a4 4 0 0 1 4 4c0 1.25-.75 2.52-1.5 3.5L12 18z" />';
      break;
    case NotificationType.SUCCESS:
      svgPath = '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M9 11l3 3L22 4"/>';
      break;
    case NotificationType.ERROR:
      svgPath = '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>';
      break;
    default:
      return '';
  }

  return `
                <div class="icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        ${svgPath}
                    </svg>
                </div>
            `;
}

/**
 * Creates, displays, and manages the lifecycle of a single notification.
 * @param {string} type - 'hint', 'success', or 'error'
 * @param {string} message - The content of the notification
 */
export function showNotification(type, message) {

  const notification = document.createElement('div');
  notification.className = `notification ${type.toString().toLowerCase()}`;

  notification.innerHTML = `
                ${getIcon(type)}
                <div class="notification-content">
                    <div class="notification-heading">${type.toString()}</div>
                    <div class="notification-message">${message}</div>
                </div>
                <button class="close-button" aria-label="Close">
                    <svg 
                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                    </svg>
                </button>
            `;

  // 3. Add closing function
  const dismissNotification = () => {
    // Apply slide-out animation class
    notification.classList.add('slide-out');
    // Remove the element completely after the animation finishes
    notification.addEventListener('animationend', () => {
      notification.remove();
    });
  };

  const closeButton = notification.querySelector('.close-button');
  closeButton.onclick = dismissNotification;

  // 4. Append to container (LIFO: Last In, First Out)
  // Inserts the new notification at the top of the stack
  container.prepend(notification);

  // 5. Set up auto-dismissal
  setTimeout(dismissNotification, AUTODISMISS_TIME_MS);
}
