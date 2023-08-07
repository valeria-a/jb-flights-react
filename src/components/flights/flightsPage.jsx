import axios from "axios"
import { useEffect, useState } from "react"
import * as urls from "../../infra/urls";
import { Box, Button, Fab, Stack } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

import FlightsSearch from "./flightSearch";
import FlightsLits from "./flightsList";


export default function FlightsPage() {

    const navigate = useNavigate()
    const [flights, setFlights] = useState({results:[]})

    const fetchData = async () => {
        let urlToSend = urls.FLIGHTS_LIST_URL
        if (flights.results.length > 0) {
            urlToSend = flights.next
        }
        try {
            const response = await axios.get(urlToSend)
            console.log(response)
            // setFlights(response.data)
            setFlights(
                {...flights,
                next: response.data.next,
                results: [...flights.results, ...response.data.results]
            }
            )
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(
        () => {
            fetchData()
        }
        ,[]
    )

    return(
        <Box sx={{overflow: 'hidden'}}>
        {/* <h2>Flights page</h2> */}
        <FlightsSearch setFlights={setFlights} />

        {/* <Stack direction={'row'} sx={{width: {md: '100%', lg: '80%'}}}> */}
        <Stack direction={'row'} sx={{width: '100%'}}>
            <FlightsLits flights={flights} loadMore={fetchData} />
    
            <Outlet />
        </Stack>


        <Button onClick={() => {navigate('/orders')}}>Go to orders</Button>

        <Fab color="primary" aria-label="add" 
        sx={{position: 'absolute',bottom: 16, right: 16,}}>
            <AddIcon />
        </Fab>
        </Box>

    )
}