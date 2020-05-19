import React from "react";
import { Route, Switch } from "react-router-dom";

import Debtors from "./containers/Debtors/Debtors";
import CreateDebtors from "./components/Debtors/CreateDebtors/CreateDebtors";
import DebtorDetails from "./containers/DebtorDetails/DebtorDebtails";
import CreateBreakdown from "./components/Debtors/CreateBreakdon/CreateBreakdown";
import Navigation from "./components/Nav/Navigation";

const app = () => {
	return (
		<>
			<Navigation />
			<main>
				<Switch>
					<Route
						path="/debtors/:debtorId/new"
						exact
						component={CreateBreakdown}
					/>
					<Route path="/debtors/:debtorId" exact component={DebtorDetails} />
					<Route path="/create" exact component={CreateDebtors} />
					<Route path="/" exact component={Debtors} />
					<Route
						render={() => (
							<h2 style={{ textAlign: "center" }}>Error 404: page not found</h2>
						)}
					/>
				</Switch>
			</main>
		</>
	);
};

export default app;
