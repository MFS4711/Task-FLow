// edit button
const editButtons = document.getElementsByClassName("btn-edit");

// form field data
const taskTitle = document.getElementById("id_title");
const taskDescription = document.getElementById("id_description");
const taskDueDate = document.getElementById("id_due_date");
const taskStatus = document.getElementById("id_status");

// The form itself
const taskForm = document.getElementById("task-form")

// submit button
const submitButton = document.getElementById("submit-button");

/**
* Initializes edit functionality for the provided edit buttons.
* 
* For each button in the `editButtons` collection:
* - Retrieves the associated task's ID upon click.
* - Fetches the content of the task's title, status, due date, and description.
* - Populates the form fields with the task's content for editing.
* - Updates the submit button's text to "Update Task".
* - Sets the form's action attribute to the `edit_task/{taskId}` endpoint.
*/
for (let button of editButtons) {
    button.addEventListener("click", (e) => {
        let taskId = e.target.getAttribute("data-task-id");
        
        // Retrieve task details
        let taskTitleContent = document.getElementById(`task-title-${taskId}`).innerText;
        let taskStatusContent = document.getElementById(`task-status-${taskId}`).innerText;
        let taskDueDateContent = document.getElementById(`task-due-date-${taskId}`).innerText;
        let taskDescriptionContent = document.getElementById(`task-description-${taskId}`).innerText;

        // Populate the form fields with the task's existing data
        taskTitle.value = taskTitleContent;

        // Set the status field by matching the text (status display) to the option
        for (let option of taskStatus.options) {
        if (option.text === taskStatusContent) {
          taskStatus.value = option.value;
          break;
        }

        // Format the due date for datetime-local input (YYYY-MM-DDTHH:MM)
        let dueDate = new Date(taskDueDateContent);
        let dueDateFormatted = dueDate.toISOString().slice(0, 16); // Get YYYY-MM-DDTHH:MM
        taskDueDate.value = dueDateFormatted;

        taskDescription.value = taskDescriptionContent;

        // Update the form action to include the task ID and change the button text to "Update Task"
        const userId = document.getElementById("user-id").value;
        taskForm.setAttribute("action", `/${userId}/dashboard/edit_task/${taskId}/`);
        submitButton.innerText = "Update Task";
      }
    })
}