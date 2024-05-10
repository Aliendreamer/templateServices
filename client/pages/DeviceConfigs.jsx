import React, { useEffect } from "react";
import { Container, NavLink, SimpleGrid } from "@mantine/core";
import { ENVIRONMENTS } from "../utils/constants";
import { useNavigate } from "react-router";
import useStateStore from "../utils/useStateStore";
import classes from "../cssModules/envconfigs.module.css";
import useQueryString from "../utils/useQueryString";

const DeviceConfigsPage = () => {
	const navigate = useNavigate();
	const { device, opco } = useQueryString();

	const setDeviceType = useStateStore((state) => state.setDeviceType);
	const setOpco = useStateStore((state) => state.setOpco);
	const deviceType = useStateStore((state) => state.deviceType);
	const currentOpco = useStateStore((state) => state.opco);
	const setEnvironment = useStateStore((state) => state.setEnvironment);
	const setSelectedUrl = useStateStore((state) => state.setSelectedUrl);

	useEffect(() => {
		if (!deviceType) {
			setDeviceType(device);
		}
		if (!currentOpco) {
			setOpco(opco);
		}
	}, [device, deviceType, opco, currentOpco, setOpco, setDeviceType]);
	return (
		<Container className={classes.wrapper}>
		<SimpleGrid
			mt={60}
			cols={2}
			spacing={"lg"}
			verticalSpacing={"lg"}
		>
			{Object.values(ENVIRONMENTS).map((env) => (
				<NavLink
					key={env}
					label={env}
					styles={{ root: { width: "320px", height: "120px", padding: "10px" }, label: { margin: "35%", fontSize: "18px", fontWeight: "bold" } }}
					variant="filled"
					active
					onClick={(e) => {
						e.preventDefault();
						const url = `/configs?device=${device}&opco=${opco}&env=${env}`;
						setEnvironment(env);
						setSelectedUrl(url);
						navigate(url);
					}}
				/>
			))}
			</SimpleGrid>
		</Container>
	);
};

export default DeviceConfigsPage;
