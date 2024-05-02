import React from "react";
import { createRoot } from "react-dom/client";
import "./style/init.css";
import "@mantine/dates/styles.css";
import "@mantine/core/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import Home from "./pages/Home";
import ErrorPage from "./pages/Errorpage";
import EnvConfigsPage from "./pages/EnvConfigs";
import OpcoConfigsPage from "./pages/OpcoConfigs";
import Keycloak from "keycloak-js";
import { Layout } from "./components/Layout";
import { KEYCLOAK_CONSTANTS } from "./utils/constants";

const router = createBrowserRouter([
    {
        element: <Layout />,
        hasErrorBoundary: true,
        errorElement: <ErrorPage />,
        children: [
            { path: "/", element: <Home /> },
            { path: "*", element: <Home /> },
            { path: "/device/configs", element: <EnvConfigsPage /> },
            { path: "/opco", element: <OpcoConfigsPage /> },
        ],
    },
]);
const keyCloakConfig = {
    realm: process.env.REACT_APP_AUTH_REALM,
    url: process.env.REACT_APP_KEYCLOAK_URL,
    clientId: process.env.REACT_APP_OIDC_CLIENT_ID,
    "ssl-required": "external",
    resource: "configClient",
    "public-client": true,
    "confidential-port": 0,
};

export const keycloak = new Keycloak(keyCloakConfig);

const Root = () => {
    return (
        <React.StrictMode>
            <MantineProvider defaultColorScheme="dark">
                <ModalsProvider>
                    <Notifications />
                    <RouterProvider router={router} />
                </ModalsProvider>
            </MantineProvider>
        </React.StrictMode>
    );
};

keycloak
    .init({
        onLoad: "login-required",
        checkLoginIframe: false,
        enableLogging: true,
        promiseType: "native",
        token: localStorage.getItem(KEYCLOAK_CONSTANTS.KEYCLOAK_TOKEN),
        refreshToken: localStorage.getItem(KEYCLOAK_CONSTANTS.KEYCLOAK_REFRESH_TOKEN),
    })
    .then((auth) => {
        const updateLocalStorage = async () => {
            try {
                const userInfo = await keycloak.loadUserInfo();
                localStorage.setItem(KEYCLOAK_CONSTANTS.KEYCLOAK_FIRSTNAME, userInfo.given_name);
                localStorage.setItem(KEYCLOAK_CONSTANTS.KEYCLOAK_LASTNAME, userInfo.family_name);
                localStorage.setItem(KEYCLOAK_CONSTANTS.KEYCLOAK_USERNAME, userInfo.preferred_username);
                localStorage.setItem(KEYCLOAK_CONSTANTS.KEYCLOAK_TOKEN, keycloak.token);
                localStorage.setItem(KEYCLOAK_CONSTANTS.KEYCLOAK_REFRESH_TOKEN, keycloak.refreshToken);
                const container = document.getElementById("root");
                const root = createRoot(container);
                return root.render(<Root />);
            } catch (error) {
                keycloak.login();
            }
        };
        if (auth) {
            return Promise.resolve(updateLocalStorage());
        } else {
            return keycloak.login();
        }
    })
    .catch((error) => {
        console.log("Failed to initialize Keycloak: ", error);
        return keycloak.login();
    });
