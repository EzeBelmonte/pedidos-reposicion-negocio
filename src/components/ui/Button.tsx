import React from 'react';

// Definir las props que recibirá el componente Button
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};


const Button = ({ 
  children, 
  className = "",
  ...props }: Props) => {
  return (
    <button
      className={className}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;