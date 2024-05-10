import { isJson } from "../utils/helpers";
import { keycloak } from "../index";

export const requestHandle = async (reqOptions) => {
    const token = await keycloak.token;
    const tokenIsInvalid = await keycloak.isTokenExpired();
    if (tokenIsInvalid) {
        const refreshed = await keycloak.updateToken(5);
        if (!refreshed) {
            return keycloak.logout();
        }
    }
    const options = {
        method: reqOptions.method,
        credentials: "include",
        mode: "cors",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };

    try {
        const baseUrl = `/api/${reqOptions.endpoint}`;
        const url = reqOptions.hasQuery ? `${baseUrl}?${reqOptions.query}` : "";
        const response = await fetch(url, options);
        const data = await response.json();
        return { ok: response.ok, data };
    } catch (error) {
        return { ok: false, data: null }; // 600 means we fucked up something in the client
    }
};
