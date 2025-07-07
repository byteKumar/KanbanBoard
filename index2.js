const taskSectionRef = document.querySelector('.task-section');
const actionsAddButton = document.querySelector('.actions .add');
const modalRef = document.querySelector('.add-task-modal');
const newTaskTextRef = document.querySelector('.add-task-modal .left-section textarea');
const prioritySelection = document.querySelectorAll('.add-task-modal .right-section .box');
const disabledEditButtonRef = document.querySelector('.actions .remove.box');
const taskSectionReference = document.querySelector('.task-section');
const filterBoxRef = document.querySelectorAll('.sorting .box');
const inputRef = document.querySelector('.search input');

const tasks = [{
    id: 134345,
    title: '1234',
    priority: 'p1'
}, {
    id: 56789,
    title: '5678',
    priority: 'p1'
} , {
    id: 91011,
    title: '9101',
    priority: 'p3'
} , {
    id: 12312,
    title: '1231',
    priority: 'p4'
}];

function renderTask(filteredTasks) {
    taskSectionRef.innerHTML = '';
    filteredTasks.forEach((task) => {
        createTask(task.title, task.priority, task.id);
    });
}

renderTask(tasks);

function updateTask(ref, key, value) {
    const taskRef = ref.closest('.task');
    const taskID = taskRef.querySelector('.task-id')?.innerText;
    if (key) {
        const selectedTask = tasks.find(task => task.id == taskID);
        selectedTask[key] = value;
    } else {
        const taskIdx = tasks.findIndex(task => task.id == taskID);
        tasks.splice(taskIdx, 1);
    }
}

function createTask(title, priority, newRandomID) {
    const newTaskContent = `
        <div class="task-priority" data-priority="${priority}"></div>
        <div class="task-id">${newRandomID}</div>
        <div class="task-title">
            <span>${title}</span>
            <div class="task-remove"><i class="fa-solid fa-trash"></i></div>
        </div>
    `;
    const newTask = document.createElement('div');
    newTask.classList.add('task');
    newTask.innerHTML = newTaskContent;
    taskSectionRef.appendChild(newTask);

    // change priority
    newTask.querySelector('.task-priority').addEventListener('click', function(e){
        const newPriority = getNextPriority(e.target.dataset.priority);
        e.target.dataset.priority = newPriority;

        updateTask(e.target, 'priority', newPriority);
        console.log(tasks);
    })

    //edit task
    newTask.querySelector('.task-title span').addEventListener('click', function(e){
        if(!taskSectionReference.classList.contains('non-editable')) {
            e.target.setAttribute('contenteditable', true);
            e.target.addEventListener('input', function(e) {
                //console.log(e.target.innerText);
            
                updateTask(e.target, 'title', e.target.innerText);
                console.log(tasks);
            });
        }
    })

    //remove task
    newTask.querySelector('.task-remove').addEventListener('click', function(e){
        //console.log(e.target.closest('.task'));
        e.target.closest('.task').remove();
        updateTask(e.target);
        console.log(tasks);
    })
}



actionsAddButton.addEventListener('click', function() {
    const isHidden = modalRef.classList.contains('hide');
    toggleModal(isHidden);
});

function toggleModal(isHidden) {
    if (isHidden) {
        modalRef.classList.remove('hide');
    } else {
        modalRef.classList.add('hide');
    }
}

function addTask(title, priority, id) {
    tasks.push({
        id,
        title,
        priority
    });
    renderTask(tasks);
}

newTaskTextRef.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
        const selectedPriorityRef = document.querySelector('.add-task-modal .right-section .box.selected');
        const priority = selectedPriorityRef.dataset.priority;
        const title = e.target.value;
        const newRandomID = Math.random();
        addTask(title,priority, newRandomID);
        toggleModal(false);
        e.target.value = '';
    }
});

prioritySelection.forEach((priSelections) => {
    priSelections.addEventListener('click', function(e){
        removeSelectedState(prioritySelection);
        e.target.classList.add('selected');
    })
});

function removeSelectedState(boxesRef) {
    boxesRef.forEach((boxref) => {
        boxref.classList.remove('selected');
    });
}

function getNextPriority(currentPriority) {
    const priorities = ['p1', 'p2', 'p3', 'p4'];
    let newPriority = (priorities.findIndex(item => item === currentPriority) + 1) % priorities.length;
    return `p${newPriority + 1}`;
}

disabledEditButtonRef.addEventListener('click', function(e){
    const taskSectionReference = document.querySelector('.task-section');
    if(e.target.classList.contains('selected')) {
        e.target.classList.remove('selected');
        taskSectionReference.classList.add('non-editable');
        removeContentEditable();
    } else {
        e.target.classList.add('selected');
        taskSectionReference.classList.remove('non-editable');
    }
});

function removeContentEditable() {
    document.querySelectorAll('.task .task-title span').forEach((ref) => {
        ref.removeAttribute('contenteditable');
    })
}

filterBoxRef.forEach((filterref) =>  {
    filterref.addEventListener('click', function(e){
        removeSelectedState(filterBoxRef);
        e.target.classList.add('selected');
        const selectedPriority = e.target.dataset.priority;
        showFilteredTasks(selectedPriority);
    })
})

function showFilteredTasks(selectedPriority) {
    const filteredTasks = tasks.filter(task => task.priority === selectedPriority);
    renderTask(filteredTasks);
}

function showSearchTask(searchText) {
    const filteredTasks = tasks.filter(task => {
        return String(task.id).includes(searchText) || task.title.includes(searchText); 
    });
    renderTask(filteredTasks);
}

inputRef.addEventListener('keyup', function(e) {
    const searchText = e.target.value;
    showSearchTask(searchText);
});