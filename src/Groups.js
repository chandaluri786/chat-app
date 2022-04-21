import { useState, useEffect } from "react";
import { db } from './firebase-config';
import { getDoc, doc } from "firebase/firestore";
import { async } from "@firebase/util";

function Groups() {
    const userdocRef = doc(db, "Users", "y7rsYqFRyMnDcoHb5PW2")
    const [groups, setGroups] = useState([]);

    function refreshPage() {
        window.location.reload(false);
    }
    
    const getUserData = async () => {
        const userDoc = await getDoc(userdocRef)       

        // groups retrival 
        const getGroup = async (ref) => {
            const data = await getDoc(ref)
            setGroups(oldarray => [...oldarray, { key: data.id, value: data.data() }])
            

        }

        function getGroups() {
            userDoc.data().groups.map((groupRef) => {
                getGroup(groupRef)
            })
        }     

        getGroups()
    }
    getUserData()

    return (
        <div>
            {
                groups.map((group) => {
                    return (
                        <div key={group.key}>{group.value.name}</div>
                    )
                })
            }
        </div>

    );
}
export default Groups;