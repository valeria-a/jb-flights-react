import { List } from "@mui/material";
import FligthItem from "./flightItem";

export default function FlightsLits({flights}) {

    const items = flights.map((flight) => {
        return <FligthItem key={flight.id} flight={flight} />
    })

    return(
        <List>
            {items}
        </List>
    )
}