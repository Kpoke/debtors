import { initStore } from "./store";

const toSolve = (curState, payload, type) => {
	const updatedDebtors = [...curState.debtors];
	const debtorIndex = curState.debtors.findIndex(
		p => p.id === payload.debtorId
	);
	const updatedBreakdown = [...updatedDebtors[debtorIndex].breakdown];
	const breakdownIndex = updatedBreakdown.findIndex(
		b => b.id === payload.breakdownId
	);
	if (!updatedBreakdown[breakdownIndex].calculated) {
		let isDebtFree;
		let newPrice =
			type === "paid"
				? curState.debtors[debtorIndex].amount - payload.amount
				: Number(curState.debtors[debtorIndex].amount) + payload.amount;
		if (newPrice < 0 || newPrice === 0) {
			newPrice = 0;
			isDebtFree = true;
		} else {
			isDebtFree = false;
		}

		updatedBreakdown[breakdownIndex] = {
			...curState.debtors[debtorIndex].breakdown[breakdownIndex],
			calculated: true
		};

		updatedDebtors[debtorIndex] = {
			...curState.debtors[debtorIndex],
			breakdown: updatedBreakdown,
			amount: newPrice,
			isDebtFree: isDebtFree
		};
		return { debtors: updatedDebtors };
	}
	return { debtors: curState.debtors };
};

const newDebtor = (curState, payload) => {
	let today = new Date();
	payload["isDebtFree"] = false;
	payload["id"] = `${Math.random()}`;
	if (payload.amount && payload.amount > 0) {
		payload["breakdown"] = [
			{
				id: "p1",
				amount: payload.amount,
				calculated: true,
				type: "previouslyOwed",
				date: `${today.getDate()}/${today.getMonth() +
					1}/${today.getFullYear()}`
			}
		];
	} else {
		payload.amount = 0;
		payload["breakdown"] = [];
		payload["isDebtFree"] = true;
	}

	const newDebtors = [...curState.debtors, payload];
	return { debtors: newDebtors };
};

const newBreakdown = (curState, payload) => {
	let today = new Date();
	const updatedDebtors = [...curState.debtors];
	const debtorIndex = curState.debtors.findIndex(
		p => p.id === payload.debtorId
	);
	payload.breakdownData["calculated"] = false;
	payload.breakdownData["date"] = `${today.getDate()}/${today.getMonth() +
		1}/${today.getFullYear()}`;
	const updatedBreakdown = [
		...updatedDebtors[debtorIndex].breakdown,
		payload.breakdownData
	];
	updatedDebtors[debtorIndex] = {
		...curState.debtors[debtorIndex],
		breakdown: updatedBreakdown,
		isDebtFree: false
	};
	return { debtors: updatedDebtors };
};

const configureStore = () => {
	const actions = {
		PAID: (curState, payload) => toSolve(curState, payload, "paid"),
		COLLECTED: (curState, payload) => toSolve(curState, payload, "collected"),
		NEWDEBTOR: (curState, payload) => newDebtor(curState, payload),
		NEWBREAKDOWN: (curState, payload) => newBreakdown(curState, payload)
	};

	initStore(actions, {
		debtors: []
	});
};

export default configureStore;
