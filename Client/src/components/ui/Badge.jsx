import { cn } from '../../lib/utils';

function Badge({
  variant = 'default',
  children,
  className = '',
  ...props
}) {
  // Variant styles
  const variantStyles = {
    default: 'bg-primary/10 text-primary hover:bg-primary/20',
    secondary: 'bg-secondary/10 text-secondary hover:bg-secondary/20',
    success: 'bg-success/10 text-success hover:bg-success/20',
    danger: 'bg-danger/10 text-danger hover:bg-danger/20',
    warning: 'bg-warning/10 text-warning hover:bg-warning/20',
    outline: 'border border-border bg-transparent text-foreground/70 hover:bg-accent hover:text-foreground'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
