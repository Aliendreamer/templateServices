import React, { useEffect, useState } from "react";
import Link from "../components/Link";
import { ENVIRONMENTS, DEVICE_TYPES, OPCOS } from "../utils/constants";

const useCreateNavLinks = () => {
    const [navLinks, setNavlinks] = useState([]);
    useEffect(() => {
        const links = [];
        links.push(
            <Link
                key={"Home"}
                item={{
                    label: "Home",
                    link: "/",
                }}
            />,
        );
        for (const opco in OPCOS) {
            for (const device in DEVICE_TYPES) {
                for (const env in ENVIRONMENTS) {
                    links.push(
                        <Link
                            key={`${OPCOS[opco]}_${DEVICE_TYPES[device]}_${ENVIRONMENTS[env]}`}
                            item={{
                                label: `${OPCOS[opco]}_${DEVICE_TYPES[device]}_${ENVIRONMENTS[env]}`,
                                link: `/configs?device=${DEVICE_TYPES[device]}&opco=${OPCOS[opco]}&env=${ENVIRONMENTS[env]}`,
                            }}
                        />,
                    );
                }
            }
        }
        setNavlinks([...links]);
    }, []);

    return navLinks;
};

export default useCreateNavLinks;
