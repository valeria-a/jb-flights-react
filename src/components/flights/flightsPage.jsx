import axios from "axios"
import { useEffect, useState } from "react"
import * as urls from "../../infra/urls";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FlightSharp } from "@mui/icons-material";
import FlightsSearch from "./flightSearch";
import FlightsList from "./flightsList";

export default function FlightsPage() {

    const navigate = useNavigate()
    const [flights, setFlights] = useState([])

    useEffect(
        () => {
            const fetchData = async () => {
                try {
                    const response = await axios.get(urls.FLIGHTS_LIST_URL)
                    console.log(response)
                    setFlights(response.data.results)
                } catch (e) {
                    console.error(e)
                }
            }
            fetchData()
        }
        ,[]
    )

    return(
        <>
        <h2>Flights page</h2>
        <FlightsSearch />
        <FlightsList />

        <Button onClick={() => {navigate('/orders')}}>Go to orders</Button>
        </>

    )
}