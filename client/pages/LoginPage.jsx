import React from "react";
import {
	TextInput,
	PasswordInput,
	Paper,
	Title,
	Container,
	Button
} from "@mantine/core";
import classes from "../cssModules/loginPage.module.css";

const LoginPage = () => {
	return (
		<Container size={420} my={40}>
			<Title ta="center" className={classes.title}>
				Config Service
			</Title>
			<Paper withBorder shadow="md" p={30} mt={30} radius="md">
				<TextInput label="Email" placeholder="" required />
				<PasswordInput label="Password" placeholder="" required mt="md" />
				<Button fullWidth mt="xl" onClick={() => {}}>
					Sign in
				</Button>
			</Paper>
		</Container>
	);
};

export default LoginPage;
