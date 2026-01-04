$(document).ready(function () {

    function addTask() {
        const taskText = $('#task-input').val().trim(); 

        if (taskText === '') {
            alert('Please enter a task');
            return;
        }

        const taskItem = `
            <li>
                <span class="task-text">${taskText}</span>
                <input type="checkbox" class="complete-checkbox">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </li>
        `;

        $('#task-list').append(taskItem); 
        $('#task-input').val(''); 
    }

    $('#add-btn').click(addTask);

    $('#task-input').keypress(function (e) {
        if (e.which === 13) addTask();
    });

  
    $('#task-list').on('click', '.delete-btn', function () {
        $(this).closest('li').remove();
    });

  
    $('#task-list').on('click', '.edit-btn', function () {
        const taskSpan = $(this).siblings('.task-text');
        const currentText = taskSpan.text();
        const newText = prompt('Update task:', currentText);

        if (newText !== null && newText.trim() !== '') {
            taskSpan.text(newText.trim());
        }
    });


    $('#task-list').on('change', '.complete-checkbox', function () {
        const taskSpan = $(this).siblings('.task-text');
        taskSpan.toggleClass('completed', this.checked);
    });

});