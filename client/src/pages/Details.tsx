import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";
import Loader from "../components/Loader";
import { FaChevronLeft, FaUser } from "react-icons/fa";
import { useHistory, useParams } from "react-router-dom";

const Main = styled.main`
  padding: 4em;
`;

const Header = styled.div`
  display: flex;
`;

const Section = styled.section`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 100px;
  flex-direction: column;
`;

const Card = styled.div`
  width: 400px;
  margin: 0px auto;
  border: 1px solid #f5f4f4;
  border-radius: 5px;
  padding: 10px;
  margin-top: 20px;
`;
const Item = styled.span`
  color: #6564a6;
`;

const GET_PERSON = gql`
  query ($name: String) {
    person(name: $name) {
      name
      gender
      mass
      height
    }
  }
`;

const Details = () => {
  const history = useHistory();
  const { name } = useParams();
  const { data, loading, error } = useQuery(GET_PERSON, {
    variables: { name },
  });

  const [person, setPerson] = useState({});

  useEffect(() => {
    if (data) {
      setPerson(data.person);
    }
  }, [data]);

  if (loading) {
    return <Loader />;
  }
  return (
    <Main>
      <Header>
        <FaChevronLeft
          style={{
            marginTop: "2px",
            marginRight: "10px",
            cursor: "pointer",
            color: "#6464a7",
          }}
          onClick={() => {
            history.push("/");
          }}
        />
        <span>Details</span>
      </Header>
      <Section>
        <FaUser style={{ color: "#969495" }} size="2em" />
        {person && (
          <div style={{ marginTop: "20px" }}>
            <span>{person.name}</span>
          </div>
        )}
      </Section>
      <Card>
        <h5>Gender</h5>
        <Item>{person.gender}</Item>
        <h5>Height</h5>
        <Item>{person.height}</Item>
        <h5>Mass</h5>
        <Item>{person.mass}</Item>
      </Card>
    </Main>
  );
};

export default Details;
