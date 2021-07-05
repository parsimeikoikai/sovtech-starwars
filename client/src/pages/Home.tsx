import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";
import Loader from "../components/Loader";

const Main = styled.main`
  padding: 4em;
`;

const Table = styled.table`
  font-family: arial, sans-serif;
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

  if (loading) {
    return <Loader />;
  }
  return (
    <Main>
      <h3>Welcome to Star wars</h3>
      <Table>
        <tbody style={{ fontFamily: "Nunito Sans, sans-serif" }}>
          <Tr>
            <Th>Name</Th>
            <Th>Gender</Th>
            <Th>Mass</Th>
            <Th>Height</Th>
          </Tr>
          {people.results &&
            people.results.map((person, index) => (
              <Tr key={index}>
                <Td>{person.name}</Td>
                <Td>{person.gender}</Td>
                <Td>{person.mass}</Td>
                <Td>{person.height}</Td>
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
