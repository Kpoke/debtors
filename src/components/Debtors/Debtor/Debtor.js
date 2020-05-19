import React from "react";

import Card from "../../UI/Card/Card";

const Debtor = props => {
	return (
		<Card>
			<h2>{props.debtor.name}</h2>
			{props.debtor.isDebtFree ? (
				<h3>Isn't Owing</h3>
			) : (
				<h3>Current amount owed : {props.debtor.amount} Naira</h3>
			)}
		</Card>
	);
};

export default Debtor;
