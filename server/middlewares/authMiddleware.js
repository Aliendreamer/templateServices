const jwt = require("jsonwebtoken");
const { isAfter } = require("date-fns");
const logger = require("../infrastructure/logger");
const RequireUserAuthentication = async (req, res, next) => {
    if (process.env.REACT_APP_ENVIRONMENT === "development") {
        const user = {
            id: "test",
            name: "Test User",
            email: "test@test.bg",
            ipAddress: "192.168.11.55",
            given_name: "Test",
            family_name: "User",
        };
        req.user = user;
        return next();
    }
    if (!req.headers.authorization) {
        return res.status(401).send(JSON.stringify({ error: "unauthorized" }));
    }
    if (!global.keycloakPublicKey) {
        await getPublicKey();
    }
    if (!global.keycloakPublicKey) {
        return res.status(403).send(JSON.stringify({ error: "failed to get public key to verify token" }));
    }
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token.trim(), global.keycloakPublicKey.trim(), { ignoreExpiration: true });
        const date = new Date(decoded.exp * 1000);
        const currentDate = new Date();
        const isValid = isAfter(date, currentDate);
        if (!isValid) {
            return res.status(401).send(JSON.stringify({ error: "unauthorized" }));
        }
        const clientIp = req.ip.split(":").pop();
        const user = {
            id: decoded.sub,
            name: decoded.name,
            email: decoded.email,
            ipAddress: clientIp,
            given_name: decoded.given_name,
            family_name: decoded.family_name,
        };
        req.user = user;
    } catch (error) {
        logger.info("Verifying the user token failed, returning error and prompting a new login attempt.");
        return res.status(401).send(JSON.stringify({ error: "token verifying failed" }));
    }
    next();
};

const getPublicKey = async () => {
    const realmNameEncoded = encodeURI("SmartvConfigServiceRealm");
    const url = `${process.env.REACT_APP_KEYCLOAK_URL}/realms/${realmNameEncoded}`;
    try {
        const response = await fetch(url, { method: "GET" });
        const certs = await response.json();
        // The key has to start and finish with this fixed prefix and suffix and should include the newlines.
        // Using "\r\n" to ensure it works, no matter which environment is used (more info, see: jwt.io).
        // This is done to avoid having to configure the key manually, because keycloak generates it on first startup.
        // So to support dynamicly changing the containers and volumes.
        // Even docker system prune -a and docker system prune --volumes will not break it as the
        // new public key is fetched dynamically and stored in a global variable, so the request is only made
        // once upon startup.
        const key = `-----BEGIN PUBLIC KEY-----${"\r\n"}${certs.public_key}${"\r\n"}-----END PUBLIC KEY-----`;
        global.keycloakPublicKey = key;
    } catch (error) {
        global.keycloakPublicKey = undefined;
    }
};

module.exports = RequireUserAuthentication;
