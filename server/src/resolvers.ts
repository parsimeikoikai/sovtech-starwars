const people = [
  {
    name: "John Doe",
  },
  {
    name: "Paul Auster",
  },
];
const resolvers = {
  Query: {
    people: () => people,
  },
};
export default resolvers;
