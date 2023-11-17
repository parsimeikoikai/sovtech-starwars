import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";
import Loader from "../components/Loader";

const Title = styled.h1`
  font-size: 2.5em;
  text-align: center;
  color: palevioletred;
`;
const Main = styled.main`
  padding: 4em;
  background: snow;
  font-family: "museo", Helvetica Neue, Helvetica, sans-serif;
`;

const Table = styled.table`
  border: 1px solid black;
  border-collapse: collapse;
  width: 100%;
`;
const Td = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  font-weight: 500;
`;

const Th = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;

const Tr = styled.tr`
  cursor: pointer;
  &:nth-child(even) {
    background-color: #dddddd;
  }
  font-family: "museo", Helvetica Neue, Helvetica, sans-serif;
  font-weight : 100;
`;
const TFooter = styled.div`
  display: flex;
  margin-top: 10px;
`;
const Button = styled.button`
  height: 40px;
  color: #6464a7;
  border: 1px solid;
  cursor: pointer;
  &:focus {
    outline: 0;
  }
`;
const Span = styled.span`
background: #6464a7;
    padding: 9px;
    color: #fff;
}`;

const GET_ALL_PEOPLE = gql`
  query ($pageUrl: String) {
    people(pageUrl: $pageUrl) {
      count
      next
      previous
      results {
        name
        gender
        mass
        height
      }
    }
  }
`;

const Home = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_ALL_PEOPLE);
  const [people, setPeople] = useState({});
  const history = useHistory();

  useEffect(() => {
    if (data) {
      setPeople(data.people);
    }
  }, [data]);

  const getCurrentPage = () => {
    if (people && people.previous) {
      // parse next page
      const url = new URL(people.previous);
      // get current page
      const page = parseInt(url.searchParams.get("page")) + 1;
      return page;
    }

    return 1;
  };

  const fetchExtra = (pageUrl) => {
    fetchMore({
      variables: {
        pageUrl,
      },
      updateQuery: (prev, { fetchMoreResult, ...rest }) => {
        if (!fetchMoreResult) return prev;
        return fetchMoreResult;
      },
    });
  };
  const redirectToDetails = (name) => {
    // redirect details page
    history.push(`/individual/${name}`);
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <Main>
   
      <Title>
      Star Wars People List
    </Title>
    <h3>(Click on name to view more details)</h3>
      <hr/>
      <Table>
        <tbody >
          <Tr>
            <Th>Name</Th>
            <Th>Height</Th>
            <Th>Gender</Th>
            <Th>Mass</Th>
            
          </Tr>
          {people.results &&
            people.results.map((person, index) => (
              <Tr key={index} onClick={() => redirectToDetails(person.name)}>
                <Td><b>{person.name}</b></Td>
                <Td>{person.height}</Td>
                <Td>{person.gender}</Td>
                <Td>{person.mass}</Td>
              </Tr>
            ))}
        </tbody>
      </Table>
      <TFooter>
        <div style={{ marginLeft: "auto" }}>
          <Button
            onClick={() => fetchExtra(data.people.previous)}
            style={{ borderRight: "none" }}
          >
            Previous
          </Button>
          <Span>{getCurrentPage()}</Span>
          <Button
            onClick={() => fetchExtra(data.people.next)}
            style={{ borderLeft: "none" }}
          >
            Next
          </Button>
        </div>
      </TFooter>
    </Main>
  );
};

export default Home;
