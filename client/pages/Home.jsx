import React from "react";
import { AppShell, NavLink ,Group } from '@mantine/core';
import { IconHome2, IconGauge, IconChevronRight, IconActivity, IconCircleOff } from '@tabler/icons-react';

const Home = () => {
	return(<AppShell>
		<AppShell.Header>
		</AppShell.Header>
		<AppShell.Main>
			<Group
				styles={{ root:{ position:"absolute", margin:'15% 45%'} }}
			>
				<NavLink
					href="configs?env=smarttv"
					label="SmartTV"
					styles={{ root:{ width:"320px", height:"120px",}, label:{ margin: "35%", fontSize:'18px',fontWeight:"bold"} }}
					variant="filled"
					active
				/>
				<NavLink
					href="configs?env=androidtv"
					label="AndroidTV"
					styles={{ root:{ width:"320px", height:"120px"}, label:{ margin: "33%",fontSize:'18px',fontWeight:"bold"}}}
					variant="filled"
					active
				/>
				<NavLink
					href="configs?env=firetv"
					label="FireTV"
					styles={{ root:{ width:"320px", height:"120px"}, label:{ margin: "38%",fontSize:'18px',fontWeight:"bold"}}}
					variant="filled"
					active
				/>
			</Group>
	</AppShell.Main>

	</AppShell>);
}

export default Home;


