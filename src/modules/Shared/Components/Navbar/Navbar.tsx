import { AppBar, Avatar, Badge, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'
import useAuth from '../../../../hooks/useAuth';
import { useEffect } from 'react';
import LanguageToggle from '../LangToggleBtn/LangToggleBtn';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
export default function Navbar() {
    const { data, fetchProfile } = useAuth();
    const user = data?.user;
    const role = user?.role;
    useEffect(() => {
        if (!data) {
            fetchProfile();
        }
    }, [data, fetchProfile]);
    return (
        <AppBar position="static" color="inherit" elevation={0} sx={{
            boxShadow: "0px 2px 8px #E5E5E5",
        }}>
            <Toolbar sx={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
                py: 1,
            }}>
                <Typography

                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        px: { xs: 1, md: 4 },
                        flexGrow: 1,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            fontWeight: "bold",
                            fontSize: "20px",
                        }}
                    >
                        <Box component="span" sx={{ color: "#3252DF" }}>
                            Stay
                            <Box component="span" sx={{ color: "#152C5B" }}>
                                cation
                            </Box>
                            <Box component="span" sx={{ color: "#152C5B" }}>
                                .
                            </Box>
                        </Box>
                    </Box>
                </Typography>

                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: { xs: 1, md: 2 },
                    flexWrap: "wrap",
                    "& .active": {
                        color: "#3252DF !important",
                        fontWeight: 600,
                    },
                    "& .MuiButton-root": {
                        color: "#152C5B",
                        textTransform: "none",
                        fontWeight: 500,
                    },
                }}>
                    <Button component={NavLink} to="/home" end>Home</Button>
                    <Button component={NavLink} to="/explpore">Explore</Button>
                    {role === "user" ? (
                        <>
                            <Button>Review</Button>

                            <Button component={NavLink} to="/favorites">
                                Favorites
                            </Button>

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 3,
                                    cursor: "pointer",
                                    "&:hover": { opacity: 0.8 },
                                }}
                            >
                                <LanguageToggle />

                                <Avatar
                                    src={user.profileImage}
                                    alt={user.userName}
                                    sx={{ width: 36, height: 36 }}
                                />

                                <Typography
                                    variant="body1"
                                    sx={{ fontWeight: 500, color: "#1A1B1E" }}
                                >
                                    {user.userName}
                                </Typography>

                                <KeyboardArrowDownIcon />
                            </Box>

                            <IconButton sx={{ color: "#1F384C" }}>
                                <Badge badgeContent={4} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <Button
                                component={NavLink}
                                to="/login"
                                variant="contained"
                                sx={{
                                    bgcolor: "#3252DF",
                                    color: "white !important",
                                    textTransform: "none",
                                    px: 4,
                                    py: 1,
                                    borderRadius: 2,
                                    boxShadow: "0px 8px 20px rgba(50, 82, 223, 0.3)",

                                    "&:hover": {
                                        backgroundColor: "#2441c7",
                                    },

                                    "&.Mui-disabled": {
                                        backgroundColor: "#3252DF",
                                        color: "#fff",
                                    },
                                }}
                            >
                                Login
                            </Button>

                            <Button
                                component={NavLink}
                                to="/register"
                                variant="contained"
                                sx={{
                                    bgcolor: "#3252DF",
                                    color: "white !important",
                                    textTransform: "none",
                                    px: 4,
                                    py: 1,
                                    borderRadius: 2,
                                    boxShadow: "0px 2px 20px rgba(50, 82, 223, 0.3)",

                                    "&:hover": {
                                        backgroundColor: "#2441c7",
                                    },

                                    "&.Mui-disabled": {
                                        backgroundColor: "#3252DF",
                                        color: "#fff",
                                    },
                                }}
                            >
                                Register
                            </Button>
                        </>
                    )}

                </Box>

            </Toolbar>
        </AppBar>
    )
}
