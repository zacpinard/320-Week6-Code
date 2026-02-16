import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore"; 
import db from "../db"

export function AddJournal () {
  const [entry, setEntry] = useState('')

  console.log(entry)
  const handleSubmit = async(e) => {
    e.preventDefault()
    const docRef = await addDoc(collection(db, "journal-entries"), {
      entry: entry,
      createdAt: new Date()
    });
    setEntry('')

  }

  return (
    <>
      <h2>Add an Entry</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="entry-input">Add Entry</label>
        <textarea name="entry-input" id="entry-input" onChange={e => setEntry(e.target.value)}></textarea>
        <button type='submit'>Submit Entry</button>
      </form>
    
    </>
  )
}


