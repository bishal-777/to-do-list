$(document).ready(function () {

    let count = parseInt(localStorage.getItem('count')) || 0;

    function loadTasks() {
        const keys = Object.keys(localStorage).filter(key => key !== 'count');
        keys.forEach(key => {
            try {
                const data = JSON.parse(localStorage.getItem(key));
                const checkedAttr = data.checked ? 'checked' : '';
                const completedClass = data.checked ? 'completed' : '';

                const taskItem = `
                    <li id="${key}">
                        <span class="task-text ${completedClass}">${data.text}</span>
                        <input type="checkbox" class="complete-checkbox" ${checkedAttr}>
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                    </li>
                `;

                $('#task-list').append(taskItem);
            } catch (e) {
                // fallback for invalid JSON
                console.error('Error loading task:', key);
            }
        });
    }

    loadTasks();

    function addTask() {
        const taskText = $('#task-input').val().trim(); 

        if (taskText === '') {
            alert('Please enter a task');
            return;
        }

        const id = crypto.randomUUID();
        const taskData = {
            text: taskText,
            checked: false
        };

        const taskItem = `
        <li id="${id}">
        <span class="task-text">${taskText}</span>
        <input type="checkbox" class="complete-checkbox">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
        </li>
        `;
        
        $('#task-list').append(taskItem); 
        $('#task-input').val(''); 
        localStorage.setItem(id, JSON.stringify(taskData));
        count++;
        localStorage.setItem('count', count);
    }
    
    $('#add-btn').click(addTask);
    
    $('#task-input').keypress(function (e) {
        if (e.which === 13) addTask();
    });

  
    $('#task-list').on('click', '.delete-btn', function () {
        const $li = $(this).closest('li');
        const id = $li.attr('id');

        $li.remove();
        localStorage.removeItem(id);
        count--;
        localStorage.setItem('count', count);
    });

  
    $('#task-list').on('click', '.edit-btn', function () {
        const $li = $(this).closest('li');        
        const taskSpan = $(this).siblings('.task-text');
        const currentText = taskSpan.text();
        const newText = prompt('Update task:', currentText);

        if (newText !== null && newText.trim() !== '') {
            taskSpan.text(newText.trim());
            const data = JSON.parse(localStorage.getItem($li.attr('id')));
            data.text = newText.trim();
            localStorage.setItem($li.attr('id'), JSON.stringify(data));
        }
    });


    $('#task-list').on('change', '.complete-checkbox', function () {
        const $li = $(this).closest('li');
        const taskSpan = $(this).siblings('.task-text');
        const isChecked = $(this).is(':checked');
        taskSpan.toggleClass('completed', this.checked);

        const data = JSON.parse(localStorage.getItem($li.attr('id')));
        data.checked = isChecked;
        localStorage.setItem($li.attr('id'), JSON.stringify(data));
    });

});