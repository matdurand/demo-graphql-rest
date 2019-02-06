/* tslint:disable */
export type Maybe<T> = T | null;

// ====================================================
// Types
// ====================================================

export interface Query {
  _empty?: Maybe<string>;

  cats?: Maybe<Cat[]>;

  breed?: Maybe<Breed>;

  breeds?: Maybe<Breed[]>;

  dogs?: Maybe<Dog[]>;
}

export interface Cat {
  imageUrl: string;
}

export interface Breed {
  name: string;

  dogs?: Maybe<Dog[]>;
}

export interface Dog {
  breed?: Maybe<Breed>;

  imageUrl: string;
}

export interface Mutation {
  _empty?: Maybe<string>;
}

// ====================================================
// Arguments
// ====================================================

export interface BreedQueryArgs {
  breed: string;
}
export interface BreedsQueryArgs {
  limit?: Maybe<number>;
}
export interface DogsQueryArgs {
  breed: string;

  limit?: Maybe<number>;
}
export interface DogsBreedArgs {
  limit?: Maybe<number>;
}

import { GraphQLResolveInfo } from "graphql";

import { IDog } from "./dog/data-source";

import { IContext } from "./context";

export type Resolver<Result, Parent = {}, Context = {}, Args = {}> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export interface ISubscriptionResolverObject<Result, Parent, Context, Args> {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
}

export type SubscriptionResolver<
  Result,
  Parent = {},
  Context = {},
  Args = {}
> =
  | ((
      ...args: any[]
    ) => ISubscriptionResolverObject<Result, Parent, Context, Args>)
  | ISubscriptionResolverObject<Result, Parent, Context, Args>;

export type TypeResolveFn<Types, Parent = {}, Context = {}> = (
  parent: Parent,
  context: Context,
  info: GraphQLResolveInfo
) => Maybe<Types>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult, TArgs = {}, TContext = {}> = (
  next: NextResolverFn<TResult>,
  source: any,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export namespace QueryResolvers {
  export interface Resolvers<Context = IContext, TypeParent = {}> {
    _empty?: _EmptyResolver<Maybe<string>, TypeParent, Context>;

    cats?: CatsResolver<Maybe<Cat[]>, TypeParent, Context>;

    breed?: BreedResolver<Maybe<Breed>, TypeParent, Context>;

    breeds?: BreedsResolver<Maybe<Breed[]>, TypeParent, Context>;

    dogs?: DogsResolver<Maybe<IDog[]>, TypeParent, Context>;
  }

  export type _EmptyResolver<
    R = Maybe<string>,
    Parent = {},
    Context = IContext
  > = Resolver<R, Parent, Context>;
  export type CatsResolver<
    R = Maybe<Cat[]>,
    Parent = {},
    Context = IContext
  > = Resolver<R, Parent, Context>;
  export type BreedResolver<
    R = Maybe<Breed>,
    Parent = {},
    Context = IContext
  > = Resolver<R, Parent, Context, BreedArgs>;
  export interface BreedArgs {
    breed: string;
  }

  export type BreedsResolver<
    R = Maybe<Breed[]>,
    Parent = {},
    Context = IContext
  > = Resolver<R, Parent, Context, BreedsArgs>;
  export interface BreedsArgs {
    limit?: Maybe<number>;
  }

  export type DogsResolver<
    R = Maybe<IDog[]>,
    Parent = {},
    Context = IContext
  > = Resolver<R, Parent, Context, DogsArgs>;
  export interface DogsArgs {
    breed: string;

    limit?: Maybe<number>;
  }
}

export namespace CatResolvers {
  export interface Resolvers<Context = IContext, TypeParent = Cat> {
    imageUrl?: ImageUrlResolver<string, TypeParent, Context>;
  }

  export type ImageUrlResolver<
    R = string,
    Parent = Cat,
    Context = IContext
  > = Resolver<R, Parent, Context>;
}

export namespace BreedResolvers {
  export interface Resolvers<Context = IContext, TypeParent = Breed> {
    name?: NameResolver<string, TypeParent, Context>;

    dogs?: DogsResolver<Maybe<IDog[]>, TypeParent, Context>;
  }

  export type NameResolver<
    R = string,
    Parent = Breed,
    Context = IContext
  > = Resolver<R, Parent, Context>;
  export type DogsResolver<
    R = Maybe<IDog[]>,
    Parent = Breed,
    Context = IContext
  > = Resolver<R, Parent, Context, DogsArgs>;
  export interface DogsArgs {
    limit?: Maybe<number>;
  }
}

export namespace DogResolvers {
  export interface Resolvers<Context = IContext, TypeParent = IDog> {
    breed?: BreedResolver<Maybe<Breed>, TypeParent, Context>;

    imageUrl?: ImageUrlResolver<string, TypeParent, Context>;
  }

  export type BreedResolver<
    R = Maybe<Breed>,
    Parent = IDog,
    Context = IContext
  > = Resolver<R, Parent, Context>;
  export type ImageUrlResolver<
    R = string,
    Parent = IDog,
    Context = IContext
  > = Resolver<R, Parent, Context>;
}

export namespace MutationResolvers {
  export interface Resolvers<Context = IContext, TypeParent = {}> {
    _empty?: _EmptyResolver<Maybe<string>, TypeParent, Context>;
  }

  export type _EmptyResolver<
    R = Maybe<string>,
    Parent = {},
    Context = IContext
  > = Resolver<R, Parent, Context>;
}

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  IContext
>;
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean;
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  IContext
>;
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean;
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  IContext
>;
export interface DeprecatedDirectiveArgs {
  /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
  reason?: string;
}

export interface IResolvers<Context = IContext> {
  Query?: QueryResolvers.Resolvers<Context>;
  Cat?: CatResolvers.Resolvers<Context>;
  Breed?: BreedResolvers.Resolvers<Context>;
  Dog?: DogResolvers.Resolvers<Context>;
  Mutation?: MutationResolvers.Resolvers<Context>;
}

export interface IDirectiveResolvers<Result> {
  skip?: SkipDirectiveResolver<Result>;
  include?: IncludeDirectiveResolver<Result>;
  deprecated?: DeprecatedDirectiveResolver<Result>;
}
