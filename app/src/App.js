import {useState,useEffect} from "react"
import './App.css';
import Navbar from "./components/Navbar"
import {fetchEvents} from "./API/fetch-data"
import HomePage from "./components/HomePage"

function App() {

  const [Events,setEvents] = useState([])

  useEffect(() => {
    (async () => {
      const {events} = await fetchEvents()
      setEvents(events)
    })()
  },[])

  return (
    <div className="App">
      <Navbar />
      <h1 className="main-heading relative text-center mt-6 text-xl">Find events of your choice -</h1>
    <HomePage Events={Events} />
    </div>
  );
}

export default App;
