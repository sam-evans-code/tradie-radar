// Simple toast system to replace Sonner
let toastId = 0;

export const toast = {
  success: (message: string) => showToast(message, 'success'),
  error: (message: string) => showToast(message, 'error'),
  info: (message: string) => showToast(message, 'info'),
};

function showToast(message: string, type: 'success' | 'error' | 'info') {
  const id = ++toastId;
  const toastElement = document.createElement('div');
  
  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500', 
    info: 'bg-blue-500'
  }[type];
  
  toastElement.className = `fixed top-4 right-4 ${bgColor} text-white px-4 py-2 rounded-md shadow-lg z-50 transition-opacity duration-300`;
  toastElement.textContent = message;
  toastElement.id = `toast-${id}`;
  
  const container = document.getElementById('toast-root') || document.body;
  container.appendChild(toastElement);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    const element = document.getElementById(`toast-${id}`);
    if (element) {
      element.style.opacity = '0';
      setTimeout(() => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      }, 300);
    }
  }, 3000);
}