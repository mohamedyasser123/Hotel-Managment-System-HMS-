import { Box, Stack } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

interface GenericSkeletonProps {
  type?: "card" | "text" | "mixed";
  count?: number;
}

export default function GenericSkeleton({
  type = "mixed",
  count = 3,
}: GenericSkeletonProps) {
  return (
    <Box sx={{ width: "100%", py: 4, px: 2 }}>
      <Stack spacing={3}>
        <Skeleton
          variant="text"
          width="30%"
          height={40}
          sx={{ borderRadius: "6px" }}
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: type === "text" ? "1fr" : "1fr 1fr",
              md:
                type === "text"
                  ? "1fr"
                  : `repeat(${count > 4 ? 4 : count}, 1fr)`,
            },
            gap: 3,
            width: "100%",
          }}>
          {Array.from({ length: count }).map((_, index) => (
            <Box key={index} sx={{ width: "100%" }}>
              {(type === "card" || type === "mixed") && (
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  sx={{
                    width: "100%",
                    height: 240,
                    borderRadius: "16px",
                    mb: 2,
                  }}
                />
              )}
              {(type === "text" || type === "mixed") && (
                <Stack spacing={1}>
                  <Skeleton
                    variant="text"
                    width="80%"
                    height={25}
                    sx={{ borderRadius: "4px" }}
                  />
                  <Skeleton
                    variant="text"
                    width="50%"
                    height={20}
                    sx={{ borderRadius: "4px" }}
                  />
                </Stack>
              )}
            </Box>
          ))}
        </Box>
      </Stack>
    </Box>
  );
}
