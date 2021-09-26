import axios from "axios";

export async function fetchEvents() {
    try {
        const {data} = await axios.get("https://api.seatgeek.com/2/events/",{
            params: {
                client_id: process.env.REACT_APP_CLIENT_ID,
                client_secret: process.env.REACT_APP_CLIENT_SECRET,
                per_page: 25,
                page: 1,
                "taxonomies.name": "concert"
            }
        })
        console.log(data)
        return data
    }
    catch(e) {
        console.log(e)
        return e.message
    }
}
export async function fetchEvent(id) {
    try {
        const {data} = await axios.get("https://api.seatgeek.com/2/events/"+id,{
            params: {
                client_id: process.env.REACT_APP_CLIENT_ID,
                client_secret: process.env.REACT_APP_CLIENT_SECRET
            }
        })
        // console.log(data)
        return data
    }
    catch(e) {
        console.log(e)
        return e.message
    }
}
export async function fetchRestRooms() {
    try {
        const {data} = await axios.get("https://www.refugerestrooms.org/api/v1/restrooms/by_location",{
            params: {
                client_id: process.env.REACT_APP_CLIENT_ID,
                client_secret: process.env.REACT_APP_CLIENT_SECRET,
                page: 1,
                per_page: 10,
                offset: 0,
                unisex: false,
                lat: 40.730610,
                lng: -73.935242
            }
        })
        console.log(data)
        return data
    }
    catch(e) {
        console.log(e)
        return e.message
    }
}
export async function fetchCountryInfo(country) {
    try {
        const {data} = await axios.get(`https://travelbriefing.org/${country}?format=json`)
        console.log(data)
        return data
    }
    catch(e) {
        console.log(e)
        return e.message
    }
}