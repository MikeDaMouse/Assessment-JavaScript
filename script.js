import Task from "./Classes/task.js";
import TaskManager from "./Classes/taskManager.js";
let manager = new TaskManager();

window.addNewTask = function addNewTask() {
	let taskInput = document.getElementById("mainInput").value;
	if (taskInput.length == 0) {
		document.getElementById("mainInput").placeholder =
			"Ahem, please enter a task";
	} else {
		manager.AddTask(new Task(taskInput));
		document.getElementById("mainInput").value = "";
		showTasks();
	}
};

window.showTasks = function showTasks() {
	document.getElementById("activeTask").innerHTML = "";
	document.getElementById("completeTask").innerHTML = "";
	if (manager.taskArr.length == 0) {
		document.getElementById(
			"activeTask"
		).innerHTML = `<div>You currently have no active tasks</div>`;
	} else {
		for (let active of manager.taskArr) {
			document.getElementById(
				"activeTask"
			).innerHTML += `<div class="row justify-content-center mt-1 d-flex align-items-center">
            <div class=" col col-lg-5 d-flex justify-content-center  text-secondary border border-primary mx-1 rounded">${active.description}</div>
            
           <button 
	type="button"
	class="btn btn-success col-auto mx-1"
	
    data-bs-toggle="modal" data-bs-toggle="modal"
			data-bs-target="#completeModal-${active.id}"
   
>
	<i class="fa-solid fa-check "></i>
</button>
<button type="button" class="btn btn-danger col-auto mx-1" data-bs-toggle="modal" data-bs-toggle="modal"
			data-bs-target="#deleteModal-${active.id}">
	<i class="fa-regular fa-trash-can "></i>
</button>
<button
	type="button"
	class="btn btn-primary col-auto mx-1"
	 data-bs-toggle="modal" data-bs-toggle="modal"
			data-bs-target="#updateModal-${active.id}"
>
	<i class="fa-solid fa-pen-to-square "></i>
</button>

</div>
		<div
			class="modal fade"
			id="deleteModal-${active.id}"
			tabindex="-1"
			role="dialog"
			aria-labelledby="exampleModalCenterTitle"
			aria-hidden="true"
		>
			<div class="modal-dialog modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLongTitle">
							Are you sure you want to delete?
						</h5>
						<button
							type="button"
							class="btn btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">This action is not reversible</div>
					<div class="modal-footer">
						<button
							type="button"
							class="btn btn-secondary"
							data-bs-dismiss="modal"
						>
							Cancel
						</button>
						<button
							type="button"
							class="btn btn-primary"
							data-bs-dismiss="modal"
							onclick="deleteTask(${active.id})"
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
        <div
			class="modal fade"
			id="updateModal-${active.id}"
			tabindex="-1"
			aria-labelledby="exampleModalLabel"
			aria-hidden="true"
		>
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h1 class="modal-title fs-5" id="exampleModalLabel">Edit Task</h1>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
                            onclick = "showTasks();"
						></button>
					</div>

					<div class="modal-body" id= "promptLabel">What did you REALLY wanna do (this action is reversible btw)</div>
					<input
						
						type="text"
						class="form-control"
						placeholder="Task Description"
						aria-label="Task Description"
						aria-describedby="basic-addon1"
					/>
					<div class="modal-footer">
						<button
							type="button"
							class="btn btn-secondary"
							data-bs-dismiss="modal"
                            onclick = "showTasks();"
						>
							Close
						</button>
						<button
                             id = "saveChanges"
							type="button"
							class="btn btn-primary"
							onclick="updateTask(${active.id})"
						>
							Save changes
						</button>
					</div>
				</div>
			</div>
		</div>
        
        <div class="modal fade" id="completeModal-${active.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Complete Task?</h5>
        <button type="button" class="btn btn-close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Didja really do it? Cmon now be honest
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="completeTask(${active.id})">Complete</button>
      </div>
    </div>
  </div>
</div>`;
		}
	}
	if (manager.completedArr.length == 0) {
		document.getElementById(
			"completeTask"
		).innerHTML = `<div>You currently have no completed Tasks</div>`;
	} else {
		for (let completed of manager.completedArr) {
			document.getElementById(
				"completeTask"
			).innerHTML += `<div class="row justify-content-center mt-1  d-flex align-items-center"><div class="col col-lg-5 align-items-center text-secondary border border-danger text-decoration-line-through mx-1 mb-1 rounded">${completed.description}</div><button type="button" class ="btn btn-success col-auto" disabled><i class="fa-solid fa-check-double"></i></button></div>
            `;
			document.getElementById(
				"clearTask"
			).innerHTML = `<button class="btn btn-danger col-md-auto" data-bs-toggle="modal" data-bs-target="#clearTaskModal"> clear you completed tasks<i class="fa-solid fa-toilet-paper"></i></button>
            `;
		}
	}
};
window.deleteTask = function deleteTask(id) {
	manager.DeleteTask(id);
	showTasks();
};
window.clearTasks = function clearTasks() {
	manager.completedArr = [];
	window.localStorage.setItem(
		"completedArr",
		JSON.stringify(manager.completedArr)
	);
	showTasks();
	document.getElementById("clearTask").innerHTML = "";
};
window.updateTask = function updateTask(id) {
	let modal = document.getElementById(`updateModal-${id}`);
	let newDescription = modal.querySelector("input").value;

	if (newDescription.length == 0) {
		document.getElementById("promptLabel").innerHTML =
			"Please enter a description";
		document.getElementById("promptLabel").style.color = "red";
	} else {
		manager.UpdateTask(id, newDescription);
		let saveChangesButton = modal.querySelector("#saveChanges");
		saveChangesButton.innerHTML = "All Saved";
		saveChangesButton.disabled = true;
	}
};
window.completeTask = function completeTask(id) {
	manager.CompleteTask(id);

	showTasks();
};
showTasks();
const floatingBox = document.getElementById("floating-box");
const scoreElement = document.getElementById("score");
let score = 0;

window.clickGame = function clickGame() {
	score++;
	scoreElement.innerHTML = `Score: ${score}`;
	if (score > 3) {
		document.getElementById(
			"distractBox"
		).style.backgroundImage = `url(RickRoll.webp)`;
		setTimeout(rickRoll(), 4000);
	}
};
window.rickRoll = function rickRoll() {
	document.location = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
};
