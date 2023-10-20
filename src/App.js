import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";

import { collection, getDocs } from "firebase/firestore";
import { db } from ".";

class App extends Component {
  state = {
    notes: [],
  };

  async refreshNotres() {
    let notesList = [];

    const notesCol = collection(db, "Menu", "Tavola calda", "Pizza");
    const notesSnapshot = await getDocs(notesCol);
    console.log(notesSnapshot);

    // notesSnapshot.forEach((doc) => {
    //   let note = doc.data();
    //   note.id = doc.id;
    //   notesList.push(note);
    // });

    notesList.push(
      ...notesSnapshot.docs.map((elem) => ({ ...elem.data(), id: elem.id }))
    );

    console.log(notesList);
    // this.setState({ notes: notesList });
    // this.setState({ notes: notesList });
    console.log(this.setState({ notes: notesList }));
  }
  componentDidMount() {
    this.refreshNotres();
  }

  render() {
    const { notes } = this.state;

    return (
      <div className="App">
        <h2>Todo List</h2>
        {notes.map((el, index) => (
          <ul key={index}>
            <li>* {el.id}</li>
          </ul>
        ))}
      </div>
    );
  }
}

export default App;
