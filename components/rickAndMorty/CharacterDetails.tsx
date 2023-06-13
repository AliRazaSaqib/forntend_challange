import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";
import NetworkClient from "../network/NetworkClient";
import { CHARACTERS } from "../network";

interface itemId {
  id: number | any;
}

interface Character {
  dimension: string;
  gender: string;
}

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 400,
  margin: "0 auto",
  marginBottom: theme.spacing(2),
}));

const StyledCardMedia = styled(CardMedia)({
  height: 300,
});

const StatusIndicator = styled("span")(({ status }: { status: string }) => ({
  display: "inline-block",
  width: 10,
  height: 10,
  borderRadius: "50%",
  marginRight: 4,
  backgroundColor:
    status === "Dead" ? "#B90000" : status === "Alive" ? "#98CD4D" : "#B8B8B8",
}));

const Footer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const CardList = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginTop: "24px",
  flexWrap: "wrap", // Added flex-wrap property
});

const Image = styled("img")({
  borderRadius: "8px",
});

const CharacterDetails: React.FC<itemId> = ({ id }) => {
  const [character, setCharacter] = useState<any>();

  useEffect(() => {
    NetworkClient.get(`${CHARACTERS}/${id}`)
      .then((response) => setCharacter(response))
      .catch((error) => console.log(error));
  }, [id]);

  if (!character) {
    return <p>Loading...</p>;
  }

  const { name, image, status, species, gender, location } =
    character?.data ?? {};

  const otherCharacters: Character[] = [
    {
      dimension: "Dimension",
      gender: "Male",
    },
    {
      dimension: "Dimension",
      gender: "Female",
    },

    // Add more characters as needed
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={5}>
        <StyledCard>
          <StyledCardMedia height="300" image={image} alt={name} />
          <CardContent>
            <Typography variant="h5" component="div">
              {name}
            </Typography>
            <Footer>
              <Typography variant="body2" color="text.secondary">
                <StatusIndicator status={status} /> {status} - {species}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontStyle: "italic" }}
              >
                Narnian: {gender}
              </Typography>
            </Footer>
            <Typography variant="body2" color="text.secondary">
              {location.name}
            </Typography>
          </CardContent>
        </StyledCard>
      </Grid>
      <Grid item xs={12} md={6}>
        <div>
          <Typography variant="h5">Other Characters</Typography>

          <div>
            {otherCharacters.map((character, index) => (
              <CardList key={index}>
                <Image src={image} alt="Image not found" height={62} />
                <div>
                  <Typography variant="body2">{name}</Typography>
                  <Typography variant="body2">
                    Narnian: {character.dimension}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontStyle: "italic" }}
                  >
                    Narnian: {character.gender}
                  </Typography>
                </div>
              </CardList>
            ))}
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default CharacterDetails;
