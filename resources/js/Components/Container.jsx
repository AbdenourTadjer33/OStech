const Container = ({ children, className = "" }) => (
    <div className={`mx-auto max-w-screen-xl p-4 ${className}`}>{children}</div>
);

export default Container;
