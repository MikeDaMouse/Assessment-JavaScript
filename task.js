export default class Task {
	constructor(description) {
		this.description = description;
		this.id = Math.floor(Math.random() * 1000);
		this.taskStatus = false;
	}
	get(taskName) {
		return this[taskName];
	}
	set(taskName, newTask) {
		this[taskName] = newTask;
	}
}
