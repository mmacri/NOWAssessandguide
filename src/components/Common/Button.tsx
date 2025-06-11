import React from 'react';
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  className = ''
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantStyles = {
    primary: 'bg-[#81b5a1] text-white shadow-sm hover:bg-[#6da28e] focus:ring-[#81b5a1]',
    secondary: 'bg-[#2e6d7e] text-white shadow-sm hover:bg-[#245a69] focus:ring-[#2e6d7e]',
    outline: 'border border-[#81b5a1] bg-white text-[#293e40] shadow-sm hover:bg-gray-50 hover:border-[#6da28e] focus:ring-[#81b5a1]'
  };
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  return <button type={type} className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>;
};