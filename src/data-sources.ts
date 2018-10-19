import DogAPI from "./dog/data-source";

export interface IDataSources {
  dogApi: DogAPI;
}

export default function getDataSources(): any {
  return {
    dogApi: new DogAPI()
  };
}
