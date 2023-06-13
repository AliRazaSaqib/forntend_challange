import { styled } from "@mui/material/styles";

export const Container = styled("div")({
  maxWidth: "1540px",
  width: "100%",
  margin: "auto",
  position: "relative",
});
export const Wrapper = styled("div")({
  borderBottom: "1px solid rgba(17, 176, 200, 0.11)",
  padding: "12px 38px",
  textAlign: "center",
});
export const Children = styled("div")({
  padding: "34px 38px",
});

export const Image = styled("img")({});
export const ArrowBack = styled("img")({
  position: "absolute",
  left: "0",
  marginTop: "20px",
  marginLeft: "38px",
  cursor: "pointer",
});
