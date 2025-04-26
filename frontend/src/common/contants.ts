export interface InputProps {
    /** Label text shown above the input */
    label: string;

    /** Input field's name attribute (optional but good for forms) */
    name?: string;

    /** Placeholder text shown inside the input */
    placeholder?: string;

    /** Type of input (text, email, password, etc.) */
    type?: string;

    /** Value of the input (for controlled components) */
    value?: string;

    /** onChange event handler */
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

    /** Additional custom classes if needed */
    className?: string;
}

export interface ButtonProps {
    /** Content inside the button (usually text, could be icons) */
    children: React.ReactNode;

    /** Button type (button, submit, reset) */
    type?: "button" | "submit" | "reset";

    /** onClick event handler */
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

    /** Disabled state */
    disabled?: boolean;

    /** Additional custom classes if needed */
    className?: string;
}


export interface RequestOptions<TPayload = any, TParams = any> {
    url: string;
    method?: "get" | "post" | "put" | "patch" | "delete";
    payload?: TPayload;
    params?: TParams;
    onSuccess?: (data: any) => void;
}

export interface SkeletonProps {
    className?: string;
}

export interface BlogCardProps {
    isLoading: boolean;
    title: string;
    description: string;
    author: string;
    date: string;
    handleClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export interface BlogPost {
    id: string;
    title: string;
    content: string;
    published: boolean;
    author: { name: string };
    createdAt: string; // ISO Date string (you can also use `Date` if you plan to parse it)
    updatedAt: string;
}
