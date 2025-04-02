// src/components/CustomToaster.jsx
import { Toaster, toast } from 'react-hot-toast';
import { useEffect } from 'react';

const CustomToaster = ({ message, type, duration }) => {
  useEffect(() => {
    if (!message) return;
    
    const options = { duration };
    
    switch(type) {
      case 'success':
        toast.success(message, options);
        break;
      case 'error':
        toast.error(message, options);
        break;
      default:
        toast(message, options);
    }
  }, [message, type, duration]);

  return null; // Don't render anything, just handle toasts
};

export default CustomToaster;