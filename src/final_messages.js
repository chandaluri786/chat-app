//import logo from './logo.svg';
import './messages.css';
import { useState, useEffect } from "react";
import { db } from './firebase-config';
import { collection, getDocs, getDoc, doc, addDoc, Timestamp, query, orderBy, onSnapshot} from "firebase/firestore";
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
    

    // const data = await getDocs(messageRef)
    const q = query(messageRef, orderBy("timestamp", "asc"))
    // console.log(data.data())
    // console.log(data.docs.length)

    const m = onSnapshot(q,(snapshot) => {
      //conversation.push({key: doc.id, value: doc.data()})
      setMessages(snapshot.docs.map((doc) =>  ({  ...doc.data(),id: doc.id })))

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
    return m;
  }
  const createMessage = async () => {
    const currentTimesatamp = new Date()
    // await addDoc(messageRef, { text: newMessage, timestamp: Timestamp.now(), sender: doc(db,"/Users/y7rsYqFRyMnDcoHb5PW2")  });
    await addDoc(messageRef, { text: newMessage, timestamp: Timestamp.now(), senderId: "y7rsYqFRyMnDcoHb5PW2", senderName:"user1"  });
    
  };

  useEffect(() => {
    groupdata()
    
  }, [])

  var messagesList = Messages.map(function(message){
    // const ts = message.timestamp.getHours() + ":" + message.timestamp.getMinutes() + "," + message.timestamp.getUTCDate()+ "/" + message.timestamp.getUTCMonth() + "/" +message.timestamp.getUTCFullYear() 
    if("y7rsYqFRyMnDcoHb5PW2" === message.senderId){
      return (
        <li className="out">
                                    <div className="chat-img">
                                        {/* <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar6.png"> */}
                                    </div>
                                    <div className="chat-body">
                                        <div className="chat-message">
                                            <div className="container">
                                                <h5>{message.senderName}</h5>
                                                <div className="item">{message.text}</div>
                                              </div>
                                        </div>
                                        {/* <div className = "time-stamp">
                                            {ts} */}
                                        {/* </div> */}
                                        <time className = "time-stamp" datetime={message.timestamp}></time>
                                    </div>
                                    
        
                                </li>
      )

    }
    else
    {
      return (
        <li className="in">
                                    <div className="chat-img">
                                        {/* <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar6.png"> */}
                                    </div>
                                    <div className="chat-body">
                                        <div className="chat-message">
                                            <div className="container">
                                                <h5>{message.senderName}</h5>
                                                <div className="item">{message.text}</div>
                                              </div>
                                        </div>
                                        <time className = "time-stamp" datetime={message.timestamp}></time>
                                    </div>
                                    
        
                                </li>
      )
    }
    // return<li key = {message.id}>{message.text}</li>;
  })
  return (
    <div className = "chat">
      <div className="card">
      <div className="card-header">Name of the group</div>
      <ul className="chat-list">
       {messagesList}
    
    </ul>
    <input onChange={(event) => {
          setNewMessage(event.target.value);
        }}></input> 
    <button onClick={createMessage}>Fly</button>
    </div>
    </div>
    

      
  );
}

export default App;