const taskSectionRef = document.querySelector('.task-section');
const actionsAddButton = document.querySelector('.actions .add');
const modalRef = document.querySelector('.add-task-modal');
const newTaskTextRef = document.querySelector('.add-task-modal .left-section textarea');
const prioritySelection = document.querySelectorAll('.add-task-modal .right-section .box');
const disabledEditButtonRef = document.querySelector('.actions .remove.box');
const taskSectionReference = document.querySelector('.task-section');
const filterBoxRef = document.querySelectorAll('.sorting .box');
const inputRef = document.querySelector('.search input');

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
    newTask.querySelector('.task-priority').addEventListener('click', function(e){
        //console.log('Priority clicked:', e.target.dataset.priority);
        const newPriority = getNextPriority(e.target.dataset.priority);
        //console.log('New Priority:', newPriority);
        e.target.dataset.priority = newPriority;
    })

    newTask.querySelector('.task-title span').addEventListener('click', function(e){
        if(!taskSectionReference.classList.contains('non-editable')) {
            e.target.setAttribute('contenteditable', true);
        }
    })

    newTask.querySelector('.task-remove').addEventListener('click', function(e){
        //console.log(e.target.closest('.task'));
        e.target.closest('.task').remove();
    })
}

createTask('1234','p1', 13434);
createTask('5678','p1', 56789);
createTask('9101','p3', 91011);
createTask('1231','p4', 12312);


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

newTaskTextRef.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
        const selectedPriorityRef = document.querySelector('.add-task-modal .right-section .box.selected');
        const priority = selectedPriorityRef.dataset.priority;
        const title = e.target.value;
        const newRandomID = Math.random();
        createTask(title,priority, newRandomID);
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
    const taskPriorityRef = document.querySelectorAll('.task .task-priority');
    taskPriorityRef.forEach((ref) => {
        if (ref.dataset.priority !== selectedPriority) {
            ref.closest('.task').style.display = 'none';

        } else {
            ref.closest('.task').style.display = 'flex';
        }
    })
}

function showSearchTask(searchText) {
    const taskRef = document.querySelectorAll('.task');
    taskRef.forEach((ref) => {
        const taskIDRef = ref.querySelector('.task-id');
        const taskTitleRef = ref.querySelector('.task-title span');
        if (taskIDRef.innerText.includes(searchText) || taskTitleRef.innerText.includes(searchText)) {
            ref.closest('.task').style.display = 'flex';

        } else {
            ref.closest('.task').style.display = 'none';
        }
    })
}

inputRef.addEventListener('keyup', function(e) {
    const searchText = e.target.value;
    showSearchTask(searchText);
});