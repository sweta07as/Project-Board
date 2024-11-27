import React, { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import TaskCard from "./TaskCard";
import { Box, Button, Typography, Paper } from "@mui/material";
import { loadData, saveData } from "../utils";

const Board = () => {
  const [data, setData] = useState(loadData);

  useEffect(() => {
    saveData(data);
  }, [data]);

  const moveTask = (taskId, fromColumnId, toColumnId) => {
    const sourceColumn = data.statuses.find((col) => col.id === fromColumnId);
    const destColumn = data.statuses.find((col) => col.id === toColumnId);

    const taskIndex = sourceColumn.tasks.findIndex(
      (task) => task.id === taskId
    );
    const [movedTask] = sourceColumn.tasks.splice(taskIndex, 1);
    destColumn.tasks.push(movedTask);

    setData({ ...data });
    localStorage.setItem("tasks", JSON.stringify(data));
  };

  const addNewTask = (columnId) => {
    const newTask = {
      id: `task-${Date.now()}`,
      title: `New Task`,
      description: "",
      status: columnId,
    };

    const newStatuses = data.statuses.map((status) =>
      status.id === columnId
        ? { ...status, tasks: [...status.tasks, newTask] }
        : status
    );

    setData({ statuses: newStatuses });
  };

  const addNewStatus = (statusTitle) => {
    const newStatus = {
      id: `status-${Date.now()}`,
      title: statusTitle,
      tasks: [],
    };

    setData((prevData) => ({
      statuses: [...prevData.statuses, newStatus],
    }));
  };

  return (
    <Box
      display="flex"
      gap={3}
      sx={{ padding: 3, backgroundColor: "#fff", minHeight: "100vh" }}
    >
      {data.statuses.map((column) => (
        <Column
          key={column.id}
          column={column}
          moveTask={moveTask}
          addNewTask={addNewTask}
        />
      ))}
      <Button
        onClick={() => addNewStatus(prompt("Enter new status title"))}
        variant="contained"
        sx={{
          alignSelf: "flex-start",
          textTransform: "capitalize", 
          backgroundColor: "#e91e63",
          "&:hover": {
            backgroundColor: "#3F97FF",
          },
        }}
      >
        + Add Status
      </Button>
    </Box>
  );
};

const Column = ({ column, moveTask, addNewTask }) => {
  const [, drop] = useDrop({
    accept: "task",
    drop: (item) => {
      moveTask(item.id, item.columnId, column.id);
    },
  });

  const getRandomColor = () => {
    const colors = [
      "#ACDDDE",
      "#CAF1DE",
      "#E1F8DC",
      "#FEF8DD",
      "#FFE7C7",
      "#F7D8BA",
      "#FFCDD2",
      "#FFECB3",
      "#FCE4EC",
      "#F3E5F5",
      "#EDE7F6",
    ];

    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <Paper
      ref={drop}
      elevation={3}
      sx={{
        width: 300,
        padding: 2,
        borderRadius: 2,
        backgroundColor: "#fff",
        transition: "box-shadow 0.2s",
        "&:hover": {
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Typography
        variant="h8"
        sx={{
          display: "inline-block",
          fontWeight: "medium",
          padding: 1,
          borderRadius: 1,
          marginBottom: 2,
          backgroundColor: getRandomColor(),
          color: "#555",
        }}
      >
        {column.title}
      </Typography>
      <Typography variant="body2" sx={{ color: "#333", marginBottom: 2 }}>
        {column.tasks.length} tasks
      </Typography>
      <Box>
        {column.tasks.map((task, index) => (
          <Task
            key={task.id}
            task={task}
            index={index}
            columnId={column.id}
            moveTask={moveTask}
          />
        ))}
      </Box>
      <Button
        onClick={() => addNewTask(column.id)}
        variant="outlined"
        sx={{
          marginTop: 2,
          padding: 0.5,
          borderColor: "#e91e63",
          textTransform: "capitalize",
          color: "#e91e63",
          "&:hover": {
            backgroundColor: "#e91e63",
            color: "#ffffff",
          },
        }}
      >
        + New
      </Button>
    </Paper>
  );
};

const Task = ({ task, index, columnId, moveTask }) => {
  const [, drag] = useDrag({
    type: "task",
    item: { id: task.id, columnId },
  });

  return (
    <Box
      ref={drag}
      sx={{
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        cursor: "grab",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "scale(1.01)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <TaskCard task={task} />
    </Box>
  );
};

export default Board;
