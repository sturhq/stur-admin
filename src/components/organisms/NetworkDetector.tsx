import {Wifi, WifiOff} from 'lucide-react';
import {useEffect, useState} from 'react';

export const NetworkDetector = () => {
  const [isConnected, setIsConnected] = useState(navigator.onLine);
  const [showStatus, setShowStatus] = useState(null);

  const animationClass = showStatus
    ? 'animate-slideIn'
    : 'animate-slideOut';
  const statusClass = isConnected
    ? 'bg-green005 text-white'
    : 'bg-red-600 text-white';

  const handleConnectionChange = () => {
    const condition = navigator.onLine;
    setIsConnected(condition);
    setShowStatus(true);

    if (condition) {
      setTimeout(() => {
        setShowStatus(null);
      }, 3000);
    }
  };

  useEffect(() => {
    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);

    return () => {
      window.removeEventListener('online', handleConnectionChange);
      window.removeEventListener('offline', handleConnectionChange);
    };
  }, []);

  return (
    showStatus !== null && (
      <div
        className={`${statusClass} ${animationClass} fixed top-0 left-0 w-full h-[4rem] flex items-center justify-center z-50`}
      >
        <p className=" text-base font-medium uppercase flex gap-2">
          {isConnected ? <Wifi /> : <WifiOff />}
          {isConnected
            ? 'Network connection restored!'
            : 'You are offline'}
        </p>
      </div>
    )
  );
};
