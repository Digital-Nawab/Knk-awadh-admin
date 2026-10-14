"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LOGO_ON_DARK } from "./brand";
import { EASE } from "./Reveal";

const Loader = () => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setDone(true), 1400);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#6B4324]"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <motion.img
            src={LOGO_ON_DARK}
            alt=""
            aria-hidden
            className="h-14 w-auto md:h-20"
            initial={{ opacity: 0, filter: "blur(10px)", scale: 1.04 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 1, ease: EASE }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
