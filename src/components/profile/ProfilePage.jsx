import { Button, Stack } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { SetUserContext, UserContext } from "../../context/userContext"
import axios from "axios"
import { BOARDING_PASSES_URL, DOWNLOAD_BOARDING_PASS_URL, UPLOAD_PROFILE_IMG_URL } from "../../infra/urls"
import { CircularProgressWithLabel } from "../common/circularProgress"
var fileDownload = require('js-file-download');

export default function ProfilePage() {

    const userContext = useContext(UserContext)
    const [file, setFile] = useState('')
    const setUserContext = useContext(SetUserContext)
    const [inFlight, setInFlight] = useState(false)
    const [progress, setProgress] = useState(0)
    const [passes, setPasses] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(BOARDING_PASSES_URL)
            setPasses(response.data.results)
        }
        fetchData()
    }, [])

    // console.log('Rendering ProfilePage', userContext)
    // console.log('file:', file)

    const handleFileSelect = (event) => {

        if (event.target.files) {
          setFile(event.target.files[0])
        }
      }

    const handleUploadProgress = (progressEvent) => {
        // console.log(progressEvent)
        setProgress(progressEvent.progress * 100)
    }

    const handleUploadClick = async () => {
        setInFlight(true)
        const response = await axios.post(
            UPLOAD_PROFILE_IMG_URL,
            {file: file},
            {headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: handleUploadProgress
            }
        )
        setUserContext({user: response.data})
        setInFlight(false)
        console.log(response)
    }

    return(
        <>
            <p>Profile page</p>

            <img src={userContext?.user?.img_url} height={'150px'}/>
            <br />
            <input
                type="file" 
                multiple
                accept="image/jpeg"
                onChange={handleFileSelect}/>


            <Button onClick={handleUploadClick} 
                disabled={inFlight || file == ''}>UPLOAD</Button>

            {inFlight &&
                <CircularProgressWithLabel value={progress} />
            }

            <h2>Boarding passes:</h2>

            {
                passes.map((pass) => {

                    const handleDownload = async () => {
                        const response = await axios.get(DOWNLOAD_BOARDING_PASS_URL, {
                            params: {pass_id: pass.id},
                            responseType: 'blob'
                        })
                        fileDownload(response.data, pass.url.split('/').pop())

                    }

                    return (
                        <Stack direction={'row'}>
                            <p>{pass.url.split("/").pop()}</p>
                            <Button onClick={handleDownload}>DOWNLOAD</Button>
                        </Stack>
                    )
                })
            }

        </>
    )
}