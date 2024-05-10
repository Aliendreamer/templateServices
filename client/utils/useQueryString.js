import { useEffect, useState } from "react";
import { useLocation } from "react-router";

const useQueryString = () => {
    const location = useLocation();
    const [values, setValues] = useState({});
    useEffect(() => {
        const opco = new URLSearchParams(location.search).get("opco");
        const device = new URLSearchParams(location.search).get("device");
        const env = new URLSearchParams(location.search).get("env");
        setValues({ device, opco, env });
    }, [location.search]);
    return values;
};

export default useQueryString;
