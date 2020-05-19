import React from "react";

import Card from "../../../components/UI/Card/Card";
import Products from "../Products/Products";

const DebtorDetailsBreakdown = props => {
	const { breakdown } = props;

	let detail;

	if (breakdown.type === "paid") {
		detail = (
			<Card>
				<p>Made a Payment</p>
				<strong>{breakdown.amount} Naira</strong>
				<p>Date payment was made: {breakdown.date}</p>
			</Card>
		);
	} else if (breakdown.type === "collected") {
		detail = (
			<Card>
				<p>Collected the following goods on credit</p>
				<Products products={breakdown.products} />
				<p>
					Total amount of goods collected :{" "}
					<strong>{breakdown.amount} Naira</strong>
				</p>
				<p>Date Collected: {breakdown.date}</p>
			</Card>
		);
	} else if (breakdown.type === "previouslyOwed") {
		detail = (
			<Card>
				<p>Amount Previously Owed</p>
				<p>
					Total amount : <strong>{breakdown.amount} Naira</strong>
				</p>
				<p>Date Collected: {breakdown.date}</p>
			</Card>
		);
	}

	return detail;
};

export default DebtorDetailsBreakdown;
