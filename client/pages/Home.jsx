import React from "react";
import { NavLink, Container } from "@mantine/core";
import { DEVICE_TYPES } from "../utils/constants";

const Home = () => {
	return (<>
		<Container
			styles={{ root: { position: "absolute", margin: "10% 35%" } }}
		>
			<NavLink
				href="device/configs?device=smarttv"
				label={`${DEVICE_TYPES.SMARTTV}`}
				styles={{ root: { width: "320px", height: "120px", padding: "10px" }, label: { margin: "35%", fontSize: "18px", fontWeight: "bold" } }}
				variant="filled"
				active
			/>
		</Container>
		<Container styles={{ root: { position: "absolute", margin: "17% 35%" } }}>
			<NavLink
				href="device/configs?device=androidtv"
				label={`${DEVICE_TYPES.ANDROIDTV}`}
				styles={{ root: { width: "320px", height: "120px", padding: "10px" }, label: { margin: "33%", fontSize: "18px", fontWeight: "bold" } }}
				variant="filled"
				active
			/>
		</Container>
		<Container styles={{ root: { position: "absolute", margin: "24% 35%" } }}>
			<NavLink
				href="device/configs?device=firetv"
				label={`${DEVICE_TYPES.FIRETV}`}
				styles={{ root: { width: "320px", height: "120px", padding: "10px" }, label: { margin: "38%", fontSize: "18px", fontWeight: "bold" } }}
				variant="filled"
				active
			/>
		</Container>
	</>);
};

export default Home;
