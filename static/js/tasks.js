// edit button
const editButtons = document.getElementsByClassName("btn-edit");

// form field data
const taskTitle = document.getElementById("id_title");
const taskDescription = document.getElementById("id_description");
const taskDueDate = document.getElementById("id_due_date");
const taskStatus = document.getElementById("id_status");

// The form itself
const taskForm = document.getElementById("task-form");

// submit button
const submitButton = document.getElementById("submit-button");

// JS for bootstrap Modal:
const deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"));
// Delete buttons
const deleteButtons = document.getElementsByClassName("btn-delete");
const deleteConfirm = document.getElementById("delete-confirm");

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
    let taskTitleContent = document.getElementById(
      `task-title-${taskId}`
    ).innerText;
    // console.log(taskTitleContent)
    let taskStatusContent = document.getElementById(
      `task-status-${taskId}`
    ).innerText;
    // console.log(taskStatusContent)
    let taskDueDateContent = document.getElementById(
      `task-due-date-${taskId}`
    ).innerText;
    // console.log(taskDueDateContent);
    // console.log(typeof taskDueDateContent);
    let taskDescriptionContent = document.getElementById(
      `task-description-${taskId}`
    ).innerText;
    // console.log(taskDescriptionContent)

    // Populate the form fields with the task's existing data
    taskTitle.value = taskTitleContent;

    taskDescription.value = taskDescriptionContent;
    // console.log(taskDescription.value);

    // Set the status field by matching the text (status display) to the option
    for (let option of taskStatus.options) {
      if (option.text === taskStatusContent) {
        taskStatus.value = option.value;
        break;
      }
    }

    // run function to put date in format the javascript can handle
    taskDueDate.value = parseCustomDate(taskDueDateContent)

    // Update the form action to include the task ID and change the button text to "Update Task"
    const userId = document.getElementById("user-id").value;
    taskForm.setAttribute("action", `edit_task/${taskId}/`);
    submitButton.innerText = "Update Task";
  });
}


/**
* Initializes deletion functionality for the provided delete buttons.
* 
* For each button in the `deleteButtons` collection:
* - Retrieves the associated comment's ID upon click.
* - Updates the `deleteConfirm` link's href to point to the 
* deletion endpoint for the specific comment.
* - Displays a confirmation modal (`deleteModal`) to prompt 
* the user for confirmation before deletion.
*/
for (let button of deleteButtons) {
  button.addEventListener("click", (e) => {
    let taskId = e.target.getAttribute("data-task-id");
    deleteConfirm.href = `delete_task/${taskId}/`;
    deleteModal.show();
  });
}


/**
 * Function to get date in parseable format
 */
function parseCustomDate(dateString) {
    // Example input: "Dec. 26, 2024, 6:31 p.m."
    const monthNames = {
        'Jan.': 0, 'Feb.': 1, 'Mar.': 2, 'Apr.': 3, 'May': 4, 'Jun.': 5, 
        'Jul.': 6, 'Aug.': 7, 'Sep.': 8, 'Oct.': 9, 'Nov.': 10, 'Dec.': 11
    };
    
    // Regular expression to capture the month, day, year, and time parts
    const regex = /([A-Za-z]+\.?) (\d{1,2}), (\d{4}), (\d{1,2}):(\d{2}) (a\.m\.|p\.m\.)/;

    const match = dateString.match(regex);
    
    if (match) {
        const month = monthNames[match[1]];  // Get the month index (0-based)
        const day = match[2];
        const year = match[3];
        let hour = parseInt(match[4], 10);  // Hour as an integer
        const minute = match[5];
        const ampm = match[6];

        // Convert hour based on AM/PM
        if (ampm === 'p.m.' && hour < 12) {
            hour += 12; // Convert to 24-hour format
        } else if (ampm === 'a.m.' && hour === 12) {
            hour = 0; // Midnight case (12 a.m. is 00:00)
        }

        // Format the date in "YYYY-MM-DDTHH:MM" format
        const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(hour).padStart(2, '0')}:${minute}`;

        return formattedDate;  // "2024-12-26T18:31"
    }

    // Return null if the format doesn't match
    return null;
}