import React, { useState } from "react";
import PropTypes from "prop-types";

export const TaskForm = props => {
	const [newTask, setNewTask] = useState("");

	const submitKey = task => {
		event.preventDefault();
		props.addTask(newTask);
		event.target.reset();
	};

	const onChange = event => {
		const newTask = event.target.value;
		setNewTask(newTask);
	};

	return (
		<form onSubmit={submitKey}>
			<input
				type="text"
				name="title"
				className="form-control no-border"
				placeholder="Write a Tasks"
				onChange={onChange}
			/>
		</form>
	);
};

TaskForm.propTypes = {
	addTask: PropTypes.func
};
