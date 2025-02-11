import React from 'react';
import '@styles/components/Button.module.scss';

interface ButtonProps {
    onClick: () => void;
    label: string;
    disabled?: boolean;
    className: string;
}

const Button: React.FC<ButtonProps> = ({ className, onClick, label, disabled = false }) => {
    return (
        <button className={className} onClick={onClick} disabled={disabled} data-testid="button">
            {label}
        </button>
    );
};

export default Button;