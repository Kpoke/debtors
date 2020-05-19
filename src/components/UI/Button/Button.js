import React from "react";

import classes from "./Button.module.css";

const button = props => (
	<button
		className={[
			classes.Button,
			classes[props.btnType],
			props.className,
			props.disabled ? classes.Disabled : ""
		].join(" ")}
		onClick={props.onClick}
		style={props.style}
		disabled={props.disabled}
	>
		{props.children}
	</button>
);

export default button;
