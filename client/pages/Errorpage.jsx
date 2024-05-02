import React from "react";
import { Title, Text, Button, Container, Group } from "@mantine/core";
import classes from "../cssModules/errorpage.modules.css";
import { useNavigate } from "react-router";
const ErrorPage = () => {
	const navigate = useNavigate();
	return (
		<div className={classes.root}>
			<Container>
				<div className={classes.label}>500</div>
				<Title className={classes.title}>Something bad just happened...</Title>
				<Text size="lg" ta="center" className={classes.description}>
					Our servers could not handle your request. Don&apos;t worry, our development team was
					already notified. Try refreshing the page.
				</Text>
				<Group justify="center">
					<Button variant="white" size="md" onClick={() => navigate("/")}>
						Back to Home
					</Button>
				</Group>
			</Container>
		</div>
	);
};

export default ErrorPage;
