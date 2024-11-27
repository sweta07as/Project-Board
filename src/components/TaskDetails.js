import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

const TaskDetails = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    id: "",
    title: "",
    description: "",
    status: "",
  });

  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("tasks"));
    const task = savedData.statuses
      .flatMap((status) => status.tasks)
      .find((task) => task.id === taskId);
    setTask(task);

    setStatuses(savedData.statuses); 
  }, [taskId]);

  const handleSave = () => {
    const savedData = JSON.parse(localStorage.getItem("tasks"));

    const updatedStatuses = savedData.statuses.map((status) => {
     
      if (status.id === task.status) {
        return {
          ...status,
          tasks: status.tasks.map((t) =>
            t.id === task.id
              ? { ...t, title: task.title, description: task.description }
              : t
          ),
        };
      }

      if (status.tasks.some((t) => t.id === task.id)) {
        return {
          ...status,
          tasks: status.tasks.filter((t) => t.id !== task.id),
        };
      }

      return status;
    });

    const newStatuses = updatedStatuses.map((status) => {
      if (
        status.id === task.status &&
        !status.tasks.some((t) => t.id === task.id)
      ) {
        return {
          ...status,
          tasks: [
            ...status.tasks,
            {
              ...task,
            },
          ],
        };
      }
      return status;
    });

    localStorage.setItem("tasks", JSON.stringify({ statuses: newStatuses }));
    navigate(`/`);
  };

  const handleDelete = () => {
    const savedData = JSON.parse(localStorage.getItem("tasks"));
    const updatedStatuses = savedData.statuses.map((status) => {
      return {
        ...status,
        tasks: status.tasks.filter((t) => t.id !== taskId),
      };
    });

    localStorage.setItem(
      "tasks",
      JSON.stringify({ statuses: updatedStatuses })
    );
    navigate(`/`);
  };

  const handleStatusChange = (event) => {
    setTask({ ...task, status: event.target.value });
  };

  return (
    <Box
      sx={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "2rem",
        backgroundColor: "#3F97FF",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          color="error"
          onClick={handleDelete}
          sx={{
            py: 1,
            fontWeight: "medium",
            textTransform: "none",
            color: "#fff",
            "&:hover": {
              color: "red",
            },
            display: "flex", 
            justifyItems: "center",
            alignItems: "center", 
          }}
        >
          <DeleteIcon />
        </Button>
      </Box>
      <TextField
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        fullWidth
        sx={{
          mb: 3,
          "& .MuiInputBase-root": {
            borderBottom: "0.5px solid #fff",
            borderRadius: "0",
            fontSize: "1.8rem",
            fontWeight: "800",
            color: "#fff",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none", 
          },
          "& .MuiInputLabel-root": {
            color: "#000", 
          },
        }}
      />

      <TextField
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        fullWidth
        multiline
        placeholder="Description"
        rows={4}
        sx={{
          mb: 3,
          "& .MuiInputBase-root": {
            borderRadius: "0",
            borderBottom: "0.5px solid #fff",
            fontSize: "1.2rem",
            color: "#fff",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none", 
          },
          "& .MuiInputLabel-root": {
            color: "#000", 
          },
        }}
      />

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="status-label" sx={{ color: "#fff" }}>
          Status
        </InputLabel>
        <Select
          labelId="status-label"
          value={task.status}
          onChange={handleStatusChange}
          label="Status"
          sx={{
            "& .MuiInputBase-root": {
              backgroundColor: "#fff", 
              borderColor: "#fff", 
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#fff", 
            },
            "& .MuiSelect-select": {
              color: "#fff", 
            },
            "& .MuiInputLabel-root": {
              color: "#fff", 
            },
            "& .MuiMenuItem-root": {
              color: "#000", 
            },
          }}
        >
          {statuses.map((status) => (
            <MenuItem key={status.id} value={status.id}>
              {status.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ textAlign: "left" }}>
        <Button
          variant="outlined"
          onClick={handleSave}
          sx={{
            px: 2,
            py: 1,
            fontWeight: "medium",
            backgroundColor: "#e91e63",
            textTransform: "none",
            borderRadius: "6px",
            borderColor: "#e91e63",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#e91e63",
              color: "#ffffff",
            },
          }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default TaskDetails;
