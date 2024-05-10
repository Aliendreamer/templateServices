import React from "react";
import { NavLink, Container } from "@mantine/core";
import { DEVICE_TYPES } from "../utils/constants";
import { useNavigate } from "react-router";
import useStateStore from "../utils/useStateStore";

const Home = () => {
	const navigate = useNavigate();
	const setDeviceType = useStateStore((state) => state.setDeviceType);
	return (
			<>
			{Object.values(DEVICE_TYPES).map((device, index) => (
				<Container
					key={device}
					styles={{ root: { position: "absolute", margin: `${10 + (index * 7)}% 35%` } }}
				>
					<NavLink
						label={device}
						styles={{ root: { width: "320px", height: "120px", padding: "10px" }, label: { margin: "35%", fontSize: "18px", fontWeight: "bold" } }}
						onClick={(e) => {
							e.preventDefault();
							setDeviceType(device);
							navigate(`/opco?device=${device}`);
						}}
						variant="filled"
						active
					/>
				</Container>
			))}
			</>
	);
};

export default Home;
