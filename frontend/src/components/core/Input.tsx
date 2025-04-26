import { useState } from "react";
import { InputProps } from "../../common/contants";

export const Input = ({
    label,
    name,
    placeholder,
    type = "text",
    value,
    onChange,
    className = "",
    ...restProps
}: InputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";

    return (
        <div className="flex flex-col gap-1 relative">
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                id={name}
                name={name}
                placeholder={placeholder}
                type={isPassword && showPassword ? "text" : type}
                value={value}
                onChange={onChange}
                className={`w-full rounded-md border border-gray-300 px-4 py-2 pr-10 text-sm placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black ${className}`}
                {...restProps}
            />
            {isPassword && (
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                    {showPassword ? "Hide" : "Show"}
                </button>
            )}
        </div>
    );
};
