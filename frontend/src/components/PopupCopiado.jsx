import { useEffect, useState } from 'react';
import '@styles/popupCopiado.css'; 

const TooltipCopiado = ({ message, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, 1250); 

      return () => clearTimeout(timer); 
    }
  }, [message, onClose]);

  if (!visible) return null;

  return (
    <div className="tooltip-copiado">
      <p>{message}</p>
    </div>
  );
};

export default TooltipCopiado;
