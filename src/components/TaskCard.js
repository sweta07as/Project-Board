import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TaskCard = React.forwardRef(({ task, ...props }, ref) => {
  const navigate = useNavigate();

  return (
    <Card
      ref={ref}
      {...props}
      onClick={() => navigate(`/task/${task.id}`)}
      sx={{
        mb: 2,
        cursor: "pointer",
        borderRadius: "8px",
        backgroundColor: "#3F97FF",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <CardContent>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 300,
            color: "#fff",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {task.title}
        </Typography>
      </CardContent>
    </Card>
  );
});

export default TaskCard;
