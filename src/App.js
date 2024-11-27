import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Board from "./components/Board";
import TaskDetails from "./components/TaskDetails";
import { Container, Box, CssBaseline, Typography } from "@mui/material";
import logo from "./peakflo_logo.jpeg";

const App = () => {
  return (
    <Router>
      <DndProvider backend={HTML5Backend}>
        <CssBaseline />
        <Container
          maxWidth="xl"
          sx={{
            background: "#fff",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100vh",
              padding: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center", 
                gap: 0.5, 
                marginBottom: 3,
              }}
            >
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  overflow: "hidden",
                }}
              >
                <img
                  src={logo}
                  alt="Project Board"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", 
                  }}
                />
              </Box>

              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  color: "#333",
                  marginBottom: 0,
                }}
              >
                roject Board
              </Typography>
            </Box>

            <Routes>
              <Route path="/" element={<Board />} />
              <Route path="/task/:taskId" element={<TaskDetails />} />
            </Routes>
          </Box>
        </Container>
      </DndProvider>
    </Router>
  );
};

export default App;
