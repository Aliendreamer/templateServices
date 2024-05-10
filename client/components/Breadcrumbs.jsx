import React, { useMemo } from "react";
import { Breadcrumbs, Anchor } from "@mantine/core";
import { useNavigate, useLocation } from "react-router";
import useStateStore from "../utils/useStateStore";

const NavBreadcrumbs = () => {
	const navigate = useNavigate();
	const setSelectedUrl = useStateStore((state) => state.setSelectedUrl);
	const location = useLocation();
	const deviceType = useStateStore((state) => state.deviceType);
	const opco = useStateStore((state) => state.opco);
	const items = useMemo(() => {
		switch (location.pathname) {
			case "/":
				return [];
			case "/device":
				return [
					{ label: "Home", link: "/" },
					{ label: "Back to Opco Choice", link: `/opco?device=${deviceType}` }
				];
			case "/opco":
				return [{ label: "Home", link: "/" }];
			case "/configs":
				return [
					{ label: "Home", link: "/" },
					{ label: "Back to Opco Choice", link: `/opco?device=${deviceType}` },
					{ label: "Back to Env Choice", link: `/device?device=${deviceType}&opco=${opco}` }
				];
				default:
				return [{ label: "Home", link: "/" }];
		}
	}, [location, opco, deviceType]);

	return (
		<Breadcrumbs separator="/" separatorMargin="xs" mt="xl">
		{items.map((item, index) => (
			<Anchor
				href={item.link}
				key={index}
				underline='hover'
				onClick={(event) => {
					event.preventDefault();
					setSelectedUrl(item.link);
					navigate(item.link);
				}}
			>
				{item.label}
			</Anchor>
		))}
		</Breadcrumbs>
	);
};

export default NavBreadcrumbs;
