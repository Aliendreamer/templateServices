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
            <Link
                key={DEVICE_TYPES.ANDROIDTV}
                item={{
                    label: `${DEVICE_TYPES.ANDROIDTV}`,
                    link: `device/configs?device=${DEVICE_TYPES.ANDROIDTV}`,
                }}
            />,
            <Link
                key={DEVICE_TYPES.SMARTTV}
                item={{
                    label: `${DEVICE_TYPES.SMARTTV}`,
                    link: `device/configs?device=${DEVICE_TYPES.SMARTTV}`,
                }}
            />,
            <Link
                key={DEVICE_TYPES.FIRETV}
                item={{
                    label: `${DEVICE_TYPES.FIRETV}`,
                    link: `device/configs?device=${DEVICE_TYPES.FIRETV}`,
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
                                link: `opco?device=${DEVICE_TYPES[device]}&env=${ENVIRONMENTS[env]}&opco=${OPCOS[opco]}`,
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
