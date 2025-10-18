import { motion } from 'framer-motion';
import { 
  X,
  ShieldCheck, 
  Shield, 
  Users, 
  LineChart, 
  Newspaper, 
  MessageSquare,
  Lock,
  KeyRound,
  FileText,
  Info,
  Phone
} from 'lucide-react';

function MobileSidebar({ 
  isOpen, 
  setIsOpen, 
  navigationItems, 
  activeView, 
  setActiveView 
}) {
  // Variants for the backdrop
  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };

  // Variants for the sidebar
  const sidebarVariants = {
    closed: { x: '-100%' },
    open: { x: 0 }
  };

  return (
    <motion.div
      initial="closed"
      animate="open"
      exit="closed"
      variants={backdropVariants}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm lg:hidden"
      onClick={() => setIsOpen(false)}
    >
      {/* Stop propagation to prevent closing when clicking inside the sidebar */}
      <motion.div
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-0 top-0 h-full w-3/4 max-w-xs bg-background-muted shadow-lg z-50 border-r border-border"
        onClick={(e) => e.stopPropagation()}
      >        <div className="flex justify-between items-center p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">PI-Net Menu</h2>
          <button
            className="p-1 rounded-full hover:bg-accent text-foreground/60 hover:text-foreground transition-colors"
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100%-4rem)] p-4">
          <nav>
            <ul className="space-y-1">
              {navigationItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveView(item.id);
                      setIsOpen(false);
                    }}                    className={`flex items-center w-full gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      activeView === item.id
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground/70 hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    <span className="shrink-0">
                      {getIcon(item.id)}
                    </span>
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Helper function to get icons based on view ID
function getIcon(viewId) {
  const icons = {
    'cyberguard': <ShieldCheck size={20} />,
    'parental': <Shield size={20} />,
    'dashboard': <LineChart size={20} />,
    'news': <Newspaper size={20} />,
    'community': <MessageSquare size={20} />,
    'password-checker': <Lock size={20} />,
    'password-generator': <KeyRound size={20} />,
    'learn': <FileText size={20} />,
    'about': <Info size={20} />,
    'contact': <Phone size={20} />
  };
  
  return icons[viewId] || <ShieldCheck size={20} />;
}

export default MobileSidebar;
