import { Avatar } from "@mui/material"
import { memo } from "react"

export const UserAvatar = memo(
    ({ userName, src, isNav = false }: { userName: string, src?: string, isNav?: boolean }) => {
        return (
            <>
                {isNav ?
                    <Avatar
                        sx={{
                            bgcolor: '#ff8e7b',
                            width: { xs: '28px', md: '32px' },
                            height: { xs: '28px', md: '32px' },
                            fontSize: '24px',
                        }}
                    >
                        {src ?
                            <img src={src} alt={userName} />
                            :
                            userName[0]}
                    </Avatar>
                    :
                    <Avatar
                        sx={{
                            bgcolor: '#ff8e7b',
                            width: { xs: '50px', md: '75px' },
                            height: { xs: '50px', md: '75px' },
                            fontSize: { xs: '40px', md: '51px' },
                        }}
                    >
                        {src ?
                            <img src={src} alt={userName} />
                            :
                            userName[0]}
                    </Avatar>}
            </>
        )
    }
)
