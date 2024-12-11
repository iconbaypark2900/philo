import { motion } from 'framer-motion';
import Link from 'next/link';

import { MessageIcon } from './icons';

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <div className="rounded-xl p-6 flex flex-col gap-8 leading-relaxed text-center max-w-xl">
        <p className="flex flex-row justify-center gap-4 items-center">
          <MessageIcon size={32} />
        </p>
        <p>
          Welcome to the Philosopher AI Assistant. This chatbot is designed to help
          you explore philosophical concepts, engage in deep discussions, and
          analyze complex ideas through the lens of various philosophical
          traditions.
        </p>
        <p>
          Start a conversation to discuss ethics, metaphysics, epistemology, or any
          other philosophical topic you're interested in exploring.
        </p>
      </div>
    </motion.div>
  );
};
