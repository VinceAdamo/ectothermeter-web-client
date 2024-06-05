
interface LoginInputProps {
    value: string;
    handleChange: (value: string) => void;
    label: string;
    type: 'text' | 'password';
}

export const LoginInput: React.FC<LoginInputProps> = (
    { value, handleChange, label, type }: LoginInputProps
) => {
    return (
        <div className="flex flex-col mb-6">
            <label className='text-s'>{label}</label>
            <input
            type={type}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            className='border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent w-full'
            />
        </div>
    )
}