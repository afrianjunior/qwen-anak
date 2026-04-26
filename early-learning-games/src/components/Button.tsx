import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'accent';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = 'primary',
  size = 'large',
  disabled = false,
  className = '',
}) => {
  const baseStyles = 'rounded-2xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg';
  
  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-opacity-90',
    secondary: 'bg-secondary text-white hover:bg-opacity-90',
    success: 'bg-success text-white hover:bg-opacity-90',
    accent: 'bg-accent text-gray-800 hover:bg-opacity-90',
  };
  
  const sizeStyles = {
    small: 'px-4 py-2 text-sm min-w-[80px] min-h-[80px]',
    medium: 'px-6 py-3 text-base min-w-[100px] min-h-[100px]',
    large: 'px-8 py-4 text-xl min-w-[120px] min-h-[120px]',
  };
  
  const disabledStyles = disabled 
    ? 'opacity-50 cursor-not-allowed transform-none' 
    : 'cursor-pointer';
  
  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabledStyles}
        ${className}
      `}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
