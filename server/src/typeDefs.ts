const { gql } = require("apollo-server");
const typeDefs = gql`
  type Query {
    people: [Person]
  }
  type Person {
    name: String
  }
`;
export default typeDefs;
