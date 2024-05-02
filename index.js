const { setupServer } = require("./server/server");
(async () => {
    const PORT = process.env.REACT_APP_SERVICE_PORT || 5000;
    const app = await setupServer();
    app.listen(PORT);
})();
