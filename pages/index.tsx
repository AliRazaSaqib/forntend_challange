import { styled } from "@mui/material";
import Location from "../components/rickAndMorty/Location";

export default function Home() {
  const Wrapper = styled("div")({
    marginTop: "34px",
  });
  return (
    <Wrapper>
      <Location />
    </Wrapper>
  );
}
