
interface LoginInputProps {
    value: string;
    handleChange: (value: string) => void;
    label: string;
    type: 'text' | 'password';
    error: boolean;
}

export const LoginInput: React.FC<LoginInputProps> = (
    { value, handleChange, label, type, error }: LoginInputProps
) => {

    const errorBorder = 'border-red-500';
    const normalBorder = 'border-gray-400';

    const errorRing = 'ring-red-500';
    const normalRing = 'ring-cyan-500';

    const className = `
        border 
        ${error ? errorBorder : normalBorder} 
        rounded-md p-2 
        focus:outline-none 
        focus:ring-2 
        focus:${error ? errorRing : normalRing}
        focus:border-transparent 
        w-full
    `;
    
    return (
        <div className="flex flex-col mb-6">
            <label className='text-s'>{label}</label>
            <input
            type={type}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            className={className}
            />
        </div>
    )
}