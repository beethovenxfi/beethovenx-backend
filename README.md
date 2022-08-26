# Beethoven X Backend

# Contributions
## Project setup
### Prepare .env file
Rename `env.local` file to `.env`. 

For the sanity content to work, you need to set 
the `SANITY_API_TOKEN`. 

### Generate gql types
There are 2 kinds of graphql types to generate. We have types for interacting with the different subgraphs, and the types 
for our exposed graphql api schema.
Run `yarn generate` to generate all gql types

### Setup database & Prisma
#### Start docker container (or manually set up your database)
First we need to spin up the database, there is a `docker-compose` file with a postgres 
database configured. Spin it up by running `docker-compose up -d`.

#### Apply prisma migrations
Run `yarn prisma migrate dev` to apply all database migrations.

#### Generate prisma client
Run `yarn prisma generate` to generate the prisma client. Usually this is already 
done by applying the migrations

### Run mutations to initialize fill database with intial data 
Trigger the following mutations when you start from a clean DB:

```
poolSyncAllPoolsFromSubgraph
poolReloadStakingForAllPools
userInitWalletBalancesForAllPools
userInitStakedBalances
```

## Contributing
