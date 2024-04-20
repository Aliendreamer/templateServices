import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import EnvConfigsPage from "./EnvConfigs";
import OpcoConfigsPage from "./OpcoConfigs";

const App = () => {
	return (<Routes>
		<Route path="/home" element= {<Home /> } />
		<Route path="/configs" element={ <OpcoConfigsPage />} />
		<Route path="/env/configs" element={ <EnvConfigsPage /> } />
		<Route path="*" element= {<Home />} />
	</Routes>
	);
};

export default App;
