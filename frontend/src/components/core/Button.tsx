import { ButtonProps } from "../../common/contants";

export const Button = ({
    children,
    type = "button",
    onClick,
    disabled,
    className,
    ...restProps
}: ButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 cursor-pointer disabled:opacity-50 ${className}`}
            {...restProps}
        >
            {children}
        </button>
    );
};
