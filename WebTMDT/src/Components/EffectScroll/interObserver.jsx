import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const FadeInSection = ({ children }) => {
  const ref = useRef(null);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasShown(true); // đánh dấu đã nhìn thấy
          observer.disconnect(); // NGẮT observer sau khi đã thấy
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 170 }}
      animate={hasShown ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInSection;
