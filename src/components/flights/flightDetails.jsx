import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { FLIGHT_DETAILS_URL } from "../../infra/urls"
import { Stack } from "@mui/material"

const FlightDetails = () => {

    const {flightId} = useParams()
    const [flight, setFlight] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${FLIGHT_DETAILS_URL}/${flightId}`)
            console.log('Floght details:', response)
            setFlight(response.data)
        }
        fetchData()
    }, [flightId])

    return(
        <>
        {flight &&
            <Stack direction={'column'}>
                <p>{`Origin country: ${flight.origin_country}`}</p>

                <br/>
                <p>{`Destinaiton country: ${flight.dest_country}`}</p>
                <br/>
                <p>{`Departure: ${flight.departure_dt}`}</p>
                <br/>
                <p>{`Arrival: ${flight.arrival_dt}`}</p>
                <br/>
            </Stack>
        }
        </>
    )

}
export default FlightDetails