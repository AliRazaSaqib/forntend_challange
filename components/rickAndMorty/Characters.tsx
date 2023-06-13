import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";
import NetworkClient from "../network/NetworkClient";
import { CHARACTERS } from "../network";
import { useRouter } from "next/router";
import Paginations from "./Paginations";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 330,
  margin: "0 auto",
  marginBottom: theme.spacing(2),
  cursor: "pointer",
}));

const StyledCardMedia = styled(CardMedia)({
  height: 330,
});

interface StatusIndicatorProps {
  status: string;
}

const StatusIndicator = styled("span")<StatusIndicatorProps>(({ status }) => ({
  display: "inline-block",
  width: 10,
  height: 10,
  borderRadius: "50%",
  marginRight: 4,
  backgroundColor:
    status === "Dead" ? "#B90000" : status === "Alive" ? "#98CD4D" : "#B8B8B8",
}));

const ButtonGroup = styled("div")({
  display: "flex",
  gap: "12px",
  marginTop: "12px",
});

const FilterButton = styled("button")(({ status }: { status: string }) => ({
  width: 120,
  height: 40,
  borderRadius: 50,
  fontFamily: "Poppins",
  outline: "none",
  cursor: "pointer",
  marginRight: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "initial",
  gap: "4px",
  border: `1px solid ${
    status === "Dead" ? "#B90000" : status === "Alive" ? "#98CD4D" : "#B8B8B8"
  }`,
  backgroundColor:
    status === "Dead"
      ? "rgba(185, 0, 0, 0.05)"
      : status === "Alive"
      ? "rgba(152, 205, 77, 0.05);"
      : "rgba(184, 184, 184, 0.05);",
  color: "black",
}));

const Characters: React.FC = () => {
  const router = useRouter();
  const [characterData, setCharacterData] = useState<any>();
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchCharacters(currentPage);
  }, [currentPage]);

  const fetchCharacters = (page: number) => {
    NetworkClient.get(`${CHARACTERS}?page=${page}`)
      .then((response) => setCharacterData(response))
      .catch((error) => console.log(error));
  };

  const { results, info } = characterData?.data ?? {};

  const handleFilterClick = (filter: string) => {
    setSelectedFilter((prevFilter) => (prevFilter === filter ? null : filter));
  };

  const filteredResults = selectedFilter
    ? results?.filter((character: any) => character.status === selectedFilter)
    : results;

  const handleClick = (id: number) => {
    router.push(`/character/${id}`);
  };

  const handleNextPage = () => {
    if (info?.next) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (info?.prev) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <ButtonGroup style={{ marginBottom: 16 }}>
        <FilterButton onClick={() => handleFilterClick("Alive")} status="Alive">
          <StatusIndicator status="Alive" /> Live
        </FilterButton>
        <FilterButton onClick={() => handleFilterClick("Dead")} status="Dead">
          <StatusIndicator status="Dead" /> Dead
        </FilterButton>
        <FilterButton
          onClick={() => handleFilterClick("unknown")}
          status="unknown"
        >
          <StatusIndicator status="unknown" /> Unknown
        </FilterButton>
      </ButtonGroup>
      <Grid container spacing={2}>
        {characterData ? (
          filteredResults?.map((character: any) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={character.id}
              onClick={() => handleClick(character.id)}
            >
              <StyledCard>
                <StyledCardMedia
                  height="330"
                  image={character.image}
                  alt={character.name}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    className="character_name"
                  >
                    {character.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <StatusIndicator status={character.status} />{" "}
                    {character.status} - {character.species}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </Grid>

      <Paginations
        currentPage={currentPage}
        totalPages={info?.pages}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
        onPageClick={handlePageClick}
      />
    </div>
  );
};

export default Characters;
