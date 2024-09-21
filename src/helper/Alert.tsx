// src/components/Alert.tsx
import Swal from 'sweetalert2';
import '../style.css'

const Alert = (type: 'success' | 'error', message: string) => {
    Swal.fire({
        icon: type,
        title: type === 'success' ? 'Success' : 'Error',
        text: message,
        position: 'top-end', // Positioning the alert in the top right
        showConfirmButton: false,
        timer: 2000, // Auto close after 2 seconds
        toast: true, // Make it a toast notification
        customClass: {
            popup: 'swal-custom-popup', // Custom class for styling
        },
    });
};

export default Alert;
