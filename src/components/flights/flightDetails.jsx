import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { FLIGHT_DETAILS_URL } from "../../infra/urls"

const FlightDetails = () => {

    const {flightId} = useParams()
    const [flight, setFlight] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${FLIGHT_DETAILS_URL}/${flightId}`)
            setFlight(response.data)
        }
        fetchData()
    }, [flightId])

    return(
        <>
        {flight &&
            <>
                <p>{`Origin country: ${flight.origin_country}`}</p>
                <p>{`Destinaiton country: ${flight.dest_country}`}</p>
                <p>{`Departure: ${flight.departure_dt}`}</p>
                <p>{`Arrival: ${flight.arrival_dt}`}</p>
            </>
        }
        </>
    )

}
export default FlightDetails