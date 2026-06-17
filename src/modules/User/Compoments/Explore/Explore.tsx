import { Box, Breadcrumbs, Typography, Link as MuiLink, CircularProgress, Grid, Pagination } from '@mui/material'
import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import usePortalExplore from '../../../../hooks/portal/usePortalExplore';

export default function Explore() {
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const params = {
        page: page,
        size: pageSize,
        startDate: "2023-01-20",
        endDate: "2023-01-30"
    };

    const { data, isLoading, error } = usePortalExplore(params);
    const totalCount = data?.data.totalCount || 0;
    const pageCount = Math.ceil(totalCount / pageSize);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    return (
        <Box
            sx={{
                py: 8,
                px: { xs: 2, sm: 4 },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Typography
                variant="h3"
                sx={{
                    my: 4,
                    fontWeight: 700,
                    color: "#152C5B",
                    textAlign: "center",
                    fontSize: { xs: '2rem', sm: '3rem' }
                }}
            >
                Explore Places
            </Typography>
            <Breadcrumbs separator="/" aria-label="breadcrumb" sx={{ alignSelf: "flex-start", }}>

                <MuiLink<typeof RouterLink>
                    component={RouterLink}
                    to="/"
                    underline="none"
                    sx={{
                        color: "#B0B0B0",
                        fontSize: 16,
                    }}
                >
                    Home
                </MuiLink>

                <Typography
                    sx={{
                        color: "#152C5B",
                        fontWeight: 500,
                        fontSize: 16,
                    }}
                >
                    Explore
                </Typography>
            </Breadcrumbs>
            <Typography
                sx={{
                    color: "#152C5B",
                    fontWeight: 500,
                    fontSize: 16,
                    my: 6,
                    alignSelf: "flex-start"
                }}
            >
                All Rooms
            </Typography>
            {isLoading && <CircularProgress sx={{ my: 4 }} />}
            {error && <Typography color="error" sx={{ my: 4 }}>Something Went wrong</Typography>}
            <Grid container spacing={4} sx={{ width: '100%', justifyContent: 'flex-start' }}>
                {data?.data.rooms.map((room) => {
                    const cardImage = room.images && room.images.length > 0
                        ? room.images[0]
                        : 'https://via.placeholder.com/361x215?text=No+Image';

                    return (
                        <Grid key={room._id} size={{ xs: 6, sm: 6, md: 4, lg: 3 }}>
                            <Box
                                sx={{
                                    width: '100%',
                                    maxHeight: 215,
                                    aspectRatio: '361/215',
                                    borderRadius: '15px',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.6) 100%), url(${cardImage})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-end',
                                    padding: { xs: '10px', sm: '16px' },
                                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s ease-in-out',
                                    '&:hover': {
                                        transform: 'scale(1.02)',
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        backgroundColor: '#FF498B',
                                        color: '#fff',
                                        padding: { xs: '4px 10px', sm: '8px 24px' },
                                        borderBottomLeftRadius: '15px',
                                        fontWeight: 500,
                                        fontSize: { xs: '10px', sm: '16px' },
                                        lineHeight: 1.2,
                                    }}
                                >
                                    ${room.price}
                                    <Box
                                        component="span"
                                        sx={{
                                            fontWeight: 300,
                                            fontSize: { xs: '6px', sm: '14px' }
                                        }}
                                    >
                                        per night
                                    </Box>
                                </Box>

                                <Box sx={{ color: '#fff', textAlign: 'left', pt: { xs: 2, sm: 0 } }}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 500,
                                            fontSize: { xs: '13px', sm: '20px' },
                                            lineHeight: 1.2,
                                            mb: '4px',
                                            textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            width: '85%',
                                        }}
                                    >
                                        {room.roomNumber === "701" ? "Ocean Land" : `Room ${room.roomNumber}`}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: 300,
                                            fontSize: '14px',
                                            color: 'rgba(255, 255, 255, 0.8)',
                                            textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
                                        }}
                                    >
                                        Bandung, Indonesia
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    );
                })}
            </Grid>
            {pageCount > 1 && (
                <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Pagination
                        count={pageCount}
                        page={page}
                        onChange={handlePageChange}
                        variant="outlined"
                        shape="rounded"
                        color="primary"
                        size="large"
                    />
                </Box>
            )}

        </Box>
    )
}
