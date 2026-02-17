import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";
import db from '../db';



export default function JournalEntry() {
    const [entry, setEntry] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    const { id } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        const getData = async () => {

            const docRef = doc(db, "journal-entries", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setEntry(docSnap.data())
                setIsLoading(false)


            } else {
                // docSnap.data() will be undefined in this case
                setHasError(true)
                setIsLoading(false)
                console.log("No such document!");
            }

        }

        getData()

    }, [id])

    const handleDelete = async() => {
        console.log('Deleted')
        await deleteDoc(doc(db, "journal-entries", id));
        navigate('/journal')
    }

    const handleEdit = async () => {
        const newVal = window.prompt('Enter new journal entry')
        console.log("newVal: ", newVal)
        await setDoc(doc(db, "journal-entries", id), {
            entry: newVal,
            createdAt: new Date()
        });
        //await deleteDoc(doc(db, "journal-entries", id));
    }

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (hasError) {
        return <h1>Has error...</h1>
    }


    return (
        <div>
            <h1>Journal Entry: {id}</h1>
            <p>{entry.entry}</p>
            <br />
            <button onClick={() => handleDelete()}>Delete</button>
            <button onClick={() => handleEdit()}>Edit</button>
        </div>
    );
}


