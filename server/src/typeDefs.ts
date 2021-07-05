const { gql } = require("apollo-server");
const typeDefs = gql`
  type Query {
    people(pageUrl: String = ""): People!
    person(name: String): Person!
  }
  type People {
    count: Int
    next: String
    previous: String
    results: [Person]
  }
  type Person {
    name: String
    height: String
    mass: String
    gender: String
    homeworld: String
  }
`;
export default typeDefs;
