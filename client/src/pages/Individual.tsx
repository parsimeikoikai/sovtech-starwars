import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";
import Loader from "../components/Loader";
import { FaAngleDoubleLeft, FaUserCircle } from "react-icons/fa";

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
  width: 800px;
  margin: 48px auto 0;
  border: 1px solid #f5f4f4;
  margin-top: 20px;
  overflow: hidden;
  padding: 0 0 32px;
  font-family: Quicksand, arial, sans-serif;
  box-shadow: 0 0 20px rgba(0, 0, 0, .05), 0 0px 40px rgba(0, 0, 0, .08);
  border-radius: 5px;
  border: 1px solid #7a49a5;
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

const Individual = () => {
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
        
        <FaAngleDoubleLeft
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
        <span><b>Go Back</b></span>
      </Header>
      <Section>
        <FaUserCircle style={{ color: "#969495" }} size="7em" />
        {person && (
          <div style={{ marginTop: "20px",fontStyle: 'italic',fontWeight: 'bold' }}>
            <span>{person.name}</span>
          </div>
        )}
      </Section>
      <Card>
          <div  style={{
            marginLeft:"10px"
            
          }}>
          <h5>Gender</h5>
        <Item>{person.gender}</Item>
        <hr/>
        <h5>Height</h5>
        <Item>{person.height}</Item>
        <hr/>
        <h5>Mass</h5>
        <Item>{person.mass}</Item>
          </div>

        

      </Card>
    </Main>
  );
};

export default Individual;
