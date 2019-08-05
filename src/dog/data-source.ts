import { RESTDataSource } from "apollo-datasource-rest";
import { Dog } from "../generated-schema-types";

interface IBreed {
  name: string;
  howManyDogs: string;
}
export interface IDog extends Dog {
  breedName: string;
}

interface IDogsImageResponse {
  message: string[];
}

interface IBreedListResponse {
  message: {
    name: string;
  };
}

export default class DogAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://dog.ceo/api/";
  }

  public async getDogsCountByBreed({
    breed
  }: {
    breed: string;
  }): Promise<string> {
    const dogs = await this.getDogsByBreed({ breed, limit: -1 });
    return dogs.length + "";
  }

  public async getDogsByBreed({
    breed,
    limit = 5
  }: {
    breed: string;
    limit: number;
  }): Promise<IDog[]> {
    if (!breed) {
      throw new Error("Unable to list dogs without a breed");
    }
    const url = `breed/${breed}/images`;
    return this.get(url)
      .then((data: IDogsImageResponse) => data.message)
      .then(
        (message: IDogsImageResponse["message"]): IDog[] =>
          message.map((val: string) => ({ breedName: breed, imageUrl: val }))
      )
      .then((arr: IDog[]) => (limit !== -1 ? arr.slice(0, limit) : arr));
  }

  public async getBreed({ breed }: { breed: string }): Promise<IBreed> {
    const howManyDogs = await this.getDogsCountByBreed({ breed });
    return {
      name: breed,
      howManyDogs
    };
  }

  public async getBreeds({ limit }: { limit: number }): Promise<IBreed[]> {
    const url = `breeds/list/all`;
    const names = await this.get(url)
      .then((data: IBreedListResponse) => Object.keys(data.message))
      .then(names => (limit !== -1 ? names.slice(0, limit) : names));
    return await Promise.all(
      names.map(async name => {
        const count = await this.getDogsCountByBreed({ breed: name });
        return { name, howManyDogs: count };
      })
    );
  }
}
