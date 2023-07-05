//CRUD
// Controller (I/O) + Events + Talk to Service
import Note from '../models/note.js';

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
    search() {

    },
    sort() {

    },

    save() {

    },
    load() {

    }
}