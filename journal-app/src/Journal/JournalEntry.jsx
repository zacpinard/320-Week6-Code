import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import db from '../db';


export default function JournalEntry() {
    const [entry, setEntry] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    const { id } = useParams();

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
        </div>
    );
}


