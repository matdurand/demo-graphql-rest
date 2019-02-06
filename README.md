# Apollo Server Example Dog API

An example of using [GraphQL](https://graphql.org/) to wrap a [REST API](https://en.wikipedia.org/wiki/Representational_state_transfer).
An implementation of Apollo Server wrapping the [Dog API ](https://dog.ceo/dog-api/).

## Getting started

Start by cloning the repository locally.
Ensure you have the latest [Node and npm](https://nodejs.org/en/).

Install the required dependencies.

```bash
$ yarn
```

Start the development environment.

```bash
$ yarn start
```

Open the playground in your browser [http://localhost:4000/](http://localhost:4000/)

## Example query

```GraphQL
query breedList($breed: String!) {
  dogs(breed: $breed) {
    breed
    imageUrl
  }
  breed(breed: $breed) {
    name
    dogs {
      breed
      imageUrl
    }
  }
  breeds {
    dogs {
      breed
      imageUrl
    }
  }
}
```

## TypeScript type generation from GraphQL types

TypeScript types are generated automatically from GraphQL types.
Found in **src/generated-schema-types.ts**
To update this file with type changes run

```bash
$ yarn generate-types
```

**Note:** Typically generated types shouldn't be commited to repository. This file is being comitted to aid in references this repository.
