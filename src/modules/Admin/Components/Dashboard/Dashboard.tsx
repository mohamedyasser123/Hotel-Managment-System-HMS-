import {
  Box,
  Card,
  Typography,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import CampaignIcon from "@mui/icons-material/Campaign";
import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import axiosClient from "../../../../api/axoisClient";

export default function Dashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [stats, setStats] = useState({
    rooms: 0,
    facilities: 0,
    bookings: {
      pending: 0,
      completed: 0,
    },
    ads: 0,
    users: {
      user: 0,
      admin: 0,
    },
  });

  const cards = [
    {
      title: "Rooms",
      value: stats.rooms,
      icon: <PeopleIcon sx={{ fontSize: 40, color: "#4C6FFF" }} />,
    },
    {
      title: "Facilities",
      value: stats.facilities,
      icon: <InventoryIcon sx={{ fontSize: 40, color: "#4C6FFF" }} />,
    },
    {
      title: "Ads",
      value: stats.ads,
      icon: <CampaignIcon sx={{ fontSize: 40, color: "#4C6FFF" }} />,
    },
  ];

  useEffect(() => {
    const getStatistics = async () => {
      try {
        const response = await axiosClient.get("/admin/dashboard");
        setStats(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getStatistics();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        gap: 4,
        pt: { xs: 4, md: 6 },
        px: { xs: 2, md: 4 },
      }}>
      {/* Cards Section */}
      <Stack
        sx={{
          display: "flex",

          flexDirection: { xs: "column", sm: "row" },
          flexWrap: "wrap",
          gap: { xs: 3, md: 4 },
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          maxWidth: 1200,
          mb: 2,
        }}>
        {cards?.map((item) => (
          <Card
            key={item.title}
            sx={{
              width: { xs: "100%", sm: "calc(50% - 16px)", md: "320px" },
              minWidth: { sm: "240px", md: "300px" },
              p: 4,
              bgcolor: "#000",
              color: "#fff",
              borderRadius: 3,
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
            }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                    mb: 0.5,
                  }}>
                  {item.value}
                </Typography>

                <Typography variant="body1" sx={{ opacity: 0.8 }}>
                  {item.title}
                </Typography>
              </Box>

              {item.icon}
            </Box>
          </Card>
        ))}
      </Stack>

      {/* Charts Section */}
      <Stack
        sx={{
          width: "100%",
          maxWidth: 1200,
          display: "flex",
          flexDirection: {
            xs: "column",
            lg: "row",
          },
          gap: 4,
          justifyContent: "center",
          alignItems: "stretch",
        }}>
        <Card
          sx={{
            p: 3,
            flex: 1,
            width: "100%",
            borderRadius: 3,
            bgcolor: "transparent",
            boxShadow: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <PieChart
              series={[
                {
                  innerRadius: isMobile ? 40 : 50,
                  outerRadius: isMobile ? 90 : 110,
                  data: [
                    {
                      id: 0,
                      value: stats?.bookings?.pending,
                      label: "pending",
                      color: "#5368F0",
                    },
                    {
                      id: 1,
                      value: stats?.bookings?.completed,
                      label: "completed",
                      color: "#9D57D5",
                    },
                  ],
                },
              ]}
              height={300}
              margin={{
                top: 10,
                bottom: 10,
                left: isMobile ? 10 : 40,
                right: isMobile ? 10 : 40,
              }}
            />
          </Box>
        </Card>

        <Card
          sx={{
            p: 3,
            flex: 1,
            width: "100%",
            borderRadius: 3,
            boxShadow: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}>
          <Box
            sx={{
              "& .MuiChartsLegend-root": {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              },
            }}>
            <Box
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <PieChart
                hideLegend
                series={[
                  {
                    innerRadius: isMobile ? 70 : 90,
                    outerRadius: isMobile ? 100 : 120,
                    data: [
                      {
                        id: 0,
                        value: stats?.users?.user,
                        label: "Users",
                        color: "#4C6FFF",
                      },
                      {
                        id: 1,
                        value: stats?.users?.admin,
                        label: "Admins",
                        color: "#FFB020",
                      },
                    ],
                  },
                ]}
                height={300}
                margin={{ top: 10, bottom: 10, left: 10, right: 10 }}
              />
            </Box>

            {/* Custom Legend Box */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: { xs: 2, sm: 4 },
                mt: 2,
                flexWrap: "wrap",
              }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: "#4C6FFF",
                  }}
                />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Users: {stats?.users?.user ?? 0}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: "#FFB020",
                  }}
                />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Admins: {stats?.users?.admin ?? 0}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Card>
      </Stack>
    </Box>
  );
}