import React from "react";

import { useStore } from "../../components/hooks-store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useParams } from "react-router-dom";
import Breakdown from "../../components/Debtors/DebtorDetailsBreakdown/DebtorDetailsBreakdown";

const DebtorDetails = () => {
	const { debtors } = useStore()[0];
	const { debtorId } = useParams();

	let debtor;

	for (let element of debtors) {
		if (element.id === debtorId) {
			debtor = element;
			break;
		}
	}

	if (!debtor) {
		return <h2 style={{ textAlign: "center" }}>Error 404: User not Found</h2>;
	}

	return (
		<>
			<div>
				<h2 style={{ textAlign: "center" }}>
					{debtor.isDebtFree
						? `${debtor.name} isn't Owing You any Money`
						: `Total Amount Owed by ${debtor.name} is ${debtor.amount} Naira`}
					<NavLink to={`/debtors/${debtorId}/new`}>
						<FontAwesomeIcon
							icon={faPlus}
							transform="grow-10 up-10"
							style={{ float: "right", margin: "20px 20px", color: "black" }}
						/>
					</NavLink>
				</h2>
			</div>
			{debtor.breakdown ? (
				debtor.breakdown.map(b => {
					return <Breakdown key={b.id} breakdown={b} debtorId={debtor.id} />;
				})
			) : (
				<h3 style={{ textAlign: "center" }}>
					No Financial Details to Output just Yet
				</h3>
			)}
			}
		</>
	);
};

export default DebtorDetails;
