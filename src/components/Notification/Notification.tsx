import React from 'react';

import './Notification.css';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
}

const Notification = React.memo(({ message, type }: NotificationProps) => {
  return <div className={`notification notification-${type}`}>{message}</div>;
});

export default Notification;
