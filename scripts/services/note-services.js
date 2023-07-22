//CRUD
// Controller (I/O) + Events + Talk to Service
import Note from '../models/note.js';
import { printNote, printNotes, updateTask } from '../controllers/notes-controller.js';

export const noteOperation = {
    notes: [],
    add(noteObject) {
        const note = new Note(noteObject);
        this.notes.push(note);
    },
    total() {
        return this.notes.length;
    },
    searchById(id) {
        return this.notes.find(note => note.id == id);
    },
    toggleMark(id) {
        this.searchById(id).toggleMark();
        //const noteObject = this.searchById(id);
        // noteObject.isMarked = !noteObject.isMarked; SRP-> Single Responsible 
    },
    markTotal() {
        return this.notes.filter(note => note.isMarked).length;
    },
    unMarkTotal() {
        return this.total() - this.markTotal();
    },
    getNotes() {
        return this.notes;
    },
    remove() {
        this.notes = this.notes.filter(note => !note.isMarked)
    },
    search(id) {
        const searchEle = this.notes.filter(e => e.id === id);
        const tbody = document.querySelector('#notes');
        tbody.innerHTML = '';
        if (!searchEle.length == 0) {
            for (const key of searchEle) {
                printNote(key);
            }
        }

    },
    removed(id) {
        this.notes = this.notes.filter((e) => (e.id !== id))
        printNotes(this.getNotes());
        //this.total();
    },
    sort() {
        this.notes = this.notes.sort((a, b) => {
            return a.id - b.id;
        })
    },
    update(id) {
        const obj = this.notes.find((e) => (e.id === id));
        this.removed(id);

        updateTask(obj);
        //console.log(this.notes);
    },

    save() {

    },
    loadData(newNotes) {
        this.notes.join(newNotes);
        printNotes(this.notes);
    }
}