import React from "react";

import Button from "../../../UI/Button/Button";

const CreateProducts = props => {
	const {
		name,
		show,
		finalProductsForm,
		setFinalProductsForm,
		setFormIsValid
	} = props;

	const addNewCollectedForm = () => {
		let updatedState = [...finalProductsForm];
		let bufferForm = [...updatedState[0]];
		for (let index in bufferForm) {
			if (index == 0) {
				continue;
			}

			let updatedInputObject = {
				...bufferForm[index],
				value: "",
				validation: {
					required: true
				},
				valid: false,
				touched: false
			};
			bufferForm[index] = updatedInputObject;
		}
		updatedState.push(bufferForm);
		let newForm = [...updatedState[updatedState.length - 1]];
		newForm[0] = {
			id: updatedState.length
		};
		updatedState[updatedState.length - 1] = newForm;
		setFormIsValid(false);
		setFinalProductsForm(updatedState);
	};

	return (
		<>
			{finalProductsForm.map(collectedFormElement => {
				let elementId = collectedFormElement[0].id;
				return collectedFormElement.map(formElement => {
					if (!formElement.id) {
						return show(
							formElement,
							setFinalProductsForm,
							finalProductsForm,
							elementId,
							formElement.label
						);
					}
					return null;
				});
			})}
			<Button
				style={{ fontSize: "15px", float: "right" }}
				btnType="Success"
				onClick={() => addNewCollectedForm()}
			>
				{name} collected more products?
			</Button>
		</>
	);
};

export default CreateProducts;
