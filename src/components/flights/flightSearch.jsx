import { Autocomplete, Box, Button, Container, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { FLIGHTS_LIST_URL, ORIGIN_CITIES_URL } from "../../infra/urls";

export default function FlightsSearch({setFlights}) {

    const [originCityList, setOriginCityList] = useState([])
    const [selectedCity, setSelectedCity] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(ORIGIN_CITIES_URL)
            setOriginCityList(response.data)
        }
        fetchData()
    }, [])

    const handleRenderInput = (params) => {
        // console.log()
        return <TextField {...params} label="Origin city" />
    }

    const handleSearch = async() => {
        console.log(selectedCity)
        const response = await axios.get(FLIGHTS_LIST_URL, {params:{origin_city: selectedCity}})
        setFlights(response.data)
        // setSelectedCity('')
    }

    return(
        <Container 
            component={'form'} 
            onSubmit={(e) => {e.preventDefault()}}
            sx={{marginTop: '1em', display: 'flex'}}>
                
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={originCityList}
                sx={{ width: 300 }}
                renderInput={handleRenderInput}
                value={selectedCity}
                onChange={(e, newValue) => {

                    setSelectedCity(newValue)
                }}
                />
            {/* {advancedSEarch && <AdvancedSearch />} */}
            <Button onClick={handleSearch}>Search</Button>
        </Container>
    )
}