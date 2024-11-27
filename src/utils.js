export const loadData = () => {
  const savedData = localStorage.getItem("tasks");
  
  if (savedData) {
    return JSON.parse(savedData); 
  }

  return {
    statuses: [
      { id: "not-started", title: "Not Started", tasks: [] },
      { id: "in-progress", title: "In Progress", tasks: [] },
      { id: "completed", title: "Completed", tasks: [] },
    ],
  };
};

export const saveData = (data) => {
  localStorage.setItem("tasks", JSON.stringify(data));
};