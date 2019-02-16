import { RESTDataSource } from "apollo-datasource-rest";
import { Dog } from "../generated-schema-types";

interface IBreed {
  name: string;
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
      .then((arr: IDog[]) => arr.slice(0, limit));
  }

  public async getBreed({ breed }: { breed: string }): Promise<IBreed> {
    return {
      name: breed
    };
  }

  public async getBreeds({ limit }: { limit: number }): Promise<IBreed[]> {
    const url = `breeds/list/all`;
    return this.get(url)
      .then((data: IBreedListResponse) => Object.keys(data.message))
      .then((names: string[]): IBreed[] => names.map(name => ({ name })))
      .then((arr: IBreed[]) => arr.slice(0, limit));
  }
}
