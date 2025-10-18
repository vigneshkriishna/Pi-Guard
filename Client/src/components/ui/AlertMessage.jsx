import { memo } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const AlertMessage = memo(function AlertMessage({ 
  variant = 'info', 
  message, 
  onClose, 
  className = '',
  autoClose = false,
  autoCloseDelay = 5000
}) {
  // Map variants to styles and icons
  const variantMap = {
    success: {
      icon: <CheckCircle size={18} />,
      styles: 'bg-green-100 text-green-600 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800'
    },
    error: {
      icon: <AlertCircle size={18} />,
      styles: 'bg-red-100 text-red-600 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800'
    },
    warning: {
      icon: <AlertCircle size={18} />,
      styles: 'bg-yellow-100 text-yellow-600 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800'
    },
    info: {
      icon: <Info size={18} />,
      styles: 'bg-teal-100 text-teal-600 border-teal-200 dark:bg-teal-900/30 dark:text-teal-400 dark:border-teal-800'
    }
  };

  const { icon, styles } = variantMap[variant] || variantMap.info;

  // Auto-close effect
  if (autoClose && onClose) {
    setTimeout(() => {
      onClose();
    }, autoCloseDelay);
  }

  return (
    <div className={cn(
      'flex items-center gap-3 p-4 rounded-md border',
      styles,
      className
    )}>
      <span className="shrink-0">{icon}</span>
      <p className="flex-1 text-sm">{message}</p>
      {onClose && (        <button 
          onClick={onClose}
          className="shrink-0 opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Close alert"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
});

export default AlertMessage;
