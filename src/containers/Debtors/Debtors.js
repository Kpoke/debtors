import React from "react";
import { NavLink } from "react-router-dom";

import { useStore } from "../../components/hooks-store/store";
import Debtor from "../../components/Debtors/Debtor/Debtor";
import classes from "../Debtors/Debtors.module.css";

const Debtors = () => {
	const { debtors } = useStore(false)[0];
	let toShow;
	debtors.length === 0
		? (toShow = (
				<h2 style={{ textAlign: "center" }}>
					No One is Currently Owing You Money..... Lol
				</h2>
		  ))
		: (toShow = (
				<div className={classes.debtorsList}>
					{debtors.map(debtor => (
						<div key={debtor.id} className={classes.item}>
							<NavLink to={`/debtors/${debtor.id}`}>
								<Debtor debtor={debtor} />
							</NavLink>
						</div>
					))}
				</div>
		  ));
	return toShow;
};

export default Debtors;
