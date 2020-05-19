import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./Navigation.module.css";

const Navigation = () => {
	return (
		<header className={classes.mainHeader}>
			<nav>
				<ul>
					<li>
						<NavLink to="/" activeClassName={classes.active} exact>
							<div className={classes.link}>Debtors</div>
						</NavLink>
					</li>
					<li>
						<NavLink to="/create" activeClassName={classes.active} exact>
							<div className={classes.link}>Add Debtors</div>
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Navigation;
