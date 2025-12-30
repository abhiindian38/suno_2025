
import { motion } from 'framer-motion';
import { cn } from '../../../lib/utils';

interface PageWrapperProps {
    children: React.ReactNode;
    noPadding?: boolean;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, noPadding = false }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={cn(
            "w-full",
            !noPadding && "pt-[var(--page-top-padding-mobile)] lg:pt-[var(--page-top-padding-desktop)]"
        )}
    >
        {children}
    </motion.div>
);

export default PageWrapper;
