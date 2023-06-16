import { Avatar } from "@mui/material"
import { memo } from "react"

export const UserAvatar = memo(
    ({ userName, src, isNav = false, isComment }: { userName: string, src?: string, isNav?: boolean, isComment?: boolean }) => {
        return (
            <>
                {isNav ?
                    <Avatar
                        sx={{
                            bgcolor: '#ff8e7b',
                            width: { xs: '28px', md: '32px' },
                            height: { xs: '28px', md: '32px' },
                            fontSize: '18px',
                        }}
                        src={src}
                        alt={userName[0]}
                    >
                    </Avatar>
                    :
                    isComment ? (
                        <Avatar
                            sx={{
                                bgcolor: '#ff8e7b',
                                width: { xs: '30px', md: '44px' },
                                height: { xs: '30px', md: '44px' },
                                fontSize: { xs: '30px', md: '41px' },
                            }}
                            src={src}
                            alt={userName[0]}
                        >
                        </Avatar >
                    ) :
                        (
                            <Avatar
                                sx={{
                                    bgcolor: '#ff8e7b',
                                    width: { xs: '50px', md: '75px' },
                                    height: { xs: '50px', md: '75px' },
                                    fontSize: { xs: '40px', md: '51px' },
                                }}
                                src={src}
                                alt={userName[0]}
                            >
                            </Avatar >
                        )}
            </>
        )
    }
)
