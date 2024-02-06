const PATH = "/assets/logo/";

const ApplicationLogo = ({ type = "white", className = "" }) => {
    const logos = {
        white: "white.png",
        dark: "dark.png",
        blue: "blue.png",
        indigo: "indigo.png",
    };

    return <img className={`h-20 ${className}`} src={PATH + logos?.[type]} />;
};

export default ApplicationLogo;
