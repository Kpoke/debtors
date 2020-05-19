import React, { useState } from "react";

import { useStore } from "../../hooks-store/store";
import { checkValidity } from "../../../Utility/checkValidity";
import { useHistory } from "react-router-dom";
import Input from "../../UI/Input/Input";
import classes from "./CreateDebtors.module.css";
import Button from "../../UI/Button/Button";

const CreateDebtors = () => {
	const dispatch = useStore()[1];
	const history = useHistory();
	const [debtorForm, setDebtorForm] = useState([
		{
			label: "Name",
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "Debtor Name"
			},
			value: "",
			validation: {
				required: true
			},
			valid: false,
			touched: false
		},
		{
			label: "Balance",
			elementType: "input",
			elementConfig: {
				type: "number",
				placeholder: "Debtor's balance brought forward"
			},
			value: "",
			valid: true
		}
	]);
	const [formIsValid, setFormIsValid] = useState(false);

	const inputChangedHandler = (event, identifier) => {
		const updatedDebtorForm = [...debtorForm];
		const identifierIndex = updatedDebtorForm.findIndex(
			d => d.label === identifier
		);
		const updatedFormElement = {
			...updatedDebtorForm[identifierIndex]
		};
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = checkValidity(
			updatedFormElement.value,
			updatedFormElement.validation
		);
		updatedFormElement.touched = true;
		updatedDebtorForm[identifierIndex] = updatedFormElement;

		let bufferFormIsValid = true;
		for (let inputIdentifier in updatedDebtorForm) {
			bufferFormIsValid =
				updatedDebtorForm[inputIdentifier].valid && bufferFormIsValid;
		}
		setFormIsValid(bufferFormIsValid);
		setDebtorForm(updatedDebtorForm);
	};

	const debtorHandler = event => {
		event.preventDefault();
		let debtorData = {};
		for (let element of debtorForm) {
			let label;
			element.label === "Balance" ? (label = "amount") : (label = "name");
			debtorData[label] = element.value;
		}
		dispatch("NEWDEBTOR", debtorData);
		history.push("/");
	};

	let form = (
		<form onSubmit={debtorHandler}>
			{debtorForm.map(formElement => (
				<Input
					key={formElement.label}
					label={formElement.label}
					elementType={formElement.elementType}
					elementConfig={formElement.elementConfig}
					value={formElement.value}
					invalid={!formElement.valid}
					touched={formElement.touched}
					changed={event => inputChangedHandler(event, formElement.label)}
				/>
			))}
			<Button btnType="Success" disabled={!formIsValid}>
				ADD DEBTOR
			</Button>
		</form>
	);
	return (
		<div className={classes.DebtorData}>
			<h2 className={classes.Header}>ENTER DEBTOR'S INFO</h2>
			{form}
		</div>
	);
};

export default CreateDebtors;
