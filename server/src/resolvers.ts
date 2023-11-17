const resolvers = {
  Query: {
    people: async (_: any, { pageUrl }: any, { dataSources }: any) => {
      return dataSources.starWarsAPI.getAllPeople(pageUrl);
    },
    person: async (_: any, { name }: any, { dataSources }: any) => {
      return dataSources.starWarsAPI.getPersonByName(name);
    },
  },
};
export default resolvers;
