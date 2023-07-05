import { noteOperation } from '../services/note-services.js';
window.addEventListener('load', init);

function init() {
    showCount();
    bindEvents();
    disableButton();
}

function showCount() {
    noteOperation.markTotal() > 0 ? enableButton() : disableButton();
    document.querySelector('#total').innerText = noteOperation.total();
    document.querySelector('#markTotal').innerText = noteOperation.markTotal();
    document.querySelector('#unMarkTotal').innerText = noteOperation.unMarkTotal();
}

function bindEvents() {
    document.querySelector('#add').addEventListener('click', addNote);
    document.querySelector('#delete').addEventListener('click', deleteMarked);

}

function deleteMarked() {
    noteOperation.remove();

    printNotes(noteOperation.getNotes());
}
const enableButton = () =>
    document.querySelector('#delete').disabled = false;

const disableButton = () =>
    document.querySelector('#delete').disabled = true;


function addNote() {
    //read id, title, desc, completion date, importance
    //DOM
    const fields = ['id', 'title', 'desc', 'date', 'imp'];
    const noteObject = {}; //Object literal
    for (let field of fields) {
        noteObject[field] = document.querySelector(`#${field}`).value.trim();
    }
    noteOperation.add(noteObject);
    printNote(noteObject);
    showCount();
    //const id = document.querySelector('#id').value;
    //const title = document.querySelector('#title').value;
}

function printIcon(myClassName = 'trash fa-bounce', fn, id) {
    const iTag = document.createElement('i');
    iTag.setAttribute('note-id', id);
    iTag.className = `fa-solid fa-${myClassName} me-2 hand`;
    iTag.addEventListener('click', fn);
    return iTag;
}

function toggleMark() {
    //console.log('Toggle....', this);
    const icon = this;
    const id = this.getAttribute('note-id');
    noteOperation.toggleMark(id);
    const tr = icon.parentNode.parentNode;
    tr.classList.toggle('table-danger');
    showCount();
}

function edit() {
    console.log('Edit....');
}

function printNotes(notes) {
    const tbody = document.querySelector('#notes');
    tbody.innerHTML = '';
    notes.forEach(note => printNote(note));
    showCount();

}

function printNote(noteObject) {
    const tbody = document.querySelector('#notes');
    const row = tbody.insertRow(); //<tr>
    for (let key in noteObject) {
        if (key == 'isMarked') {
            continue;
        }
        const td = row.insertCell(); //<td>
        td.innerText = noteObject[key];
    }
    const td = row.insertCell();
    td.appendChild(printIcon('trash fa-bounce', toggleMark, noteObject.id));
    td.appendChild(printIcon('user-pen fa-shake', edit, noteObject.id));

}






// Delete Operation
//1. Icon must be clickable
//2.Add Click Event (this) -Icon -> Parent -> TD ->parent ->TR,Tr Color setRed.
//3.EveryObject has key isMarked = false
//4. Icon has Id , so Fetch the Id and Search it in array e.g find, U get an Object, object isMarked = true.//5.Count Mark - Count those object in array whose isMarked = true,OppositeUnMark
//Total -CountMark
//Delete Button by default disable
//When Count Mark is > 0 then only delete button enable.
//When delete button click so it will delete those records whose isMarked = true
//Hint: Filter