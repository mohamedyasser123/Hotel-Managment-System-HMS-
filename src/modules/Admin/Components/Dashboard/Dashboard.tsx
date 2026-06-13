import {
  Box,
  Card,
  Typography,
  Stack,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import { PieChart } from "@mui/x-charts/PieChart";
const stats = [
  {
    title: "Rooms",
    value: 150,
    icon: <PeopleIcon sx={{ fontSize: 35 }} />,
  },
  {
    title: "Facilities",
    value: 320,
    icon: <InventoryIcon sx={{ fontSize: 35 }} />,
  },
  {
    title: "Ads",
    value: "45K",
    icon: <AttachMoneyIcon sx={{ fontSize: 35 }} />,
  },
];
export default function Dashboard() {
  const navigate = useNavigate();
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
        direction="row"
        spacing={4}
        justifyContent="center"
        mb={6}
      >
        {stats.map((item) => (
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
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h4"
                  fontWeight="bold"
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
        direction={{ xs: "column", lg: "row" }}
        spacing={4}
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", maxWidth: 1200 }}
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
                  { id: 0, value: 40, label: "pending", color: "#5368F0" },
                  { id: 1, value: 35, label: "completed", color: "#9D57D5" },
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
              series={[
                {
                  innerRadius: 90,
                  outerRadius: 120,
                  data: [
                    { id: 0, value: 50, label: "Users", color: "#4C6FFF" },
                    { id: 1, value: 30, label: "Admins", color: "#FFB020" },
                  ],
                },
              ]}
              height={300}
            />
          </Box>
        </Card>
      </Stack>
    </Box>
  )
}
