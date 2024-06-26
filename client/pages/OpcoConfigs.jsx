import React, { useEffect } from "react";
import { Container, NavLink, SimpleGrid } from "@mantine/core";
import { OPCOS, OPCOS_LABELS } from "../utils/constants";
import classes from "../cssModules/envconfigs.module.css";
import { useNavigate } from "react-router";
import useStateStore from "../utils/useStateStore";
import useQueryString from "../utils/useQueryString";

const OpcoConfigsPage = () => {
	const navigate = useNavigate();
	const { device } = useQueryString();

	const setDeviceType = useStateStore((state) => state.setDeviceType);
	const setOpco = useStateStore((state) => state.setOpco);
	const deviceType = useStateStore((state) => state.deviceType);
	useEffect(() => {
		if (!deviceType) {
			setDeviceType(device);
		}
	}, [device, deviceType, setDeviceType]);
	return (
		<Container className={classes.wrapper}>
		<SimpleGrid
			mt={60}
			cols={2}
			spacing={"lg"}
			verticalSpacing={"xs"}
		>
			{Object.values(OPCOS).map((opco) => (
				<NavLink
					key={opco}
					label={OPCOS_LABELS[opco]}
					styles={{ root: { width: "320px", height: "120px", padding: "10px" }, label: { margin: "35%", fontSize: "18px", fontWeight: "bold" } }}
					active
					variant="filled"
					onClick={(e) => {
						e.preventDefault();
						setOpco(opco);
						navigate(`/device?device=${device}&opco=${opco}`);
					}}
				/>
			))}
			</SimpleGrid>
		</Container>
	);
};

export default OpcoConfigsPage;
