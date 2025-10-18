import { motion } from 'framer-motion';
import { 
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
import { cn } from '../../lib/utils';

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

function Sidebar({ navigationItems, activeView, setActiveView, closeMobileSidebar }) {
  return (    <aside className="hidden lg:block sidebar w-64 py-6 border-r border-border h-[calc(100vh-4rem)] overflow-y-auto sticky top-16 bg-background-muted">
      <div className="px-3 mb-6">
        <h2 className="text-lg font-semibold px-4 mb-2 text-foreground">
          Features
        </h2>
        <nav>
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveView(item.id);
                    if (closeMobileSidebar) closeMobileSidebar();
                  }}                  className={cn(
                    "flex items-center w-full gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    activeView === item.id
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/70 hover:text-foreground hover:bg-accent"
                  )}
                >
                  <span className="shrink-0">
                    {getIcon(item.id)}
                  </span>
                  <span>{item.name}</span>
                  {activeView === item.id && (
                    <motion.div
                      layoutId="sidebar-active-pill"
                      className="absolute left-0 w-1 h-6 bg-white dark:bg-gray-100 rounded-full"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      <div className="px-6">        <div className="p-4 rounded-lg border border-border bg-card">
          <h3 className="font-medium text-sm mb-2">PI-Net Pro</h3>
          <p className="text-xs text-foreground/70 mb-3">
            Upgrade for advanced protection and unlimited scans.
          </p>
          <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-1.5 px-3 rounded-md text-xs transition-colors">
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
