import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function FligthItem({flight}) {

    const navigate = useNavigate()

    const handleClick = () => {
        console.log('blabal')
        navigate(`/flights/${flight.id}`)
    }

    return(
        <ListItem>
            <ListItemButton onClick={handleClick}>
                <ListItemText primary={`${flight.origin_city} => ${flight.dest_city}`} />
            </ListItemButton>
        </ListItem>
    )
}