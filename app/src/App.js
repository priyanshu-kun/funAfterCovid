import {useState,useEffect} from "react"
import './App.css';
import Navbar from "./components/Navbar"
import {fetchEvents} from "./API/fetch-data"
import HomePage from "./Pages/HomePage"
import ContentPage from "./Pages/ContentPage"
import {Switch,Route} from "react-router-dom"

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
      <Switch>
        <Route path="/" exact>
            <HomePage Events={Events} />
        </Route>
        <Route path="/content" exact>
            <ContentPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
