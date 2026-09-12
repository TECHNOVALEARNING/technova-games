import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

// Premium cubic-bezier easing curve (Apple / Vercel style)
export const smoothEase = [0.16, 1, 0.3, 1] as const;

interface FadeInProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  className?: string;
  once?: boolean;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.65,
  direction = 'up',
  distance = 28,
  className = '',
  once = true,
  ...props
}) => {
  const getOffset = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = getOffset();

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: 0.15, margin: '-20px' }}
      transition={{
        duration,
        delay,
        ease: smoothEase,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface StaggerContainerProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  className?: string;
  once?: boolean;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  staggerDelay = 0.09,
  delayChildren = 0.05,
  className = '',
  once = true,
  ...props
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.1, margin: '-20px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className = '',
  direction = 'up',
  ...props
}) => {
  const getVariants = () => {
    if (direction === 'scale') {
      return {
        hidden: { opacity: 0, scale: 0.92 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.55, ease: smoothEase },
        },
      };
    }
    const offset =
      direction === 'up'
        ? { y: 24 }
        : direction === 'down'
        ? { y: -24 }
        : direction === 'left'
        ? { x: 24 }
        : { x: -24 };

    return {
      hidden: { opacity: 0, ...offset },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration: 0.6, ease: smoothEase },
      },
    };
  };

  return (
    <motion.div variants={getVariants()} className={className} {...props}>
      {children}
    </motion.div>
  );
};

// Converging card animation: items coming together from different sides
interface ConvergeItemProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  position: 'left' | 'center' | 'right';
  className?: string;
  delay?: number;
}

export const ConvergeItem: React.FC<ConvergeItemProps> = ({
  children,
  position,
  className = '',
  delay = 0,
  ...props
}) => {
  const initial =
    position === 'left'
      ? { opacity: 0, x: -40, y: 15, scale: 0.95 }
      : position === 'right'
      ? { opacity: 0, x: 40, y: 15, scale: 0.95 }
      : { opacity: 0, y: 30, scale: 0.93 };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.75,
        delay,
        ease: smoothEase,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
