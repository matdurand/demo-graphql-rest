import { RESTDataSource } from "apollo-datasource-rest";

interface IBreed {
  name: string;
}
interface IDog {
  imageUrl: string;
  breedId: string;
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
    breedId,
    limit = 5
  }: {
    breedId: string;
    limit: number;
  }): Promise<IDog[]> {
    if (!breedId) {
      throw new Error("Unable to list dogs without a breed");
    }
    const url = `breed/${breedId}/images`;
    return this.get(url)
      .then((data: IDogsImageResponse) => data.message)
      .then(
        (message: IDogsImageResponse["message"]): IDog[] =>
          message.map((val: string) => ({ breedId, imageUrl: val }))
      )
      .then((arr: IDog[]) => arr.slice(0, limit));
  }

  public async getBreed({ breedId }: { breedId: string }): Promise<IBreed> {
    return {
      name: breedId
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
