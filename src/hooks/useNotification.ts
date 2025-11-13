import { useState, useCallback } from 'react';

interface NotificationState {
  message: string;
  type: 'success' | 'error';
}

const useNotification = () => {
  const [notification, setNotification] = useState<NotificationState | null>(null);

  const showNotification = useCallback(
    (message: string, type: 'success' | 'error' = 'success', duration = 3000) => {
      setNotification({ message, type });
      setTimeout(() => setNotification(null), duration);
    },
    []
  );

  return { notification, showNotification };
};

export default useNotification;