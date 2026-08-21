import type { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";

import { cn } from "@/utils/cn";

interface Props {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  overlay?: boolean;
}

const Modal = ({
  open,
  onClose,
  children,
  className = "",
  overlay = true,
}: Props) => {

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <Dialog.Portal>
        {/* Fondo Principal */}
        <Dialog.Overlay
          className={cn(overlay &&
            `fixed inset-0
            z-50`
          )}
        />

        <Dialog.Content
          asChild
          className={cn(`
            fixed
            w-full
            px-2
            outline-none
            top-10 
            left-1/2 -translate-x-1/2
            z-50`,
            className
          )}
        >
          <motion.div
            initial={{ opacity: 0, scale: .95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
        
            {children}

          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default Modal;