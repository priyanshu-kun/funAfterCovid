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