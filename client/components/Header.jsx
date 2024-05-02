import React from "react";
import { Group, Text, Code, Box } from "@mantine/core";
import Logo from "../logo.svg";
import { ThemeToggleButton } from "./ThemeButton";
import useStateStore from "../utils/useStateStore";
import classes from "../cssModules/header.modules.css";

const Header = () => {
	const username = useStateStore((state) => state.username);
	return (
	<Box pb={50}>
		<header className={classes.header}>
		<Group className={classes.metagroup}>
			<Logo/>
			<Text size="lg" fw={700}>Config Service</Text>
			<Code fw={700}>{process.env.REACT_APP_VERSION}</Code>
		</Group>
		<Group className={classes.user} justify="right">
			<Text fw={800}> {username}</Text>
			<ThemeToggleButton />
		</Group>
		</header>
	</Box>
	);
};

export default Header;
