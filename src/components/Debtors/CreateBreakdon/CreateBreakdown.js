import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { useStore } from "../../hooks-store/store";
import { checkValidity } from "../../../Utility/checkValidity";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import CreateProducts from "./CreateProducts/CreateProducts";
import classes from "./CreateBreakdown.module.css";

const CreateBreakdown = () => {
	const [state, dispatch] = useStore();
	const { debtorId } = useParams();
	let debtor;
	for (let element of state.debtors) {
		if (element.id === debtorId) {
			debtor = element;
			break;
		}
	}
	const history = useHistory();

	let dropdownOptions;

	debtor.isDebtFree
		? (dropdownOptions = [
				{
					value: "collected",
					displayValue: `${
						debtor ? debtor.name : "should not get here"
					} Collected Goods on Credit`
				}
		  ])
		: (dropdownOptions = [
				{
					value: "paid",
					displayValue: `${
						debtor ? debtor.name : "should not get here"
					} Paid Money To You`
				},
				{
					value: "collected",
					displayValue: `${
						debtor ? debtor.name : "should not get here"
					} Collected Goods on Credit`
				}
		  ]);

	const [staticFormElement, setStaticFormElement] = useState({
		label: "Type",
		elementType: "select",
		elementConfig: {
			options: dropdownOptions
		},
		value: "collected"
	});

	const [paidFormElement, setPaidFormElement] = useState({
		label: "How Much?",
		elementType: "input",
		elementConfig: {
			type: "number",
			placeholder: `How Much did ${
				debtor ? debtor.name : "should not get here"
			} Pay?`
		},
		value: "",
		validation: {
			required: true
		},
		valid: false,
		touched: false
	});

	const [finalProductsForm, setFinalProductsForm] = useState([
		[
			{
				id: 1
			},
			{
				label: "Name of Product",
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: `What Product did ${
						debtor ? debtor.name : "should not get here"
					} Collect?`
				},
				value: "",
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			{
				label: "Quantity",
				elementType: "input",
				elementConfig: {
					type: "number",
					placeholder: `How many of said Product did ${
						debtor ? debtor.name : "should not get here"
					} Collect?`
				},
				value: "",
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			{
				label: "Cost of One Unit of the Above Product",
				elementType: "input",
				elementConfig: {
					type: "number",
					placeholder: `Price per Unit`
				},
				value: "",
				validation: {
					required: true
				},
				valid: false,
				touched: false
			}
		]
	]);

	const [formIsValid, setFormIsValid] = useState(false);

	if (!debtor) {
		return <h2 style={{ textAlign: "center" }}>Error 404: User not Found</h2>;
	}

	const inputChangedHandler = (
		event,
		formElement,
		setForm,
		elementId,
		elementLabel
	) => {
		if (!elementId) {
			const updatedForm = {
				...formElement,
				value: event.target.value,
				touched: true,
				valid: checkValidity(event.target.value, formElement.validation)
			};
			if (formElement === staticFormElement) {
				setFormIsValid(false);
			} else {
				setFormIsValid(updatedForm.valid);
			}
			setForm(updatedForm);
		} else {
			const updatedForm = [...formElement];
			const updatedIndexFormElementArray = [...updatedForm[elementId - 1]];
			let updatedInputObject;
			for (let index in updatedIndexFormElementArray) {
				if (index == 0) {
					continue;
				}
				if (updatedIndexFormElementArray[index].label === elementLabel) {
					updatedInputObject = {
						...updatedIndexFormElementArray[index],
						value: event.target.value,
						touched: true,
						valid: checkValidity(
							event.target.value,
							updatedIndexFormElementArray[index].validation
						)
					};
					updatedIndexFormElementArray[index] = updatedInputObject;
				}
			}
			updatedForm[elementId - 1] = updatedIndexFormElementArray;
			let bufferFormIsValid = true;
			for (let index in updatedForm) {
				for (let inputIndetifier in updatedForm[index]) {
					if (!updatedForm[index][inputIndetifier].id) {
						bufferFormIsValid =
							updatedForm[index][inputIndetifier].valid && bufferFormIsValid;
					}
				}
			}
			setFormIsValid(bufferFormIsValid);
			setForm(updatedForm);
		}
	};

	const show = (
		formElement,
		setFormElement,
		collectedFormArrayElements,
		elementId,
		elementLabel
	) => (
		<Input
			key={formElement.label}
			label={formElement.label}
			elementType={formElement.elementType}
			elementConfig={formElement.elementConfig}
			invalid={!formElement.valid}
			touched={formElement.touched}
			value={formElement.value}
			changed={event =>
				inputChangedHandler(
					event,
					collectedFormArrayElements ? collectedFormArrayElements : formElement,
					setFormElement,
					elementId,
					elementLabel
				)
			}
		/>
	);

	const staticForm = show(staticFormElement, setStaticFormElement);
	const paidForm = show(paidFormElement, setPaidFormElement);

	const collectedForm = (
		<CreateProducts
			name={debtor.name}
			show={show}
			setFormIsValid={setFormIsValid}
			finalProductsForm={finalProductsForm}
			setFinalProductsForm={setFinalProductsForm}
		/>
	);

	const breakdownHandler = event => {
		event.preventDefault();
		let breakdownData = {};
		breakdownData["id"] = `${Math.random()}`;
		if (staticFormElement.value === "paid") {
			breakdownData["type"] = "paid";
			breakdownData["amount"] = paidFormElement.value;
		} else {
			breakdownData["type"] = "collected";
			breakdownData["products"] = [];

			for (let i in finalProductsForm) {
				let productObject = {};
				for (let index in finalProductsForm[i]) {
					if (index == 0) {
						productObject["id"] = finalProductsForm[i][index].id;
						continue;
					}
					if (finalProductsForm[i][index].label === "Name of Product") {
						productObject["name"] = finalProductsForm[i][index].value;
					} else if (finalProductsForm[i][index].label === "Quantity") {
						productObject["quantity"] = finalProductsForm[i][index].value;
					} else if (
						finalProductsForm[i][index].label ===
						"Cost of One Unit of the Above Product"
					) {
						productObject["priceOfOne"] = finalProductsForm[i][index].value;
					}
				}
				breakdownData["products"].push(productObject);
			}
			let total = 0;
			for (let element of breakdownData.products) {
				let amount = element.quantity * element.priceOfOne;
				total += amount;
			}
			breakdownData["amount"] = total;
		}

		dispatch("NEWBREAKDOWN", { breakdownData, debtorId });
		breakdownData.type === "paid"
			? dispatch("PAID", {
					amount: breakdownData.amount,
					debtorId,
					breakdownId: breakdownData.id
			  })
			: dispatch("COLLECTED", {
					amount: breakdownData.amount,
					debtorId,
					breakdownId: breakdownData.id
			  });
		history.push(`/debtors/${debtorId}`);
	};

	return (
		<>
			<div className={classes.FormData}>
				<h2 className={classes.Header}>ENTER NEW TRANSACTION DETAILS</h2>
				{staticForm}
				{staticFormElement.value === "paid" ? paidForm : collectedForm}
			</div>
			<div
				style={{
					textAlign: "center",
					width: "30%",
					margin: "0 auto"
				}}
			>
				<Button
					style={{
						fontSize: "30px",
						paddingLeft: "30px"
					}}
					onClick={breakdownHandler}
					btnType="Success"
					disabled={!formIsValid}
				>
					Submit
				</Button>
			</div>
		</>
	);
};

export default CreateBreakdown;
