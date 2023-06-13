import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  background: " #EFE04B",
  borderRadius: " 15px",
  cursor: "pointer",
}));

export const Label = styled("h3")({
  fontWeight: "600",
  fontSize: "18px",
  lineHeight: "22px",
  textAlign: "start",
  padding: "0",
  margin: "0",
  fontFamily: "Poppins",
});

export const CardBody = styled("div")({
  display: "flex",
  alignItems: "start",
  justifyContent: "start",
  flexDirection: "column",
  paddingTop: "12px",
});

export const InfoRow = styled("div")({
  display: "flex",
  alignItems: "center",
});

export const InfoLabel = styled("h4")({
  fontWeight: "400",
  fontSize: "14px",
  lineHeight: "22px",
  marginRight: "8px",
  width: "120px",
  padding: "0",
  margin: "0",
  textAlign: "start",
  fontFamily: "Poppins",
});

export const InfoValue = styled("label")({
  fontWeight: "600",
  fontSize: "14px",
  lineHeight: "22px",
  fontFamily: "Poppins",
});

export const Pagination = styled("div")({
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",
  gap: "16px",
  cursor: "pointer",
});

export const Button = styled("button")({
  border: "none",
  background: "none",
});

export const ActiveBtn = styled("button")({
  background: "#d8d5d5",
  border: "none",
  borderRadius: "50%",
  height: "32px",
  width: "32px",
});
