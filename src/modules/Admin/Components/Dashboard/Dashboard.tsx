import {
  Box,
  Card,
  Typography,
  Stack,
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import CampaignIcon from "@mui/icons-material/Campaign";
import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import axiosClient from "../../../../api/axoisClient";

export default function Dashboard() {

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
      icon: <PeopleIcon sx={{ fontSize: 35 }} />,
    },
    {
      title: "Facilities",
      value: stats.facilities,
      icon: <InventoryIcon sx={{ fontSize: 35 }} />,
    },
   
    {
      title: "Ads",
      value: stats.ads,
      icon: <CampaignIcon sx={{ fontSize: 35 }} />,
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

        gap: 4
      }}>
      {/* Cards */}

      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
          justifyContent: "center",
          mb: 6,
        }}
      >
        {cards?.map((item) => (
          <Card
            key={item.title}
            sx={{
              width: 250,
              p: 3,
              bgcolor: "#000",
              color: "#fff",
              borderRadius: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  {item.value}
                </Typography>

                <Typography variant="body1">
                  {item.title}
                </Typography>
              </Box>

              {item.icon}
            </Box>
          </Card>
        ))}
      </Stack>
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
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            p: 3,
            flex: 1,
            borderRadius: 3,
            bgcolor: "transparent",
            boxShadow: "none",
          }}
        >

          <PieChart
            series={[
              {
                innerRadius: 50,
                outerRadius: 110,
                data: [
                  { id: 0, value: stats?.bookings?.pending, label: "pending", color: "#5368F0" },
                  { id: 1, value: stats?.bookings?.completed, label: "completed", color: "#9D57D5" },
                ],
              },
            ]}
            height={300}
          />
        </Card>

        <Card
          sx={{
            p: 3,
            flex: 1,
            borderRadius: 3,
            boxShadow: "none",
          }}
        >


          <Box
            sx={{
              "& .MuiChartsLegend-root": {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              },
            }}
          >
            <PieChart
              hideLegend
              series={[
                {
                  innerRadius: 90,
                  outerRadius: 120,
                  data: [
                    { id: 0, value: stats?.users?.user, label: "Users", color: "#4C6FFF" },
                    { id: 1, value: stats?.users?.admin, label: "Admins", color: "#FFB020" },
                  ],
                },
              ]}
              height={300}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 4,
                mt: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: "#4C6FFF",
                  }}
                />
                <Typography>
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
                <Typography>
                  Admins: {stats?.users?.admin ?? 0}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Card>
      </Stack>
    </Box>
  )
}
