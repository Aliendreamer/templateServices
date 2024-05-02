import { KEYCLOAK_CONSTANTS, THEMES } from "./constants";

export const createAppSlice = (set) => ({
    theme: THEMES.DARK,
    username:
        `${localStorage.getItem(KEYCLOAK_CONSTANTS.KEYCLOAK_FIRSTNAME)}` +
            "  " +
            `${localStorage.getItem(KEYCLOAK_CONSTANTS.KEYCLOAK_LASTNAME)}` || "",
    setTheme: (theme) => set(() => ({ theme })),
});

export const createConfigSlice = (set, get) => ({
    activeUrl: "Home",
    opco: "",
    deviceType: "",
    environment: "",
    configs: [],
    selectedConfigId: null,
    setSelectedUrl: (urlLabel) => set(() => ({ activeUrl: urlLabel })),
    setOpco: (opco) => set(() => ({ opco })),
    setDeviceType: (deviceType) => set(() => ({ deviceType })),
    setEnvironment: (environment) => set(() => ({ environment })),
    setSelectedConfigId: (id) => set(() => ({ selectedConfigId: id })),
    addConfig: (config) => set((state) => ({ configs: state.configs.push(config) })),
    removeConfig: (id) => set((state) => ({ configs: state.configs.filter((config) => config.id !== id) })),
    updateConfig: (id, config) =>
        set((state) => {
            state.configs.splice(
                get().configs.findIndex((config) => config.id === id),
                1,
                config,
            );
        }),
});
