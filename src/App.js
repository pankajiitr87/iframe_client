import './App.css';
import { useRef, useEffect, useState } from 'react';

function App() {
  const iframeRef = useRef(null); // Ref to store the iframe element
  // const iframeRef = useRef(null); // Ref to store the iframe element
  // const [domain, setDomain] = useState(""); // State to store the domain input
  const [clientId, setClientId] = useState(""); // State to store the clientId input
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("")
  // const [port, setPort] = useState(""); // State to store the port input
  // const [date, setDate] = useState(""); // State to store the selected date

  // Function to open the iframe and send a message
  const openFrameAndSendMessage = () => {
    
    if (!clientId || !month || !year) {
      alert("Please enter a Client Id, Month, and Year");
      return;
    }

    // Construct the URL with query parameters https://bo-server-side-1.onrender.com/
    // for mongo database username and password --> pankajiitr87 and a3kwmdDoE9xGpi5n
    // const message = `${domain}/${clientId}/${month}/${year}`;
    // const iframeUrl = `http://localhost:3000/?message=${encodeURIComponent(message)}`;
    const url = `https://bo-cilent.vercel.app/?clientId=${encodeURIComponent(clientId)}&month=${encodeURIComponent(month)}&year=${encodeURIComponent(year)}`
    // Create the iframe
    const iframe = document.createElement("iframe");
    console.log('iframe =', iframe);
    iframe.src = url; // URL of the iframe content
    console.log('iframe.src =', iframe.src);
    iframe.frameBorder = "0";
    iframe.id = "iframe";
    iframe.style.position = "absolute";
    iframe.style.zIndex = "999";
    iframe.style.height = "100%";
    iframe.style.width = "100%";
    iframe.style.top = "0";
    iframe.style.backgroundColor = "white";
    iframe.style.border = "none";

    // Append the iframe to the body and store the reference
    document.body.prepend(iframe);
    iframeRef.current = iframe; // Store iframe reference

    // Disable scrolling on the main page
    document.body.style.overflow = "hidden";

    // Once the iframe loads, send the message
    // iframe.addEventListener('load', () => {
    //   const message = `${clientId}/${date}`; // Construct the message using domain and clientId
    //   iframe.contentWindow.postMessage(message, `http://localhost:3000/`); // Send to the dynamic origin
    //   console.log("Message sent to iframe:", message); // Log for debugging
    // });
  };

  // Clean up the iframe when the component is unmounted
  useEffect(() => {
    return () => {
      if (iframeRef.current) {
        document.body.removeChild(iframeRef.current);
        document.body.style.overflow = ""; // Re-enable scrolling on the main page
      }
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <header>To view dashboard add data in below boxes and click on Open IFRAME button</header>
        <input 
          placeholder='Type Client Id here' 
          value={clientId} 
          onChange={(e) => setClientId(e.target.value)} // Update the clientId state
        />
        <input 
          type='text' 
          placeholder='Type Month (MM) here' 
          value={month} 
          onChange={(e) => setMonth(e.target.value)} // Update the month state
        />
        <input 
          type='text' 
          placeholder='Type Year (YYYY) here' 
          value={year} 
          onChange={(e) => setYear(e.target.value)} // Update the year state
        />
        <button onClick={openFrameAndSendMessage}>Open IFRAME</button>
      </header>
    </div>
  );
}

export default App;