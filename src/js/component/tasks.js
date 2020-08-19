import React, { useState } from "react";
import PropTypes from "prop-types";

import "./tasks.css";

export const Tasks = props => {
	return (
		<li className="form-control no-border closeBtn">
			{props.task.label}
			<input
				type="checkbox"
				checked={props.task.done}
				onChange={() => {
					props.toggleTask(props.task);
				}}
			/>
			<span
				className="btnClose float-right h4 text-danger"
				onClick={() => {
					props.deleteTask(props.task);
				}}
			/>
		</li>
	);
};

Tasks.propTypes = {
	task: PropTypes.any,
	toggleTask: PropTypes.func,
	deleteTask: PropTypes.func
};
