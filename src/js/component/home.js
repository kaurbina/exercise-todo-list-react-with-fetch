import React, { useState, useEffect } from "react";
import { Tasks } from "./tasks";
import { TaskBanner } from "./TaskBanner";
import { TaskForm } from "./taskForm";

export const Home = props => {
	const [taskItems, setTaskItems] = useState([]);

	const baseUrl = "https://assets.breatheco.de/apis/fake/todos/user/kaurbina";

	const parameters = (method, newTasks = "") => {
		if (method == "GET") {
			return {
				method: method,
				headers: {
					"Content-Type": "application/json"
				}
			};
		} else {
			return {
				method: method,
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(newTasks)
			};
		}
	};

	useEffect(() => {
		try {
			const fetchList = async () => {
				const resp = await fetch(baseUrl, parameters("GET"));

				if (resp.status == 200) {
					const taskItems = await resp.json();
					setTaskItems(taskItems);
				}
			};

			fetchList();
		} catch (error) {
			throw Error(error);
		}
	}, []);

	const toggleTask = task => {
		setTaskItems(
			taskItems.map(
				t => (t.label === task.label ? { ...t, done: !t.done } : t)
			)
		);
	};

	const tasksRow = () => {
		if (taskItems != "") {
			return taskItems.map(task => (
				<Tasks
					task={task}
					key={task.label}
					toggleTask={toggleTask}
					deleteTask={deleteTask}
				/>
			));
		}
	};

	const addTask = async newTask => {
		let newPost = [
			{
				label: newTask,
				done: false
			}
		];

		if (taskItems == "") {
			const resp = await fetch(baseUrl, parameters("POST", newPost));

			if (resp.status != 200) {
				throw Error(resp.statusText);
			}

			setTaskItems(newPost);
		} else {
			if (!taskItems.find(t => t.label === newTask)) {
				let newTasks = [
					...taskItems,
					{
						label: newTask,
						done: false
					}
				];

				setTaskItems(newTasks);

				const resp = await fetch(baseUrl, parameters("PUT", newTasks));

				if (resp.status != 200) {
					throw Error(resp.statusText);
				}
			} else {
				console.log("ya existe la tarea");
			}
		}
	};

	const deleteTask = async task => {
		let index = "";

		await taskItems.map((t, i) => {
			if (t.label === task.label) {
				index = i;
			}
		});

		const deleteTask = await taskItems.filter((task, i) => {
			return index != i;
		});

		try {
			if (deleteTask.length > 0) {
				const resp = await fetch(
					baseUrl,
					parameters("PUT", deleteTask)
				);
				setTaskItems(deleteTask);
			} else {
				const resp = await fetch(baseUrl, parameters("DELETE"));
				setTaskItems("");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const deleteTasks = async () => {
		try {
			const resp = await fetch(baseUrl, parameters("DELETE"));

			if (resp.status == 200) {
				console.log("Lista Eliminada");
				setTaskItems("");
			}
		} catch (error) {
			throw Error(error);
		}
	};

	return (
		<div className="container text-center">
			<TaskBanner />
			<TaskForm addTask={addTask} />
			<div>{tasksRow()}</div>
			<button className="btn btn-primary mt-3" onClick={deleteTasks}>
				Eliminar Lista
			</button>
		</div>
	);
};
