import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { createAppSlice, createConfigSlice } from "./helpers";

const useStateStore = create(
    devtools(
        persist(
            (...a) => ({
                ...createAppSlice(...a),
                ...createConfigSlice(...a),
            }),
            {
                name: "config management",
                storage: createJSONStorage(() => sessionStorage),
            },
        ),
    ),
);

export default useStateStore;
