import { motion, AnimatePresence } from 'framer-motion';
import { siteContent } from '../content/siteContent';

interface ProgressTrackerProps {
  currentStep: number;
  isVisible: boolean;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ currentStep, isVisible }) => {
  const steps = siteContent.progressSteps;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-0 left-0 w-full z-50 bg-dark-bg/80 backdrop-blur-md border-b border-slate-800 shadow-sm"
        >
          <div className="max-w-5xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between sm:justify-center sm:space-x-8">
              {steps.map((step) => {
                const isActive = currentStep >= step.id;
                const isCurrent = currentStep === step.id;

                return (
                  <div 
                    key={step.id}
                    className={`flex items-center transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-40'}`}
                  >
                    <div className={`relative flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold transition-colors ${
                      isCurrent ? 'bg-brand-500 text-white shadow-[0_0_10px_rgba(34,197,94,0.4)]' : 
                      isActive ? 'bg-brand-900 text-brand-400' : 'bg-slate-800 text-slate-500'
                    }`}>
                      {step.id}
                    </div>
                    <span className={`ml-2 text-xs sm:text-sm font-medium ${isCurrent ? 'text-white' : isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                      {step.label}
                    </span>
                    
                    {/* PC View Separator */}
                    {step.id !== steps.length && (
                      <div className="hidden sm:block w-8 md:w-16 h-px mx-4 bg-slate-800" />
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Mobile Progress Bar underneath */}
            <div className="sm:hidden absolute bottom-0 left-0 w-full h-[2px] bg-slate-800">
              <motion.div 
                className="h-full bg-brand-500"
                initial={{ width: '33%' }}
                animate={{ width: `${(currentStep / 3) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
