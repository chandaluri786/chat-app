//import logo from './logo.svg';
// import './App.css';
import { useState, useEffect } from "react";
import { db } from './firebase-config';
import { collection, getDocs, getDoc, doc, addDoc, Timestamp, Reference} from "firebase/firestore";
import { async } from "@firebase/util";
// function get 


function App() {
  const [Messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  // const groupdocRef = doc(db, "Groups", "EIRN6wa47SAKGMSd1vty")
  var conversation = []
  const messagePath = "/Groups/" + "EIRN6wa47SAKGMSd1vty/" + "messages"

  const messageRef = collection(db, messagePath)


  const groupdata = async () => {


    const data = await getDocs(messageRef)
    // console.log(data.data())
    console.log(data.docs.length)

    data.docs.map((doc) => {
      //conversation.push({key: doc.id, value: doc.data()})
      setMessages((oldarray) => [...oldarray, { key: doc.id, value: doc.data() }])

    })


    // const messageRef = doc(db, messagePath,"7E4z9QaQTEUbedWX3eDZ")


    console.log("conversation", conversation.length)

    // setMessages= (conversation) => {
    // const [Messages] = useState(() => {
    //   // groupdata()
    //   return conversation  })}
    // console.log("messages",Messages.length)
    // setMessages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    // setMessages(data.docs.map((doc) => ({...doc.data(),id: doc.id})))

  }
  const createMessage = async () => {
    const currentTimesatamp = new Date()
    await addDoc(messageRef, { text: newMessage, timestamp: Timestamp.now(), sender: doc(db,"/Users/y7rsYqFRyMnDcoHb5PW2")  });
  };

  useEffect(() => {
    groupdata()
  }, [])

  var messagesList = Messages.map(function(message){
    return <li key = {message.key}>{message.value.text}</li>;
  })
  return (
   
    <div>{messagesList}
    <input onChange={(event) => {
          setNewMessage(event.target.value);
        }}></input> 
    <button onClick={createMessage}>Fly</button>
    </div>
    

      
  );
}

// export default App;