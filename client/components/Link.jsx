import React from "react";
import { Anchor } from "@mantine/core";
import classes from "../cssModules/link.modules.css";
import { useNavigate } from "react-router";
import { IconLink } from "@tabler/icons-react";
import useStateStore from "../utils/useStateStore";
import { useShallow } from "zustand/react/shallow";

const Link = ({ item }) => {
	const navigate = useNavigate();
	const { activeUrl } = useStateStore(useShallow((state) => ({ activeUrl: state.activeUrl })));
	const setSelectedUrl = useStateStore((state) => state.setSelectedUrl);
	return (
		<Anchor
			className={classes.link}
			data-active={item.link === activeUrl || undefined}
			href={item.link}
			key={item.label}
			underline='hover'
			onClick={(event) => {
				event.preventDefault();
				setSelectedUrl(item.link);
				navigate(item.link);
			}}
		>
			<IconLink className={classes.linkIcon} stroke={1.5} />
			<span>{item.label}</span>
		</Anchor>
	);
};

export default Link;
