import React, { FC } from "react";
import "./styles.css";

interface ButtonActionProps {
    onClick?: () => void;
    text: string;
    type: "primary" | "secondary";
    format: "small" | "medium" | "large";
    border: "default" | "rounded";
    submit?: boolean;
    buttonType?: "button" | "submit" | "reset";
}

const ButtonAction: FC<ButtonActionProps> = ({onClick, text, type, format, border, submit, buttonType = "submit" }) => {
    return (
        <div>
            <button 
                type={buttonType}
                onClick={onClick} 
                className={`${type}-button ${format}-button ${border}-button`}
            >
                {text}
            </button>
        </div>
    )
}

export default ButtonAction;