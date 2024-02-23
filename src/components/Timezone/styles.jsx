const boxStyles = {
  border: "1px solid #eaeaea",
  padding: 4,
  margin: "10px 0",
  position: "relative",
  transition: "0.3s ease-in-out",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  ":hover": {
    border: "1px solid skyblue",
  },
  ":hover .erase-timezone": {
    visibility: "visible",
    opacity: 1,
  },
};

const closeButtonStyles = {
  position: "absolute",
  top: 0,
  right: 0,
  opacity: 0,
  visibility: "hidden",
  ":hover": { color: "red", background: "white" },
  transition: "0.3s ease-in-out",
};

const dragIndicatorStyles = {
  position: "absolute",
  top: 35,
  left: 0,
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  marginRight: "12px",
  color: "#ccc",
};

const spaceBetweenJustifiedBox = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const centeredBox = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const urlStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  mt: 2,
};

export {
  boxStyles,
  closeButtonStyles,
  dragIndicatorStyles,
  spaceBetweenJustifiedBox,
  centeredBox,
  urlStyles,
};
