import { Button } from "@mui/material"
import { useContext, useState } from "react"
import { UserContext } from "../../context/userContext"
import axios from "axios"
import { UPLOAD_PROFILE_IMG_URL } from "../../infra/urls"

export default function ProfilePage() {

    const userContext = useContext(UserContext)
    const [file, setFile] = useState('')

    const handleFileSelect = (event) => {
        if (event.target.files) {
          setFile(event.target.files[0])
        }
      }

    const handleUploadClick = async () => {
        const response = await axios.post(
            UPLOAD_PROFILE_IMG_URL,
            {file: file},
            {headers: {
                'Content-Type': 'multipart/form-data'
            }}
        )
        console.log(response)
    }

    return(
        <>
            <p>Profile page</p>

            <img src={userContext.user.img_url} height={'150px'}/>
            <br />

            <input 
                type="file" 
                onChange={handleFileSelect}/>

            <Button onClick={handleUploadClick}>UPLOAD</Button>
        </>
    )
}