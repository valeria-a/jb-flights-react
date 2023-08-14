import axios from "axios"
import { useContext, useEffect, useState } from "react"
import * as urls from "../../infra/urls";
import { Box, Button, Fab, Stack } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

import FlightsSearch from "./flightSearch";
import FlightsLits from "./flightsList";
import NewFlightModal from "./newFlightModal";
import { UserContext } from "../../context/userContext";
import { SetNotificationContext } from "../../context/notificationContext";


export default function FlightsPage() {

    const navigate = useNavigate()
    const user = useContext(UserContext)
    const setNotification = useContext(SetNotificationContext)

    const [flights, setFlights] = useState({results:[]})

    const [openAddFlightModal, setOpenAddFlightModal] = useState(false);

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


        {/* <Button onClick={() => {navigate('/orders')}}>Go to orders</Button> */}
        <Button color='secondary' onClick={() => setNotification({open: true, msg: 'going to orders'}) }>Go to orders</Button>

        {user.user?.is_staff &&
            <>
            <Fab color="secondary" aria-label="add" 
                sx={{position: 'absolute',bottom: 16, right: 16,}}
                onClick={() => setOpenAddFlightModal(true)}>
                <AddIcon />
            </Fab>

            <NewFlightModal open={openAddFlightModal} setOpen={setOpenAddFlightModal}/>
            </>
        }

        </Box>

    )
}