import { List } from "@mui/material";
import FligthItem from "./flightItem";
import InfiniteScroll from "react-infinite-scroller";

export default function FlightsLits({flights, loadMore}) {

    const {count, next, results} = flights

    const items = results.map((flight) => {
        return <FligthItem key={flight.id} flight={flight} />
    })

    return(
        <List>
            <InfiniteScroll
                pageStart={0}
                loadMore={loadMore}
                hasMore={next !== null}
                loader={<div className="loader" key={0}>Loading ...</div>}>
                    {items}
            </InfiniteScroll>
        </List>
    )
}