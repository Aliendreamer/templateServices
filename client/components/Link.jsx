import React from "react";
import { Anchor } from "@mantine/core";
import classes from "../cssModules/link.modules.css";
import { useNavigate } from "react-router";
import { IconLink } from "@tabler/icons-react";
import useStateStore from "../utils/useStateStore";

const Link = ({ item }) => {
	const navigate = useNavigate();
	const activeUrl = useStateStore((state) => state.activeUrl);
	const setSelectedUrl = useStateStore((state) => state.setSelectedUrl);
	return (
		<Anchor
			className={classes.link}
			data-active={item.label === activeUrl || undefined}
			href={item.link}
			key={item.label}
			underline='hover'
			onClick={() => {
				setSelectedUrl(item.label);
				navigate(item.link);
			}}
		>
			<IconLink className={classes.linkIcon} stroke={1.5} />
			<span>{item.label}</span>
		</Anchor>
	);
};

export default Link;
