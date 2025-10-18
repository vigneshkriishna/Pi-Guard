import { memo } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const AlertMessage = memo(function AlertMessage({ 
  variant = 'info', 
  children,
  onClose, 
  className = '',
  autoClose = false,
  autoCloseDelay = 5000
}) {
  // Map variants to styles and icons
  const variantMap = {
    success: {
      icon: <CheckCircle size={18} />,
      styles: 'bg-[hsl(142.1_70.6%_45.3%)]/10 text-[hsl(142.1_70.6%_45.3%)] border-[hsl(142.1_70.6%_45.3%)]/20'
    },
    error: {
      icon: <AlertCircle size={18} />,
      styles: 'bg-destructive/10 text-destructive border-destructive/20'
    },
    warning: {
      icon: <AlertCircle size={18} />,
      styles: 'bg-[hsl(48_96%_53%)]/10 text-[hsl(48_96%_53%)] border-[hsl(48_96%_53%)]/20'
    },
    info: {
      icon: <Info size={18} />,
      styles: 'bg-primary/10 text-primary border-primary/20'
    }
  };

  const { styles } = variantMap[variant] || variantMap.info;

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
      <div className="flex-1 flex items-center gap-2">
        {children}
      </div>
      {onClose && (
        <button 
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
