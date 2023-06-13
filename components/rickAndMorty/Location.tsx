import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import NetworkClient from "../network/NetworkClient";
import { LOCATIONS } from "../network";
import {
  Item,
  Label,
  CardBody,
  InfoRow,
  InfoLabel,
  InfoValue,
  Button,
  Pagination,
  ActiveBtn,
} from "./styles";
import Paginations from "./Paginations";

const Location: React.FC = () => {
  const [locationData, setLocationData] = useState<any>();
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    fetchLocations(currentPage);
  }, [currentPage]);

  const fetchLocations = (page: number) => {
    NetworkClient.get(`${LOCATIONS}?page=${page}`)
      .then((response) => setLocationData(response?.data))
      .catch((error) => console.log(error));
  };

  const { results, info } = locationData ?? {};

  const handleClick = () => {
    router.push(`/characters`);
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
    <Box sx={{ width: "100%", padding: "0 48px" }}>
      <Grid container spacing={4}>
        {results?.map((item: any) => {
          const { id, name, type, dimension, residents } = item;
          const residentsOccurrence = residents?.length || 0;
          return (
            <Grid item xs={12} sm={6} md={4} key={id} onClick={handleClick}>
              <Item>
                <Label>{name}</Label>
                <CardBody>
                  <InfoRow>
                    <InfoLabel>Type</InfoLabel>
                    <InfoValue>:{type}</InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoLabel>Dimension</InfoLabel>
                    <InfoValue>:{dimension}</InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoLabel>Resident Count</InfoLabel>
                    <InfoValue>:{residentsOccurrence}</InfoValue>
                  </InfoRow>
                </CardBody>
              </Item>
            </Grid>
          );
        })}
      </Grid>
      <Paginations
        currentPage={currentPage}
        totalPages={info?.pages}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
        onPageClick={handlePageClick}
      />
    </Box>
  );
};

export default Location;
