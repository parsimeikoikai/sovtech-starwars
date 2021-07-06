import { RESTDataSource } from "apollo-datasource-rest";

class StarWarsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://swapi.dev/api";
  }
  // get all people
  async getAllPeople(pageUrl: string) {
    let page = 1;

    if (pageUrl) {
      // parse url
      const url = new URL(pageUrl);
      // get page number
      page = parseInt(url.searchParams.get("page")!);
    }

    const data = await this.get(`/people/?page=${page}`);
    return data;
  }
  async getPersonByName(name: String) {
    const data = await this.get(`/people/?search=${name}`);
    if (!data.results.length) {
      return {};
    }
    const person = data.results[0];
    return {
      name: person.name,
      height: person.height,
      mass: person.mass,
      gender: person.gender,
      homeworld: person.homeworld,
    };
  }
}
export default StarWarsAPI;
