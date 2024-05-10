import React, { useState, useEffect, useRef } from "react";
import useQueryString from "../utils/useQueryString";
import { getConfigs } from "../requests/service";
import { JsonInput, Stack, Button, Flex, Container, ScrollArea, Loader } from "@mantine/core";
import { IconX, IconCheck } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import classes from "../cssModules/settingsconfings.module.css";

const OpcoSettingsPage = () => {
	const { device, opco, env } = useQueryString();
	const [loading, setLoading] = useState(true);
	const [configs, setConfigs] = useState([]);
	const [currentConfig, setCurrentConfig] = useState({});
	const firstRender = useRef(true);

	useEffect(() => {
		if (!device || !opco || !env) {
			return;
		}
		if (!firstRender.current) {
			return;
		}
		firstRender.current = false;
		(async () => {
			const response = await getConfigs(device, opco, env);
			if (response.ok) {
				const activeConfig = response.data.find((config) => config.active);
				setCurrentConfig(activeConfig);
				setConfigs(response.data);
			}
			setLoading(false);
			notifications.show({
				id: "request-notification",
				withCloseButton: true,
				autoClose: 5000,
				title: response.ok ? "Success" : "Error",
				message: response.ok ? "Request was successful" : "Request failed",
				color: response.ok ? "green" : "red",
				icon: response.ok ? <IconCheck /> : <IconX />,
				loading: false,
			});
		})();
	}, [ device, opco, env, firstRender ]);

	if (loading) {
		return <Container className={classes.loader}><Loader /></Container>;
	};
	return (
	<Container className={classes.wrapper}>
		<ScrollArea className={classes.configs}>
			<Stack>
				{configs.map((config, index) => (
					<Button key={config} variant="default">{config.title ?? index}</Button>
				))}
			</Stack>
		</ScrollArea>
		<ScrollArea className={classes.json}>
		<JsonInput
			placeholder="{}"
			variant="filled"
			validationError="Invalid JSON"
			formatOnBlur
			resize
			defaultValue={JSON.stringify(currentConfig?.config, undefined, 2)}
			autosize
			minRows={20}
		/>
		</ScrollArea>
		<Flex className={classes.buttons} >
			<Button variant="default">Activate</Button>
			<Button variant="default">Update</Button>
			<Button variant="default">Create</Button>
			<Button variant="default">Copy</Button>
			<Button variant="default">Delete</Button>
		</Flex>
	</Container>);
};

export default OpcoSettingsPage;
