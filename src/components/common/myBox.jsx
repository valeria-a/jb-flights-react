import { Box } from "@mui/material"

const MyBox = ({children, ...styling_props}) => {

    return(
        <Box sx={{  
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            ...styling_props
          }}>
            {children}
        </Box>
    )

}

export default MyBox