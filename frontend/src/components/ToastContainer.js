import {
  Danger,
  InfoCircle,
  MessageNotif,
  TickSquare,
  Warning2,
} from 'iconsax-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

function ToastContainer() {
  const toasts = useSelector((state) => state.toasts);
  return (
    <div className="md:min-w-[20rem] min-w-[95%] md:w-auto md:max-w-[25rem] toast-container absolute z-50 top-0 left-1/2 -translate-x-1/2 mt-2 max-h-[90vh] overflow-scroll">
      <AnimatePresence initial={true} exitBeforeEnter={false}>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: {
                duration: 0.2,
                type: 'spring',
                damping: 30,
                stiffness: 700,
              },
            }}
            exit={{ opacity: 0, scale: 0, y: '-100vh' }}
            className={` w-full mb-1 text-slate-400 text-lg p-3  flex flex-row  items-center rounded-md bg-[#151515] border-2 border-[#464646]
            
            `}
          >
            {' '}
            <span className="pr-3">
              {toast.type === 'success' ? (
                <TickSquare className="text-green-500 " />
              ) : toast.type === 'error' ? (
                <Danger className="text-red-500" />
              ) : toast.type === 'info' ? (
                <InfoCircle className="text-indigo-500" />
              ) : toast.type === 'warning' ? (
                <Warning2 className="text-orange-500" />
              ) : (
                <MessageNotif className="text-slate-500" />
              )}
            </span>
            <span>{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default ToastContainer;

// ${
//   toast.type === 'success'
//     ? 'border-green-500'
//     : toast.type === 'error'
//     ? 'border-red-500'
//     : toast.type === 'info'
//     ? 'border-indigo-500'
//     : toast.type === 'warning'
//     ? 'border-orange-500'
//     : 'border-[#2e2e2e]'
// }
