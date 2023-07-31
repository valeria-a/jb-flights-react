import axios from "axios"
import { useEffect } from "react"
import * as urls from "../../infra/urls";

export default function FlightsPage() {

    useEffect(
        () => {
            const fetchData = async () => {
                try {
                    const response = await axios.get(urls.FLIGHTS_LIST_URL)
                    console.log(response)
                } catch (e) {
                    console.error(e)
                }
            }
            fetchData()
        }
        ,[]
    )

    return(
        <h2>Flights page</h2>

    )
}