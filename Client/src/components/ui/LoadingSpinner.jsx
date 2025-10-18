import { cn } from "../../lib/utils";

function LoadingSpinner({ size = "default", className = "" }) {
  const sizeClasses = {
    small: "w-4 h-4 border-2",
    default: "w-8 h-8 border-3",
    large: "w-12 h-12 border-4"
  };

  return (
    <div className={cn(
      "animate-spin rounded-full border-t-transparent border-primary",
      sizeClasses[size] || sizeClasses.default,
      className
    )} />
  );
}

export default LoadingSpinner;
