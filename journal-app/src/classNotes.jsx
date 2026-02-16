import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from '../db'

export default function Journal() {
    const [entries, setEntries] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // const getData = async ()=> {
        //     const newEntries = []
        //     const querySnapshot = await getDocs(collection(db, "journal-entries"));
        //     querySnapshot.forEach((doc) => {
                // newEntries.push({
                //     data: doc.data(),
                //     id: doc.id
                // })
        //     });
        //     setEntries(newEntries)
        //     setIsLoading(false)
        // }
        // getData()

        // const newEntries = []
        // const unsub = onSnapshot(collection(db, 'journal-entries'), (snapshot) => {
          
        //     snapshot.docs.forEach(doc => {
        //           newEntries.push({
        //             data: doc.data(),
        //             id: doc.id
        //         })
        //     })
        //     setEntries(newEntries)
        // })
        onSnapshot(collection(db, 'journal-entries'), (snapshot) => {
            setEntries(snapshot.docs)
        })

    }, [])

    // if (isLoading) {
    //     return <h1>Loading....</h1>
    // }

    return (
        <div><h1>Journal</h1>
            {entries.map((entry) => {
               return  <p key={entry.id}>{entry.data().entry}</p>
            })}
        </div>
    );
}