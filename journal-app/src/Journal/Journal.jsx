import React, { useEffect, useState } from 'react';
import { collection, getDocs, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import db from '../db'
import {Link} from 'react-router-dom'
import { AddJournal } from './AddJournal';



export default function Journal() {
    const [entries, setEntries] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        
        // const getData = async () => {
        //     const newEntries = []
        //     const querySnapshot = await getDocs(collection(db, "journal-entries"));
        //     querySnapshot.forEach((doc) => {
        //         // console.log(doc.data)
        //         newEntries.push({
        //             data: doc.data(),
        //             id: doc.id
        //         })
        //     // doc.data() is never undefined for query doc snapshots
        //     //console.log(doc.id, " => ", doc.data());
        //     });

        //     setEntries(newEntries)
        //     setIsLoading(false)
        // }

        // getData()

        const entriesQuery = query(collection(db, 'journal-entries'), orderBy("createdAt", "desc"))

        const newEntries = []
        const unsub = onSnapshot(entriesQuery, (snapshot) => {
            //console.log(snapshot.docs)
            snapshot.docs.forEach(doc => {
                console.log(doc.data())
                newEntries.push({
                    data: doc.data(),
                    id: doc.id
                })
            })
            setEntries(newEntries)
            setIsLoading(false)
        });

        // const unsubscribe = onSnapshot(collection(db,'journal-entries'), (snapshot) => {
        //     setEntries(snapshot.docs)
        //     setIsLoading(false)
        // })

        // return () => unsubscribe()
    }, []

    )

    if (isLoading) {
        return <h1>Loading....</h1>
    }

    console.log('entries:', entries)

    return (
        <div>
            <h1>Journal</h1>

            <AddJournal />

            {entries.map((entry) => {
                return (<div key={entry.id}>
                    <p>{entry.data.entry}</p>
                    <Link to={`/journal/${entry.id}`}>View Journal</Link>
                </div>)
                
            })}
            

        </div>
    );
}


