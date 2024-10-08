// components/AnimatedLink.tsx
import Link from 'next/link';
import { useState, ReactNode } from 'react';

interface AnimatedLinkProps {
  href: string;
  children: ReactNode;
}

const AnimatedLink: React.FC<AnimatedLinkProps> = ({ href, children }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 400); // Match the animation duration
  };

  return (
    <Link
      href={href}
      className={`text-dark-text hover:text-red-800 text-lg font-bold ${
        isAnimating ? 'animate-bounce-once' : ''
      }`}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

export default AnimatedLink;
