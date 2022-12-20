export default class TaskManager {
	constructor() {
		this.completedArr =
			JSON.parse(window.localStorage.getItem("completedArr")) || [];
		this.taskArr = JSON.parse(window.localStorage.getItem("taskArr")) || [];
	}
	AddTask(newTask) {
		this.taskArr.push(newTask);
		window.localStorage.setItem("taskArr", JSON.stringify(this.taskArr));
	}
	DeleteTask(taskId) {
		let taskToDelete = this.taskArr.findIndex((task) => task.id == taskId);

		if (taskToDelete > -1) {
			this.taskArr.splice(taskToDelete, 1);
		}

		window.localStorage.setItem("taskArr", JSON.stringify(this.taskArr));
		return this.taskArr;
	}

	UpdateTask(taskId, newDescription) {
		let taskToUpdate = this.taskArr.find((task) => task.id == taskId);
		let indexToUpdate = this.taskArr.indexOf(taskToUpdate);
		this.taskArr[indexToUpdate].description = newDescription;
		window.localStorage.setItem("taskArr", JSON.stringify(this.taskArr));
	}
	CompleteTask(taskId) {
		let taskToComplete = this.taskArr.find((task) => task.id == taskId);
		let indexToComplete = this.taskArr.indexOf(taskToComplete);
		this.taskArr[indexToComplete].taskStatus = true;
		this.DeleteTask(taskId);
		this.completedArr.push(taskToComplete);
		window.localStorage.setItem(
			"completedArr",
			JSON.stringify(this.completedArr)
		);
	}
}
