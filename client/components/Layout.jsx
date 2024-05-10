import React from "react";
import { Button, Center, AppShell, Stack, ScrollArea } from "@mantine/core";

import { IconLogout } from "@tabler/icons-react";
import { Outlet } from "react-router";
import { keycloak } from "..";
import useCreateNavLinks from "../utils/useCreateNavlinks";
import Header from "./Header";
import NavBreadcrumbs from "./Breadcrumbs";
import classes from "../cssModules/navbar.module.css";

export const Layout = () => {
	const links = useCreateNavLinks();
	return (<AppShell
		withBorder={false}
		transitionDuration={500}
		transitionTimingFunction="ease"
		header={{ height: 60 }}
		navbar={{ width: 300 }}
		padding="md"
	>
		<AppShell.Header>
			<Header/>
		</AppShell.Header>
		<AppShell.Navbar p="md">
		<ScrollArea w={270} scrollbars="y" className={classes.navbar}>
			<Stack>
				<nav className={classes.navbarMain}>
						{links}
				</nav>
			</Stack>
		</ScrollArea>
		<div className={classes.footer}>
						<Center>
							<Button
								leftSection={<IconLogout className={classes.linkIcon} stroke={1.5} />}
								onClick={(e) => {
									e.preventDefault();
									keycloak.logout();
								}}
								variant='default'
							>
								Logout
							</Button>
						</Center>
					</div>
		</AppShell.Navbar>
		<AppShell.Main>
			<NavBreadcrumbs />
			<Outlet />
		</AppShell.Main>
	</AppShell>
	);
};
