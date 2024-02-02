export default function InputLabel({ value, className = '', children, required=false, ...props }) {
    return (
        <label {...props} className={`block capitalize text-base font-medium text-gray-900 dark:text-white ${className}`}>
            {value ? value : children}
            {required && <span className="text-red-500 ms-1">(*)</span>}
        </label>
    );
}
