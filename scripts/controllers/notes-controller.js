//import db from '../services/firebaseconf.js';
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
    document.querySelector('#search').addEventListener('click', search);
    document.querySelector('#sort').addEventListener('click', sorted);
    document.querySelector('#update').addEventListener('click', updateMarked);
    document.querySelector('#save').addEventListener('click', save);
    document.querySelector('#load').addEventListener('click', load);
}

function updateMarked() {
    const fields = ['id', 'title', 'desc', 'date', 'imp'];
    const noteObject = {}; //Object literal
    for (let field of fields) {
        noteObject[field] = document.querySelector(`#${field}`).value.trim();
    }

    noteOperation.add(noteObject);
    printNote(noteObject);
    //printNotes(noteOperation.getNotes());
    showCount();
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
    //storeData(noteObject);
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
    //console.log('Edit....');
    const icon = this;
    noteOperation.update(icon.getAttribute('note-id'));
    //noteOperation.remove(icon);
    //printNotes(noteOperation.getNotes());


}
export function updateTask(obj) {
    const fields = ['id', 'title', 'desc', 'date', 'imp'];

    for (let field of fields) {
        document.getElementById(`${field}`).value = obj[field];
    }
    // noteOperation.add(obj);
}

export function printNotes(notes) {
    const tbody = document.querySelector('#notes');
    tbody.innerHTML = '';
    notes.forEach(note => printNote(note));
    showCount();

}

export function printNote(noteObject) {
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

function search() {
    const value = prompt("enter Id");
    if (value == '') {
        alert("Write Id or Task title");
    } else {
        noteOperation.search(value);
    }
}

function sorted() {
    noteOperation.sort();
    printNotes(noteOperation.getNotes());
}

function save() {
    if (window.localStorage) {
        const allNotes = noteOperation.getNotes();
        localStorage.notes = JSON.stringify(allNotes);
        alert("Data Stored..");
    } else {
        alert("Outdated Browser No Support of local storage..");
    }

}

function load() {
    if (window.localStorage) {
        const allNotes = localStorage.notes;
        noteOperation.loadData(JSON.parse(allNotes));
    } else {
        alert("Outdated Browser No Support of local storage..")
    }
}



function storeData(noteObject) {
    db.collection('notes').add(noteObject);
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