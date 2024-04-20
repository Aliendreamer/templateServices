import { useEffect } from 'react';

export const useRefreshHook = () => {
    useEffect(() => {
        // if (true) {
        //     const tokenRenewalInterval = (User.fromStorageString(oidcStorage).expires_at() - 10) * 1000;
        //     const handle = setInterval(() => {
        //         auth.signinSilent();
        //     }, tokenRenewalInterval);
        //     return () => clearInterval(handle);
        // }
    }, []);
};
