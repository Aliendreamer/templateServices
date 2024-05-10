import { requestHandle } from "./requestHandle";

export const getConfigs = async (device, opco, env) => {
    const query = `devicetype=${device}&opco=${opco}&env=${env}`;
    const response = await requestHandle({ method: "GET", endpoint: "configs", hasQuery: true, query });
    return response;
};

export const getConfig = async () => {};

export const updateConfig = async () => {};
export const deleteConfig = async () => {};
export const copyConfig = async () => {};
