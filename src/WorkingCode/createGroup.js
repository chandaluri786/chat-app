import React,{ useState, useEffect } from "react";
import  db  from './firebase';
import { collection, getDocs, getDoc, doc, addDoc, Timestamp, query, orderBy, onSnapshot, setDoc, updateDoc} from "firebase/firestore";
import { async } from "@firebase/util";

function CreateGroup() {
    const [name , setName] = useState("");
    const [Participants, setParticipants] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [admin , setAdmin] = useState([])
    const groupsRef = collection(db, "Groups")
    const userdocRef = doc(db, "Users", "y7rsYqFRyMnDcoHb5PW2")
    // let email = ""
    
    // const generateDoc 

    const createGroup = async () => {
        const id = doc(collection(db,'Groups')).id
        console.log(id)
        const path = "/Groups/"+ id 
        await setDoc(doc(db,path),{ name: name, participants: Participants})
        const addSubCollection = async () =>
        {
            const path = "/Groups/"+ id + "/messages"
            await setDoc(doc(db,path,"_"),{
                  text: "Welcome"
                })

        }
        addSubCollection()
        // const id = doc(collection(db,'Groups')).id
        // console.log(id)
        // const path = "/Groups/"+ id + "/messages"
        // const groupDocPath = "/Groups/"+ id
        // const id = email.replace("@gmail.com", "");
        // console.log(email)
        // console.log(id)

        // const currentTimesatamp = new Date()
        // await addDoc(messageRef, { text: newMessage, timestamp: Timestamp.now(), sender: doc(db,"/Users/y7rsYqFRyMnDcoHb5PW2")  });
        // add
        // await setDoc(groupsRef + user, { name: name, participants: Participants,});
        // const q = query(groupsRef)
        // await setDoc(doc(db,path,"_"),{
        //   text: "Welcome"
        // })
        // const newDocRef = doc(db,"Groups",id)
        // const random = async()=>{
        // const q = query(newDocRef)

        // const updateDocument = async(Ref) =>{
        //     await updateDoc(Ref,{name: name, participants: Participants})
        // }
        // updateDocument(newDocRef)
        
      };
    const getContact = async (Ref) =>{
        const data = await getDoc(Ref)
        setContacts(oldarray => [...oldarray, {key: data.id, value: data.data()}])
    }
      const getUserData = async () => {
        const userDoc = await getDoc(userdocRef) 
        // email = userDoc.data()
        // console.log(userDoc.data)
        userDoc.data().contacts.map(
            contactRef => getContact(contactRef)
        )



      }
      useEffect (() => {
          getUserData()

      },[])
    
    return(
        <div>
            <input onChange={(event) => {
            setName(event.target.value);
          }} placeholder = "Group Name ..."></input>
          <div> Friends </div>
          <div>
              {
                  contacts.map(contact =>{
                      
                    return (
                        <div>
                        <input onChange = {(event) => {
                            console.log(event.target.value)
                            const path = "/Users/" + event.target.value
          setParticipants(oldarray => [...oldarray,doc(db,path)]);
        }} id = {contact.key}type="checkbox" name={contact.value.name} value={contact.key}></input>
                        <label for={contact.value.name}> {contact.value.name}</label>
                        </div>
                    )
                  })
              }
          </div>

      <button onClick={createGroup}>Create Group</button>

        </div>
        
    )

}
export default CreateGroup;