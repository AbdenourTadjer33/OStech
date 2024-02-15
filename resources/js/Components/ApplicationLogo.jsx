const PATH = "/assets/logo/";

const ApplicationLogo = ({ type = "white", className = "" }) => {
    const logos = {
        white: "white.png",
        dark: "dark.png",
        blue: "blue.png",
        indigo: "indigo.png",
    };

    return <img className={` ${className}`} src={PATH + logos?.[type]} />;
};

// h-12 lg:h-20 md:h-16 sm:h-14

export default ApplicationLogo;
