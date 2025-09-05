import { useState } from 'react';
import TherapeuticNotification from '../components/luxury/TherapeuticNotification';

interface TherapeuticNotificationProps {
  type?: 'success' | 'info' | 'warning' | 'gentle';
  title?: string;
  message: string;
  duration?: number;
  onClose?: () => void;
  showIcon?: boolean;
  position?: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center';
}

export const useTherapeuticNotification = () => {
  const [notifications, setNotifications] = useState<Array<{
    id: string
    props: TherapeuticNotificationProps
  }>>([])

  const showNotification = (props: Omit<TherapeuticNotificationProps, 'onClose'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    
    setNotifications(prev => [...prev, {
      id,
      props: {
        ...props,
        onClose: () => removeNotification(id)
      }
    }])
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const NotificationContainer = () => (
    <>
      {notifications.map(({ id, props }) => (
        <TherapeuticNotification key={id} {...props} />
      ))}
    </>
  )

  return {
    showNotification,
    NotificationContainer
  }
}