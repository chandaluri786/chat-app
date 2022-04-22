import React,{ useState, useEffect } from "react";
import db from './firebase';
import { getDoc, doc, addDoc, collection} from "firebase/firestore";
import { async } from "@firebase/util";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from "react-router-dom";



function Groups() {
    const userdocRef = doc(db, "Users", "y7rsYqFRyMnDcoHb5PW2")
    const groupsRef = collection(db,"Groups")
    const [groups, setGroups] = useState([]);
    
    
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
    

    
    useEffect (() => {
        getUserData()
    },[])

    return (
        
        <div>
            {
                groups.map((group) => {
                    return (
                        
               <div>
                    {group.value.name}
                    {/* <Link to = {{pathname:"/messages", state: {grpID:group.key, grpName:group.value.name}}}><button>Messages</button></Link> */}
                    {/* <Link to = "/messages/:id:name"><button>Messages</button></Link> */}
                        
                        {/* <Link to = {{pathname:"/groupDetails", state: {grpID:group.key, grpName:group.value.name}}}><button>Properties</button></Link> */}
                        <Link to = "/messages"><button>Messages</button></Link>
                        <Link to = "/messages"><button>Messages</button></Link>
                        </div>
                        
                    )
                })
            }
           
            
            
        </div>
        
        

    );
}
export default Groups;