const fs = require('fs');
const chalk = require('chalk');
const { title } = require('process');

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => {
    return note.title === title;
  });

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log('New note added!');
  } else {
    console.log('Note title taken!');
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => {
    return note.title !== title;
  });
  saveNotes(notesToKeep);
  if (JSON.stringify(notes) !== JSON.stringify(notesToKeep)) {
    console.log(chalk.green.inverse('Note removed!'));
  } else if (JSON.stringify(notes) === JSON.stringify(notesToKeep)) {
    console.log(chalk.red.inverse('No note found!'));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.white.inverse('Your notes:'));
  notes.forEach((note) => {
    console.log(chalk.blue(note.title));
  });
};

const readNotes = (title) => {
  const notes = loadNotes();
  const noteToRead = notes.find((note) => {
    return note.title === title;
  });
  if (noteToRead) {
    console.log(chalk.green.inverse(noteToRead.title));
    console.log(noteToRead.body);
  } else {
    console.log(chalk.red.inverse('No note found!'));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNotes: readNotes,
};
