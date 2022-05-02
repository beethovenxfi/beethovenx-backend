// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BeetsBarSubgraph_BigDecimal: any;
  BigInt: any;
  BeetsBarSubgraph_Bytes: any;
  MasterchefSubgraph_BigDecimal: any;
  MasterchefSubgraph_Bytes: any;
  BlocksSubgraph_BigDecimal: any;
  BlocksSubgraph_Bytes: any;
  BalancerSubgraph_BigDecimal: any;
  BalancerSubgraph_Bytes: any;
};

export type Query = {
  BeetsBarSubgraph_bar?: Maybe<BeetsBarSubgraph_Bar>;
  BeetsBarSubgraph_bars: Array<BeetsBarSubgraph_Bar>;
  BeetsBarSubgraph_user?: Maybe<BeetsBarSubgraph_User>;
  BeetsBarSubgraph_users: Array<BeetsBarSubgraph_User>;
  /** Access to subgraph metadata */
  BeetsBarSubgraph__meta?: Maybe<BeetsBarSubgraph__Meta_>;
  MasterchefSubgraph_masterChef?: Maybe<MasterchefSubgraph_MasterChef>;
  MasterchefSubgraph_masterChefs: Array<MasterchefSubgraph_MasterChef>;
  MasterchefSubgraph_pool?: Maybe<MasterchefSubgraph_Pool>;
  MasterchefSubgraph_pools: Array<MasterchefSubgraph_Pool>;
  MasterchefSubgraph_rewardToken?: Maybe<MasterchefSubgraph_RewardToken>;
  MasterchefSubgraph_rewardTokens: Array<MasterchefSubgraph_RewardToken>;
  MasterchefSubgraph_rewarder?: Maybe<MasterchefSubgraph_Rewarder>;
  MasterchefSubgraph_rewarders: Array<MasterchefSubgraph_Rewarder>;
  MasterchefSubgraph_harvestAction?: Maybe<MasterchefSubgraph_HarvestAction>;
  MasterchefSubgraph_harvestActions: Array<MasterchefSubgraph_HarvestAction>;
  MasterchefSubgraph_user?: Maybe<MasterchefSubgraph_User>;
  MasterchefSubgraph_users: Array<MasterchefSubgraph_User>;
  /** Access to subgraph metadata */
  MasterchefSubgraph__meta?: Maybe<MasterchefSubgraph__Meta_>;
  BlocksSubgraph_block?: Maybe<BlocksSubgraph_Block>;
  BlocksSubgraph_blocks: Array<BlocksSubgraph_Block>;
  /** Access to subgraph metadata */
  BlocksSubgraph__meta?: Maybe<BlocksSubgraph__Meta_>;
  BalancerSubgraph_balancer?: Maybe<BalancerSubgraph_Balancer>;
  BalancerSubgraph_balancers: Array<BalancerSubgraph_Balancer>;
  BalancerSubgraph_pool?: Maybe<BalancerSubgraph_Pool>;
  BalancerSubgraph_pools: Array<BalancerSubgraph_Pool>;
  BalancerSubgraph_poolToken?: Maybe<BalancerSubgraph_PoolToken>;
  BalancerSubgraph_poolTokens: Array<BalancerSubgraph_PoolToken>;
  BalancerSubgraph_priceRateProvider?: Maybe<BalancerSubgraph_PriceRateProvider>;
  BalancerSubgraph_priceRateProviders: Array<BalancerSubgraph_PriceRateProvider>;
  BalancerSubgraph_poolShare?: Maybe<BalancerSubgraph_PoolShare>;
  BalancerSubgraph_poolShares: Array<BalancerSubgraph_PoolShare>;
  BalancerSubgraph_user?: Maybe<BalancerSubgraph_User>;
  BalancerSubgraph_users: Array<BalancerSubgraph_User>;
  BalancerSubgraph_userInternalBalance?: Maybe<BalancerSubgraph_UserInternalBalance>;
  BalancerSubgraph_userInternalBalances: Array<BalancerSubgraph_UserInternalBalance>;
  BalancerSubgraph_gradualWeightUpdate?: Maybe<BalancerSubgraph_GradualWeightUpdate>;
  BalancerSubgraph_gradualWeightUpdates: Array<BalancerSubgraph_GradualWeightUpdate>;
  BalancerSubgraph_ampUpdate?: Maybe<BalancerSubgraph_AmpUpdate>;
  BalancerSubgraph_ampUpdates: Array<BalancerSubgraph_AmpUpdate>;
  BalancerSubgraph_swap?: Maybe<BalancerSubgraph_Swap>;
  BalancerSubgraph_swaps: Array<BalancerSubgraph_Swap>;
  BalancerSubgraph_joinExit?: Maybe<BalancerSubgraph_JoinExit>;
  BalancerSubgraph_joinExits: Array<BalancerSubgraph_JoinExit>;
  BalancerSubgraph_latestPrice?: Maybe<BalancerSubgraph_LatestPrice>;
  BalancerSubgraph_latestPrices: Array<BalancerSubgraph_LatestPrice>;
  BalancerSubgraph_poolHistoricalLiquidity?: Maybe<BalancerSubgraph_PoolHistoricalLiquidity>;
  BalancerSubgraph_poolHistoricalLiquidities: Array<BalancerSubgraph_PoolHistoricalLiquidity>;
  BalancerSubgraph_tokenPrice?: Maybe<BalancerSubgraph_TokenPrice>;
  BalancerSubgraph_tokenPrices: Array<BalancerSubgraph_TokenPrice>;
  BalancerSubgraph_investment?: Maybe<BalancerSubgraph_Investment>;
  BalancerSubgraph_investments: Array<BalancerSubgraph_Investment>;
  BalancerSubgraph_poolSnapshot?: Maybe<BalancerSubgraph_PoolSnapshot>;
  BalancerSubgraph_poolSnapshots: Array<BalancerSubgraph_PoolSnapshot>;
  BalancerSubgraph_token?: Maybe<BalancerSubgraph_Token>;
  BalancerSubgraph_tokens: Array<BalancerSubgraph_Token>;
  BalancerSubgraph_tokenSnapshot?: Maybe<BalancerSubgraph_TokenSnapshot>;
  BalancerSubgraph_tokenSnapshots: Array<BalancerSubgraph_TokenSnapshot>;
  BalancerSubgraph_tradePair?: Maybe<BalancerSubgraph_TradePair>;
  BalancerSubgraph_tradePairs: Array<BalancerSubgraph_TradePair>;
  BalancerSubgraph_tradePairSnapshot?: Maybe<BalancerSubgraph_TradePairSnapshot>;
  BalancerSubgraph_tradePairSnapshots: Array<BalancerSubgraph_TradePairSnapshot>;
  BalancerSubgraph_balancerSnapshot?: Maybe<BalancerSubgraph_BalancerSnapshot>;
  BalancerSubgraph_balancerSnapshots: Array<BalancerSubgraph_BalancerSnapshot>;
  /** Access to subgraph metadata */
  BalancerSubgraph__meta?: Maybe<BalancerSubgraph__Meta_>;
};


export type QueryBeetsBarSubgraph_barArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BeetsBarSubgraph_Block_height>;
};


export type QueryBeetsBarSubgraph_barsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BeetsBarSubgraph_Bar_orderBy>;
  orderDirection?: InputMaybe<BeetsBarSubgraph_OrderDirection>;
  where?: InputMaybe<BeetsBarSubgraph_Bar_filter>;
  block?: InputMaybe<BeetsBarSubgraph_Block_height>;
};


export type QueryBeetsBarSubgraph_userArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BeetsBarSubgraph_Block_height>;
};


export type QueryBeetsBarSubgraph_usersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BeetsBarSubgraph_User_orderBy>;
  orderDirection?: InputMaybe<BeetsBarSubgraph_OrderDirection>;
  where?: InputMaybe<BeetsBarSubgraph_User_filter>;
  block?: InputMaybe<BeetsBarSubgraph_Block_height>;
};


export type QueryBeetsBarSubgraph__metaArgs = {
  block?: InputMaybe<BeetsBarSubgraph_Block_height>;
};


export type QueryMasterchefSubgraph_masterChefArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type QueryMasterchefSubgraph_masterChefsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MasterchefSubgraph_MasterChef_orderBy>;
  orderDirection?: InputMaybe<MasterchefSubgraph_OrderDirection>;
  where?: InputMaybe<MasterchefSubgraph_MasterChef_filter>;
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type QueryMasterchefSubgraph_poolArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type QueryMasterchefSubgraph_poolsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MasterchefSubgraph_Pool_orderBy>;
  orderDirection?: InputMaybe<MasterchefSubgraph_OrderDirection>;
  where?: InputMaybe<MasterchefSubgraph_Pool_filter>;
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type QueryMasterchefSubgraph_rewardTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type QueryMasterchefSubgraph_rewardTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MasterchefSubgraph_RewardToken_orderBy>;
  orderDirection?: InputMaybe<MasterchefSubgraph_OrderDirection>;
  where?: InputMaybe<MasterchefSubgraph_RewardToken_filter>;
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type QueryMasterchefSubgraph_rewarderArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type QueryMasterchefSubgraph_rewardersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MasterchefSubgraph_Rewarder_orderBy>;
  orderDirection?: InputMaybe<MasterchefSubgraph_OrderDirection>;
  where?: InputMaybe<MasterchefSubgraph_Rewarder_filter>;
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type QueryMasterchefSubgraph_harvestActionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type QueryMasterchefSubgraph_harvestActionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MasterchefSubgraph_HarvestAction_orderBy>;
  orderDirection?: InputMaybe<MasterchefSubgraph_OrderDirection>;
  where?: InputMaybe<MasterchefSubgraph_HarvestAction_filter>;
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type QueryMasterchefSubgraph_userArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type QueryMasterchefSubgraph_usersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MasterchefSubgraph_User_orderBy>;
  orderDirection?: InputMaybe<MasterchefSubgraph_OrderDirection>;
  where?: InputMaybe<MasterchefSubgraph_User_filter>;
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type QueryMasterchefSubgraph__metaArgs = {
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type QueryBlocksSubgraph_blockArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BlocksSubgraph_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryBlocksSubgraph_blocksArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BlocksSubgraph_Block_orderBy>;
  orderDirection?: InputMaybe<BlocksSubgraph_OrderDirection>;
  where?: InputMaybe<BlocksSubgraph_Block_filter>;
  block?: InputMaybe<BlocksSubgraph_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryBlocksSubgraph__metaArgs = {
  block?: InputMaybe<BlocksSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_balancerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_balancersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_Balancer_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_Balancer_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_poolArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_poolsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_Pool_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_Pool_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_poolTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_poolTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_PoolToken_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_PoolToken_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_priceRateProviderArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_priceRateProvidersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_PriceRateProvider_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_PriceRateProvider_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_poolShareArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_poolSharesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_PoolShare_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_PoolShare_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_userArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_usersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_User_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_User_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_userInternalBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_userInternalBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_UserInternalBalance_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_UserInternalBalance_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_gradualWeightUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_gradualWeightUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_GradualWeightUpdate_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_GradualWeightUpdate_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_ampUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_ampUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_AmpUpdate_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_AmpUpdate_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_swapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_swapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_Swap_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_Swap_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_joinExitArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_joinExitsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_JoinExit_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_JoinExit_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_latestPriceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_latestPricesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_LatestPrice_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_LatestPrice_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_poolHistoricalLiquidityArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_poolHistoricalLiquiditiesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_PoolHistoricalLiquidity_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_PoolHistoricalLiquidity_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_tokenPriceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_tokenPricesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_TokenPrice_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_TokenPrice_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_investmentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_investmentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_Investment_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_Investment_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_poolSnapshotArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_poolSnapshotsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_PoolSnapshot_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_PoolSnapshot_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_tokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_tokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_Token_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_Token_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_tokenSnapshotArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_tokenSnapshotsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_TokenSnapshot_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_TokenSnapshot_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_tradePairArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_tradePairsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_TradePair_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_TradePair_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_tradePairSnapshotArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_tradePairSnapshotsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_TradePairSnapshot_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_TradePairSnapshot_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_balancerSnapshotArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_balancerSnapshotsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_BalancerSnapshot_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_BalancerSnapshot_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph__metaArgs = {
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};

export type Subscription = {
  BeetsBarSubgraph_bar?: Maybe<BeetsBarSubgraph_Bar>;
  BeetsBarSubgraph_bars: Array<BeetsBarSubgraph_Bar>;
  BeetsBarSubgraph_user?: Maybe<BeetsBarSubgraph_User>;
  BeetsBarSubgraph_users: Array<BeetsBarSubgraph_User>;
  /** Access to subgraph metadata */
  BeetsBarSubgraph__meta?: Maybe<BeetsBarSubgraph__Meta_>;
  MasterchefSubgraph_masterChef?: Maybe<MasterchefSubgraph_MasterChef>;
  MasterchefSubgraph_masterChefs: Array<MasterchefSubgraph_MasterChef>;
  MasterchefSubgraph_pool?: Maybe<MasterchefSubgraph_Pool>;
  MasterchefSubgraph_pools: Array<MasterchefSubgraph_Pool>;
  MasterchefSubgraph_rewardToken?: Maybe<MasterchefSubgraph_RewardToken>;
  MasterchefSubgraph_rewardTokens: Array<MasterchefSubgraph_RewardToken>;
  MasterchefSubgraph_rewarder?: Maybe<MasterchefSubgraph_Rewarder>;
  MasterchefSubgraph_rewarders: Array<MasterchefSubgraph_Rewarder>;
  MasterchefSubgraph_harvestAction?: Maybe<MasterchefSubgraph_HarvestAction>;
  MasterchefSubgraph_harvestActions: Array<MasterchefSubgraph_HarvestAction>;
  MasterchefSubgraph_user?: Maybe<MasterchefSubgraph_User>;
  MasterchefSubgraph_users: Array<MasterchefSubgraph_User>;
  /** Access to subgraph metadata */
  MasterchefSubgraph__meta?: Maybe<MasterchefSubgraph__Meta_>;
  BlocksSubgraph_block?: Maybe<BlocksSubgraph_Block>;
  BlocksSubgraph_blocks: Array<BlocksSubgraph_Block>;
  /** Access to subgraph metadata */
  BlocksSubgraph__meta?: Maybe<BlocksSubgraph__Meta_>;
  BalancerSubgraph_balancer?: Maybe<BalancerSubgraph_Balancer>;
  BalancerSubgraph_balancers: Array<BalancerSubgraph_Balancer>;
  BalancerSubgraph_pool?: Maybe<BalancerSubgraph_Pool>;
  BalancerSubgraph_pools: Array<BalancerSubgraph_Pool>;
  BalancerSubgraph_poolToken?: Maybe<BalancerSubgraph_PoolToken>;
  BalancerSubgraph_poolTokens: Array<BalancerSubgraph_PoolToken>;
  BalancerSubgraph_priceRateProvider?: Maybe<BalancerSubgraph_PriceRateProvider>;
  BalancerSubgraph_priceRateProviders: Array<BalancerSubgraph_PriceRateProvider>;
  BalancerSubgraph_poolShare?: Maybe<BalancerSubgraph_PoolShare>;
  BalancerSubgraph_poolShares: Array<BalancerSubgraph_PoolShare>;
  BalancerSubgraph_user?: Maybe<BalancerSubgraph_User>;
  BalancerSubgraph_users: Array<BalancerSubgraph_User>;
  BalancerSubgraph_userInternalBalance?: Maybe<BalancerSubgraph_UserInternalBalance>;
  BalancerSubgraph_userInternalBalances: Array<BalancerSubgraph_UserInternalBalance>;
  BalancerSubgraph_gradualWeightUpdate?: Maybe<BalancerSubgraph_GradualWeightUpdate>;
  BalancerSubgraph_gradualWeightUpdates: Array<BalancerSubgraph_GradualWeightUpdate>;
  BalancerSubgraph_ampUpdate?: Maybe<BalancerSubgraph_AmpUpdate>;
  BalancerSubgraph_ampUpdates: Array<BalancerSubgraph_AmpUpdate>;
  BalancerSubgraph_swap?: Maybe<BalancerSubgraph_Swap>;
  BalancerSubgraph_swaps: Array<BalancerSubgraph_Swap>;
  BalancerSubgraph_joinExit?: Maybe<BalancerSubgraph_JoinExit>;
  BalancerSubgraph_joinExits: Array<BalancerSubgraph_JoinExit>;
  BalancerSubgraph_latestPrice?: Maybe<BalancerSubgraph_LatestPrice>;
  BalancerSubgraph_latestPrices: Array<BalancerSubgraph_LatestPrice>;
  BalancerSubgraph_poolHistoricalLiquidity?: Maybe<BalancerSubgraph_PoolHistoricalLiquidity>;
  BalancerSubgraph_poolHistoricalLiquidities: Array<BalancerSubgraph_PoolHistoricalLiquidity>;
  BalancerSubgraph_tokenPrice?: Maybe<BalancerSubgraph_TokenPrice>;
  BalancerSubgraph_tokenPrices: Array<BalancerSubgraph_TokenPrice>;
  BalancerSubgraph_investment?: Maybe<BalancerSubgraph_Investment>;
  BalancerSubgraph_investments: Array<BalancerSubgraph_Investment>;
  BalancerSubgraph_poolSnapshot?: Maybe<BalancerSubgraph_PoolSnapshot>;
  BalancerSubgraph_poolSnapshots: Array<BalancerSubgraph_PoolSnapshot>;
  BalancerSubgraph_token?: Maybe<BalancerSubgraph_Token>;
  BalancerSubgraph_tokens: Array<BalancerSubgraph_Token>;
  BalancerSubgraph_tokenSnapshot?: Maybe<BalancerSubgraph_TokenSnapshot>;
  BalancerSubgraph_tokenSnapshots: Array<BalancerSubgraph_TokenSnapshot>;
  BalancerSubgraph_tradePair?: Maybe<BalancerSubgraph_TradePair>;
  BalancerSubgraph_tradePairs: Array<BalancerSubgraph_TradePair>;
  BalancerSubgraph_tradePairSnapshot?: Maybe<BalancerSubgraph_TradePairSnapshot>;
  BalancerSubgraph_tradePairSnapshots: Array<BalancerSubgraph_TradePairSnapshot>;
  BalancerSubgraph_balancerSnapshot?: Maybe<BalancerSubgraph_BalancerSnapshot>;
  BalancerSubgraph_balancerSnapshots: Array<BalancerSubgraph_BalancerSnapshot>;
  /** Access to subgraph metadata */
  BalancerSubgraph__meta?: Maybe<BalancerSubgraph__Meta_>;
};


export type SubscriptionBeetsBarSubgraph_barArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BeetsBarSubgraph_Block_height>;
};


export type SubscriptionBeetsBarSubgraph_barsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BeetsBarSubgraph_Bar_orderBy>;
  orderDirection?: InputMaybe<BeetsBarSubgraph_OrderDirection>;
  where?: InputMaybe<BeetsBarSubgraph_Bar_filter>;
  block?: InputMaybe<BeetsBarSubgraph_Block_height>;
};


export type SubscriptionBeetsBarSubgraph_userArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BeetsBarSubgraph_Block_height>;
};


export type SubscriptionBeetsBarSubgraph_usersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BeetsBarSubgraph_User_orderBy>;
  orderDirection?: InputMaybe<BeetsBarSubgraph_OrderDirection>;
  where?: InputMaybe<BeetsBarSubgraph_User_filter>;
  block?: InputMaybe<BeetsBarSubgraph_Block_height>;
};


export type SubscriptionBeetsBarSubgraph__metaArgs = {
  block?: InputMaybe<BeetsBarSubgraph_Block_height>;
};


export type SubscriptionMasterchefSubgraph_masterChefArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type SubscriptionMasterchefSubgraph_masterChefsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MasterchefSubgraph_MasterChef_orderBy>;
  orderDirection?: InputMaybe<MasterchefSubgraph_OrderDirection>;
  where?: InputMaybe<MasterchefSubgraph_MasterChef_filter>;
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type SubscriptionMasterchefSubgraph_poolArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type SubscriptionMasterchefSubgraph_poolsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MasterchefSubgraph_Pool_orderBy>;
  orderDirection?: InputMaybe<MasterchefSubgraph_OrderDirection>;
  where?: InputMaybe<MasterchefSubgraph_Pool_filter>;
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type SubscriptionMasterchefSubgraph_rewardTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type SubscriptionMasterchefSubgraph_rewardTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MasterchefSubgraph_RewardToken_orderBy>;
  orderDirection?: InputMaybe<MasterchefSubgraph_OrderDirection>;
  where?: InputMaybe<MasterchefSubgraph_RewardToken_filter>;
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type SubscriptionMasterchefSubgraph_rewarderArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type SubscriptionMasterchefSubgraph_rewardersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MasterchefSubgraph_Rewarder_orderBy>;
  orderDirection?: InputMaybe<MasterchefSubgraph_OrderDirection>;
  where?: InputMaybe<MasterchefSubgraph_Rewarder_filter>;
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type SubscriptionMasterchefSubgraph_harvestActionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type SubscriptionMasterchefSubgraph_harvestActionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MasterchefSubgraph_HarvestAction_orderBy>;
  orderDirection?: InputMaybe<MasterchefSubgraph_OrderDirection>;
  where?: InputMaybe<MasterchefSubgraph_HarvestAction_filter>;
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type SubscriptionMasterchefSubgraph_userArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type SubscriptionMasterchefSubgraph_usersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MasterchefSubgraph_User_orderBy>;
  orderDirection?: InputMaybe<MasterchefSubgraph_OrderDirection>;
  where?: InputMaybe<MasterchefSubgraph_User_filter>;
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type SubscriptionMasterchefSubgraph__metaArgs = {
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type SubscriptionBlocksSubgraph_blockArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BlocksSubgraph_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionBlocksSubgraph_blocksArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BlocksSubgraph_Block_orderBy>;
  orderDirection?: InputMaybe<BlocksSubgraph_OrderDirection>;
  where?: InputMaybe<BlocksSubgraph_Block_filter>;
  block?: InputMaybe<BlocksSubgraph_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionBlocksSubgraph__metaArgs = {
  block?: InputMaybe<BlocksSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_balancerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_balancersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_Balancer_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_Balancer_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_poolArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_poolsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_Pool_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_Pool_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_poolTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_poolTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_PoolToken_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_PoolToken_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_priceRateProviderArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_priceRateProvidersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_PriceRateProvider_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_PriceRateProvider_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_poolShareArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_poolSharesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_PoolShare_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_PoolShare_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_userArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_usersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_User_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_User_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_userInternalBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_userInternalBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_UserInternalBalance_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_UserInternalBalance_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_gradualWeightUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_gradualWeightUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_GradualWeightUpdate_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_GradualWeightUpdate_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_ampUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_ampUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_AmpUpdate_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_AmpUpdate_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_swapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_swapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_Swap_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_Swap_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_joinExitArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_joinExitsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_JoinExit_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_JoinExit_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_latestPriceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_latestPricesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_LatestPrice_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_LatestPrice_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_poolHistoricalLiquidityArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_poolHistoricalLiquiditiesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_PoolHistoricalLiquidity_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_PoolHistoricalLiquidity_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_tokenPriceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_tokenPricesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_TokenPrice_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_TokenPrice_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_investmentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_investmentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_Investment_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_Investment_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_poolSnapshotArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_poolSnapshotsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_PoolSnapshot_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_PoolSnapshot_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_tokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_tokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_Token_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_Token_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_tokenSnapshotArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_tokenSnapshotsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_TokenSnapshot_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_TokenSnapshot_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_tradePairArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_tradePairsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_TradePair_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_TradePair_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_tradePairSnapshotArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_tradePairSnapshotsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_TradePairSnapshot_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_TradePairSnapshot_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_balancerSnapshotArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_balancerSnapshotsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_BalancerSnapshot_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_BalancerSnapshot_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph__metaArgs = {
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};

export type BeetsBarSubgraph_Bar = {
  id: Scalars['ID'];
  address: Scalars['BeetsBarSubgraph_Bytes'];
  decimals: Scalars['Int'];
  name: Scalars['String'];
  vestingToken: Scalars['BeetsBarSubgraph_Bytes'];
  symbol: Scalars['String'];
  totalSupply: Scalars['BeetsBarSubgraph_BigDecimal'];
  ratio: Scalars['BeetsBarSubgraph_BigDecimal'];
  fBeetsMinted: Scalars['BeetsBarSubgraph_BigDecimal'];
  fBeetsBurned: Scalars['BeetsBarSubgraph_BigDecimal'];
  vestingTokenStaked: Scalars['BeetsBarSubgraph_BigDecimal'];
  sharedVestingTokenRevenue: Scalars['BeetsBarSubgraph_BigDecimal'];
  users: Array<BeetsBarSubgraph_User>;
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
};


export type BeetsBarSubgraph_BarusersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BeetsBarSubgraph_User_orderBy>;
  orderDirection?: InputMaybe<BeetsBarSubgraph_OrderDirection>;
  where?: InputMaybe<BeetsBarSubgraph_User_filter>;
};

export type BeetsBarSubgraph_Bar_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  address?: InputMaybe<Scalars['BeetsBarSubgraph_Bytes']>;
  address_not?: InputMaybe<Scalars['BeetsBarSubgraph_Bytes']>;
  address_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_Bytes']>>;
  address_not_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_Bytes']>>;
  address_contains?: InputMaybe<Scalars['BeetsBarSubgraph_Bytes']>;
  address_not_contains?: InputMaybe<Scalars['BeetsBarSubgraph_Bytes']>;
  decimals?: InputMaybe<Scalars['Int']>;
  decimals_not?: InputMaybe<Scalars['Int']>;
  decimals_gt?: InputMaybe<Scalars['Int']>;
  decimals_lt?: InputMaybe<Scalars['Int']>;
  decimals_gte?: InputMaybe<Scalars['Int']>;
  decimals_lte?: InputMaybe<Scalars['Int']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']>>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']>>;
  name?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  vestingToken?: InputMaybe<Scalars['BeetsBarSubgraph_Bytes']>;
  vestingToken_not?: InputMaybe<Scalars['BeetsBarSubgraph_Bytes']>;
  vestingToken_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_Bytes']>>;
  vestingToken_not_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_Bytes']>>;
  vestingToken_contains?: InputMaybe<Scalars['BeetsBarSubgraph_Bytes']>;
  vestingToken_not_contains?: InputMaybe<Scalars['BeetsBarSubgraph_Bytes']>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  totalSupply?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  totalSupply_not?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  totalSupply_gt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  totalSupply_lt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  totalSupply_gte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  totalSupply_lte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  ratio?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  ratio_not?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  ratio_gt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  ratio_lt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  ratio_gte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  ratio_lte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  ratio_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  ratio_not_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  fBeetsMinted?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  fBeetsMinted_not?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  fBeetsMinted_gt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  fBeetsMinted_lt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  fBeetsMinted_gte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  fBeetsMinted_lte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  fBeetsMinted_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  fBeetsMinted_not_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  fBeetsBurned?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  fBeetsBurned_not?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  fBeetsBurned_gt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  fBeetsBurned_lt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  fBeetsBurned_gte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  fBeetsBurned_lte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  fBeetsBurned_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  fBeetsBurned_not_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  vestingTokenStaked?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenStaked_not?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenStaked_gt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenStaked_lt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenStaked_gte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenStaked_lte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenStaked_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  vestingTokenStaked_not_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  sharedVestingTokenRevenue?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  sharedVestingTokenRevenue_not?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  sharedVestingTokenRevenue_gt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  sharedVestingTokenRevenue_lt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  sharedVestingTokenRevenue_gte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  sharedVestingTokenRevenue_lte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  sharedVestingTokenRevenue_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  sharedVestingTokenRevenue_not_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type BeetsBarSubgraph_Bar_orderBy =
  | 'id'
  | 'address'
  | 'decimals'
  | 'name'
  | 'vestingToken'
  | 'symbol'
  | 'totalSupply'
  | 'ratio'
  | 'fBeetsMinted'
  | 'fBeetsBurned'
  | 'vestingTokenStaked'
  | 'sharedVestingTokenRevenue'
  | 'users'
  | 'block'
  | 'timestamp';

export type BeetsBarSubgraph_Block_height = {
  hash?: InputMaybe<Scalars['BeetsBarSubgraph_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
};

export type BeetsBarSubgraph_OrderDirection =
  | 'asc'
  | 'desc';

export type BeetsBarSubgraph_User = {
  id: Scalars['ID'];
  address: Scalars['BeetsBarSubgraph_Bytes'];
  bar?: Maybe<BeetsBarSubgraph_Bar>;
  fBeets: Scalars['BeetsBarSubgraph_BigDecimal'];
  vestingTokenOut: Scalars['BeetsBarSubgraph_BigDecimal'];
  vestingTokenIn: Scalars['BeetsBarSubgraph_BigDecimal'];
  vestingTokenHarvested: Scalars['BeetsBarSubgraph_BigDecimal'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
};

export type BeetsBarSubgraph_User_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  address?: InputMaybe<Scalars['BeetsBarSubgraph_Bytes']>;
  address_not?: InputMaybe<Scalars['BeetsBarSubgraph_Bytes']>;
  address_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_Bytes']>>;
  address_not_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_Bytes']>>;
  address_contains?: InputMaybe<Scalars['BeetsBarSubgraph_Bytes']>;
  address_not_contains?: InputMaybe<Scalars['BeetsBarSubgraph_Bytes']>;
  bar?: InputMaybe<Scalars['String']>;
  bar_not?: InputMaybe<Scalars['String']>;
  bar_gt?: InputMaybe<Scalars['String']>;
  bar_lt?: InputMaybe<Scalars['String']>;
  bar_gte?: InputMaybe<Scalars['String']>;
  bar_lte?: InputMaybe<Scalars['String']>;
  bar_in?: InputMaybe<Array<Scalars['String']>>;
  bar_not_in?: InputMaybe<Array<Scalars['String']>>;
  bar_contains?: InputMaybe<Scalars['String']>;
  bar_not_contains?: InputMaybe<Scalars['String']>;
  bar_starts_with?: InputMaybe<Scalars['String']>;
  bar_not_starts_with?: InputMaybe<Scalars['String']>;
  bar_ends_with?: InputMaybe<Scalars['String']>;
  bar_not_ends_with?: InputMaybe<Scalars['String']>;
  fBeets?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  fBeets_not?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  fBeets_gt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  fBeets_lt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  fBeets_gte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  fBeets_lte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  fBeets_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  fBeets_not_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  vestingTokenOut?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenOut_not?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenOut_gt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenOut_lt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenOut_gte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenOut_lte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenOut_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  vestingTokenOut_not_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  vestingTokenIn?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenIn_not?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenIn_gt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenIn_lt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenIn_gte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenIn_lte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenIn_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  vestingTokenIn_not_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  vestingTokenHarvested?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenHarvested_not?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenHarvested_gt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenHarvested_lt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenHarvested_gte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenHarvested_lte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenHarvested_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  vestingTokenHarvested_not_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type BeetsBarSubgraph_User_orderBy =
  | 'id'
  | 'address'
  | 'bar'
  | 'fBeets'
  | 'vestingTokenOut'
  | 'vestingTokenIn'
  | 'vestingTokenHarvested'
  | 'block'
  | 'timestamp';

export type BeetsBarSubgraph__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['BeetsBarSubgraph_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type BeetsBarSubgraph__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: BeetsBarSubgraph__Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

export type MasterchefSubgraph_Block_height = {
  hash?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
};

export type MasterchefSubgraph_HarvestAction = {
  id: Scalars['ID'];
  user?: Maybe<MasterchefSubgraph_User>;
  token: Scalars['MasterchefSubgraph_Bytes'];
  amount: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  block: Scalars['BigInt'];
};

export type MasterchefSubgraph_HarvestAction_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  user?: InputMaybe<Scalars['String']>;
  user_not?: InputMaybe<Scalars['String']>;
  user_gt?: InputMaybe<Scalars['String']>;
  user_lt?: InputMaybe<Scalars['String']>;
  user_gte?: InputMaybe<Scalars['String']>;
  user_lte?: InputMaybe<Scalars['String']>;
  user_in?: InputMaybe<Array<Scalars['String']>>;
  user_not_in?: InputMaybe<Array<Scalars['String']>>;
  user_contains?: InputMaybe<Scalars['String']>;
  user_not_contains?: InputMaybe<Scalars['String']>;
  user_starts_with?: InputMaybe<Scalars['String']>;
  user_not_starts_with?: InputMaybe<Scalars['String']>;
  user_ends_with?: InputMaybe<Scalars['String']>;
  user_not_ends_with?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  token_not?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  token_in?: InputMaybe<Array<Scalars['MasterchefSubgraph_Bytes']>>;
  token_not_in?: InputMaybe<Array<Scalars['MasterchefSubgraph_Bytes']>>;
  token_contains?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  token_not_contains?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type MasterchefSubgraph_HarvestAction_orderBy =
  | 'id'
  | 'user'
  | 'token'
  | 'amount'
  | 'timestamp'
  | 'block';

export type MasterchefSubgraph_MasterChef = {
  id: Scalars['ID'];
  beets: Scalars['MasterchefSubgraph_Bytes'];
  beetsPerBlock: Scalars['BigInt'];
  totalAllocPoint: Scalars['BigInt'];
  pools?: Maybe<Array<MasterchefSubgraph_Pool>>;
  poolCount: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  block: Scalars['BigInt'];
};


export type MasterchefSubgraph_MasterChefpoolsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MasterchefSubgraph_Pool_orderBy>;
  orderDirection?: InputMaybe<MasterchefSubgraph_OrderDirection>;
  where?: InputMaybe<MasterchefSubgraph_Pool_filter>;
};

export type MasterchefSubgraph_MasterChef_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  beets?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  beets_not?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  beets_in?: InputMaybe<Array<Scalars['MasterchefSubgraph_Bytes']>>;
  beets_not_in?: InputMaybe<Array<Scalars['MasterchefSubgraph_Bytes']>>;
  beets_contains?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  beets_not_contains?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  beetsPerBlock?: InputMaybe<Scalars['BigInt']>;
  beetsPerBlock_not?: InputMaybe<Scalars['BigInt']>;
  beetsPerBlock_gt?: InputMaybe<Scalars['BigInt']>;
  beetsPerBlock_lt?: InputMaybe<Scalars['BigInt']>;
  beetsPerBlock_gte?: InputMaybe<Scalars['BigInt']>;
  beetsPerBlock_lte?: InputMaybe<Scalars['BigInt']>;
  beetsPerBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  beetsPerBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalAllocPoint?: InputMaybe<Scalars['BigInt']>;
  totalAllocPoint_not?: InputMaybe<Scalars['BigInt']>;
  totalAllocPoint_gt?: InputMaybe<Scalars['BigInt']>;
  totalAllocPoint_lt?: InputMaybe<Scalars['BigInt']>;
  totalAllocPoint_gte?: InputMaybe<Scalars['BigInt']>;
  totalAllocPoint_lte?: InputMaybe<Scalars['BigInt']>;
  totalAllocPoint_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalAllocPoint_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  poolCount?: InputMaybe<Scalars['BigInt']>;
  poolCount_not?: InputMaybe<Scalars['BigInt']>;
  poolCount_gt?: InputMaybe<Scalars['BigInt']>;
  poolCount_lt?: InputMaybe<Scalars['BigInt']>;
  poolCount_gte?: InputMaybe<Scalars['BigInt']>;
  poolCount_lte?: InputMaybe<Scalars['BigInt']>;
  poolCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  poolCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type MasterchefSubgraph_MasterChef_orderBy =
  | 'id'
  | 'beets'
  | 'beetsPerBlock'
  | 'totalAllocPoint'
  | 'pools'
  | 'poolCount'
  | 'timestamp'
  | 'block';

export type MasterchefSubgraph_OrderDirection =
  | 'asc'
  | 'desc';

export type MasterchefSubgraph_Pool = {
  id: Scalars['ID'];
  masterChef: MasterchefSubgraph_MasterChef;
  pair: Scalars['MasterchefSubgraph_Bytes'];
  rewarder?: Maybe<MasterchefSubgraph_Rewarder>;
  allocPoint: Scalars['BigInt'];
  lastRewardBlock: Scalars['BigInt'];
  accBeetsPerShare: Scalars['BigInt'];
  slpBalance: Scalars['BigInt'];
  users: Array<MasterchefSubgraph_User>;
  userCount: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  block: Scalars['BigInt'];
};


export type MasterchefSubgraph_PoolusersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MasterchefSubgraph_User_orderBy>;
  orderDirection?: InputMaybe<MasterchefSubgraph_OrderDirection>;
  where?: InputMaybe<MasterchefSubgraph_User_filter>;
};

export type MasterchefSubgraph_Pool_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  masterChef?: InputMaybe<Scalars['String']>;
  masterChef_not?: InputMaybe<Scalars['String']>;
  masterChef_gt?: InputMaybe<Scalars['String']>;
  masterChef_lt?: InputMaybe<Scalars['String']>;
  masterChef_gte?: InputMaybe<Scalars['String']>;
  masterChef_lte?: InputMaybe<Scalars['String']>;
  masterChef_in?: InputMaybe<Array<Scalars['String']>>;
  masterChef_not_in?: InputMaybe<Array<Scalars['String']>>;
  masterChef_contains?: InputMaybe<Scalars['String']>;
  masterChef_not_contains?: InputMaybe<Scalars['String']>;
  masterChef_starts_with?: InputMaybe<Scalars['String']>;
  masterChef_not_starts_with?: InputMaybe<Scalars['String']>;
  masterChef_ends_with?: InputMaybe<Scalars['String']>;
  masterChef_not_ends_with?: InputMaybe<Scalars['String']>;
  pair?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  pair_not?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  pair_in?: InputMaybe<Array<Scalars['MasterchefSubgraph_Bytes']>>;
  pair_not_in?: InputMaybe<Array<Scalars['MasterchefSubgraph_Bytes']>>;
  pair_contains?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  pair_not_contains?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  rewarder?: InputMaybe<Scalars['String']>;
  rewarder_not?: InputMaybe<Scalars['String']>;
  rewarder_gt?: InputMaybe<Scalars['String']>;
  rewarder_lt?: InputMaybe<Scalars['String']>;
  rewarder_gte?: InputMaybe<Scalars['String']>;
  rewarder_lte?: InputMaybe<Scalars['String']>;
  rewarder_in?: InputMaybe<Array<Scalars['String']>>;
  rewarder_not_in?: InputMaybe<Array<Scalars['String']>>;
  rewarder_contains?: InputMaybe<Scalars['String']>;
  rewarder_not_contains?: InputMaybe<Scalars['String']>;
  rewarder_starts_with?: InputMaybe<Scalars['String']>;
  rewarder_not_starts_with?: InputMaybe<Scalars['String']>;
  rewarder_ends_with?: InputMaybe<Scalars['String']>;
  rewarder_not_ends_with?: InputMaybe<Scalars['String']>;
  allocPoint?: InputMaybe<Scalars['BigInt']>;
  allocPoint_not?: InputMaybe<Scalars['BigInt']>;
  allocPoint_gt?: InputMaybe<Scalars['BigInt']>;
  allocPoint_lt?: InputMaybe<Scalars['BigInt']>;
  allocPoint_gte?: InputMaybe<Scalars['BigInt']>;
  allocPoint_lte?: InputMaybe<Scalars['BigInt']>;
  allocPoint_in?: InputMaybe<Array<Scalars['BigInt']>>;
  allocPoint_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastRewardBlock?: InputMaybe<Scalars['BigInt']>;
  lastRewardBlock_not?: InputMaybe<Scalars['BigInt']>;
  lastRewardBlock_gt?: InputMaybe<Scalars['BigInt']>;
  lastRewardBlock_lt?: InputMaybe<Scalars['BigInt']>;
  lastRewardBlock_gte?: InputMaybe<Scalars['BigInt']>;
  lastRewardBlock_lte?: InputMaybe<Scalars['BigInt']>;
  lastRewardBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastRewardBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  accBeetsPerShare?: InputMaybe<Scalars['BigInt']>;
  accBeetsPerShare_not?: InputMaybe<Scalars['BigInt']>;
  accBeetsPerShare_gt?: InputMaybe<Scalars['BigInt']>;
  accBeetsPerShare_lt?: InputMaybe<Scalars['BigInt']>;
  accBeetsPerShare_gte?: InputMaybe<Scalars['BigInt']>;
  accBeetsPerShare_lte?: InputMaybe<Scalars['BigInt']>;
  accBeetsPerShare_in?: InputMaybe<Array<Scalars['BigInt']>>;
  accBeetsPerShare_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slpBalance?: InputMaybe<Scalars['BigInt']>;
  slpBalance_not?: InputMaybe<Scalars['BigInt']>;
  slpBalance_gt?: InputMaybe<Scalars['BigInt']>;
  slpBalance_lt?: InputMaybe<Scalars['BigInt']>;
  slpBalance_gte?: InputMaybe<Scalars['BigInt']>;
  slpBalance_lte?: InputMaybe<Scalars['BigInt']>;
  slpBalance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slpBalance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  userCount?: InputMaybe<Scalars['BigInt']>;
  userCount_not?: InputMaybe<Scalars['BigInt']>;
  userCount_gt?: InputMaybe<Scalars['BigInt']>;
  userCount_lt?: InputMaybe<Scalars['BigInt']>;
  userCount_gte?: InputMaybe<Scalars['BigInt']>;
  userCount_lte?: InputMaybe<Scalars['BigInt']>;
  userCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  userCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type MasterchefSubgraph_Pool_orderBy =
  | 'id'
  | 'masterChef'
  | 'pair'
  | 'rewarder'
  | 'allocPoint'
  | 'lastRewardBlock'
  | 'accBeetsPerShare'
  | 'slpBalance'
  | 'users'
  | 'userCount'
  | 'timestamp'
  | 'block';

export type MasterchefSubgraph_RewardToken = {
  id: Scalars['ID'];
  rewarder?: Maybe<MasterchefSubgraph_Rewarder>;
  token: Scalars['MasterchefSubgraph_Bytes'];
  decimals: Scalars['Int'];
  symbol: Scalars['String'];
  rewardPerSecond: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  block: Scalars['BigInt'];
};

export type MasterchefSubgraph_RewardToken_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  rewarder?: InputMaybe<Scalars['String']>;
  rewarder_not?: InputMaybe<Scalars['String']>;
  rewarder_gt?: InputMaybe<Scalars['String']>;
  rewarder_lt?: InputMaybe<Scalars['String']>;
  rewarder_gte?: InputMaybe<Scalars['String']>;
  rewarder_lte?: InputMaybe<Scalars['String']>;
  rewarder_in?: InputMaybe<Array<Scalars['String']>>;
  rewarder_not_in?: InputMaybe<Array<Scalars['String']>>;
  rewarder_contains?: InputMaybe<Scalars['String']>;
  rewarder_not_contains?: InputMaybe<Scalars['String']>;
  rewarder_starts_with?: InputMaybe<Scalars['String']>;
  rewarder_not_starts_with?: InputMaybe<Scalars['String']>;
  rewarder_ends_with?: InputMaybe<Scalars['String']>;
  rewarder_not_ends_with?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  token_not?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  token_in?: InputMaybe<Array<Scalars['MasterchefSubgraph_Bytes']>>;
  token_not_in?: InputMaybe<Array<Scalars['MasterchefSubgraph_Bytes']>>;
  token_contains?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  token_not_contains?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  decimals?: InputMaybe<Scalars['Int']>;
  decimals_not?: InputMaybe<Scalars['Int']>;
  decimals_gt?: InputMaybe<Scalars['Int']>;
  decimals_lt?: InputMaybe<Scalars['Int']>;
  decimals_gte?: InputMaybe<Scalars['Int']>;
  decimals_lte?: InputMaybe<Scalars['Int']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']>>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']>>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  rewardPerSecond?: InputMaybe<Scalars['BigInt']>;
  rewardPerSecond_not?: InputMaybe<Scalars['BigInt']>;
  rewardPerSecond_gt?: InputMaybe<Scalars['BigInt']>;
  rewardPerSecond_lt?: InputMaybe<Scalars['BigInt']>;
  rewardPerSecond_gte?: InputMaybe<Scalars['BigInt']>;
  rewardPerSecond_lte?: InputMaybe<Scalars['BigInt']>;
  rewardPerSecond_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rewardPerSecond_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type MasterchefSubgraph_RewardToken_orderBy =
  | 'id'
  | 'rewarder'
  | 'token'
  | 'decimals'
  | 'symbol'
  | 'rewardPerSecond'
  | 'timestamp'
  | 'block';

export type MasterchefSubgraph_Rewarder = {
  id: Scalars['ID'];
  rewardTokens: Array<MasterchefSubgraph_RewardToken>;
  timestamp: Scalars['BigInt'];
  block: Scalars['BigInt'];
};


export type MasterchefSubgraph_RewarderrewardTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MasterchefSubgraph_RewardToken_orderBy>;
  orderDirection?: InputMaybe<MasterchefSubgraph_OrderDirection>;
  where?: InputMaybe<MasterchefSubgraph_RewardToken_filter>;
};

export type MasterchefSubgraph_Rewarder_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type MasterchefSubgraph_Rewarder_orderBy =
  | 'id'
  | 'rewardTokens'
  | 'timestamp'
  | 'block';

export type MasterchefSubgraph_User = {
  id: Scalars['ID'];
  address: Scalars['MasterchefSubgraph_Bytes'];
  pool?: Maybe<MasterchefSubgraph_Pool>;
  amount: Scalars['BigInt'];
  rewardDebt: Scalars['BigInt'];
  beetsHarvested: Scalars['BigInt'];
  harvests: Array<MasterchefSubgraph_HarvestAction>;
  timestamp: Scalars['BigInt'];
  block: Scalars['BigInt'];
};


export type MasterchefSubgraph_UserharvestsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MasterchefSubgraph_HarvestAction_orderBy>;
  orderDirection?: InputMaybe<MasterchefSubgraph_OrderDirection>;
  where?: InputMaybe<MasterchefSubgraph_HarvestAction_filter>;
};

export type MasterchefSubgraph_User_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  address?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  address_not?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  address_in?: InputMaybe<Array<Scalars['MasterchefSubgraph_Bytes']>>;
  address_not_in?: InputMaybe<Array<Scalars['MasterchefSubgraph_Bytes']>>;
  address_contains?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  address_not_contains?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  pool?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rewardDebt?: InputMaybe<Scalars['BigInt']>;
  rewardDebt_not?: InputMaybe<Scalars['BigInt']>;
  rewardDebt_gt?: InputMaybe<Scalars['BigInt']>;
  rewardDebt_lt?: InputMaybe<Scalars['BigInt']>;
  rewardDebt_gte?: InputMaybe<Scalars['BigInt']>;
  rewardDebt_lte?: InputMaybe<Scalars['BigInt']>;
  rewardDebt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rewardDebt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  beetsHarvested?: InputMaybe<Scalars['BigInt']>;
  beetsHarvested_not?: InputMaybe<Scalars['BigInt']>;
  beetsHarvested_gt?: InputMaybe<Scalars['BigInt']>;
  beetsHarvested_lt?: InputMaybe<Scalars['BigInt']>;
  beetsHarvested_gte?: InputMaybe<Scalars['BigInt']>;
  beetsHarvested_lte?: InputMaybe<Scalars['BigInt']>;
  beetsHarvested_in?: InputMaybe<Array<Scalars['BigInt']>>;
  beetsHarvested_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type MasterchefSubgraph_User_orderBy =
  | 'id'
  | 'address'
  | 'pool'
  | 'amount'
  | 'rewardDebt'
  | 'beetsHarvested'
  | 'harvests'
  | 'timestamp'
  | 'block';

export type MasterchefSubgraph__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['MasterchefSubgraph_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type MasterchefSubgraph__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: MasterchefSubgraph__Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type BlocksSubgraph_Block = {
  id: Scalars['ID'];
  number: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  parentHash?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['String']>;
  difficulty?: Maybe<Scalars['BigInt']>;
  totalDifficulty?: Maybe<Scalars['BigInt']>;
  gasUsed?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  receiptsRoot?: Maybe<Scalars['String']>;
  transactionsRoot?: Maybe<Scalars['String']>;
  stateRoot?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['BigInt']>;
  unclesHash?: Maybe<Scalars['String']>;
};

export type BlocksSubgraph_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type BlocksSubgraph_Block_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  number?: InputMaybe<Scalars['BigInt']>;
  number_not?: InputMaybe<Scalars['BigInt']>;
  number_gt?: InputMaybe<Scalars['BigInt']>;
  number_lt?: InputMaybe<Scalars['BigInt']>;
  number_gte?: InputMaybe<Scalars['BigInt']>;
  number_lte?: InputMaybe<Scalars['BigInt']>;
  number_in?: InputMaybe<Array<Scalars['BigInt']>>;
  number_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  parentHash?: InputMaybe<Scalars['String']>;
  parentHash_not?: InputMaybe<Scalars['String']>;
  parentHash_gt?: InputMaybe<Scalars['String']>;
  parentHash_lt?: InputMaybe<Scalars['String']>;
  parentHash_gte?: InputMaybe<Scalars['String']>;
  parentHash_lte?: InputMaybe<Scalars['String']>;
  parentHash_in?: InputMaybe<Array<Scalars['String']>>;
  parentHash_not_in?: InputMaybe<Array<Scalars['String']>>;
  parentHash_contains?: InputMaybe<Scalars['String']>;
  parentHash_contains_nocase?: InputMaybe<Scalars['String']>;
  parentHash_not_contains?: InputMaybe<Scalars['String']>;
  parentHash_not_contains_nocase?: InputMaybe<Scalars['String']>;
  parentHash_starts_with?: InputMaybe<Scalars['String']>;
  parentHash_starts_with_nocase?: InputMaybe<Scalars['String']>;
  parentHash_not_starts_with?: InputMaybe<Scalars['String']>;
  parentHash_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  parentHash_ends_with?: InputMaybe<Scalars['String']>;
  parentHash_ends_with_nocase?: InputMaybe<Scalars['String']>;
  parentHash_not_ends_with?: InputMaybe<Scalars['String']>;
  parentHash_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  author?: InputMaybe<Scalars['String']>;
  author_not?: InputMaybe<Scalars['String']>;
  author_gt?: InputMaybe<Scalars['String']>;
  author_lt?: InputMaybe<Scalars['String']>;
  author_gte?: InputMaybe<Scalars['String']>;
  author_lte?: InputMaybe<Scalars['String']>;
  author_in?: InputMaybe<Array<Scalars['String']>>;
  author_not_in?: InputMaybe<Array<Scalars['String']>>;
  author_contains?: InputMaybe<Scalars['String']>;
  author_contains_nocase?: InputMaybe<Scalars['String']>;
  author_not_contains?: InputMaybe<Scalars['String']>;
  author_not_contains_nocase?: InputMaybe<Scalars['String']>;
  author_starts_with?: InputMaybe<Scalars['String']>;
  author_starts_with_nocase?: InputMaybe<Scalars['String']>;
  author_not_starts_with?: InputMaybe<Scalars['String']>;
  author_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  author_ends_with?: InputMaybe<Scalars['String']>;
  author_ends_with_nocase?: InputMaybe<Scalars['String']>;
  author_not_ends_with?: InputMaybe<Scalars['String']>;
  author_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  difficulty?: InputMaybe<Scalars['BigInt']>;
  difficulty_not?: InputMaybe<Scalars['BigInt']>;
  difficulty_gt?: InputMaybe<Scalars['BigInt']>;
  difficulty_lt?: InputMaybe<Scalars['BigInt']>;
  difficulty_gte?: InputMaybe<Scalars['BigInt']>;
  difficulty_lte?: InputMaybe<Scalars['BigInt']>;
  difficulty_in?: InputMaybe<Array<Scalars['BigInt']>>;
  difficulty_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalDifficulty?: InputMaybe<Scalars['BigInt']>;
  totalDifficulty_not?: InputMaybe<Scalars['BigInt']>;
  totalDifficulty_gt?: InputMaybe<Scalars['BigInt']>;
  totalDifficulty_lt?: InputMaybe<Scalars['BigInt']>;
  totalDifficulty_gte?: InputMaybe<Scalars['BigInt']>;
  totalDifficulty_lte?: InputMaybe<Scalars['BigInt']>;
  totalDifficulty_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalDifficulty_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasUsed?: InputMaybe<Scalars['BigInt']>;
  gasUsed_not?: InputMaybe<Scalars['BigInt']>;
  gasUsed_gt?: InputMaybe<Scalars['BigInt']>;
  gasUsed_lt?: InputMaybe<Scalars['BigInt']>;
  gasUsed_gte?: InputMaybe<Scalars['BigInt']>;
  gasUsed_lte?: InputMaybe<Scalars['BigInt']>;
  gasUsed_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasUsed_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasLimit?: InputMaybe<Scalars['BigInt']>;
  gasLimit_not?: InputMaybe<Scalars['BigInt']>;
  gasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  gasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  gasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  gasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  gasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  receiptsRoot?: InputMaybe<Scalars['String']>;
  receiptsRoot_not?: InputMaybe<Scalars['String']>;
  receiptsRoot_gt?: InputMaybe<Scalars['String']>;
  receiptsRoot_lt?: InputMaybe<Scalars['String']>;
  receiptsRoot_gte?: InputMaybe<Scalars['String']>;
  receiptsRoot_lte?: InputMaybe<Scalars['String']>;
  receiptsRoot_in?: InputMaybe<Array<Scalars['String']>>;
  receiptsRoot_not_in?: InputMaybe<Array<Scalars['String']>>;
  receiptsRoot_contains?: InputMaybe<Scalars['String']>;
  receiptsRoot_contains_nocase?: InputMaybe<Scalars['String']>;
  receiptsRoot_not_contains?: InputMaybe<Scalars['String']>;
  receiptsRoot_not_contains_nocase?: InputMaybe<Scalars['String']>;
  receiptsRoot_starts_with?: InputMaybe<Scalars['String']>;
  receiptsRoot_starts_with_nocase?: InputMaybe<Scalars['String']>;
  receiptsRoot_not_starts_with?: InputMaybe<Scalars['String']>;
  receiptsRoot_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  receiptsRoot_ends_with?: InputMaybe<Scalars['String']>;
  receiptsRoot_ends_with_nocase?: InputMaybe<Scalars['String']>;
  receiptsRoot_not_ends_with?: InputMaybe<Scalars['String']>;
  receiptsRoot_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transactionsRoot?: InputMaybe<Scalars['String']>;
  transactionsRoot_not?: InputMaybe<Scalars['String']>;
  transactionsRoot_gt?: InputMaybe<Scalars['String']>;
  transactionsRoot_lt?: InputMaybe<Scalars['String']>;
  transactionsRoot_gte?: InputMaybe<Scalars['String']>;
  transactionsRoot_lte?: InputMaybe<Scalars['String']>;
  transactionsRoot_in?: InputMaybe<Array<Scalars['String']>>;
  transactionsRoot_not_in?: InputMaybe<Array<Scalars['String']>>;
  transactionsRoot_contains?: InputMaybe<Scalars['String']>;
  transactionsRoot_contains_nocase?: InputMaybe<Scalars['String']>;
  transactionsRoot_not_contains?: InputMaybe<Scalars['String']>;
  transactionsRoot_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transactionsRoot_starts_with?: InputMaybe<Scalars['String']>;
  transactionsRoot_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transactionsRoot_not_starts_with?: InputMaybe<Scalars['String']>;
  transactionsRoot_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transactionsRoot_ends_with?: InputMaybe<Scalars['String']>;
  transactionsRoot_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transactionsRoot_not_ends_with?: InputMaybe<Scalars['String']>;
  transactionsRoot_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  stateRoot?: InputMaybe<Scalars['String']>;
  stateRoot_not?: InputMaybe<Scalars['String']>;
  stateRoot_gt?: InputMaybe<Scalars['String']>;
  stateRoot_lt?: InputMaybe<Scalars['String']>;
  stateRoot_gte?: InputMaybe<Scalars['String']>;
  stateRoot_lte?: InputMaybe<Scalars['String']>;
  stateRoot_in?: InputMaybe<Array<Scalars['String']>>;
  stateRoot_not_in?: InputMaybe<Array<Scalars['String']>>;
  stateRoot_contains?: InputMaybe<Scalars['String']>;
  stateRoot_contains_nocase?: InputMaybe<Scalars['String']>;
  stateRoot_not_contains?: InputMaybe<Scalars['String']>;
  stateRoot_not_contains_nocase?: InputMaybe<Scalars['String']>;
  stateRoot_starts_with?: InputMaybe<Scalars['String']>;
  stateRoot_starts_with_nocase?: InputMaybe<Scalars['String']>;
  stateRoot_not_starts_with?: InputMaybe<Scalars['String']>;
  stateRoot_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  stateRoot_ends_with?: InputMaybe<Scalars['String']>;
  stateRoot_ends_with_nocase?: InputMaybe<Scalars['String']>;
  stateRoot_not_ends_with?: InputMaybe<Scalars['String']>;
  stateRoot_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['BigInt']>;
  size_not?: InputMaybe<Scalars['BigInt']>;
  size_gt?: InputMaybe<Scalars['BigInt']>;
  size_lt?: InputMaybe<Scalars['BigInt']>;
  size_gte?: InputMaybe<Scalars['BigInt']>;
  size_lte?: InputMaybe<Scalars['BigInt']>;
  size_in?: InputMaybe<Array<Scalars['BigInt']>>;
  size_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  unclesHash?: InputMaybe<Scalars['String']>;
  unclesHash_not?: InputMaybe<Scalars['String']>;
  unclesHash_gt?: InputMaybe<Scalars['String']>;
  unclesHash_lt?: InputMaybe<Scalars['String']>;
  unclesHash_gte?: InputMaybe<Scalars['String']>;
  unclesHash_lte?: InputMaybe<Scalars['String']>;
  unclesHash_in?: InputMaybe<Array<Scalars['String']>>;
  unclesHash_not_in?: InputMaybe<Array<Scalars['String']>>;
  unclesHash_contains?: InputMaybe<Scalars['String']>;
  unclesHash_contains_nocase?: InputMaybe<Scalars['String']>;
  unclesHash_not_contains?: InputMaybe<Scalars['String']>;
  unclesHash_not_contains_nocase?: InputMaybe<Scalars['String']>;
  unclesHash_starts_with?: InputMaybe<Scalars['String']>;
  unclesHash_starts_with_nocase?: InputMaybe<Scalars['String']>;
  unclesHash_not_starts_with?: InputMaybe<Scalars['String']>;
  unclesHash_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  unclesHash_ends_with?: InputMaybe<Scalars['String']>;
  unclesHash_ends_with_nocase?: InputMaybe<Scalars['String']>;
  unclesHash_not_ends_with?: InputMaybe<Scalars['String']>;
  unclesHash_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlocksSubgraph_BlockChangedFilter>;
};

export type BlocksSubgraph_Block_height = {
  hash?: InputMaybe<Scalars['BlocksSubgraph_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type BlocksSubgraph_Block_orderBy =
  | 'id'
  | 'number'
  | 'timestamp'
  | 'parentHash'
  | 'author'
  | 'difficulty'
  | 'totalDifficulty'
  | 'gasUsed'
  | 'gasLimit'
  | 'receiptsRoot'
  | 'transactionsRoot'
  | 'stateRoot'
  | 'size'
  | 'unclesHash';

/** Defines the order direction, either ascending or descending */
export type BlocksSubgraph_OrderDirection =
  | 'asc'
  | 'desc';

export type BlocksSubgraph__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['BlocksSubgraph_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type BlocksSubgraph__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: BlocksSubgraph__Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type BalancerSubgraph_AmpUpdate = {
  id: Scalars['ID'];
  poolId: BalancerSubgraph_Pool;
  scheduledTimestamp: Scalars['Int'];
  startTimestamp: Scalars['Int'];
  endTimestamp: Scalars['Int'];
  startAmp: Scalars['BigInt'];
  endAmp: Scalars['BigInt'];
};

export type BalancerSubgraph_AmpUpdate_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  poolId?: InputMaybe<Scalars['String']>;
  poolId_not?: InputMaybe<Scalars['String']>;
  poolId_gt?: InputMaybe<Scalars['String']>;
  poolId_lt?: InputMaybe<Scalars['String']>;
  poolId_gte?: InputMaybe<Scalars['String']>;
  poolId_lte?: InputMaybe<Scalars['String']>;
  poolId_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_contains?: InputMaybe<Scalars['String']>;
  poolId_not_contains?: InputMaybe<Scalars['String']>;
  poolId_starts_with?: InputMaybe<Scalars['String']>;
  poolId_not_starts_with?: InputMaybe<Scalars['String']>;
  poolId_ends_with?: InputMaybe<Scalars['String']>;
  poolId_not_ends_with?: InputMaybe<Scalars['String']>;
  scheduledTimestamp?: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_not?: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_gt?: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_lt?: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_gte?: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_lte?: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  scheduledTimestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  startTimestamp?: InputMaybe<Scalars['Int']>;
  startTimestamp_not?: InputMaybe<Scalars['Int']>;
  startTimestamp_gt?: InputMaybe<Scalars['Int']>;
  startTimestamp_lt?: InputMaybe<Scalars['Int']>;
  startTimestamp_gte?: InputMaybe<Scalars['Int']>;
  startTimestamp_lte?: InputMaybe<Scalars['Int']>;
  startTimestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  startTimestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  endTimestamp?: InputMaybe<Scalars['Int']>;
  endTimestamp_not?: InputMaybe<Scalars['Int']>;
  endTimestamp_gt?: InputMaybe<Scalars['Int']>;
  endTimestamp_lt?: InputMaybe<Scalars['Int']>;
  endTimestamp_gte?: InputMaybe<Scalars['Int']>;
  endTimestamp_lte?: InputMaybe<Scalars['Int']>;
  endTimestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  endTimestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  startAmp?: InputMaybe<Scalars['BigInt']>;
  startAmp_not?: InputMaybe<Scalars['BigInt']>;
  startAmp_gt?: InputMaybe<Scalars['BigInt']>;
  startAmp_lt?: InputMaybe<Scalars['BigInt']>;
  startAmp_gte?: InputMaybe<Scalars['BigInt']>;
  startAmp_lte?: InputMaybe<Scalars['BigInt']>;
  startAmp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  startAmp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  endAmp?: InputMaybe<Scalars['BigInt']>;
  endAmp_not?: InputMaybe<Scalars['BigInt']>;
  endAmp_gt?: InputMaybe<Scalars['BigInt']>;
  endAmp_lt?: InputMaybe<Scalars['BigInt']>;
  endAmp_gte?: InputMaybe<Scalars['BigInt']>;
  endAmp_lte?: InputMaybe<Scalars['BigInt']>;
  endAmp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  endAmp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type BalancerSubgraph_AmpUpdate_orderBy =
  | 'id'
  | 'poolId'
  | 'scheduledTimestamp'
  | 'startTimestamp'
  | 'endTimestamp'
  | 'startAmp'
  | 'endAmp';

export type BalancerSubgraph_Balancer = {
  id: Scalars['ID'];
  poolCount: Scalars['Int'];
  pools?: Maybe<Array<BalancerSubgraph_Pool>>;
  totalLiquidity: Scalars['BalancerSubgraph_BigDecimal'];
  totalSwapCount: Scalars['BigInt'];
  totalSwapVolume: Scalars['BalancerSubgraph_BigDecimal'];
  totalSwapFee: Scalars['BalancerSubgraph_BigDecimal'];
};


export type BalancerSubgraph_BalancerpoolsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_Pool_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_Pool_filter>;
};

export type BalancerSubgraph_BalancerSnapshot = {
  id: Scalars['ID'];
  vault: BalancerSubgraph_Balancer;
  timestamp: Scalars['Int'];
  poolCount: Scalars['Int'];
  totalLiquidity: Scalars['BalancerSubgraph_BigDecimal'];
  totalSwapCount: Scalars['BigInt'];
  totalSwapVolume: Scalars['BalancerSubgraph_BigDecimal'];
  totalSwapFee: Scalars['BalancerSubgraph_BigDecimal'];
};

export type BalancerSubgraph_BalancerSnapshot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  vault?: InputMaybe<Scalars['String']>;
  vault_not?: InputMaybe<Scalars['String']>;
  vault_gt?: InputMaybe<Scalars['String']>;
  vault_lt?: InputMaybe<Scalars['String']>;
  vault_gte?: InputMaybe<Scalars['String']>;
  vault_lte?: InputMaybe<Scalars['String']>;
  vault_in?: InputMaybe<Array<Scalars['String']>>;
  vault_not_in?: InputMaybe<Array<Scalars['String']>>;
  vault_contains?: InputMaybe<Scalars['String']>;
  vault_not_contains?: InputMaybe<Scalars['String']>;
  vault_starts_with?: InputMaybe<Scalars['String']>;
  vault_not_starts_with?: InputMaybe<Scalars['String']>;
  vault_ends_with?: InputMaybe<Scalars['String']>;
  vault_not_ends_with?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  poolCount?: InputMaybe<Scalars['Int']>;
  poolCount_not?: InputMaybe<Scalars['Int']>;
  poolCount_gt?: InputMaybe<Scalars['Int']>;
  poolCount_lt?: InputMaybe<Scalars['Int']>;
  poolCount_gte?: InputMaybe<Scalars['Int']>;
  poolCount_lte?: InputMaybe<Scalars['Int']>;
  poolCount_in?: InputMaybe<Array<Scalars['Int']>>;
  poolCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
  totalLiquidity?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalLiquidity_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapCount?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_not?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_gt?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_lt?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_gte?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_lte?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSwapCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSwapVolume?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapVolume_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapFee?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapFee_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
};

export type BalancerSubgraph_BalancerSnapshot_orderBy =
  | 'id'
  | 'vault'
  | 'timestamp'
  | 'poolCount'
  | 'totalLiquidity'
  | 'totalSwapCount'
  | 'totalSwapVolume'
  | 'totalSwapFee';

export type BalancerSubgraph_Balancer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  poolCount?: InputMaybe<Scalars['Int']>;
  poolCount_not?: InputMaybe<Scalars['Int']>;
  poolCount_gt?: InputMaybe<Scalars['Int']>;
  poolCount_lt?: InputMaybe<Scalars['Int']>;
  poolCount_gte?: InputMaybe<Scalars['Int']>;
  poolCount_lte?: InputMaybe<Scalars['Int']>;
  poolCount_in?: InputMaybe<Array<Scalars['Int']>>;
  poolCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
  totalLiquidity?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalLiquidity_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapCount?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_not?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_gt?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_lt?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_gte?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_lte?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSwapCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSwapVolume?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapVolume_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapFee?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapFee_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
};

export type BalancerSubgraph_Balancer_orderBy =
  | 'id'
  | 'poolCount'
  | 'pools'
  | 'totalLiquidity'
  | 'totalSwapCount'
  | 'totalSwapVolume'
  | 'totalSwapFee';

export type BalancerSubgraph_Block_height = {
  hash?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
};

export type BalancerSubgraph_GradualWeightUpdate = {
  id: Scalars['ID'];
  poolId: BalancerSubgraph_Pool;
  scheduledTimestamp: Scalars['Int'];
  startTimestamp: Scalars['Int'];
  endTimestamp: Scalars['Int'];
  startWeights: Array<Scalars['BigInt']>;
  endWeights: Array<Scalars['BigInt']>;
};

export type BalancerSubgraph_GradualWeightUpdate_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  poolId?: InputMaybe<Scalars['String']>;
  poolId_not?: InputMaybe<Scalars['String']>;
  poolId_gt?: InputMaybe<Scalars['String']>;
  poolId_lt?: InputMaybe<Scalars['String']>;
  poolId_gte?: InputMaybe<Scalars['String']>;
  poolId_lte?: InputMaybe<Scalars['String']>;
  poolId_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_contains?: InputMaybe<Scalars['String']>;
  poolId_not_contains?: InputMaybe<Scalars['String']>;
  poolId_starts_with?: InputMaybe<Scalars['String']>;
  poolId_not_starts_with?: InputMaybe<Scalars['String']>;
  poolId_ends_with?: InputMaybe<Scalars['String']>;
  poolId_not_ends_with?: InputMaybe<Scalars['String']>;
  scheduledTimestamp?: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_not?: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_gt?: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_lt?: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_gte?: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_lte?: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  scheduledTimestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  startTimestamp?: InputMaybe<Scalars['Int']>;
  startTimestamp_not?: InputMaybe<Scalars['Int']>;
  startTimestamp_gt?: InputMaybe<Scalars['Int']>;
  startTimestamp_lt?: InputMaybe<Scalars['Int']>;
  startTimestamp_gte?: InputMaybe<Scalars['Int']>;
  startTimestamp_lte?: InputMaybe<Scalars['Int']>;
  startTimestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  startTimestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  endTimestamp?: InputMaybe<Scalars['Int']>;
  endTimestamp_not?: InputMaybe<Scalars['Int']>;
  endTimestamp_gt?: InputMaybe<Scalars['Int']>;
  endTimestamp_lt?: InputMaybe<Scalars['Int']>;
  endTimestamp_gte?: InputMaybe<Scalars['Int']>;
  endTimestamp_lte?: InputMaybe<Scalars['Int']>;
  endTimestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  endTimestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  startWeights?: InputMaybe<Array<Scalars['BigInt']>>;
  startWeights_not?: InputMaybe<Array<Scalars['BigInt']>>;
  startWeights_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  startWeights_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  endWeights?: InputMaybe<Array<Scalars['BigInt']>>;
  endWeights_not?: InputMaybe<Array<Scalars['BigInt']>>;
  endWeights_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  endWeights_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type BalancerSubgraph_GradualWeightUpdate_orderBy =
  | 'id'
  | 'poolId'
  | 'scheduledTimestamp'
  | 'startTimestamp'
  | 'endTimestamp'
  | 'startWeights'
  | 'endWeights';

export type BalancerSubgraph_InvestType =
  | 'Join'
  | 'Exit';

export type BalancerSubgraph_Investment = {
  id: Scalars['ID'];
  assetManagerAddress: Scalars['BalancerSubgraph_Bytes'];
  amount: Scalars['BalancerSubgraph_BigDecimal'];
  poolTokenId: BalancerSubgraph_PoolToken;
  timestamp: Scalars['Int'];
};

export type BalancerSubgraph_Investment_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  assetManagerAddress?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  assetManagerAddress_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  assetManagerAddress_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  assetManagerAddress_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  assetManagerAddress_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  assetManagerAddress_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  amount?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  amount_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  poolTokenId?: InputMaybe<Scalars['String']>;
  poolTokenId_not?: InputMaybe<Scalars['String']>;
  poolTokenId_gt?: InputMaybe<Scalars['String']>;
  poolTokenId_lt?: InputMaybe<Scalars['String']>;
  poolTokenId_gte?: InputMaybe<Scalars['String']>;
  poolTokenId_lte?: InputMaybe<Scalars['String']>;
  poolTokenId_in?: InputMaybe<Array<Scalars['String']>>;
  poolTokenId_not_in?: InputMaybe<Array<Scalars['String']>>;
  poolTokenId_contains?: InputMaybe<Scalars['String']>;
  poolTokenId_not_contains?: InputMaybe<Scalars['String']>;
  poolTokenId_starts_with?: InputMaybe<Scalars['String']>;
  poolTokenId_not_starts_with?: InputMaybe<Scalars['String']>;
  poolTokenId_ends_with?: InputMaybe<Scalars['String']>;
  poolTokenId_not_ends_with?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
};

export type BalancerSubgraph_Investment_orderBy =
  | 'id'
  | 'assetManagerAddress'
  | 'amount'
  | 'poolTokenId'
  | 'timestamp';

export type BalancerSubgraph_JoinExit = {
  id: Scalars['ID'];
  type: BalancerSubgraph_InvestType;
  sender: Scalars['BalancerSubgraph_Bytes'];
  amounts: Array<Scalars['BalancerSubgraph_BigDecimal']>;
  pool: BalancerSubgraph_Pool;
  user: BalancerSubgraph_User;
  timestamp: Scalars['Int'];
  valueUSD: Scalars['BalancerSubgraph_BigDecimal'];
  tx: Scalars['BalancerSubgraph_Bytes'];
};

export type BalancerSubgraph_JoinExit_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<BalancerSubgraph_InvestType>;
  type_not?: InputMaybe<BalancerSubgraph_InvestType>;
  sender?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  sender_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  sender_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  sender_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  sender_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  sender_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  amounts?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  amounts_not?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  amounts_contains?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  amounts_not_contains?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  pool?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<Scalars['String']>;
  user_not?: InputMaybe<Scalars['String']>;
  user_gt?: InputMaybe<Scalars['String']>;
  user_lt?: InputMaybe<Scalars['String']>;
  user_gte?: InputMaybe<Scalars['String']>;
  user_lte?: InputMaybe<Scalars['String']>;
  user_in?: InputMaybe<Array<Scalars['String']>>;
  user_not_in?: InputMaybe<Array<Scalars['String']>>;
  user_contains?: InputMaybe<Scalars['String']>;
  user_not_contains?: InputMaybe<Scalars['String']>;
  user_starts_with?: InputMaybe<Scalars['String']>;
  user_not_starts_with?: InputMaybe<Scalars['String']>;
  user_ends_with?: InputMaybe<Scalars['String']>;
  user_not_ends_with?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  valueUSD?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  valueUSD_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  valueUSD_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  valueUSD_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  valueUSD_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  valueUSD_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  valueUSD_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  valueUSD_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  tx?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  tx_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  tx_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  tx_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  tx_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  tx_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
};

export type BalancerSubgraph_JoinExit_orderBy =
  | 'id'
  | 'type'
  | 'sender'
  | 'amounts'
  | 'pool'
  | 'user'
  | 'timestamp'
  | 'valueUSD'
  | 'tx';

export type BalancerSubgraph_LatestPrice = {
  id: Scalars['ID'];
  asset: Scalars['BalancerSubgraph_Bytes'];
  pricingAsset: Scalars['BalancerSubgraph_Bytes'];
  poolId: BalancerSubgraph_Pool;
  price: Scalars['BalancerSubgraph_BigDecimal'];
  priceUSD: Scalars['BalancerSubgraph_BigDecimal'];
  block: Scalars['BigInt'];
};

export type BalancerSubgraph_LatestPrice_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  asset?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  asset_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  pricingAsset?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  pricingAsset_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  pricingAsset_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  pricingAsset_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  pricingAsset_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  pricingAsset_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  poolId?: InputMaybe<Scalars['String']>;
  poolId_not?: InputMaybe<Scalars['String']>;
  poolId_gt?: InputMaybe<Scalars['String']>;
  poolId_lt?: InputMaybe<Scalars['String']>;
  poolId_gte?: InputMaybe<Scalars['String']>;
  poolId_lte?: InputMaybe<Scalars['String']>;
  poolId_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_contains?: InputMaybe<Scalars['String']>;
  poolId_not_contains?: InputMaybe<Scalars['String']>;
  poolId_starts_with?: InputMaybe<Scalars['String']>;
  poolId_not_starts_with?: InputMaybe<Scalars['String']>;
  poolId_ends_with?: InputMaybe<Scalars['String']>;
  poolId_not_ends_with?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  price_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  price_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  price_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  price_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  price_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  price_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  price_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  priceUSD?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  priceUSD_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  priceUSD_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  priceUSD_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  priceUSD_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  priceUSD_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  priceUSD_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  priceUSD_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type BalancerSubgraph_LatestPrice_orderBy =
  | 'id'
  | 'asset'
  | 'pricingAsset'
  | 'poolId'
  | 'price'
  | 'priceUSD'
  | 'block';

export type BalancerSubgraph_OrderDirection =
  | 'asc'
  | 'desc';

export type BalancerSubgraph_Pool = {
  id: Scalars['ID'];
  address: Scalars['BalancerSubgraph_Bytes'];
  poolType?: Maybe<Scalars['String']>;
  factory?: Maybe<Scalars['BalancerSubgraph_Bytes']>;
  strategyType: Scalars['Int'];
  symbol?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  swapEnabled: Scalars['Boolean'];
  swapFee: Scalars['BalancerSubgraph_BigDecimal'];
  owner?: Maybe<Scalars['BalancerSubgraph_Bytes']>;
  totalWeight?: Maybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume: Scalars['BalancerSubgraph_BigDecimal'];
  totalSwapFee: Scalars['BalancerSubgraph_BigDecimal'];
  totalLiquidity: Scalars['BalancerSubgraph_BigDecimal'];
  totalShares: Scalars['BalancerSubgraph_BigDecimal'];
  createTime: Scalars['Int'];
  swapsCount: Scalars['BigInt'];
  holdersCount: Scalars['BigInt'];
  vaultID: BalancerSubgraph_Balancer;
  tx?: Maybe<Scalars['BalancerSubgraph_Bytes']>;
  tokensList: Array<Scalars['BalancerSubgraph_Bytes']>;
  tokens?: Maybe<Array<BalancerSubgraph_PoolToken>>;
  swaps?: Maybe<Array<BalancerSubgraph_Swap>>;
  shares?: Maybe<Array<BalancerSubgraph_PoolShare>>;
  historicalValues?: Maybe<Array<BalancerSubgraph_PoolHistoricalLiquidity>>;
  weightUpdates?: Maybe<Array<BalancerSubgraph_GradualWeightUpdate>>;
  amp?: Maybe<Scalars['BigInt']>;
  priceRateProviders?: Maybe<Array<BalancerSubgraph_PriceRateProvider>>;
  principalToken?: Maybe<Scalars['BalancerSubgraph_Bytes']>;
  baseToken?: Maybe<Scalars['BalancerSubgraph_Bytes']>;
  expiryTime?: Maybe<Scalars['BigInt']>;
  unitSeconds?: Maybe<Scalars['BigInt']>;
  managementFee?: Maybe<Scalars['BalancerSubgraph_BigDecimal']>;
  mainIndex?: Maybe<Scalars['Int']>;
  wrappedIndex?: Maybe<Scalars['Int']>;
  lowerTarget?: Maybe<Scalars['BalancerSubgraph_BigDecimal']>;
  upperTarget?: Maybe<Scalars['BalancerSubgraph_BigDecimal']>;
};


export type BalancerSubgraph_PooltokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_PoolToken_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_PoolToken_filter>;
};


export type BalancerSubgraph_PoolswapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_Swap_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_Swap_filter>;
};


export type BalancerSubgraph_PoolsharesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_PoolShare_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_PoolShare_filter>;
};


export type BalancerSubgraph_PoolhistoricalValuesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_PoolHistoricalLiquidity_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_PoolHistoricalLiquidity_filter>;
};


export type BalancerSubgraph_PoolweightUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_GradualWeightUpdate_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_GradualWeightUpdate_filter>;
};


export type BalancerSubgraph_PoolpriceRateProvidersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_PriceRateProvider_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_PriceRateProvider_filter>;
};

export type BalancerSubgraph_PoolHistoricalLiquidity = {
  id: Scalars['ID'];
  poolId: BalancerSubgraph_Pool;
  poolTotalShares: Scalars['BalancerSubgraph_BigDecimal'];
  poolLiquidity: Scalars['BalancerSubgraph_BigDecimal'];
  poolLiquidityUSD: Scalars['BalancerSubgraph_BigDecimal'];
  poolShareValue: Scalars['BalancerSubgraph_BigDecimal'];
  pricingAsset: Scalars['BalancerSubgraph_Bytes'];
  block: Scalars['BigInt'];
  timestamp: Scalars['Int'];
};

export type BalancerSubgraph_PoolHistoricalLiquidity_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  poolId?: InputMaybe<Scalars['String']>;
  poolId_not?: InputMaybe<Scalars['String']>;
  poolId_gt?: InputMaybe<Scalars['String']>;
  poolId_lt?: InputMaybe<Scalars['String']>;
  poolId_gte?: InputMaybe<Scalars['String']>;
  poolId_lte?: InputMaybe<Scalars['String']>;
  poolId_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_contains?: InputMaybe<Scalars['String']>;
  poolId_not_contains?: InputMaybe<Scalars['String']>;
  poolId_starts_with?: InputMaybe<Scalars['String']>;
  poolId_not_starts_with?: InputMaybe<Scalars['String']>;
  poolId_ends_with?: InputMaybe<Scalars['String']>;
  poolId_not_ends_with?: InputMaybe<Scalars['String']>;
  poolTotalShares?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolTotalShares_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolTotalShares_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolTotalShares_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolTotalShares_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolTotalShares_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolTotalShares_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  poolTotalShares_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  poolLiquidity?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolLiquidity_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolLiquidity_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolLiquidity_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolLiquidity_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolLiquidity_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolLiquidity_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  poolLiquidity_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  poolLiquidityUSD?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolLiquidityUSD_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolLiquidityUSD_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolLiquidityUSD_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolLiquidityUSD_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolLiquidityUSD_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolLiquidityUSD_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  poolLiquidityUSD_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  poolShareValue?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolShareValue_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolShareValue_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolShareValue_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolShareValue_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolShareValue_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolShareValue_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  poolShareValue_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  pricingAsset?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  pricingAsset_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  pricingAsset_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  pricingAsset_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  pricingAsset_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  pricingAsset_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
};

export type BalancerSubgraph_PoolHistoricalLiquidity_orderBy =
  | 'id'
  | 'poolId'
  | 'poolTotalShares'
  | 'poolLiquidity'
  | 'poolLiquidityUSD'
  | 'poolShareValue'
  | 'pricingAsset'
  | 'block'
  | 'timestamp';

export type BalancerSubgraph_PoolShare = {
  id: Scalars['ID'];
  userAddress: BalancerSubgraph_User;
  poolId: BalancerSubgraph_Pool;
  balance: Scalars['BalancerSubgraph_BigDecimal'];
};

export type BalancerSubgraph_PoolShare_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  userAddress?: InputMaybe<Scalars['String']>;
  userAddress_not?: InputMaybe<Scalars['String']>;
  userAddress_gt?: InputMaybe<Scalars['String']>;
  userAddress_lt?: InputMaybe<Scalars['String']>;
  userAddress_gte?: InputMaybe<Scalars['String']>;
  userAddress_lte?: InputMaybe<Scalars['String']>;
  userAddress_in?: InputMaybe<Array<Scalars['String']>>;
  userAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  userAddress_contains?: InputMaybe<Scalars['String']>;
  userAddress_not_contains?: InputMaybe<Scalars['String']>;
  userAddress_starts_with?: InputMaybe<Scalars['String']>;
  userAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  userAddress_ends_with?: InputMaybe<Scalars['String']>;
  userAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  poolId?: InputMaybe<Scalars['String']>;
  poolId_not?: InputMaybe<Scalars['String']>;
  poolId_gt?: InputMaybe<Scalars['String']>;
  poolId_lt?: InputMaybe<Scalars['String']>;
  poolId_gte?: InputMaybe<Scalars['String']>;
  poolId_lte?: InputMaybe<Scalars['String']>;
  poolId_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_contains?: InputMaybe<Scalars['String']>;
  poolId_not_contains?: InputMaybe<Scalars['String']>;
  poolId_starts_with?: InputMaybe<Scalars['String']>;
  poolId_not_starts_with?: InputMaybe<Scalars['String']>;
  poolId_ends_with?: InputMaybe<Scalars['String']>;
  poolId_not_ends_with?: InputMaybe<Scalars['String']>;
  balance?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  balance_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  balance_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  balance_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  balance_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  balance_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  balance_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  balance_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
};

export type BalancerSubgraph_PoolShare_orderBy =
  | 'id'
  | 'userAddress'
  | 'poolId'
  | 'balance';

export type BalancerSubgraph_PoolSnapshot = {
  id: Scalars['ID'];
  pool: BalancerSubgraph_Pool;
  amounts: Array<Scalars['BalancerSubgraph_BigDecimal']>;
  totalShares: Scalars['BalancerSubgraph_BigDecimal'];
  swapVolume: Scalars['BalancerSubgraph_BigDecimal'];
  swapFees: Scalars['BalancerSubgraph_BigDecimal'];
  liquidity: Scalars['BalancerSubgraph_BigDecimal'];
  timestamp: Scalars['Int'];
  totalSwapVolume: Scalars['BalancerSubgraph_BigDecimal'];
  totalSwapFee: Scalars['BalancerSubgraph_BigDecimal'];
  totalLiquidity: Scalars['BalancerSubgraph_BigDecimal'];
  swapsCount: Scalars['BigInt'];
  holdersCount: Scalars['BigInt'];
};

export type BalancerSubgraph_PoolSnapshot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  pool?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  amounts?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  amounts_not?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  amounts_contains?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  amounts_not_contains?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalShares?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalShares_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalShares_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalShares_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalShares_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalShares_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalShares_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalShares_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  swapVolume?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  swapVolume_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  swapVolume_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  swapVolume_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  swapVolume_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  swapVolume_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  swapVolume_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  swapVolume_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  swapFees?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  swapFees_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  swapFees_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  swapFees_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  swapFees_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  swapFees_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  swapFees_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  swapFees_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  liquidity?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  liquidity_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  liquidity_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  liquidity_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  liquidity_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  liquidity_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  liquidity_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  liquidity_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  totalSwapVolume?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapVolume_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapFee?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapFee_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalLiquidity?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalLiquidity_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  swapsCount?: InputMaybe<Scalars['BigInt']>;
  swapsCount_not?: InputMaybe<Scalars['BigInt']>;
  swapsCount_gt?: InputMaybe<Scalars['BigInt']>;
  swapsCount_lt?: InputMaybe<Scalars['BigInt']>;
  swapsCount_gte?: InputMaybe<Scalars['BigInt']>;
  swapsCount_lte?: InputMaybe<Scalars['BigInt']>;
  swapsCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapsCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  holdersCount?: InputMaybe<Scalars['BigInt']>;
  holdersCount_not?: InputMaybe<Scalars['BigInt']>;
  holdersCount_gt?: InputMaybe<Scalars['BigInt']>;
  holdersCount_lt?: InputMaybe<Scalars['BigInt']>;
  holdersCount_gte?: InputMaybe<Scalars['BigInt']>;
  holdersCount_lte?: InputMaybe<Scalars['BigInt']>;
  holdersCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  holdersCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type BalancerSubgraph_PoolSnapshot_orderBy =
  | 'id'
  | 'pool'
  | 'amounts'
  | 'totalShares'
  | 'swapVolume'
  | 'swapFees'
  | 'liquidity'
  | 'timestamp'
  | 'totalSwapVolume'
  | 'totalSwapFee'
  | 'totalLiquidity'
  | 'swapsCount'
  | 'holdersCount';

export type BalancerSubgraph_PoolToken = {
  id: Scalars['ID'];
  poolId: BalancerSubgraph_Pool;
  token: BalancerSubgraph_Token;
  symbol: Scalars['String'];
  name: Scalars['String'];
  decimals: Scalars['Int'];
  address: Scalars['String'];
  priceRate: Scalars['BalancerSubgraph_BigDecimal'];
  balance: Scalars['BalancerSubgraph_BigDecimal'];
  invested: Scalars['BalancerSubgraph_BigDecimal'];
  investments?: Maybe<Array<BalancerSubgraph_Investment>>;
  weight?: Maybe<Scalars['BalancerSubgraph_BigDecimal']>;
};


export type BalancerSubgraph_PoolTokeninvestmentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_Investment_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_Investment_filter>;
};

export type BalancerSubgraph_PoolToken_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  poolId?: InputMaybe<Scalars['String']>;
  poolId_not?: InputMaybe<Scalars['String']>;
  poolId_gt?: InputMaybe<Scalars['String']>;
  poolId_lt?: InputMaybe<Scalars['String']>;
  poolId_gte?: InputMaybe<Scalars['String']>;
  poolId_lte?: InputMaybe<Scalars['String']>;
  poolId_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_contains?: InputMaybe<Scalars['String']>;
  poolId_not_contains?: InputMaybe<Scalars['String']>;
  poolId_starts_with?: InputMaybe<Scalars['String']>;
  poolId_not_starts_with?: InputMaybe<Scalars['String']>;
  poolId_ends_with?: InputMaybe<Scalars['String']>;
  poolId_not_ends_with?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  decimals?: InputMaybe<Scalars['Int']>;
  decimals_not?: InputMaybe<Scalars['Int']>;
  decimals_gt?: InputMaybe<Scalars['Int']>;
  decimals_lt?: InputMaybe<Scalars['Int']>;
  decimals_gte?: InputMaybe<Scalars['Int']>;
  decimals_lte?: InputMaybe<Scalars['Int']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']>>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']>>;
  address?: InputMaybe<Scalars['String']>;
  address_not?: InputMaybe<Scalars['String']>;
  address_gt?: InputMaybe<Scalars['String']>;
  address_lt?: InputMaybe<Scalars['String']>;
  address_gte?: InputMaybe<Scalars['String']>;
  address_lte?: InputMaybe<Scalars['String']>;
  address_in?: InputMaybe<Array<Scalars['String']>>;
  address_not_in?: InputMaybe<Array<Scalars['String']>>;
  address_contains?: InputMaybe<Scalars['String']>;
  address_not_contains?: InputMaybe<Scalars['String']>;
  address_starts_with?: InputMaybe<Scalars['String']>;
  address_not_starts_with?: InputMaybe<Scalars['String']>;
  address_ends_with?: InputMaybe<Scalars['String']>;
  address_not_ends_with?: InputMaybe<Scalars['String']>;
  priceRate?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  priceRate_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  priceRate_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  priceRate_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  priceRate_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  priceRate_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  priceRate_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  priceRate_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  balance?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  balance_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  balance_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  balance_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  balance_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  balance_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  balance_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  balance_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  invested?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  invested_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  invested_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  invested_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  invested_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  invested_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  invested_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  invested_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  weight?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  weight_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  weight_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  weight_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  weight_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  weight_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  weight_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  weight_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
};

export type BalancerSubgraph_PoolToken_orderBy =
  | 'id'
  | 'poolId'
  | 'token'
  | 'symbol'
  | 'name'
  | 'decimals'
  | 'address'
  | 'priceRate'
  | 'balance'
  | 'invested'
  | 'investments'
  | 'weight';

export type BalancerSubgraph_Pool_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  address?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  address_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  address_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  address_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  address_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  address_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  poolType?: InputMaybe<Scalars['String']>;
  poolType_not?: InputMaybe<Scalars['String']>;
  poolType_gt?: InputMaybe<Scalars['String']>;
  poolType_lt?: InputMaybe<Scalars['String']>;
  poolType_gte?: InputMaybe<Scalars['String']>;
  poolType_lte?: InputMaybe<Scalars['String']>;
  poolType_in?: InputMaybe<Array<Scalars['String']>>;
  poolType_not_in?: InputMaybe<Array<Scalars['String']>>;
  poolType_contains?: InputMaybe<Scalars['String']>;
  poolType_not_contains?: InputMaybe<Scalars['String']>;
  poolType_starts_with?: InputMaybe<Scalars['String']>;
  poolType_not_starts_with?: InputMaybe<Scalars['String']>;
  poolType_ends_with?: InputMaybe<Scalars['String']>;
  poolType_not_ends_with?: InputMaybe<Scalars['String']>;
  factory?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  factory_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  factory_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  factory_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  factory_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  factory_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  strategyType?: InputMaybe<Scalars['Int']>;
  strategyType_not?: InputMaybe<Scalars['Int']>;
  strategyType_gt?: InputMaybe<Scalars['Int']>;
  strategyType_lt?: InputMaybe<Scalars['Int']>;
  strategyType_gte?: InputMaybe<Scalars['Int']>;
  strategyType_lte?: InputMaybe<Scalars['Int']>;
  strategyType_in?: InputMaybe<Array<Scalars['Int']>>;
  strategyType_not_in?: InputMaybe<Array<Scalars['Int']>>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  swapEnabled?: InputMaybe<Scalars['Boolean']>;
  swapEnabled_not?: InputMaybe<Scalars['Boolean']>;
  swapEnabled_in?: InputMaybe<Array<Scalars['Boolean']>>;
  swapEnabled_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  swapFee?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  swapFee_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  swapFee_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  swapFee_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  swapFee_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  swapFee_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  swapFee_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  swapFee_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  owner?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  owner_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  totalWeight?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalWeight_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalWeight_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalWeight_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalWeight_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalWeight_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalWeight_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalWeight_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapVolume?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapVolume_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapFee?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapFee_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalLiquidity?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalLiquidity_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalShares?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalShares_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalShares_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalShares_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalShares_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalShares_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalShares_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalShares_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  createTime?: InputMaybe<Scalars['Int']>;
  createTime_not?: InputMaybe<Scalars['Int']>;
  createTime_gt?: InputMaybe<Scalars['Int']>;
  createTime_lt?: InputMaybe<Scalars['Int']>;
  createTime_gte?: InputMaybe<Scalars['Int']>;
  createTime_lte?: InputMaybe<Scalars['Int']>;
  createTime_in?: InputMaybe<Array<Scalars['Int']>>;
  createTime_not_in?: InputMaybe<Array<Scalars['Int']>>;
  swapsCount?: InputMaybe<Scalars['BigInt']>;
  swapsCount_not?: InputMaybe<Scalars['BigInt']>;
  swapsCount_gt?: InputMaybe<Scalars['BigInt']>;
  swapsCount_lt?: InputMaybe<Scalars['BigInt']>;
  swapsCount_gte?: InputMaybe<Scalars['BigInt']>;
  swapsCount_lte?: InputMaybe<Scalars['BigInt']>;
  swapsCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapsCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  holdersCount?: InputMaybe<Scalars['BigInt']>;
  holdersCount_not?: InputMaybe<Scalars['BigInt']>;
  holdersCount_gt?: InputMaybe<Scalars['BigInt']>;
  holdersCount_lt?: InputMaybe<Scalars['BigInt']>;
  holdersCount_gte?: InputMaybe<Scalars['BigInt']>;
  holdersCount_lte?: InputMaybe<Scalars['BigInt']>;
  holdersCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  holdersCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  vaultID?: InputMaybe<Scalars['String']>;
  vaultID_not?: InputMaybe<Scalars['String']>;
  vaultID_gt?: InputMaybe<Scalars['String']>;
  vaultID_lt?: InputMaybe<Scalars['String']>;
  vaultID_gte?: InputMaybe<Scalars['String']>;
  vaultID_lte?: InputMaybe<Scalars['String']>;
  vaultID_in?: InputMaybe<Array<Scalars['String']>>;
  vaultID_not_in?: InputMaybe<Array<Scalars['String']>>;
  vaultID_contains?: InputMaybe<Scalars['String']>;
  vaultID_not_contains?: InputMaybe<Scalars['String']>;
  vaultID_starts_with?: InputMaybe<Scalars['String']>;
  vaultID_not_starts_with?: InputMaybe<Scalars['String']>;
  vaultID_ends_with?: InputMaybe<Scalars['String']>;
  vaultID_not_ends_with?: InputMaybe<Scalars['String']>;
  tx?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  tx_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  tx_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  tx_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  tx_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  tx_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  tokensList?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  tokensList_not?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  tokensList_contains?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  tokensList_not_contains?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  amp?: InputMaybe<Scalars['BigInt']>;
  amp_not?: InputMaybe<Scalars['BigInt']>;
  amp_gt?: InputMaybe<Scalars['BigInt']>;
  amp_lt?: InputMaybe<Scalars['BigInt']>;
  amp_gte?: InputMaybe<Scalars['BigInt']>;
  amp_lte?: InputMaybe<Scalars['BigInt']>;
  amp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  principalToken?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  principalToken_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  principalToken_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  principalToken_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  principalToken_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  principalToken_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  baseToken?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  baseToken_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  baseToken_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  baseToken_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  baseToken_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  baseToken_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  expiryTime?: InputMaybe<Scalars['BigInt']>;
  expiryTime_not?: InputMaybe<Scalars['BigInt']>;
  expiryTime_gt?: InputMaybe<Scalars['BigInt']>;
  expiryTime_lt?: InputMaybe<Scalars['BigInt']>;
  expiryTime_gte?: InputMaybe<Scalars['BigInt']>;
  expiryTime_lte?: InputMaybe<Scalars['BigInt']>;
  expiryTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expiryTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  unitSeconds?: InputMaybe<Scalars['BigInt']>;
  unitSeconds_not?: InputMaybe<Scalars['BigInt']>;
  unitSeconds_gt?: InputMaybe<Scalars['BigInt']>;
  unitSeconds_lt?: InputMaybe<Scalars['BigInt']>;
  unitSeconds_gte?: InputMaybe<Scalars['BigInt']>;
  unitSeconds_lte?: InputMaybe<Scalars['BigInt']>;
  unitSeconds_in?: InputMaybe<Array<Scalars['BigInt']>>;
  unitSeconds_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  managementFee?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  managementFee_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  managementFee_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  managementFee_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  managementFee_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  managementFee_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  managementFee_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  managementFee_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  mainIndex?: InputMaybe<Scalars['Int']>;
  mainIndex_not?: InputMaybe<Scalars['Int']>;
  mainIndex_gt?: InputMaybe<Scalars['Int']>;
  mainIndex_lt?: InputMaybe<Scalars['Int']>;
  mainIndex_gte?: InputMaybe<Scalars['Int']>;
  mainIndex_lte?: InputMaybe<Scalars['Int']>;
  mainIndex_in?: InputMaybe<Array<Scalars['Int']>>;
  mainIndex_not_in?: InputMaybe<Array<Scalars['Int']>>;
  wrappedIndex?: InputMaybe<Scalars['Int']>;
  wrappedIndex_not?: InputMaybe<Scalars['Int']>;
  wrappedIndex_gt?: InputMaybe<Scalars['Int']>;
  wrappedIndex_lt?: InputMaybe<Scalars['Int']>;
  wrappedIndex_gte?: InputMaybe<Scalars['Int']>;
  wrappedIndex_lte?: InputMaybe<Scalars['Int']>;
  wrappedIndex_in?: InputMaybe<Array<Scalars['Int']>>;
  wrappedIndex_not_in?: InputMaybe<Array<Scalars['Int']>>;
  lowerTarget?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  lowerTarget_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  lowerTarget_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  lowerTarget_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  lowerTarget_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  lowerTarget_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  lowerTarget_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  lowerTarget_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  upperTarget?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  upperTarget_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  upperTarget_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  upperTarget_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  upperTarget_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  upperTarget_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  upperTarget_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  upperTarget_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
};

export type BalancerSubgraph_Pool_orderBy =
  | 'id'
  | 'address'
  | 'poolType'
  | 'factory'
  | 'strategyType'
  | 'symbol'
  | 'name'
  | 'swapEnabled'
  | 'swapFee'
  | 'owner'
  | 'totalWeight'
  | 'totalSwapVolume'
  | 'totalSwapFee'
  | 'totalLiquidity'
  | 'totalShares'
  | 'createTime'
  | 'swapsCount'
  | 'holdersCount'
  | 'vaultID'
  | 'tx'
  | 'tokensList'
  | 'tokens'
  | 'swaps'
  | 'shares'
  | 'historicalValues'
  | 'weightUpdates'
  | 'amp'
  | 'priceRateProviders'
  | 'principalToken'
  | 'baseToken'
  | 'expiryTime'
  | 'unitSeconds'
  | 'managementFee'
  | 'mainIndex'
  | 'wrappedIndex'
  | 'lowerTarget'
  | 'upperTarget';

export type BalancerSubgraph_PriceRateProvider = {
  id: Scalars['ID'];
  poolId: BalancerSubgraph_Pool;
  token: BalancerSubgraph_PoolToken;
  address: Scalars['BalancerSubgraph_Bytes'];
  rate: Scalars['BalancerSubgraph_BigDecimal'];
  lastCached: Scalars['Int'];
  cacheDuration: Scalars['Int'];
  cacheExpiry: Scalars['Int'];
};

export type BalancerSubgraph_PriceRateProvider_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  poolId?: InputMaybe<Scalars['String']>;
  poolId_not?: InputMaybe<Scalars['String']>;
  poolId_gt?: InputMaybe<Scalars['String']>;
  poolId_lt?: InputMaybe<Scalars['String']>;
  poolId_gte?: InputMaybe<Scalars['String']>;
  poolId_lte?: InputMaybe<Scalars['String']>;
  poolId_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_contains?: InputMaybe<Scalars['String']>;
  poolId_not_contains?: InputMaybe<Scalars['String']>;
  poolId_starts_with?: InputMaybe<Scalars['String']>;
  poolId_not_starts_with?: InputMaybe<Scalars['String']>;
  poolId_ends_with?: InputMaybe<Scalars['String']>;
  poolId_not_ends_with?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  address?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  address_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  address_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  address_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  address_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  address_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  rate?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  rate_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  rate_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  rate_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  rate_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  rate_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  rate_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  rate_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  lastCached?: InputMaybe<Scalars['Int']>;
  lastCached_not?: InputMaybe<Scalars['Int']>;
  lastCached_gt?: InputMaybe<Scalars['Int']>;
  lastCached_lt?: InputMaybe<Scalars['Int']>;
  lastCached_gte?: InputMaybe<Scalars['Int']>;
  lastCached_lte?: InputMaybe<Scalars['Int']>;
  lastCached_in?: InputMaybe<Array<Scalars['Int']>>;
  lastCached_not_in?: InputMaybe<Array<Scalars['Int']>>;
  cacheDuration?: InputMaybe<Scalars['Int']>;
  cacheDuration_not?: InputMaybe<Scalars['Int']>;
  cacheDuration_gt?: InputMaybe<Scalars['Int']>;
  cacheDuration_lt?: InputMaybe<Scalars['Int']>;
  cacheDuration_gte?: InputMaybe<Scalars['Int']>;
  cacheDuration_lte?: InputMaybe<Scalars['Int']>;
  cacheDuration_in?: InputMaybe<Array<Scalars['Int']>>;
  cacheDuration_not_in?: InputMaybe<Array<Scalars['Int']>>;
  cacheExpiry?: InputMaybe<Scalars['Int']>;
  cacheExpiry_not?: InputMaybe<Scalars['Int']>;
  cacheExpiry_gt?: InputMaybe<Scalars['Int']>;
  cacheExpiry_lt?: InputMaybe<Scalars['Int']>;
  cacheExpiry_gte?: InputMaybe<Scalars['Int']>;
  cacheExpiry_lte?: InputMaybe<Scalars['Int']>;
  cacheExpiry_in?: InputMaybe<Array<Scalars['Int']>>;
  cacheExpiry_not_in?: InputMaybe<Array<Scalars['Int']>>;
};

export type BalancerSubgraph_PriceRateProvider_orderBy =
  | 'id'
  | 'poolId'
  | 'token'
  | 'address'
  | 'rate'
  | 'lastCached'
  | 'cacheDuration'
  | 'cacheExpiry';

export type BalancerSubgraph_Swap = {
  id: Scalars['ID'];
  caller: Scalars['BalancerSubgraph_Bytes'];
  tokenIn: Scalars['BalancerSubgraph_Bytes'];
  tokenInSym: Scalars['String'];
  tokenOut: Scalars['BalancerSubgraph_Bytes'];
  tokenOutSym: Scalars['String'];
  tokenAmountIn: Scalars['BalancerSubgraph_BigDecimal'];
  tokenAmountOut: Scalars['BalancerSubgraph_BigDecimal'];
  poolId: BalancerSubgraph_Pool;
  userAddress: BalancerSubgraph_User;
  timestamp: Scalars['Int'];
  tx: Scalars['BalancerSubgraph_Bytes'];
  valueUSD: Scalars['BalancerSubgraph_BigDecimal'];
};

export type BalancerSubgraph_Swap_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  caller?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  caller_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  tokenIn?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  tokenIn_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  tokenIn_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  tokenIn_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  tokenIn_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  tokenIn_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  tokenInSym?: InputMaybe<Scalars['String']>;
  tokenInSym_not?: InputMaybe<Scalars['String']>;
  tokenInSym_gt?: InputMaybe<Scalars['String']>;
  tokenInSym_lt?: InputMaybe<Scalars['String']>;
  tokenInSym_gte?: InputMaybe<Scalars['String']>;
  tokenInSym_lte?: InputMaybe<Scalars['String']>;
  tokenInSym_in?: InputMaybe<Array<Scalars['String']>>;
  tokenInSym_not_in?: InputMaybe<Array<Scalars['String']>>;
  tokenInSym_contains?: InputMaybe<Scalars['String']>;
  tokenInSym_not_contains?: InputMaybe<Scalars['String']>;
  tokenInSym_starts_with?: InputMaybe<Scalars['String']>;
  tokenInSym_not_starts_with?: InputMaybe<Scalars['String']>;
  tokenInSym_ends_with?: InputMaybe<Scalars['String']>;
  tokenInSym_not_ends_with?: InputMaybe<Scalars['String']>;
  tokenOut?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  tokenOut_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  tokenOut_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  tokenOut_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  tokenOut_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  tokenOut_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  tokenOutSym?: InputMaybe<Scalars['String']>;
  tokenOutSym_not?: InputMaybe<Scalars['String']>;
  tokenOutSym_gt?: InputMaybe<Scalars['String']>;
  tokenOutSym_lt?: InputMaybe<Scalars['String']>;
  tokenOutSym_gte?: InputMaybe<Scalars['String']>;
  tokenOutSym_lte?: InputMaybe<Scalars['String']>;
  tokenOutSym_in?: InputMaybe<Array<Scalars['String']>>;
  tokenOutSym_not_in?: InputMaybe<Array<Scalars['String']>>;
  tokenOutSym_contains?: InputMaybe<Scalars['String']>;
  tokenOutSym_not_contains?: InputMaybe<Scalars['String']>;
  tokenOutSym_starts_with?: InputMaybe<Scalars['String']>;
  tokenOutSym_not_starts_with?: InputMaybe<Scalars['String']>;
  tokenOutSym_ends_with?: InputMaybe<Scalars['String']>;
  tokenOutSym_not_ends_with?: InputMaybe<Scalars['String']>;
  tokenAmountIn?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  tokenAmountIn_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  tokenAmountIn_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  tokenAmountIn_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  tokenAmountIn_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  tokenAmountIn_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  tokenAmountIn_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  tokenAmountIn_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  tokenAmountOut?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  tokenAmountOut_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  tokenAmountOut_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  tokenAmountOut_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  tokenAmountOut_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  tokenAmountOut_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  tokenAmountOut_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  tokenAmountOut_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  poolId?: InputMaybe<Scalars['String']>;
  poolId_not?: InputMaybe<Scalars['String']>;
  poolId_gt?: InputMaybe<Scalars['String']>;
  poolId_lt?: InputMaybe<Scalars['String']>;
  poolId_gte?: InputMaybe<Scalars['String']>;
  poolId_lte?: InputMaybe<Scalars['String']>;
  poolId_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_contains?: InputMaybe<Scalars['String']>;
  poolId_not_contains?: InputMaybe<Scalars['String']>;
  poolId_starts_with?: InputMaybe<Scalars['String']>;
  poolId_not_starts_with?: InputMaybe<Scalars['String']>;
  poolId_ends_with?: InputMaybe<Scalars['String']>;
  poolId_not_ends_with?: InputMaybe<Scalars['String']>;
  userAddress?: InputMaybe<Scalars['String']>;
  userAddress_not?: InputMaybe<Scalars['String']>;
  userAddress_gt?: InputMaybe<Scalars['String']>;
  userAddress_lt?: InputMaybe<Scalars['String']>;
  userAddress_gte?: InputMaybe<Scalars['String']>;
  userAddress_lte?: InputMaybe<Scalars['String']>;
  userAddress_in?: InputMaybe<Array<Scalars['String']>>;
  userAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  userAddress_contains?: InputMaybe<Scalars['String']>;
  userAddress_not_contains?: InputMaybe<Scalars['String']>;
  userAddress_starts_with?: InputMaybe<Scalars['String']>;
  userAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  userAddress_ends_with?: InputMaybe<Scalars['String']>;
  userAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  tx?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  tx_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  tx_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  tx_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  tx_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  tx_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  valueUSD?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  valueUSD_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  valueUSD_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  valueUSD_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  valueUSD_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  valueUSD_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  valueUSD_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  valueUSD_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
};

export type BalancerSubgraph_Swap_orderBy =
  | 'id'
  | 'caller'
  | 'tokenIn'
  | 'tokenInSym'
  | 'tokenOut'
  | 'tokenOutSym'
  | 'tokenAmountIn'
  | 'tokenAmountOut'
  | 'poolId'
  | 'userAddress'
  | 'timestamp'
  | 'tx'
  | 'valueUSD';

export type BalancerSubgraph_Token = {
  id: Scalars['ID'];
  symbol?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  decimals: Scalars['Int'];
  address: Scalars['String'];
  totalBalanceUSD: Scalars['BalancerSubgraph_BigDecimal'];
  totalBalanceNotional: Scalars['BalancerSubgraph_BigDecimal'];
  totalVolumeUSD: Scalars['BalancerSubgraph_BigDecimal'];
  totalVolumeNotional: Scalars['BalancerSubgraph_BigDecimal'];
  totalSwapCount: Scalars['BigInt'];
  latestPrice?: Maybe<BalancerSubgraph_LatestPrice>;
};

export type BalancerSubgraph_TokenPrice = {
  id: Scalars['ID'];
  poolId: BalancerSubgraph_Pool;
  asset: Scalars['BalancerSubgraph_Bytes'];
  amount: Scalars['BalancerSubgraph_BigDecimal'];
  pricingAsset: Scalars['BalancerSubgraph_Bytes'];
  price: Scalars['BalancerSubgraph_BigDecimal'];
  block: Scalars['BigInt'];
  timestamp: Scalars['Int'];
  priceUSD: Scalars['BalancerSubgraph_BigDecimal'];
};

export type BalancerSubgraph_TokenPrice_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  poolId?: InputMaybe<Scalars['String']>;
  poolId_not?: InputMaybe<Scalars['String']>;
  poolId_gt?: InputMaybe<Scalars['String']>;
  poolId_lt?: InputMaybe<Scalars['String']>;
  poolId_gte?: InputMaybe<Scalars['String']>;
  poolId_lte?: InputMaybe<Scalars['String']>;
  poolId_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_contains?: InputMaybe<Scalars['String']>;
  poolId_not_contains?: InputMaybe<Scalars['String']>;
  poolId_starts_with?: InputMaybe<Scalars['String']>;
  poolId_not_starts_with?: InputMaybe<Scalars['String']>;
  poolId_ends_with?: InputMaybe<Scalars['String']>;
  poolId_not_ends_with?: InputMaybe<Scalars['String']>;
  asset?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  asset_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  amount?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  amount_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  pricingAsset?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  pricingAsset_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  pricingAsset_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  pricingAsset_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  pricingAsset_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  pricingAsset_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  price?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  price_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  price_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  price_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  price_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  price_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  price_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  price_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  priceUSD?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  priceUSD_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  priceUSD_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  priceUSD_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  priceUSD_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  priceUSD_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  priceUSD_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  priceUSD_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
};

export type BalancerSubgraph_TokenPrice_orderBy =
  | 'id'
  | 'poolId'
  | 'asset'
  | 'amount'
  | 'pricingAsset'
  | 'price'
  | 'block'
  | 'timestamp'
  | 'priceUSD';

export type BalancerSubgraph_TokenSnapshot = {
  id: Scalars['ID'];
  token: BalancerSubgraph_Token;
  timestamp: Scalars['Int'];
  totalBalanceUSD: Scalars['BalancerSubgraph_BigDecimal'];
  totalBalanceNotional: Scalars['BalancerSubgraph_BigDecimal'];
  totalVolumeUSD: Scalars['BalancerSubgraph_BigDecimal'];
  totalVolumeNotional: Scalars['BalancerSubgraph_BigDecimal'];
  totalSwapCount: Scalars['BigInt'];
};

export type BalancerSubgraph_TokenSnapshot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  token?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  totalBalanceUSD?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceUSD_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceUSD_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceUSD_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceUSD_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceUSD_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceUSD_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalBalanceUSD_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalBalanceNotional?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceNotional_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceNotional_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceNotional_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceNotional_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceNotional_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceNotional_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalBalanceNotional_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalVolumeUSD?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeUSD_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeUSD_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeUSD_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeUSD_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeUSD_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeUSD_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalVolumeUSD_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalVolumeNotional?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeNotional_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeNotional_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeNotional_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeNotional_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeNotional_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeNotional_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalVolumeNotional_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapCount?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_not?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_gt?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_lt?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_gte?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_lte?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSwapCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type BalancerSubgraph_TokenSnapshot_orderBy =
  | 'id'
  | 'token'
  | 'timestamp'
  | 'totalBalanceUSD'
  | 'totalBalanceNotional'
  | 'totalVolumeUSD'
  | 'totalVolumeNotional'
  | 'totalSwapCount';

export type BalancerSubgraph_Token_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  decimals?: InputMaybe<Scalars['Int']>;
  decimals_not?: InputMaybe<Scalars['Int']>;
  decimals_gt?: InputMaybe<Scalars['Int']>;
  decimals_lt?: InputMaybe<Scalars['Int']>;
  decimals_gte?: InputMaybe<Scalars['Int']>;
  decimals_lte?: InputMaybe<Scalars['Int']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']>>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']>>;
  address?: InputMaybe<Scalars['String']>;
  address_not?: InputMaybe<Scalars['String']>;
  address_gt?: InputMaybe<Scalars['String']>;
  address_lt?: InputMaybe<Scalars['String']>;
  address_gte?: InputMaybe<Scalars['String']>;
  address_lte?: InputMaybe<Scalars['String']>;
  address_in?: InputMaybe<Array<Scalars['String']>>;
  address_not_in?: InputMaybe<Array<Scalars['String']>>;
  address_contains?: InputMaybe<Scalars['String']>;
  address_not_contains?: InputMaybe<Scalars['String']>;
  address_starts_with?: InputMaybe<Scalars['String']>;
  address_not_starts_with?: InputMaybe<Scalars['String']>;
  address_ends_with?: InputMaybe<Scalars['String']>;
  address_not_ends_with?: InputMaybe<Scalars['String']>;
  totalBalanceUSD?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceUSD_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceUSD_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceUSD_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceUSD_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceUSD_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceUSD_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalBalanceUSD_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalBalanceNotional?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceNotional_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceNotional_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceNotional_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceNotional_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceNotional_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceNotional_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalBalanceNotional_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalVolumeUSD?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeUSD_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeUSD_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeUSD_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeUSD_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeUSD_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeUSD_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalVolumeUSD_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalVolumeNotional?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeNotional_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeNotional_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeNotional_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeNotional_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeNotional_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeNotional_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalVolumeNotional_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapCount?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_not?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_gt?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_lt?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_gte?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_lte?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSwapCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  latestPrice?: InputMaybe<Scalars['String']>;
  latestPrice_not?: InputMaybe<Scalars['String']>;
  latestPrice_gt?: InputMaybe<Scalars['String']>;
  latestPrice_lt?: InputMaybe<Scalars['String']>;
  latestPrice_gte?: InputMaybe<Scalars['String']>;
  latestPrice_lte?: InputMaybe<Scalars['String']>;
  latestPrice_in?: InputMaybe<Array<Scalars['String']>>;
  latestPrice_not_in?: InputMaybe<Array<Scalars['String']>>;
  latestPrice_contains?: InputMaybe<Scalars['String']>;
  latestPrice_not_contains?: InputMaybe<Scalars['String']>;
  latestPrice_starts_with?: InputMaybe<Scalars['String']>;
  latestPrice_not_starts_with?: InputMaybe<Scalars['String']>;
  latestPrice_ends_with?: InputMaybe<Scalars['String']>;
  latestPrice_not_ends_with?: InputMaybe<Scalars['String']>;
};

export type BalancerSubgraph_Token_orderBy =
  | 'id'
  | 'symbol'
  | 'name'
  | 'decimals'
  | 'address'
  | 'totalBalanceUSD'
  | 'totalBalanceNotional'
  | 'totalVolumeUSD'
  | 'totalVolumeNotional'
  | 'totalSwapCount'
  | 'latestPrice';

export type BalancerSubgraph_TradePair = {
  /** Token Address - Token Address */
  id: Scalars['ID'];
  token0: BalancerSubgraph_Token;
  token1: BalancerSubgraph_Token;
  totalSwapVolume: Scalars['BalancerSubgraph_BigDecimal'];
  totalSwapFee: Scalars['BalancerSubgraph_BigDecimal'];
};

export type BalancerSubgraph_TradePairSnapshot = {
  id: Scalars['ID'];
  pair: BalancerSubgraph_TradePair;
  timestamp: Scalars['Int'];
  totalSwapVolume: Scalars['BalancerSubgraph_BigDecimal'];
  totalSwapFee: Scalars['BalancerSubgraph_BigDecimal'];
};

export type BalancerSubgraph_TradePairSnapshot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  pair?: InputMaybe<Scalars['String']>;
  pair_not?: InputMaybe<Scalars['String']>;
  pair_gt?: InputMaybe<Scalars['String']>;
  pair_lt?: InputMaybe<Scalars['String']>;
  pair_gte?: InputMaybe<Scalars['String']>;
  pair_lte?: InputMaybe<Scalars['String']>;
  pair_in?: InputMaybe<Array<Scalars['String']>>;
  pair_not_in?: InputMaybe<Array<Scalars['String']>>;
  pair_contains?: InputMaybe<Scalars['String']>;
  pair_not_contains?: InputMaybe<Scalars['String']>;
  pair_starts_with?: InputMaybe<Scalars['String']>;
  pair_not_starts_with?: InputMaybe<Scalars['String']>;
  pair_ends_with?: InputMaybe<Scalars['String']>;
  pair_not_ends_with?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  totalSwapVolume?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapVolume_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapFee?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapFee_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
};

export type BalancerSubgraph_TradePairSnapshot_orderBy =
  | 'id'
  | 'pair'
  | 'timestamp'
  | 'totalSwapVolume'
  | 'totalSwapFee';

export type BalancerSubgraph_TradePair_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  token0?: InputMaybe<Scalars['String']>;
  token0_not?: InputMaybe<Scalars['String']>;
  token0_gt?: InputMaybe<Scalars['String']>;
  token0_lt?: InputMaybe<Scalars['String']>;
  token0_gte?: InputMaybe<Scalars['String']>;
  token0_lte?: InputMaybe<Scalars['String']>;
  token0_in?: InputMaybe<Array<Scalars['String']>>;
  token0_not_in?: InputMaybe<Array<Scalars['String']>>;
  token0_contains?: InputMaybe<Scalars['String']>;
  token0_not_contains?: InputMaybe<Scalars['String']>;
  token0_starts_with?: InputMaybe<Scalars['String']>;
  token0_not_starts_with?: InputMaybe<Scalars['String']>;
  token0_ends_with?: InputMaybe<Scalars['String']>;
  token0_not_ends_with?: InputMaybe<Scalars['String']>;
  token1?: InputMaybe<Scalars['String']>;
  token1_not?: InputMaybe<Scalars['String']>;
  token1_gt?: InputMaybe<Scalars['String']>;
  token1_lt?: InputMaybe<Scalars['String']>;
  token1_gte?: InputMaybe<Scalars['String']>;
  token1_lte?: InputMaybe<Scalars['String']>;
  token1_in?: InputMaybe<Array<Scalars['String']>>;
  token1_not_in?: InputMaybe<Array<Scalars['String']>>;
  token1_contains?: InputMaybe<Scalars['String']>;
  token1_not_contains?: InputMaybe<Scalars['String']>;
  token1_starts_with?: InputMaybe<Scalars['String']>;
  token1_not_starts_with?: InputMaybe<Scalars['String']>;
  token1_ends_with?: InputMaybe<Scalars['String']>;
  token1_not_ends_with?: InputMaybe<Scalars['String']>;
  totalSwapVolume?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapVolume_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapFee?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapFee_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
};

export type BalancerSubgraph_TradePair_orderBy =
  | 'id'
  | 'token0'
  | 'token1'
  | 'totalSwapVolume'
  | 'totalSwapFee';

export type BalancerSubgraph_User = {
  id: Scalars['ID'];
  sharesOwned?: Maybe<Array<BalancerSubgraph_PoolShare>>;
  swaps?: Maybe<Array<BalancerSubgraph_Swap>>;
  userInternalBalances?: Maybe<Array<BalancerSubgraph_UserInternalBalance>>;
};


export type BalancerSubgraph_UsersharesOwnedArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_PoolShare_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_PoolShare_filter>;
};


export type BalancerSubgraph_UserswapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_Swap_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_Swap_filter>;
};


export type BalancerSubgraph_UseruserInternalBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_UserInternalBalance_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_UserInternalBalance_filter>;
};

export type BalancerSubgraph_UserInternalBalance = {
  id: Scalars['ID'];
  userAddress?: Maybe<BalancerSubgraph_User>;
  token: Scalars['BalancerSubgraph_Bytes'];
  balance: Scalars['BalancerSubgraph_BigDecimal'];
};

export type BalancerSubgraph_UserInternalBalance_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  userAddress?: InputMaybe<Scalars['String']>;
  userAddress_not?: InputMaybe<Scalars['String']>;
  userAddress_gt?: InputMaybe<Scalars['String']>;
  userAddress_lt?: InputMaybe<Scalars['String']>;
  userAddress_gte?: InputMaybe<Scalars['String']>;
  userAddress_lte?: InputMaybe<Scalars['String']>;
  userAddress_in?: InputMaybe<Array<Scalars['String']>>;
  userAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  userAddress_contains?: InputMaybe<Scalars['String']>;
  userAddress_not_contains?: InputMaybe<Scalars['String']>;
  userAddress_starts_with?: InputMaybe<Scalars['String']>;
  userAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  userAddress_ends_with?: InputMaybe<Scalars['String']>;
  userAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  token_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  token_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  token_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  token_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  token_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  balance?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  balance_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  balance_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  balance_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  balance_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  balance_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  balance_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  balance_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
};

export type BalancerSubgraph_UserInternalBalance_orderBy =
  | 'id'
  | 'userAddress'
  | 'token'
  | 'balance';

export type BalancerSubgraph_User_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
};

export type BalancerSubgraph_User_orderBy =
  | 'id'
  | 'sharesOwned'
  | 'swaps'
  | 'userInternalBalances';

export type BalancerSubgraph__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['BalancerSubgraph_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type BalancerSubgraph__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: BalancerSubgraph__Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  Subscription: ResolverTypeWrapper<{}>;
  BeetsBarSubgraph_Bar: ResolverTypeWrapper<BeetsBarSubgraph_Bar>;
  BeetsBarSubgraph_Bar_filter: BeetsBarSubgraph_Bar_filter;
  BeetsBarSubgraph_Bar_orderBy: BeetsBarSubgraph_Bar_orderBy;
  BeetsBarSubgraph_BigDecimal: ResolverTypeWrapper<Scalars['BeetsBarSubgraph_BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BeetsBarSubgraph_Block_height: BeetsBarSubgraph_Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  BeetsBarSubgraph_Bytes: ResolverTypeWrapper<Scalars['BeetsBarSubgraph_Bytes']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  BeetsBarSubgraph_OrderDirection: BeetsBarSubgraph_OrderDirection;
  String: ResolverTypeWrapper<Scalars['String']>;
  BeetsBarSubgraph_User: ResolverTypeWrapper<BeetsBarSubgraph_User>;
  BeetsBarSubgraph_User_filter: BeetsBarSubgraph_User_filter;
  BeetsBarSubgraph_User_orderBy: BeetsBarSubgraph_User_orderBy;
  BeetsBarSubgraph__Block_: ResolverTypeWrapper<BeetsBarSubgraph__Block_>;
  BeetsBarSubgraph__Meta_: ResolverTypeWrapper<BeetsBarSubgraph__Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
  MasterchefSubgraph_BigDecimal: ResolverTypeWrapper<Scalars['MasterchefSubgraph_BigDecimal']>;
  MasterchefSubgraph_Block_height: MasterchefSubgraph_Block_height;
  MasterchefSubgraph_Bytes: ResolverTypeWrapper<Scalars['MasterchefSubgraph_Bytes']>;
  MasterchefSubgraph_HarvestAction: ResolverTypeWrapper<MasterchefSubgraph_HarvestAction>;
  MasterchefSubgraph_HarvestAction_filter: MasterchefSubgraph_HarvestAction_filter;
  MasterchefSubgraph_HarvestAction_orderBy: MasterchefSubgraph_HarvestAction_orderBy;
  MasterchefSubgraph_MasterChef: ResolverTypeWrapper<MasterchefSubgraph_MasterChef>;
  MasterchefSubgraph_MasterChef_filter: MasterchefSubgraph_MasterChef_filter;
  MasterchefSubgraph_MasterChef_orderBy: MasterchefSubgraph_MasterChef_orderBy;
  MasterchefSubgraph_OrderDirection: MasterchefSubgraph_OrderDirection;
  MasterchefSubgraph_Pool: ResolverTypeWrapper<MasterchefSubgraph_Pool>;
  MasterchefSubgraph_Pool_filter: MasterchefSubgraph_Pool_filter;
  MasterchefSubgraph_Pool_orderBy: MasterchefSubgraph_Pool_orderBy;
  MasterchefSubgraph_RewardToken: ResolverTypeWrapper<MasterchefSubgraph_RewardToken>;
  MasterchefSubgraph_RewardToken_filter: MasterchefSubgraph_RewardToken_filter;
  MasterchefSubgraph_RewardToken_orderBy: MasterchefSubgraph_RewardToken_orderBy;
  MasterchefSubgraph_Rewarder: ResolverTypeWrapper<MasterchefSubgraph_Rewarder>;
  MasterchefSubgraph_Rewarder_filter: MasterchefSubgraph_Rewarder_filter;
  MasterchefSubgraph_Rewarder_orderBy: MasterchefSubgraph_Rewarder_orderBy;
  MasterchefSubgraph_User: ResolverTypeWrapper<MasterchefSubgraph_User>;
  MasterchefSubgraph_User_filter: MasterchefSubgraph_User_filter;
  MasterchefSubgraph_User_orderBy: MasterchefSubgraph_User_orderBy;
  MasterchefSubgraph__Block_: ResolverTypeWrapper<MasterchefSubgraph__Block_>;
  MasterchefSubgraph__Meta_: ResolverTypeWrapper<MasterchefSubgraph__Meta_>;
  BlocksSubgraph_BigDecimal: ResolverTypeWrapper<Scalars['BlocksSubgraph_BigDecimal']>;
  BlocksSubgraph_Block: ResolverTypeWrapper<BlocksSubgraph_Block>;
  BlocksSubgraph_BlockChangedFilter: BlocksSubgraph_BlockChangedFilter;
  BlocksSubgraph_Block_filter: BlocksSubgraph_Block_filter;
  BlocksSubgraph_Block_height: BlocksSubgraph_Block_height;
  BlocksSubgraph_Block_orderBy: BlocksSubgraph_Block_orderBy;
  BlocksSubgraph_Bytes: ResolverTypeWrapper<Scalars['BlocksSubgraph_Bytes']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  BlocksSubgraph_OrderDirection: BlocksSubgraph_OrderDirection;
  BlocksSubgraph__Block_: ResolverTypeWrapper<BlocksSubgraph__Block_>;
  BlocksSubgraph__Meta_: ResolverTypeWrapper<BlocksSubgraph__Meta_>;
  BalancerSubgraph_AmpUpdate: ResolverTypeWrapper<BalancerSubgraph_AmpUpdate>;
  BalancerSubgraph_AmpUpdate_filter: BalancerSubgraph_AmpUpdate_filter;
  BalancerSubgraph_AmpUpdate_orderBy: BalancerSubgraph_AmpUpdate_orderBy;
  BalancerSubgraph_Balancer: ResolverTypeWrapper<BalancerSubgraph_Balancer>;
  BalancerSubgraph_BalancerSnapshot: ResolverTypeWrapper<BalancerSubgraph_BalancerSnapshot>;
  BalancerSubgraph_BalancerSnapshot_filter: BalancerSubgraph_BalancerSnapshot_filter;
  BalancerSubgraph_BalancerSnapshot_orderBy: BalancerSubgraph_BalancerSnapshot_orderBy;
  BalancerSubgraph_Balancer_filter: BalancerSubgraph_Balancer_filter;
  BalancerSubgraph_Balancer_orderBy: BalancerSubgraph_Balancer_orderBy;
  BalancerSubgraph_BigDecimal: ResolverTypeWrapper<Scalars['BalancerSubgraph_BigDecimal']>;
  BalancerSubgraph_Block_height: BalancerSubgraph_Block_height;
  BalancerSubgraph_Bytes: ResolverTypeWrapper<Scalars['BalancerSubgraph_Bytes']>;
  BalancerSubgraph_GradualWeightUpdate: ResolverTypeWrapper<BalancerSubgraph_GradualWeightUpdate>;
  BalancerSubgraph_GradualWeightUpdate_filter: BalancerSubgraph_GradualWeightUpdate_filter;
  BalancerSubgraph_GradualWeightUpdate_orderBy: BalancerSubgraph_GradualWeightUpdate_orderBy;
  BalancerSubgraph_InvestType: BalancerSubgraph_InvestType;
  BalancerSubgraph_Investment: ResolverTypeWrapper<BalancerSubgraph_Investment>;
  BalancerSubgraph_Investment_filter: BalancerSubgraph_Investment_filter;
  BalancerSubgraph_Investment_orderBy: BalancerSubgraph_Investment_orderBy;
  BalancerSubgraph_JoinExit: ResolverTypeWrapper<BalancerSubgraph_JoinExit>;
  BalancerSubgraph_JoinExit_filter: BalancerSubgraph_JoinExit_filter;
  BalancerSubgraph_JoinExit_orderBy: BalancerSubgraph_JoinExit_orderBy;
  BalancerSubgraph_LatestPrice: ResolverTypeWrapper<BalancerSubgraph_LatestPrice>;
  BalancerSubgraph_LatestPrice_filter: BalancerSubgraph_LatestPrice_filter;
  BalancerSubgraph_LatestPrice_orderBy: BalancerSubgraph_LatestPrice_orderBy;
  BalancerSubgraph_OrderDirection: BalancerSubgraph_OrderDirection;
  BalancerSubgraph_Pool: ResolverTypeWrapper<BalancerSubgraph_Pool>;
  BalancerSubgraph_PoolHistoricalLiquidity: ResolverTypeWrapper<BalancerSubgraph_PoolHistoricalLiquidity>;
  BalancerSubgraph_PoolHistoricalLiquidity_filter: BalancerSubgraph_PoolHistoricalLiquidity_filter;
  BalancerSubgraph_PoolHistoricalLiquidity_orderBy: BalancerSubgraph_PoolHistoricalLiquidity_orderBy;
  BalancerSubgraph_PoolShare: ResolverTypeWrapper<BalancerSubgraph_PoolShare>;
  BalancerSubgraph_PoolShare_filter: BalancerSubgraph_PoolShare_filter;
  BalancerSubgraph_PoolShare_orderBy: BalancerSubgraph_PoolShare_orderBy;
  BalancerSubgraph_PoolSnapshot: ResolverTypeWrapper<BalancerSubgraph_PoolSnapshot>;
  BalancerSubgraph_PoolSnapshot_filter: BalancerSubgraph_PoolSnapshot_filter;
  BalancerSubgraph_PoolSnapshot_orderBy: BalancerSubgraph_PoolSnapshot_orderBy;
  BalancerSubgraph_PoolToken: ResolverTypeWrapper<BalancerSubgraph_PoolToken>;
  BalancerSubgraph_PoolToken_filter: BalancerSubgraph_PoolToken_filter;
  BalancerSubgraph_PoolToken_orderBy: BalancerSubgraph_PoolToken_orderBy;
  BalancerSubgraph_Pool_filter: BalancerSubgraph_Pool_filter;
  BalancerSubgraph_Pool_orderBy: BalancerSubgraph_Pool_orderBy;
  BalancerSubgraph_PriceRateProvider: ResolverTypeWrapper<BalancerSubgraph_PriceRateProvider>;
  BalancerSubgraph_PriceRateProvider_filter: BalancerSubgraph_PriceRateProvider_filter;
  BalancerSubgraph_PriceRateProvider_orderBy: BalancerSubgraph_PriceRateProvider_orderBy;
  BalancerSubgraph_Swap: ResolverTypeWrapper<BalancerSubgraph_Swap>;
  BalancerSubgraph_Swap_filter: BalancerSubgraph_Swap_filter;
  BalancerSubgraph_Swap_orderBy: BalancerSubgraph_Swap_orderBy;
  BalancerSubgraph_Token: ResolverTypeWrapper<BalancerSubgraph_Token>;
  BalancerSubgraph_TokenPrice: ResolverTypeWrapper<BalancerSubgraph_TokenPrice>;
  BalancerSubgraph_TokenPrice_filter: BalancerSubgraph_TokenPrice_filter;
  BalancerSubgraph_TokenPrice_orderBy: BalancerSubgraph_TokenPrice_orderBy;
  BalancerSubgraph_TokenSnapshot: ResolverTypeWrapper<BalancerSubgraph_TokenSnapshot>;
  BalancerSubgraph_TokenSnapshot_filter: BalancerSubgraph_TokenSnapshot_filter;
  BalancerSubgraph_TokenSnapshot_orderBy: BalancerSubgraph_TokenSnapshot_orderBy;
  BalancerSubgraph_Token_filter: BalancerSubgraph_Token_filter;
  BalancerSubgraph_Token_orderBy: BalancerSubgraph_Token_orderBy;
  BalancerSubgraph_TradePair: ResolverTypeWrapper<BalancerSubgraph_TradePair>;
  BalancerSubgraph_TradePairSnapshot: ResolverTypeWrapper<BalancerSubgraph_TradePairSnapshot>;
  BalancerSubgraph_TradePairSnapshot_filter: BalancerSubgraph_TradePairSnapshot_filter;
  BalancerSubgraph_TradePairSnapshot_orderBy: BalancerSubgraph_TradePairSnapshot_orderBy;
  BalancerSubgraph_TradePair_filter: BalancerSubgraph_TradePair_filter;
  BalancerSubgraph_TradePair_orderBy: BalancerSubgraph_TradePair_orderBy;
  BalancerSubgraph_User: ResolverTypeWrapper<BalancerSubgraph_User>;
  BalancerSubgraph_UserInternalBalance: ResolverTypeWrapper<BalancerSubgraph_UserInternalBalance>;
  BalancerSubgraph_UserInternalBalance_filter: BalancerSubgraph_UserInternalBalance_filter;
  BalancerSubgraph_UserInternalBalance_orderBy: BalancerSubgraph_UserInternalBalance_orderBy;
  BalancerSubgraph_User_filter: BalancerSubgraph_User_filter;
  BalancerSubgraph_User_orderBy: BalancerSubgraph_User_orderBy;
  BalancerSubgraph__Block_: ResolverTypeWrapper<BalancerSubgraph__Block_>;
  BalancerSubgraph__Meta_: ResolverTypeWrapper<BalancerSubgraph__Meta_>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  Subscription: {};
  BeetsBarSubgraph_Bar: BeetsBarSubgraph_Bar;
  BeetsBarSubgraph_Bar_filter: BeetsBarSubgraph_Bar_filter;
  BeetsBarSubgraph_BigDecimal: Scalars['BeetsBarSubgraph_BigDecimal'];
  BigInt: Scalars['BigInt'];
  BeetsBarSubgraph_Block_height: BeetsBarSubgraph_Block_height;
  Boolean: Scalars['Boolean'];
  BeetsBarSubgraph_Bytes: Scalars['BeetsBarSubgraph_Bytes'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  String: Scalars['String'];
  BeetsBarSubgraph_User: BeetsBarSubgraph_User;
  BeetsBarSubgraph_User_filter: BeetsBarSubgraph_User_filter;
  BeetsBarSubgraph__Block_: BeetsBarSubgraph__Block_;
  BeetsBarSubgraph__Meta_: BeetsBarSubgraph__Meta_;
  MasterchefSubgraph_BigDecimal: Scalars['MasterchefSubgraph_BigDecimal'];
  MasterchefSubgraph_Block_height: MasterchefSubgraph_Block_height;
  MasterchefSubgraph_Bytes: Scalars['MasterchefSubgraph_Bytes'];
  MasterchefSubgraph_HarvestAction: MasterchefSubgraph_HarvestAction;
  MasterchefSubgraph_HarvestAction_filter: MasterchefSubgraph_HarvestAction_filter;
  MasterchefSubgraph_MasterChef: MasterchefSubgraph_MasterChef;
  MasterchefSubgraph_MasterChef_filter: MasterchefSubgraph_MasterChef_filter;
  MasterchefSubgraph_Pool: MasterchefSubgraph_Pool;
  MasterchefSubgraph_Pool_filter: MasterchefSubgraph_Pool_filter;
  MasterchefSubgraph_RewardToken: MasterchefSubgraph_RewardToken;
  MasterchefSubgraph_RewardToken_filter: MasterchefSubgraph_RewardToken_filter;
  MasterchefSubgraph_Rewarder: MasterchefSubgraph_Rewarder;
  MasterchefSubgraph_Rewarder_filter: MasterchefSubgraph_Rewarder_filter;
  MasterchefSubgraph_User: MasterchefSubgraph_User;
  MasterchefSubgraph_User_filter: MasterchefSubgraph_User_filter;
  MasterchefSubgraph__Block_: MasterchefSubgraph__Block_;
  MasterchefSubgraph__Meta_: MasterchefSubgraph__Meta_;
  BlocksSubgraph_BigDecimal: Scalars['BlocksSubgraph_BigDecimal'];
  BlocksSubgraph_Block: BlocksSubgraph_Block;
  BlocksSubgraph_BlockChangedFilter: BlocksSubgraph_BlockChangedFilter;
  BlocksSubgraph_Block_filter: BlocksSubgraph_Block_filter;
  BlocksSubgraph_Block_height: BlocksSubgraph_Block_height;
  BlocksSubgraph_Bytes: Scalars['BlocksSubgraph_Bytes'];
  Float: Scalars['Float'];
  BlocksSubgraph__Block_: BlocksSubgraph__Block_;
  BlocksSubgraph__Meta_: BlocksSubgraph__Meta_;
  BalancerSubgraph_AmpUpdate: BalancerSubgraph_AmpUpdate;
  BalancerSubgraph_AmpUpdate_filter: BalancerSubgraph_AmpUpdate_filter;
  BalancerSubgraph_Balancer: BalancerSubgraph_Balancer;
  BalancerSubgraph_BalancerSnapshot: BalancerSubgraph_BalancerSnapshot;
  BalancerSubgraph_BalancerSnapshot_filter: BalancerSubgraph_BalancerSnapshot_filter;
  BalancerSubgraph_Balancer_filter: BalancerSubgraph_Balancer_filter;
  BalancerSubgraph_BigDecimal: Scalars['BalancerSubgraph_BigDecimal'];
  BalancerSubgraph_Block_height: BalancerSubgraph_Block_height;
  BalancerSubgraph_Bytes: Scalars['BalancerSubgraph_Bytes'];
  BalancerSubgraph_GradualWeightUpdate: BalancerSubgraph_GradualWeightUpdate;
  BalancerSubgraph_GradualWeightUpdate_filter: BalancerSubgraph_GradualWeightUpdate_filter;
  BalancerSubgraph_Investment: BalancerSubgraph_Investment;
  BalancerSubgraph_Investment_filter: BalancerSubgraph_Investment_filter;
  BalancerSubgraph_JoinExit: BalancerSubgraph_JoinExit;
  BalancerSubgraph_JoinExit_filter: BalancerSubgraph_JoinExit_filter;
  BalancerSubgraph_LatestPrice: BalancerSubgraph_LatestPrice;
  BalancerSubgraph_LatestPrice_filter: BalancerSubgraph_LatestPrice_filter;
  BalancerSubgraph_Pool: BalancerSubgraph_Pool;
  BalancerSubgraph_PoolHistoricalLiquidity: BalancerSubgraph_PoolHistoricalLiquidity;
  BalancerSubgraph_PoolHistoricalLiquidity_filter: BalancerSubgraph_PoolHistoricalLiquidity_filter;
  BalancerSubgraph_PoolShare: BalancerSubgraph_PoolShare;
  BalancerSubgraph_PoolShare_filter: BalancerSubgraph_PoolShare_filter;
  BalancerSubgraph_PoolSnapshot: BalancerSubgraph_PoolSnapshot;
  BalancerSubgraph_PoolSnapshot_filter: BalancerSubgraph_PoolSnapshot_filter;
  BalancerSubgraph_PoolToken: BalancerSubgraph_PoolToken;
  BalancerSubgraph_PoolToken_filter: BalancerSubgraph_PoolToken_filter;
  BalancerSubgraph_Pool_filter: BalancerSubgraph_Pool_filter;
  BalancerSubgraph_PriceRateProvider: BalancerSubgraph_PriceRateProvider;
  BalancerSubgraph_PriceRateProvider_filter: BalancerSubgraph_PriceRateProvider_filter;
  BalancerSubgraph_Swap: BalancerSubgraph_Swap;
  BalancerSubgraph_Swap_filter: BalancerSubgraph_Swap_filter;
  BalancerSubgraph_Token: BalancerSubgraph_Token;
  BalancerSubgraph_TokenPrice: BalancerSubgraph_TokenPrice;
  BalancerSubgraph_TokenPrice_filter: BalancerSubgraph_TokenPrice_filter;
  BalancerSubgraph_TokenSnapshot: BalancerSubgraph_TokenSnapshot;
  BalancerSubgraph_TokenSnapshot_filter: BalancerSubgraph_TokenSnapshot_filter;
  BalancerSubgraph_Token_filter: BalancerSubgraph_Token_filter;
  BalancerSubgraph_TradePair: BalancerSubgraph_TradePair;
  BalancerSubgraph_TradePairSnapshot: BalancerSubgraph_TradePairSnapshot;
  BalancerSubgraph_TradePairSnapshot_filter: BalancerSubgraph_TradePairSnapshot_filter;
  BalancerSubgraph_TradePair_filter: BalancerSubgraph_TradePair_filter;
  BalancerSubgraph_User: BalancerSubgraph_User;
  BalancerSubgraph_UserInternalBalance: BalancerSubgraph_UserInternalBalance;
  BalancerSubgraph_UserInternalBalance_filter: BalancerSubgraph_UserInternalBalance_filter;
  BalancerSubgraph_User_filter: BalancerSubgraph_User_filter;
  BalancerSubgraph__Block_: BalancerSubgraph__Block_;
  BalancerSubgraph__Meta_: BalancerSubgraph__Meta_;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  BeetsBarSubgraph_bar?: Resolver<Maybe<ResolversTypes['BeetsBarSubgraph_Bar']>, ParentType, ContextType, RequireFields<QueryBeetsBarSubgraph_barArgs, 'id'>>;
  BeetsBarSubgraph_bars?: Resolver<Array<ResolversTypes['BeetsBarSubgraph_Bar']>, ParentType, ContextType, RequireFields<QueryBeetsBarSubgraph_barsArgs, 'skip' | 'first'>>;
  BeetsBarSubgraph_user?: Resolver<Maybe<ResolversTypes['BeetsBarSubgraph_User']>, ParentType, ContextType, RequireFields<QueryBeetsBarSubgraph_userArgs, 'id'>>;
  BeetsBarSubgraph_users?: Resolver<Array<ResolversTypes['BeetsBarSubgraph_User']>, ParentType, ContextType, RequireFields<QueryBeetsBarSubgraph_usersArgs, 'skip' | 'first'>>;
  BeetsBarSubgraph__meta?: Resolver<Maybe<ResolversTypes['BeetsBarSubgraph__Meta_']>, ParentType, ContextType, Partial<QueryBeetsBarSubgraph__metaArgs>>;
  MasterchefSubgraph_masterChef?: Resolver<Maybe<ResolversTypes['MasterchefSubgraph_MasterChef']>, ParentType, ContextType, RequireFields<QueryMasterchefSubgraph_masterChefArgs, 'id'>>;
  MasterchefSubgraph_masterChefs?: Resolver<Array<ResolversTypes['MasterchefSubgraph_MasterChef']>, ParentType, ContextType, RequireFields<QueryMasterchefSubgraph_masterChefsArgs, 'skip' | 'first'>>;
  MasterchefSubgraph_pool?: Resolver<Maybe<ResolversTypes['MasterchefSubgraph_Pool']>, ParentType, ContextType, RequireFields<QueryMasterchefSubgraph_poolArgs, 'id'>>;
  MasterchefSubgraph_pools?: Resolver<Array<ResolversTypes['MasterchefSubgraph_Pool']>, ParentType, ContextType, RequireFields<QueryMasterchefSubgraph_poolsArgs, 'skip' | 'first'>>;
  MasterchefSubgraph_rewardToken?: Resolver<Maybe<ResolversTypes['MasterchefSubgraph_RewardToken']>, ParentType, ContextType, RequireFields<QueryMasterchefSubgraph_rewardTokenArgs, 'id'>>;
  MasterchefSubgraph_rewardTokens?: Resolver<Array<ResolversTypes['MasterchefSubgraph_RewardToken']>, ParentType, ContextType, RequireFields<QueryMasterchefSubgraph_rewardTokensArgs, 'skip' | 'first'>>;
  MasterchefSubgraph_rewarder?: Resolver<Maybe<ResolversTypes['MasterchefSubgraph_Rewarder']>, ParentType, ContextType, RequireFields<QueryMasterchefSubgraph_rewarderArgs, 'id'>>;
  MasterchefSubgraph_rewarders?: Resolver<Array<ResolversTypes['MasterchefSubgraph_Rewarder']>, ParentType, ContextType, RequireFields<QueryMasterchefSubgraph_rewardersArgs, 'skip' | 'first'>>;
  MasterchefSubgraph_harvestAction?: Resolver<Maybe<ResolversTypes['MasterchefSubgraph_HarvestAction']>, ParentType, ContextType, RequireFields<QueryMasterchefSubgraph_harvestActionArgs, 'id'>>;
  MasterchefSubgraph_harvestActions?: Resolver<Array<ResolversTypes['MasterchefSubgraph_HarvestAction']>, ParentType, ContextType, RequireFields<QueryMasterchefSubgraph_harvestActionsArgs, 'skip' | 'first'>>;
  MasterchefSubgraph_user?: Resolver<Maybe<ResolversTypes['MasterchefSubgraph_User']>, ParentType, ContextType, RequireFields<QueryMasterchefSubgraph_userArgs, 'id'>>;
  MasterchefSubgraph_users?: Resolver<Array<ResolversTypes['MasterchefSubgraph_User']>, ParentType, ContextType, RequireFields<QueryMasterchefSubgraph_usersArgs, 'skip' | 'first'>>;
  MasterchefSubgraph__meta?: Resolver<Maybe<ResolversTypes['MasterchefSubgraph__Meta_']>, ParentType, ContextType, Partial<QueryMasterchefSubgraph__metaArgs>>;
  BlocksSubgraph_block?: Resolver<Maybe<ResolversTypes['BlocksSubgraph_Block']>, ParentType, ContextType, RequireFields<QueryBlocksSubgraph_blockArgs, 'id' | 'subgraphError'>>;
  BlocksSubgraph_blocks?: Resolver<Array<ResolversTypes['BlocksSubgraph_Block']>, ParentType, ContextType, RequireFields<QueryBlocksSubgraph_blocksArgs, 'skip' | 'first' | 'subgraphError'>>;
  BlocksSubgraph__meta?: Resolver<Maybe<ResolversTypes['BlocksSubgraph__Meta_']>, ParentType, ContextType, Partial<QueryBlocksSubgraph__metaArgs>>;
  BalancerSubgraph_balancer?: Resolver<Maybe<ResolversTypes['BalancerSubgraph_Balancer']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_balancerArgs, 'id'>>;
  BalancerSubgraph_balancers?: Resolver<Array<ResolversTypes['BalancerSubgraph_Balancer']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_balancersArgs, 'skip' | 'first'>>;
  BalancerSubgraph_pool?: Resolver<Maybe<ResolversTypes['BalancerSubgraph_Pool']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_poolArgs, 'id'>>;
  BalancerSubgraph_pools?: Resolver<Array<ResolversTypes['BalancerSubgraph_Pool']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_poolsArgs, 'skip' | 'first'>>;
  BalancerSubgraph_poolToken?: Resolver<Maybe<ResolversTypes['BalancerSubgraph_PoolToken']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_poolTokenArgs, 'id'>>;
  BalancerSubgraph_poolTokens?: Resolver<Array<ResolversTypes['BalancerSubgraph_PoolToken']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_poolTokensArgs, 'skip' | 'first'>>;
  BalancerSubgraph_priceRateProvider?: Resolver<Maybe<ResolversTypes['BalancerSubgraph_PriceRateProvider']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_priceRateProviderArgs, 'id'>>;
  BalancerSubgraph_priceRateProviders?: Resolver<Array<ResolversTypes['BalancerSubgraph_PriceRateProvider']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_priceRateProvidersArgs, 'skip' | 'first'>>;
  BalancerSubgraph_poolShare?: Resolver<Maybe<ResolversTypes['BalancerSubgraph_PoolShare']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_poolShareArgs, 'id'>>;
  BalancerSubgraph_poolShares?: Resolver<Array<ResolversTypes['BalancerSubgraph_PoolShare']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_poolSharesArgs, 'skip' | 'first'>>;
  BalancerSubgraph_user?: Resolver<Maybe<ResolversTypes['BalancerSubgraph_User']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_userArgs, 'id'>>;
  BalancerSubgraph_users?: Resolver<Array<ResolversTypes['BalancerSubgraph_User']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_usersArgs, 'skip' | 'first'>>;
  BalancerSubgraph_userInternalBalance?: Resolver<Maybe<ResolversTypes['BalancerSubgraph_UserInternalBalance']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_userInternalBalanceArgs, 'id'>>;
  BalancerSubgraph_userInternalBalances?: Resolver<Array<ResolversTypes['BalancerSubgraph_UserInternalBalance']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_userInternalBalancesArgs, 'skip' | 'first'>>;
  BalancerSubgraph_gradualWeightUpdate?: Resolver<Maybe<ResolversTypes['BalancerSubgraph_GradualWeightUpdate']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_gradualWeightUpdateArgs, 'id'>>;
  BalancerSubgraph_gradualWeightUpdates?: Resolver<Array<ResolversTypes['BalancerSubgraph_GradualWeightUpdate']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_gradualWeightUpdatesArgs, 'skip' | 'first'>>;
  BalancerSubgraph_ampUpdate?: Resolver<Maybe<ResolversTypes['BalancerSubgraph_AmpUpdate']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_ampUpdateArgs, 'id'>>;
  BalancerSubgraph_ampUpdates?: Resolver<Array<ResolversTypes['BalancerSubgraph_AmpUpdate']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_ampUpdatesArgs, 'skip' | 'first'>>;
  BalancerSubgraph_swap?: Resolver<Maybe<ResolversTypes['BalancerSubgraph_Swap']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_swapArgs, 'id'>>;
  BalancerSubgraph_swaps?: Resolver<Array<ResolversTypes['BalancerSubgraph_Swap']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_swapsArgs, 'skip' | 'first'>>;
  BalancerSubgraph_joinExit?: Resolver<Maybe<ResolversTypes['BalancerSubgraph_JoinExit']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_joinExitArgs, 'id'>>;
  BalancerSubgraph_joinExits?: Resolver<Array<ResolversTypes['BalancerSubgraph_JoinExit']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_joinExitsArgs, 'skip' | 'first'>>;
  BalancerSubgraph_latestPrice?: Resolver<Maybe<ResolversTypes['BalancerSubgraph_LatestPrice']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_latestPriceArgs, 'id'>>;
  BalancerSubgraph_latestPrices?: Resolver<Array<ResolversTypes['BalancerSubgraph_LatestPrice']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_latestPricesArgs, 'skip' | 'first'>>;
  BalancerSubgraph_poolHistoricalLiquidity?: Resolver<Maybe<ResolversTypes['BalancerSubgraph_PoolHistoricalLiquidity']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_poolHistoricalLiquidityArgs, 'id'>>;
  BalancerSubgraph_poolHistoricalLiquidities?: Resolver<Array<ResolversTypes['BalancerSubgraph_PoolHistoricalLiquidity']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_poolHistoricalLiquiditiesArgs, 'skip' | 'first'>>;
  BalancerSubgraph_tokenPrice?: Resolver<Maybe<ResolversTypes['BalancerSubgraph_TokenPrice']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_tokenPriceArgs, 'id'>>;
  BalancerSubgraph_tokenPrices?: Resolver<Array<ResolversTypes['BalancerSubgraph_TokenPrice']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_tokenPricesArgs, 'skip' | 'first'>>;
  BalancerSubgraph_investment?: Resolver<Maybe<ResolversTypes['BalancerSubgraph_Investment']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_investmentArgs, 'id'>>;
  BalancerSubgraph_investments?: Resolver<Array<ResolversTypes['BalancerSubgraph_Investment']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_investmentsArgs, 'skip' | 'first'>>;
  BalancerSubgraph_poolSnapshot?: Resolver<Maybe<ResolversTypes['BalancerSubgraph_PoolSnapshot']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_poolSnapshotArgs, 'id'>>;
  BalancerSubgraph_poolSnapshots?: Resolver<Array<ResolversTypes['BalancerSubgraph_PoolSnapshot']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_poolSnapshotsArgs, 'skip' | 'first'>>;
  BalancerSubgraph_token?: Resolver<Maybe<ResolversTypes['BalancerSubgraph_Token']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_tokenArgs, 'id'>>;
  BalancerSubgraph_tokens?: Resolver<Array<ResolversTypes['BalancerSubgraph_Token']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_tokensArgs, 'skip' | 'first'>>;
  BalancerSubgraph_tokenSnapshot?: Resolver<Maybe<ResolversTypes['BalancerSubgraph_TokenSnapshot']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_tokenSnapshotArgs, 'id'>>;
  BalancerSubgraph_tokenSnapshots?: Resolver<Array<ResolversTypes['BalancerSubgraph_TokenSnapshot']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_tokenSnapshotsArgs, 'skip' | 'first'>>;
  BalancerSubgraph_tradePair?: Resolver<Maybe<ResolversTypes['BalancerSubgraph_TradePair']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_tradePairArgs, 'id'>>;
  BalancerSubgraph_tradePairs?: Resolver<Array<ResolversTypes['BalancerSubgraph_TradePair']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_tradePairsArgs, 'skip' | 'first'>>;
  BalancerSubgraph_tradePairSnapshot?: Resolver<Maybe<ResolversTypes['BalancerSubgraph_TradePairSnapshot']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_tradePairSnapshotArgs, 'id'>>;
  BalancerSubgraph_tradePairSnapshots?: Resolver<Array<ResolversTypes['BalancerSubgraph_TradePairSnapshot']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_tradePairSnapshotsArgs, 'skip' | 'first'>>;
  BalancerSubgraph_balancerSnapshot?: Resolver<Maybe<ResolversTypes['BalancerSubgraph_BalancerSnapshot']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_balancerSnapshotArgs, 'id'>>;
  BalancerSubgraph_balancerSnapshots?: Resolver<Array<ResolversTypes['BalancerSubgraph_BalancerSnapshot']>, ParentType, ContextType, RequireFields<QueryBalancerSubgraph_balancerSnapshotsArgs, 'skip' | 'first'>>;
  BalancerSubgraph__meta?: Resolver<Maybe<ResolversTypes['BalancerSubgraph__Meta_']>, ParentType, ContextType, Partial<QueryBalancerSubgraph__metaArgs>>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  BeetsBarSubgraph_bar?: SubscriptionResolver<Maybe<ResolversTypes['BeetsBarSubgraph_Bar']>, "BeetsBarSubgraph_bar", ParentType, ContextType, RequireFields<SubscriptionBeetsBarSubgraph_barArgs, 'id'>>;
  BeetsBarSubgraph_bars?: SubscriptionResolver<Array<ResolversTypes['BeetsBarSubgraph_Bar']>, "BeetsBarSubgraph_bars", ParentType, ContextType, RequireFields<SubscriptionBeetsBarSubgraph_barsArgs, 'skip' | 'first'>>;
  BeetsBarSubgraph_user?: SubscriptionResolver<Maybe<ResolversTypes['BeetsBarSubgraph_User']>, "BeetsBarSubgraph_user", ParentType, ContextType, RequireFields<SubscriptionBeetsBarSubgraph_userArgs, 'id'>>;
  BeetsBarSubgraph_users?: SubscriptionResolver<Array<ResolversTypes['BeetsBarSubgraph_User']>, "BeetsBarSubgraph_users", ParentType, ContextType, RequireFields<SubscriptionBeetsBarSubgraph_usersArgs, 'skip' | 'first'>>;
  BeetsBarSubgraph__meta?: SubscriptionResolver<Maybe<ResolversTypes['BeetsBarSubgraph__Meta_']>, "BeetsBarSubgraph__meta", ParentType, ContextType, Partial<SubscriptionBeetsBarSubgraph__metaArgs>>;
  MasterchefSubgraph_masterChef?: SubscriptionResolver<Maybe<ResolversTypes['MasterchefSubgraph_MasterChef']>, "MasterchefSubgraph_masterChef", ParentType, ContextType, RequireFields<SubscriptionMasterchefSubgraph_masterChefArgs, 'id'>>;
  MasterchefSubgraph_masterChefs?: SubscriptionResolver<Array<ResolversTypes['MasterchefSubgraph_MasterChef']>, "MasterchefSubgraph_masterChefs", ParentType, ContextType, RequireFields<SubscriptionMasterchefSubgraph_masterChefsArgs, 'skip' | 'first'>>;
  MasterchefSubgraph_pool?: SubscriptionResolver<Maybe<ResolversTypes['MasterchefSubgraph_Pool']>, "MasterchefSubgraph_pool", ParentType, ContextType, RequireFields<SubscriptionMasterchefSubgraph_poolArgs, 'id'>>;
  MasterchefSubgraph_pools?: SubscriptionResolver<Array<ResolversTypes['MasterchefSubgraph_Pool']>, "MasterchefSubgraph_pools", ParentType, ContextType, RequireFields<SubscriptionMasterchefSubgraph_poolsArgs, 'skip' | 'first'>>;
  MasterchefSubgraph_rewardToken?: SubscriptionResolver<Maybe<ResolversTypes['MasterchefSubgraph_RewardToken']>, "MasterchefSubgraph_rewardToken", ParentType, ContextType, RequireFields<SubscriptionMasterchefSubgraph_rewardTokenArgs, 'id'>>;
  MasterchefSubgraph_rewardTokens?: SubscriptionResolver<Array<ResolversTypes['MasterchefSubgraph_RewardToken']>, "MasterchefSubgraph_rewardTokens", ParentType, ContextType, RequireFields<SubscriptionMasterchefSubgraph_rewardTokensArgs, 'skip' | 'first'>>;
  MasterchefSubgraph_rewarder?: SubscriptionResolver<Maybe<ResolversTypes['MasterchefSubgraph_Rewarder']>, "MasterchefSubgraph_rewarder", ParentType, ContextType, RequireFields<SubscriptionMasterchefSubgraph_rewarderArgs, 'id'>>;
  MasterchefSubgraph_rewarders?: SubscriptionResolver<Array<ResolversTypes['MasterchefSubgraph_Rewarder']>, "MasterchefSubgraph_rewarders", ParentType, ContextType, RequireFields<SubscriptionMasterchefSubgraph_rewardersArgs, 'skip' | 'first'>>;
  MasterchefSubgraph_harvestAction?: SubscriptionResolver<Maybe<ResolversTypes['MasterchefSubgraph_HarvestAction']>, "MasterchefSubgraph_harvestAction", ParentType, ContextType, RequireFields<SubscriptionMasterchefSubgraph_harvestActionArgs, 'id'>>;
  MasterchefSubgraph_harvestActions?: SubscriptionResolver<Array<ResolversTypes['MasterchefSubgraph_HarvestAction']>, "MasterchefSubgraph_harvestActions", ParentType, ContextType, RequireFields<SubscriptionMasterchefSubgraph_harvestActionsArgs, 'skip' | 'first'>>;
  MasterchefSubgraph_user?: SubscriptionResolver<Maybe<ResolversTypes['MasterchefSubgraph_User']>, "MasterchefSubgraph_user", ParentType, ContextType, RequireFields<SubscriptionMasterchefSubgraph_userArgs, 'id'>>;
  MasterchefSubgraph_users?: SubscriptionResolver<Array<ResolversTypes['MasterchefSubgraph_User']>, "MasterchefSubgraph_users", ParentType, ContextType, RequireFields<SubscriptionMasterchefSubgraph_usersArgs, 'skip' | 'first'>>;
  MasterchefSubgraph__meta?: SubscriptionResolver<Maybe<ResolversTypes['MasterchefSubgraph__Meta_']>, "MasterchefSubgraph__meta", ParentType, ContextType, Partial<SubscriptionMasterchefSubgraph__metaArgs>>;
  BlocksSubgraph_block?: SubscriptionResolver<Maybe<ResolversTypes['BlocksSubgraph_Block']>, "BlocksSubgraph_block", ParentType, ContextType, RequireFields<SubscriptionBlocksSubgraph_blockArgs, 'id' | 'subgraphError'>>;
  BlocksSubgraph_blocks?: SubscriptionResolver<Array<ResolversTypes['BlocksSubgraph_Block']>, "BlocksSubgraph_blocks", ParentType, ContextType, RequireFields<SubscriptionBlocksSubgraph_blocksArgs, 'skip' | 'first' | 'subgraphError'>>;
  BlocksSubgraph__meta?: SubscriptionResolver<Maybe<ResolversTypes['BlocksSubgraph__Meta_']>, "BlocksSubgraph__meta", ParentType, ContextType, Partial<SubscriptionBlocksSubgraph__metaArgs>>;
  BalancerSubgraph_balancer?: SubscriptionResolver<Maybe<ResolversTypes['BalancerSubgraph_Balancer']>, "BalancerSubgraph_balancer", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_balancerArgs, 'id'>>;
  BalancerSubgraph_balancers?: SubscriptionResolver<Array<ResolversTypes['BalancerSubgraph_Balancer']>, "BalancerSubgraph_balancers", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_balancersArgs, 'skip' | 'first'>>;
  BalancerSubgraph_pool?: SubscriptionResolver<Maybe<ResolversTypes['BalancerSubgraph_Pool']>, "BalancerSubgraph_pool", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_poolArgs, 'id'>>;
  BalancerSubgraph_pools?: SubscriptionResolver<Array<ResolversTypes['BalancerSubgraph_Pool']>, "BalancerSubgraph_pools", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_poolsArgs, 'skip' | 'first'>>;
  BalancerSubgraph_poolToken?: SubscriptionResolver<Maybe<ResolversTypes['BalancerSubgraph_PoolToken']>, "BalancerSubgraph_poolToken", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_poolTokenArgs, 'id'>>;
  BalancerSubgraph_poolTokens?: SubscriptionResolver<Array<ResolversTypes['BalancerSubgraph_PoolToken']>, "BalancerSubgraph_poolTokens", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_poolTokensArgs, 'skip' | 'first'>>;
  BalancerSubgraph_priceRateProvider?: SubscriptionResolver<Maybe<ResolversTypes['BalancerSubgraph_PriceRateProvider']>, "BalancerSubgraph_priceRateProvider", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_priceRateProviderArgs, 'id'>>;
  BalancerSubgraph_priceRateProviders?: SubscriptionResolver<Array<ResolversTypes['BalancerSubgraph_PriceRateProvider']>, "BalancerSubgraph_priceRateProviders", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_priceRateProvidersArgs, 'skip' | 'first'>>;
  BalancerSubgraph_poolShare?: SubscriptionResolver<Maybe<ResolversTypes['BalancerSubgraph_PoolShare']>, "BalancerSubgraph_poolShare", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_poolShareArgs, 'id'>>;
  BalancerSubgraph_poolShares?: SubscriptionResolver<Array<ResolversTypes['BalancerSubgraph_PoolShare']>, "BalancerSubgraph_poolShares", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_poolSharesArgs, 'skip' | 'first'>>;
  BalancerSubgraph_user?: SubscriptionResolver<Maybe<ResolversTypes['BalancerSubgraph_User']>, "BalancerSubgraph_user", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_userArgs, 'id'>>;
  BalancerSubgraph_users?: SubscriptionResolver<Array<ResolversTypes['BalancerSubgraph_User']>, "BalancerSubgraph_users", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_usersArgs, 'skip' | 'first'>>;
  BalancerSubgraph_userInternalBalance?: SubscriptionResolver<Maybe<ResolversTypes['BalancerSubgraph_UserInternalBalance']>, "BalancerSubgraph_userInternalBalance", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_userInternalBalanceArgs, 'id'>>;
  BalancerSubgraph_userInternalBalances?: SubscriptionResolver<Array<ResolversTypes['BalancerSubgraph_UserInternalBalance']>, "BalancerSubgraph_userInternalBalances", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_userInternalBalancesArgs, 'skip' | 'first'>>;
  BalancerSubgraph_gradualWeightUpdate?: SubscriptionResolver<Maybe<ResolversTypes['BalancerSubgraph_GradualWeightUpdate']>, "BalancerSubgraph_gradualWeightUpdate", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_gradualWeightUpdateArgs, 'id'>>;
  BalancerSubgraph_gradualWeightUpdates?: SubscriptionResolver<Array<ResolversTypes['BalancerSubgraph_GradualWeightUpdate']>, "BalancerSubgraph_gradualWeightUpdates", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_gradualWeightUpdatesArgs, 'skip' | 'first'>>;
  BalancerSubgraph_ampUpdate?: SubscriptionResolver<Maybe<ResolversTypes['BalancerSubgraph_AmpUpdate']>, "BalancerSubgraph_ampUpdate", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_ampUpdateArgs, 'id'>>;
  BalancerSubgraph_ampUpdates?: SubscriptionResolver<Array<ResolversTypes['BalancerSubgraph_AmpUpdate']>, "BalancerSubgraph_ampUpdates", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_ampUpdatesArgs, 'skip' | 'first'>>;
  BalancerSubgraph_swap?: SubscriptionResolver<Maybe<ResolversTypes['BalancerSubgraph_Swap']>, "BalancerSubgraph_swap", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_swapArgs, 'id'>>;
  BalancerSubgraph_swaps?: SubscriptionResolver<Array<ResolversTypes['BalancerSubgraph_Swap']>, "BalancerSubgraph_swaps", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_swapsArgs, 'skip' | 'first'>>;
  BalancerSubgraph_joinExit?: SubscriptionResolver<Maybe<ResolversTypes['BalancerSubgraph_JoinExit']>, "BalancerSubgraph_joinExit", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_joinExitArgs, 'id'>>;
  BalancerSubgraph_joinExits?: SubscriptionResolver<Array<ResolversTypes['BalancerSubgraph_JoinExit']>, "BalancerSubgraph_joinExits", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_joinExitsArgs, 'skip' | 'first'>>;
  BalancerSubgraph_latestPrice?: SubscriptionResolver<Maybe<ResolversTypes['BalancerSubgraph_LatestPrice']>, "BalancerSubgraph_latestPrice", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_latestPriceArgs, 'id'>>;
  BalancerSubgraph_latestPrices?: SubscriptionResolver<Array<ResolversTypes['BalancerSubgraph_LatestPrice']>, "BalancerSubgraph_latestPrices", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_latestPricesArgs, 'skip' | 'first'>>;
  BalancerSubgraph_poolHistoricalLiquidity?: SubscriptionResolver<Maybe<ResolversTypes['BalancerSubgraph_PoolHistoricalLiquidity']>, "BalancerSubgraph_poolHistoricalLiquidity", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_poolHistoricalLiquidityArgs, 'id'>>;
  BalancerSubgraph_poolHistoricalLiquidities?: SubscriptionResolver<Array<ResolversTypes['BalancerSubgraph_PoolHistoricalLiquidity']>, "BalancerSubgraph_poolHistoricalLiquidities", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_poolHistoricalLiquiditiesArgs, 'skip' | 'first'>>;
  BalancerSubgraph_tokenPrice?: SubscriptionResolver<Maybe<ResolversTypes['BalancerSubgraph_TokenPrice']>, "BalancerSubgraph_tokenPrice", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_tokenPriceArgs, 'id'>>;
  BalancerSubgraph_tokenPrices?: SubscriptionResolver<Array<ResolversTypes['BalancerSubgraph_TokenPrice']>, "BalancerSubgraph_tokenPrices", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_tokenPricesArgs, 'skip' | 'first'>>;
  BalancerSubgraph_investment?: SubscriptionResolver<Maybe<ResolversTypes['BalancerSubgraph_Investment']>, "BalancerSubgraph_investment", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_investmentArgs, 'id'>>;
  BalancerSubgraph_investments?: SubscriptionResolver<Array<ResolversTypes['BalancerSubgraph_Investment']>, "BalancerSubgraph_investments", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_investmentsArgs, 'skip' | 'first'>>;
  BalancerSubgraph_poolSnapshot?: SubscriptionResolver<Maybe<ResolversTypes['BalancerSubgraph_PoolSnapshot']>, "BalancerSubgraph_poolSnapshot", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_poolSnapshotArgs, 'id'>>;
  BalancerSubgraph_poolSnapshots?: SubscriptionResolver<Array<ResolversTypes['BalancerSubgraph_PoolSnapshot']>, "BalancerSubgraph_poolSnapshots", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_poolSnapshotsArgs, 'skip' | 'first'>>;
  BalancerSubgraph_token?: SubscriptionResolver<Maybe<ResolversTypes['BalancerSubgraph_Token']>, "BalancerSubgraph_token", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_tokenArgs, 'id'>>;
  BalancerSubgraph_tokens?: SubscriptionResolver<Array<ResolversTypes['BalancerSubgraph_Token']>, "BalancerSubgraph_tokens", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_tokensArgs, 'skip' | 'first'>>;
  BalancerSubgraph_tokenSnapshot?: SubscriptionResolver<Maybe<ResolversTypes['BalancerSubgraph_TokenSnapshot']>, "BalancerSubgraph_tokenSnapshot", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_tokenSnapshotArgs, 'id'>>;
  BalancerSubgraph_tokenSnapshots?: SubscriptionResolver<Array<ResolversTypes['BalancerSubgraph_TokenSnapshot']>, "BalancerSubgraph_tokenSnapshots", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_tokenSnapshotsArgs, 'skip' | 'first'>>;
  BalancerSubgraph_tradePair?: SubscriptionResolver<Maybe<ResolversTypes['BalancerSubgraph_TradePair']>, "BalancerSubgraph_tradePair", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_tradePairArgs, 'id'>>;
  BalancerSubgraph_tradePairs?: SubscriptionResolver<Array<ResolversTypes['BalancerSubgraph_TradePair']>, "BalancerSubgraph_tradePairs", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_tradePairsArgs, 'skip' | 'first'>>;
  BalancerSubgraph_tradePairSnapshot?: SubscriptionResolver<Maybe<ResolversTypes['BalancerSubgraph_TradePairSnapshot']>, "BalancerSubgraph_tradePairSnapshot", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_tradePairSnapshotArgs, 'id'>>;
  BalancerSubgraph_tradePairSnapshots?: SubscriptionResolver<Array<ResolversTypes['BalancerSubgraph_TradePairSnapshot']>, "BalancerSubgraph_tradePairSnapshots", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_tradePairSnapshotsArgs, 'skip' | 'first'>>;
  BalancerSubgraph_balancerSnapshot?: SubscriptionResolver<Maybe<ResolversTypes['BalancerSubgraph_BalancerSnapshot']>, "BalancerSubgraph_balancerSnapshot", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_balancerSnapshotArgs, 'id'>>;
  BalancerSubgraph_balancerSnapshots?: SubscriptionResolver<Array<ResolversTypes['BalancerSubgraph_BalancerSnapshot']>, "BalancerSubgraph_balancerSnapshots", ParentType, ContextType, RequireFields<SubscriptionBalancerSubgraph_balancerSnapshotsArgs, 'skip' | 'first'>>;
  BalancerSubgraph__meta?: SubscriptionResolver<Maybe<ResolversTypes['BalancerSubgraph__Meta_']>, "BalancerSubgraph__meta", ParentType, ContextType, Partial<SubscriptionBalancerSubgraph__metaArgs>>;
}>;

export type BeetsBarSubgraph_BarResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BeetsBarSubgraph_Bar'] = ResolversParentTypes['BeetsBarSubgraph_Bar']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['BeetsBarSubgraph_Bytes'], ParentType, ContextType>;
  decimals?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  vestingToken?: Resolver<ResolversTypes['BeetsBarSubgraph_Bytes'], ParentType, ContextType>;
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  totalSupply?: Resolver<ResolversTypes['BeetsBarSubgraph_BigDecimal'], ParentType, ContextType>;
  ratio?: Resolver<ResolversTypes['BeetsBarSubgraph_BigDecimal'], ParentType, ContextType>;
  fBeetsMinted?: Resolver<ResolversTypes['BeetsBarSubgraph_BigDecimal'], ParentType, ContextType>;
  fBeetsBurned?: Resolver<ResolversTypes['BeetsBarSubgraph_BigDecimal'], ParentType, ContextType>;
  vestingTokenStaked?: Resolver<ResolversTypes['BeetsBarSubgraph_BigDecimal'], ParentType, ContextType>;
  sharedVestingTokenRevenue?: Resolver<ResolversTypes['BeetsBarSubgraph_BigDecimal'], ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['BeetsBarSubgraph_User']>, ParentType, ContextType, RequireFields<BeetsBarSubgraph_BarusersArgs, 'skip' | 'first'>>;
  block?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BeetsBarSubgraph_BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BeetsBarSubgraph_BigDecimal'], any> {
  name: 'BeetsBarSubgraph_BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BeetsBarSubgraph_BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BeetsBarSubgraph_Bytes'], any> {
  name: 'BeetsBarSubgraph_Bytes';
}

export type BeetsBarSubgraph_UserResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BeetsBarSubgraph_User'] = ResolversParentTypes['BeetsBarSubgraph_User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['BeetsBarSubgraph_Bytes'], ParentType, ContextType>;
  bar?: Resolver<Maybe<ResolversTypes['BeetsBarSubgraph_Bar']>, ParentType, ContextType>;
  fBeets?: Resolver<ResolversTypes['BeetsBarSubgraph_BigDecimal'], ParentType, ContextType>;
  vestingTokenOut?: Resolver<ResolversTypes['BeetsBarSubgraph_BigDecimal'], ParentType, ContextType>;
  vestingTokenIn?: Resolver<ResolversTypes['BeetsBarSubgraph_BigDecimal'], ParentType, ContextType>;
  vestingTokenHarvested?: Resolver<ResolversTypes['BeetsBarSubgraph_BigDecimal'], ParentType, ContextType>;
  block?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BeetsBarSubgraph__Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BeetsBarSubgraph__Block_'] = ResolversParentTypes['BeetsBarSubgraph__Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['BeetsBarSubgraph_Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BeetsBarSubgraph__Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BeetsBarSubgraph__Meta_'] = ResolversParentTypes['BeetsBarSubgraph__Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['BeetsBarSubgraph__Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface MasterchefSubgraph_BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['MasterchefSubgraph_BigDecimal'], any> {
  name: 'MasterchefSubgraph_BigDecimal';
}

export interface MasterchefSubgraph_BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['MasterchefSubgraph_Bytes'], any> {
  name: 'MasterchefSubgraph_Bytes';
}

export type MasterchefSubgraph_HarvestActionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['MasterchefSubgraph_HarvestAction'] = ResolversParentTypes['MasterchefSubgraph_HarvestAction']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['MasterchefSubgraph_User']>, ParentType, ContextType>;
  token?: Resolver<ResolversTypes['MasterchefSubgraph_Bytes'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  block?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MasterchefSubgraph_MasterChefResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['MasterchefSubgraph_MasterChef'] = ResolversParentTypes['MasterchefSubgraph_MasterChef']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  beets?: Resolver<ResolversTypes['MasterchefSubgraph_Bytes'], ParentType, ContextType>;
  beetsPerBlock?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalAllocPoint?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  pools?: Resolver<Maybe<Array<ResolversTypes['MasterchefSubgraph_Pool']>>, ParentType, ContextType, RequireFields<MasterchefSubgraph_MasterChefpoolsArgs, 'skip' | 'first'>>;
  poolCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  block?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MasterchefSubgraph_PoolResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['MasterchefSubgraph_Pool'] = ResolversParentTypes['MasterchefSubgraph_Pool']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  masterChef?: Resolver<ResolversTypes['MasterchefSubgraph_MasterChef'], ParentType, ContextType>;
  pair?: Resolver<ResolversTypes['MasterchefSubgraph_Bytes'], ParentType, ContextType>;
  rewarder?: Resolver<Maybe<ResolversTypes['MasterchefSubgraph_Rewarder']>, ParentType, ContextType>;
  allocPoint?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lastRewardBlock?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  accBeetsPerShare?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  slpBalance?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['MasterchefSubgraph_User']>, ParentType, ContextType, RequireFields<MasterchefSubgraph_PoolusersArgs, 'skip' | 'first'>>;
  userCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  block?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MasterchefSubgraph_RewardTokenResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['MasterchefSubgraph_RewardToken'] = ResolversParentTypes['MasterchefSubgraph_RewardToken']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  rewarder?: Resolver<Maybe<ResolversTypes['MasterchefSubgraph_Rewarder']>, ParentType, ContextType>;
  token?: Resolver<ResolversTypes['MasterchefSubgraph_Bytes'], ParentType, ContextType>;
  decimals?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rewardPerSecond?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  block?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MasterchefSubgraph_RewarderResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['MasterchefSubgraph_Rewarder'] = ResolversParentTypes['MasterchefSubgraph_Rewarder']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  rewardTokens?: Resolver<Array<ResolversTypes['MasterchefSubgraph_RewardToken']>, ParentType, ContextType, RequireFields<MasterchefSubgraph_RewarderrewardTokensArgs, 'skip' | 'first'>>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  block?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MasterchefSubgraph_UserResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['MasterchefSubgraph_User'] = ResolversParentTypes['MasterchefSubgraph_User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['MasterchefSubgraph_Bytes'], ParentType, ContextType>;
  pool?: Resolver<Maybe<ResolversTypes['MasterchefSubgraph_Pool']>, ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  rewardDebt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  beetsHarvested?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  harvests?: Resolver<Array<ResolversTypes['MasterchefSubgraph_HarvestAction']>, ParentType, ContextType, RequireFields<MasterchefSubgraph_UserharvestsArgs, 'skip' | 'first'>>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  block?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MasterchefSubgraph__Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['MasterchefSubgraph__Block_'] = ResolversParentTypes['MasterchefSubgraph__Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['MasterchefSubgraph_Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MasterchefSubgraph__Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['MasterchefSubgraph__Meta_'] = ResolversParentTypes['MasterchefSubgraph__Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['MasterchefSubgraph__Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BlocksSubgraph_BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BlocksSubgraph_BigDecimal'], any> {
  name: 'BlocksSubgraph_BigDecimal';
}

export type BlocksSubgraph_BlockResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BlocksSubgraph_Block'] = ResolversParentTypes['BlocksSubgraph_Block']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  number?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  parentHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  author?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  difficulty?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  totalDifficulty?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  gasUsed?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  gasLimit?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  receiptsRoot?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  transactionsRoot?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  stateRoot?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  unclesHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BlocksSubgraph_BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BlocksSubgraph_Bytes'], any> {
  name: 'BlocksSubgraph_Bytes';
}

export type BlocksSubgraph__Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BlocksSubgraph__Block_'] = ResolversParentTypes['BlocksSubgraph__Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['BlocksSubgraph_Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BlocksSubgraph__Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BlocksSubgraph__Meta_'] = ResolversParentTypes['BlocksSubgraph__Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['BlocksSubgraph__Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BalancerSubgraph_AmpUpdateResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BalancerSubgraph_AmpUpdate'] = ResolversParentTypes['BalancerSubgraph_AmpUpdate']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  poolId?: Resolver<ResolversTypes['BalancerSubgraph_Pool'], ParentType, ContextType>;
  scheduledTimestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  startTimestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  endTimestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  startAmp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  endAmp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BalancerSubgraph_BalancerResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BalancerSubgraph_Balancer'] = ResolversParentTypes['BalancerSubgraph_Balancer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  poolCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pools?: Resolver<Maybe<Array<ResolversTypes['BalancerSubgraph_Pool']>>, ParentType, ContextType, RequireFields<BalancerSubgraph_BalancerpoolsArgs, 'skip' | 'first'>>;
  totalLiquidity?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  totalSwapCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalSwapVolume?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  totalSwapFee?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BalancerSubgraph_BalancerSnapshotResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BalancerSubgraph_BalancerSnapshot'] = ResolversParentTypes['BalancerSubgraph_BalancerSnapshot']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  vault?: Resolver<ResolversTypes['BalancerSubgraph_Balancer'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  poolCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalLiquidity?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  totalSwapCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalSwapVolume?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  totalSwapFee?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BalancerSubgraph_BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BalancerSubgraph_BigDecimal'], any> {
  name: 'BalancerSubgraph_BigDecimal';
}

export interface BalancerSubgraph_BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BalancerSubgraph_Bytes'], any> {
  name: 'BalancerSubgraph_Bytes';
}

export type BalancerSubgraph_GradualWeightUpdateResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BalancerSubgraph_GradualWeightUpdate'] = ResolversParentTypes['BalancerSubgraph_GradualWeightUpdate']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  poolId?: Resolver<ResolversTypes['BalancerSubgraph_Pool'], ParentType, ContextType>;
  scheduledTimestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  startTimestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  endTimestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  startWeights?: Resolver<Array<ResolversTypes['BigInt']>, ParentType, ContextType>;
  endWeights?: Resolver<Array<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BalancerSubgraph_InvestmentResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BalancerSubgraph_Investment'] = ResolversParentTypes['BalancerSubgraph_Investment']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  assetManagerAddress?: Resolver<ResolversTypes['BalancerSubgraph_Bytes'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  poolTokenId?: Resolver<ResolversTypes['BalancerSubgraph_PoolToken'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BalancerSubgraph_JoinExitResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BalancerSubgraph_JoinExit'] = ResolversParentTypes['BalancerSubgraph_JoinExit']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['BalancerSubgraph_InvestType'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['BalancerSubgraph_Bytes'], ParentType, ContextType>;
  amounts?: Resolver<Array<ResolversTypes['BalancerSubgraph_BigDecimal']>, ParentType, ContextType>;
  pool?: Resolver<ResolversTypes['BalancerSubgraph_Pool'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['BalancerSubgraph_User'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  valueUSD?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  tx?: Resolver<ResolversTypes['BalancerSubgraph_Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BalancerSubgraph_LatestPriceResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BalancerSubgraph_LatestPrice'] = ResolversParentTypes['BalancerSubgraph_LatestPrice']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  asset?: Resolver<ResolversTypes['BalancerSubgraph_Bytes'], ParentType, ContextType>;
  pricingAsset?: Resolver<ResolversTypes['BalancerSubgraph_Bytes'], ParentType, ContextType>;
  poolId?: Resolver<ResolversTypes['BalancerSubgraph_Pool'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  priceUSD?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  block?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BalancerSubgraph_PoolResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BalancerSubgraph_Pool'] = ResolversParentTypes['BalancerSubgraph_Pool']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['BalancerSubgraph_Bytes'], ParentType, ContextType>;
  poolType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  factory?: Resolver<Maybe<ResolversTypes['BalancerSubgraph_Bytes']>, ParentType, ContextType>;
  strategyType?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  symbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  swapEnabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  swapFee?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['BalancerSubgraph_Bytes']>, ParentType, ContextType>;
  totalWeight?: Resolver<Maybe<ResolversTypes['BalancerSubgraph_BigDecimal']>, ParentType, ContextType>;
  totalSwapVolume?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  totalSwapFee?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  totalLiquidity?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  totalShares?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  createTime?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  swapsCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  holdersCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  vaultID?: Resolver<ResolversTypes['BalancerSubgraph_Balancer'], ParentType, ContextType>;
  tx?: Resolver<Maybe<ResolversTypes['BalancerSubgraph_Bytes']>, ParentType, ContextType>;
  tokensList?: Resolver<Array<ResolversTypes['BalancerSubgraph_Bytes']>, ParentType, ContextType>;
  tokens?: Resolver<Maybe<Array<ResolversTypes['BalancerSubgraph_PoolToken']>>, ParentType, ContextType, RequireFields<BalancerSubgraph_PooltokensArgs, 'skip' | 'first'>>;
  swaps?: Resolver<Maybe<Array<ResolversTypes['BalancerSubgraph_Swap']>>, ParentType, ContextType, RequireFields<BalancerSubgraph_PoolswapsArgs, 'skip' | 'first'>>;
  shares?: Resolver<Maybe<Array<ResolversTypes['BalancerSubgraph_PoolShare']>>, ParentType, ContextType, RequireFields<BalancerSubgraph_PoolsharesArgs, 'skip' | 'first'>>;
  historicalValues?: Resolver<Maybe<Array<ResolversTypes['BalancerSubgraph_PoolHistoricalLiquidity']>>, ParentType, ContextType, RequireFields<BalancerSubgraph_PoolhistoricalValuesArgs, 'skip' | 'first'>>;
  weightUpdates?: Resolver<Maybe<Array<ResolversTypes['BalancerSubgraph_GradualWeightUpdate']>>, ParentType, ContextType, RequireFields<BalancerSubgraph_PoolweightUpdatesArgs, 'skip' | 'first'>>;
  amp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  priceRateProviders?: Resolver<Maybe<Array<ResolversTypes['BalancerSubgraph_PriceRateProvider']>>, ParentType, ContextType, RequireFields<BalancerSubgraph_PoolpriceRateProvidersArgs, 'skip' | 'first'>>;
  principalToken?: Resolver<Maybe<ResolversTypes['BalancerSubgraph_Bytes']>, ParentType, ContextType>;
  baseToken?: Resolver<Maybe<ResolversTypes['BalancerSubgraph_Bytes']>, ParentType, ContextType>;
  expiryTime?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  unitSeconds?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  managementFee?: Resolver<Maybe<ResolversTypes['BalancerSubgraph_BigDecimal']>, ParentType, ContextType>;
  mainIndex?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  wrappedIndex?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  lowerTarget?: Resolver<Maybe<ResolversTypes['BalancerSubgraph_BigDecimal']>, ParentType, ContextType>;
  upperTarget?: Resolver<Maybe<ResolversTypes['BalancerSubgraph_BigDecimal']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BalancerSubgraph_PoolHistoricalLiquidityResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BalancerSubgraph_PoolHistoricalLiquidity'] = ResolversParentTypes['BalancerSubgraph_PoolHistoricalLiquidity']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  poolId?: Resolver<ResolversTypes['BalancerSubgraph_Pool'], ParentType, ContextType>;
  poolTotalShares?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  poolLiquidity?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  poolLiquidityUSD?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  poolShareValue?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  pricingAsset?: Resolver<ResolversTypes['BalancerSubgraph_Bytes'], ParentType, ContextType>;
  block?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BalancerSubgraph_PoolShareResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BalancerSubgraph_PoolShare'] = ResolversParentTypes['BalancerSubgraph_PoolShare']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userAddress?: Resolver<ResolversTypes['BalancerSubgraph_User'], ParentType, ContextType>;
  poolId?: Resolver<ResolversTypes['BalancerSubgraph_Pool'], ParentType, ContextType>;
  balance?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BalancerSubgraph_PoolSnapshotResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BalancerSubgraph_PoolSnapshot'] = ResolversParentTypes['BalancerSubgraph_PoolSnapshot']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  pool?: Resolver<ResolversTypes['BalancerSubgraph_Pool'], ParentType, ContextType>;
  amounts?: Resolver<Array<ResolversTypes['BalancerSubgraph_BigDecimal']>, ParentType, ContextType>;
  totalShares?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  swapVolume?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  swapFees?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  liquidity?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalSwapVolume?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  totalSwapFee?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  totalLiquidity?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  swapsCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  holdersCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BalancerSubgraph_PoolTokenResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BalancerSubgraph_PoolToken'] = ResolversParentTypes['BalancerSubgraph_PoolToken']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  poolId?: Resolver<ResolversTypes['BalancerSubgraph_Pool'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['BalancerSubgraph_Token'], ParentType, ContextType>;
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  decimals?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  priceRate?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  balance?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  invested?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  investments?: Resolver<Maybe<Array<ResolversTypes['BalancerSubgraph_Investment']>>, ParentType, ContextType, RequireFields<BalancerSubgraph_PoolTokeninvestmentsArgs, 'skip' | 'first'>>;
  weight?: Resolver<Maybe<ResolversTypes['BalancerSubgraph_BigDecimal']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BalancerSubgraph_PriceRateProviderResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BalancerSubgraph_PriceRateProvider'] = ResolversParentTypes['BalancerSubgraph_PriceRateProvider']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  poolId?: Resolver<ResolversTypes['BalancerSubgraph_Pool'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['BalancerSubgraph_PoolToken'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['BalancerSubgraph_Bytes'], ParentType, ContextType>;
  rate?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  lastCached?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  cacheDuration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  cacheExpiry?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BalancerSubgraph_SwapResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BalancerSubgraph_Swap'] = ResolversParentTypes['BalancerSubgraph_Swap']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  caller?: Resolver<ResolversTypes['BalancerSubgraph_Bytes'], ParentType, ContextType>;
  tokenIn?: Resolver<ResolversTypes['BalancerSubgraph_Bytes'], ParentType, ContextType>;
  tokenInSym?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tokenOut?: Resolver<ResolversTypes['BalancerSubgraph_Bytes'], ParentType, ContextType>;
  tokenOutSym?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tokenAmountIn?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  tokenAmountOut?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  poolId?: Resolver<ResolversTypes['BalancerSubgraph_Pool'], ParentType, ContextType>;
  userAddress?: Resolver<ResolversTypes['BalancerSubgraph_User'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tx?: Resolver<ResolversTypes['BalancerSubgraph_Bytes'], ParentType, ContextType>;
  valueUSD?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BalancerSubgraph_TokenResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BalancerSubgraph_Token'] = ResolversParentTypes['BalancerSubgraph_Token']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  symbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  decimals?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  totalBalanceUSD?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  totalBalanceNotional?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  totalVolumeUSD?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  totalVolumeNotional?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  totalSwapCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  latestPrice?: Resolver<Maybe<ResolversTypes['BalancerSubgraph_LatestPrice']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BalancerSubgraph_TokenPriceResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BalancerSubgraph_TokenPrice'] = ResolversParentTypes['BalancerSubgraph_TokenPrice']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  poolId?: Resolver<ResolversTypes['BalancerSubgraph_Pool'], ParentType, ContextType>;
  asset?: Resolver<ResolversTypes['BalancerSubgraph_Bytes'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  pricingAsset?: Resolver<ResolversTypes['BalancerSubgraph_Bytes'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  block?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  priceUSD?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BalancerSubgraph_TokenSnapshotResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BalancerSubgraph_TokenSnapshot'] = ResolversParentTypes['BalancerSubgraph_TokenSnapshot']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['BalancerSubgraph_Token'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalBalanceUSD?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  totalBalanceNotional?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  totalVolumeUSD?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  totalVolumeNotional?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  totalSwapCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BalancerSubgraph_TradePairResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BalancerSubgraph_TradePair'] = ResolversParentTypes['BalancerSubgraph_TradePair']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  token0?: Resolver<ResolversTypes['BalancerSubgraph_Token'], ParentType, ContextType>;
  token1?: Resolver<ResolversTypes['BalancerSubgraph_Token'], ParentType, ContextType>;
  totalSwapVolume?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  totalSwapFee?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BalancerSubgraph_TradePairSnapshotResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BalancerSubgraph_TradePairSnapshot'] = ResolversParentTypes['BalancerSubgraph_TradePairSnapshot']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  pair?: Resolver<ResolversTypes['BalancerSubgraph_TradePair'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalSwapVolume?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  totalSwapFee?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BalancerSubgraph_UserResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BalancerSubgraph_User'] = ResolversParentTypes['BalancerSubgraph_User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  sharesOwned?: Resolver<Maybe<Array<ResolversTypes['BalancerSubgraph_PoolShare']>>, ParentType, ContextType, RequireFields<BalancerSubgraph_UsersharesOwnedArgs, 'skip' | 'first'>>;
  swaps?: Resolver<Maybe<Array<ResolversTypes['BalancerSubgraph_Swap']>>, ParentType, ContextType, RequireFields<BalancerSubgraph_UserswapsArgs, 'skip' | 'first'>>;
  userInternalBalances?: Resolver<Maybe<Array<ResolversTypes['BalancerSubgraph_UserInternalBalance']>>, ParentType, ContextType, RequireFields<BalancerSubgraph_UseruserInternalBalancesArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BalancerSubgraph_UserInternalBalanceResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BalancerSubgraph_UserInternalBalance'] = ResolversParentTypes['BalancerSubgraph_UserInternalBalance']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userAddress?: Resolver<Maybe<ResolversTypes['BalancerSubgraph_User']>, ParentType, ContextType>;
  token?: Resolver<ResolversTypes['BalancerSubgraph_Bytes'], ParentType, ContextType>;
  balance?: Resolver<ResolversTypes['BalancerSubgraph_BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BalancerSubgraph__Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BalancerSubgraph__Block_'] = ResolversParentTypes['BalancerSubgraph__Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['BalancerSubgraph_Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BalancerSubgraph__Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BalancerSubgraph__Meta_'] = ResolversParentTypes['BalancerSubgraph__Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['BalancerSubgraph__Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  BeetsBarSubgraph_Bar?: BeetsBarSubgraph_BarResolvers<ContextType>;
  BeetsBarSubgraph_BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  BeetsBarSubgraph_Bytes?: GraphQLScalarType;
  BeetsBarSubgraph_User?: BeetsBarSubgraph_UserResolvers<ContextType>;
  BeetsBarSubgraph__Block_?: BeetsBarSubgraph__Block_Resolvers<ContextType>;
  BeetsBarSubgraph__Meta_?: BeetsBarSubgraph__Meta_Resolvers<ContextType>;
  MasterchefSubgraph_BigDecimal?: GraphQLScalarType;
  MasterchefSubgraph_Bytes?: GraphQLScalarType;
  MasterchefSubgraph_HarvestAction?: MasterchefSubgraph_HarvestActionResolvers<ContextType>;
  MasterchefSubgraph_MasterChef?: MasterchefSubgraph_MasterChefResolvers<ContextType>;
  MasterchefSubgraph_Pool?: MasterchefSubgraph_PoolResolvers<ContextType>;
  MasterchefSubgraph_RewardToken?: MasterchefSubgraph_RewardTokenResolvers<ContextType>;
  MasterchefSubgraph_Rewarder?: MasterchefSubgraph_RewarderResolvers<ContextType>;
  MasterchefSubgraph_User?: MasterchefSubgraph_UserResolvers<ContextType>;
  MasterchefSubgraph__Block_?: MasterchefSubgraph__Block_Resolvers<ContextType>;
  MasterchefSubgraph__Meta_?: MasterchefSubgraph__Meta_Resolvers<ContextType>;
  BlocksSubgraph_BigDecimal?: GraphQLScalarType;
  BlocksSubgraph_Block?: BlocksSubgraph_BlockResolvers<ContextType>;
  BlocksSubgraph_Bytes?: GraphQLScalarType;
  BlocksSubgraph__Block_?: BlocksSubgraph__Block_Resolvers<ContextType>;
  BlocksSubgraph__Meta_?: BlocksSubgraph__Meta_Resolvers<ContextType>;
  BalancerSubgraph_AmpUpdate?: BalancerSubgraph_AmpUpdateResolvers<ContextType>;
  BalancerSubgraph_Balancer?: BalancerSubgraph_BalancerResolvers<ContextType>;
  BalancerSubgraph_BalancerSnapshot?: BalancerSubgraph_BalancerSnapshotResolvers<ContextType>;
  BalancerSubgraph_BigDecimal?: GraphQLScalarType;
  BalancerSubgraph_Bytes?: GraphQLScalarType;
  BalancerSubgraph_GradualWeightUpdate?: BalancerSubgraph_GradualWeightUpdateResolvers<ContextType>;
  BalancerSubgraph_Investment?: BalancerSubgraph_InvestmentResolvers<ContextType>;
  BalancerSubgraph_JoinExit?: BalancerSubgraph_JoinExitResolvers<ContextType>;
  BalancerSubgraph_LatestPrice?: BalancerSubgraph_LatestPriceResolvers<ContextType>;
  BalancerSubgraph_Pool?: BalancerSubgraph_PoolResolvers<ContextType>;
  BalancerSubgraph_PoolHistoricalLiquidity?: BalancerSubgraph_PoolHistoricalLiquidityResolvers<ContextType>;
  BalancerSubgraph_PoolShare?: BalancerSubgraph_PoolShareResolvers<ContextType>;
  BalancerSubgraph_PoolSnapshot?: BalancerSubgraph_PoolSnapshotResolvers<ContextType>;
  BalancerSubgraph_PoolToken?: BalancerSubgraph_PoolTokenResolvers<ContextType>;
  BalancerSubgraph_PriceRateProvider?: BalancerSubgraph_PriceRateProviderResolvers<ContextType>;
  BalancerSubgraph_Swap?: BalancerSubgraph_SwapResolvers<ContextType>;
  BalancerSubgraph_Token?: BalancerSubgraph_TokenResolvers<ContextType>;
  BalancerSubgraph_TokenPrice?: BalancerSubgraph_TokenPriceResolvers<ContextType>;
  BalancerSubgraph_TokenSnapshot?: BalancerSubgraph_TokenSnapshotResolvers<ContextType>;
  BalancerSubgraph_TradePair?: BalancerSubgraph_TradePairResolvers<ContextType>;
  BalancerSubgraph_TradePairSnapshot?: BalancerSubgraph_TradePairSnapshotResolvers<ContextType>;
  BalancerSubgraph_User?: BalancerSubgraph_UserResolvers<ContextType>;
  BalancerSubgraph_UserInternalBalance?: BalancerSubgraph_UserInternalBalanceResolvers<ContextType>;
  BalancerSubgraph__Block_?: BalancerSubgraph__Block_Resolvers<ContextType>;
  BalancerSubgraph__Meta_?: BalancerSubgraph__Meta_Resolvers<ContextType>;
}>;


import { MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';

import { InContextSdkMethod } from '@graphql-mesh/types';


    export namespace BeetsbarTypes {
      export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BeetsBarSubgraph_BigDecimal: any;
  BigInt: any;
  BeetsBarSubgraph_Bytes: any;
};

export type BeetsBarSubgraph_Bar = {
  id: Scalars['ID'];
  address: Scalars['BeetsBarSubgraph_Bytes'];
  decimals: Scalars['Int'];
  name: Scalars['String'];
  vestingToken: Scalars['BeetsBarSubgraph_Bytes'];
  symbol: Scalars['String'];
  totalSupply: Scalars['BeetsBarSubgraph_BigDecimal'];
  ratio: Scalars['BeetsBarSubgraph_BigDecimal'];
  fBeetsMinted: Scalars['BeetsBarSubgraph_BigDecimal'];
  fBeetsBurned: Scalars['BeetsBarSubgraph_BigDecimal'];
  vestingTokenStaked: Scalars['BeetsBarSubgraph_BigDecimal'];
  sharedVestingTokenRevenue: Scalars['BeetsBarSubgraph_BigDecimal'];
  users: Array<BeetsBarSubgraph_User>;
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
};


export type BeetsBarSubgraph_BarusersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BeetsBarSubgraph_User_orderBy>;
  orderDirection?: InputMaybe<BeetsBarSubgraph_OrderDirection>;
  where?: InputMaybe<BeetsBarSubgraph_User_filter>;
};

export type BeetsBarSubgraph_Bar_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  address?: InputMaybe<Scalars['BeetsBarSubgraph_Bytes']>;
  address_not?: InputMaybe<Scalars['BeetsBarSubgraph_Bytes']>;
  address_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_Bytes']>>;
  address_not_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_Bytes']>>;
  address_contains?: InputMaybe<Scalars['BeetsBarSubgraph_Bytes']>;
  address_not_contains?: InputMaybe<Scalars['BeetsBarSubgraph_Bytes']>;
  decimals?: InputMaybe<Scalars['Int']>;
  decimals_not?: InputMaybe<Scalars['Int']>;
  decimals_gt?: InputMaybe<Scalars['Int']>;
  decimals_lt?: InputMaybe<Scalars['Int']>;
  decimals_gte?: InputMaybe<Scalars['Int']>;
  decimals_lte?: InputMaybe<Scalars['Int']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']>>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']>>;
  name?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  vestingToken?: InputMaybe<Scalars['BeetsBarSubgraph_Bytes']>;
  vestingToken_not?: InputMaybe<Scalars['BeetsBarSubgraph_Bytes']>;
  vestingToken_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_Bytes']>>;
  vestingToken_not_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_Bytes']>>;
  vestingToken_contains?: InputMaybe<Scalars['BeetsBarSubgraph_Bytes']>;
  vestingToken_not_contains?: InputMaybe<Scalars['BeetsBarSubgraph_Bytes']>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  totalSupply?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  totalSupply_not?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  totalSupply_gt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  totalSupply_lt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  totalSupply_gte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  totalSupply_lte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  ratio?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  ratio_not?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  ratio_gt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  ratio_lt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  ratio_gte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  ratio_lte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  ratio_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  ratio_not_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  fBeetsMinted?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  fBeetsMinted_not?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  fBeetsMinted_gt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  fBeetsMinted_lt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  fBeetsMinted_gte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  fBeetsMinted_lte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  fBeetsMinted_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  fBeetsMinted_not_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  fBeetsBurned?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  fBeetsBurned_not?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  fBeetsBurned_gt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  fBeetsBurned_lt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  fBeetsBurned_gte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  fBeetsBurned_lte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  fBeetsBurned_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  fBeetsBurned_not_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  vestingTokenStaked?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenStaked_not?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenStaked_gt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenStaked_lt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenStaked_gte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenStaked_lte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenStaked_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  vestingTokenStaked_not_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  sharedVestingTokenRevenue?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  sharedVestingTokenRevenue_not?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  sharedVestingTokenRevenue_gt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  sharedVestingTokenRevenue_lt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  sharedVestingTokenRevenue_gte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  sharedVestingTokenRevenue_lte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  sharedVestingTokenRevenue_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  sharedVestingTokenRevenue_not_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type BeetsBarSubgraph_Bar_orderBy =
  | 'id'
  | 'address'
  | 'decimals'
  | 'name'
  | 'vestingToken'
  | 'symbol'
  | 'totalSupply'
  | 'ratio'
  | 'fBeetsMinted'
  | 'fBeetsBurned'
  | 'vestingTokenStaked'
  | 'sharedVestingTokenRevenue'
  | 'users'
  | 'block'
  | 'timestamp';

export type BeetsBarSubgraph_Block_height = {
  hash?: InputMaybe<Scalars['BeetsBarSubgraph_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
};

export type BeetsBarSubgraph_OrderDirection =
  | 'asc'
  | 'desc';

export type Query = {
  BeetsBarSubgraph_bar?: Maybe<BeetsBarSubgraph_Bar>;
  BeetsBarSubgraph_bars: Array<BeetsBarSubgraph_Bar>;
  BeetsBarSubgraph_user?: Maybe<BeetsBarSubgraph_User>;
  BeetsBarSubgraph_users: Array<BeetsBarSubgraph_User>;
  /** Access to subgraph metadata */
  BeetsBarSubgraph__meta?: Maybe<BeetsBarSubgraph__Meta_>;
};


export type QueryBeetsBarSubgraph_barArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BeetsBarSubgraph_Block_height>;
};


export type QueryBeetsBarSubgraph_barsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BeetsBarSubgraph_Bar_orderBy>;
  orderDirection?: InputMaybe<BeetsBarSubgraph_OrderDirection>;
  where?: InputMaybe<BeetsBarSubgraph_Bar_filter>;
  block?: InputMaybe<BeetsBarSubgraph_Block_height>;
};


export type QueryBeetsBarSubgraph_userArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BeetsBarSubgraph_Block_height>;
};


export type QueryBeetsBarSubgraph_usersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BeetsBarSubgraph_User_orderBy>;
  orderDirection?: InputMaybe<BeetsBarSubgraph_OrderDirection>;
  where?: InputMaybe<BeetsBarSubgraph_User_filter>;
  block?: InputMaybe<BeetsBarSubgraph_Block_height>;
};


export type QueryBeetsBarSubgraph__metaArgs = {
  block?: InputMaybe<BeetsBarSubgraph_Block_height>;
};

export type Subscription = {
  BeetsBarSubgraph_bar?: Maybe<BeetsBarSubgraph_Bar>;
  BeetsBarSubgraph_bars: Array<BeetsBarSubgraph_Bar>;
  BeetsBarSubgraph_user?: Maybe<BeetsBarSubgraph_User>;
  BeetsBarSubgraph_users: Array<BeetsBarSubgraph_User>;
  /** Access to subgraph metadata */
  BeetsBarSubgraph__meta?: Maybe<BeetsBarSubgraph__Meta_>;
};


export type SubscriptionBeetsBarSubgraph_barArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BeetsBarSubgraph_Block_height>;
};


export type SubscriptionBeetsBarSubgraph_barsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BeetsBarSubgraph_Bar_orderBy>;
  orderDirection?: InputMaybe<BeetsBarSubgraph_OrderDirection>;
  where?: InputMaybe<BeetsBarSubgraph_Bar_filter>;
  block?: InputMaybe<BeetsBarSubgraph_Block_height>;
};


export type SubscriptionBeetsBarSubgraph_userArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BeetsBarSubgraph_Block_height>;
};


export type SubscriptionBeetsBarSubgraph_usersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BeetsBarSubgraph_User_orderBy>;
  orderDirection?: InputMaybe<BeetsBarSubgraph_OrderDirection>;
  where?: InputMaybe<BeetsBarSubgraph_User_filter>;
  block?: InputMaybe<BeetsBarSubgraph_Block_height>;
};


export type SubscriptionBeetsBarSubgraph__metaArgs = {
  block?: InputMaybe<BeetsBarSubgraph_Block_height>;
};

export type BeetsBarSubgraph_User = {
  id: Scalars['ID'];
  address: Scalars['BeetsBarSubgraph_Bytes'];
  bar?: Maybe<BeetsBarSubgraph_Bar>;
  fBeets: Scalars['BeetsBarSubgraph_BigDecimal'];
  vestingTokenOut: Scalars['BeetsBarSubgraph_BigDecimal'];
  vestingTokenIn: Scalars['BeetsBarSubgraph_BigDecimal'];
  vestingTokenHarvested: Scalars['BeetsBarSubgraph_BigDecimal'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
};

export type BeetsBarSubgraph_User_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  address?: InputMaybe<Scalars['BeetsBarSubgraph_Bytes']>;
  address_not?: InputMaybe<Scalars['BeetsBarSubgraph_Bytes']>;
  address_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_Bytes']>>;
  address_not_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_Bytes']>>;
  address_contains?: InputMaybe<Scalars['BeetsBarSubgraph_Bytes']>;
  address_not_contains?: InputMaybe<Scalars['BeetsBarSubgraph_Bytes']>;
  bar?: InputMaybe<Scalars['String']>;
  bar_not?: InputMaybe<Scalars['String']>;
  bar_gt?: InputMaybe<Scalars['String']>;
  bar_lt?: InputMaybe<Scalars['String']>;
  bar_gte?: InputMaybe<Scalars['String']>;
  bar_lte?: InputMaybe<Scalars['String']>;
  bar_in?: InputMaybe<Array<Scalars['String']>>;
  bar_not_in?: InputMaybe<Array<Scalars['String']>>;
  bar_contains?: InputMaybe<Scalars['String']>;
  bar_not_contains?: InputMaybe<Scalars['String']>;
  bar_starts_with?: InputMaybe<Scalars['String']>;
  bar_not_starts_with?: InputMaybe<Scalars['String']>;
  bar_ends_with?: InputMaybe<Scalars['String']>;
  bar_not_ends_with?: InputMaybe<Scalars['String']>;
  fBeets?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  fBeets_not?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  fBeets_gt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  fBeets_lt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  fBeets_gte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  fBeets_lte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  fBeets_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  fBeets_not_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  vestingTokenOut?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenOut_not?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenOut_gt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenOut_lt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenOut_gte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenOut_lte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenOut_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  vestingTokenOut_not_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  vestingTokenIn?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenIn_not?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenIn_gt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenIn_lt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenIn_gte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenIn_lte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenIn_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  vestingTokenIn_not_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  vestingTokenHarvested?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenHarvested_not?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenHarvested_gt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenHarvested_lt?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenHarvested_gte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenHarvested_lte?: InputMaybe<Scalars['BeetsBarSubgraph_BigDecimal']>;
  vestingTokenHarvested_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  vestingTokenHarvested_not_in?: InputMaybe<Array<Scalars['BeetsBarSubgraph_BigDecimal']>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type BeetsBarSubgraph_User_orderBy =
  | 'id'
  | 'address'
  | 'bar'
  | 'fBeets'
  | 'vestingTokenOut'
  | 'vestingTokenIn'
  | 'vestingTokenHarvested'
  | 'block'
  | 'timestamp';

export type BeetsBarSubgraph__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['BeetsBarSubgraph_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type BeetsBarSubgraph__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: BeetsBarSubgraph__Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

    }
    export type QueryBeetsbarSdk = {
  /** null **/
  BeetsBarSubgraph_bar: InContextSdkMethod<BeetsbarTypes.Query['BeetsBarSubgraph_bar'], BeetsbarTypes.QueryBeetsBarSubgraph_barArgs, MeshContext>,
  /** null **/
  BeetsBarSubgraph_bars: InContextSdkMethod<BeetsbarTypes.Query['BeetsBarSubgraph_bars'], BeetsbarTypes.QueryBeetsBarSubgraph_barsArgs, MeshContext>,
  /** null **/
  BeetsBarSubgraph_user: InContextSdkMethod<BeetsbarTypes.Query['BeetsBarSubgraph_user'], BeetsbarTypes.QueryBeetsBarSubgraph_userArgs, MeshContext>,
  /** null **/
  BeetsBarSubgraph_users: InContextSdkMethod<BeetsbarTypes.Query['BeetsBarSubgraph_users'], BeetsbarTypes.QueryBeetsBarSubgraph_usersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  BeetsBarSubgraph__meta: InContextSdkMethod<BeetsbarTypes.Query['BeetsBarSubgraph__meta'], BeetsbarTypes.QueryBeetsBarSubgraph__metaArgs, MeshContext>
};

export type MutationBeetsbarSdk = {

};

export type SubscriptionBeetsbarSdk = {
  /** null **/
  BeetsBarSubgraph_bar: InContextSdkMethod<BeetsbarTypes.Subscription['BeetsBarSubgraph_bar'], BeetsbarTypes.SubscriptionBeetsBarSubgraph_barArgs, MeshContext>,
  /** null **/
  BeetsBarSubgraph_bars: InContextSdkMethod<BeetsbarTypes.Subscription['BeetsBarSubgraph_bars'], BeetsbarTypes.SubscriptionBeetsBarSubgraph_barsArgs, MeshContext>,
  /** null **/
  BeetsBarSubgraph_user: InContextSdkMethod<BeetsbarTypes.Subscription['BeetsBarSubgraph_user'], BeetsbarTypes.SubscriptionBeetsBarSubgraph_userArgs, MeshContext>,
  /** null **/
  BeetsBarSubgraph_users: InContextSdkMethod<BeetsbarTypes.Subscription['BeetsBarSubgraph_users'], BeetsbarTypes.SubscriptionBeetsBarSubgraph_usersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  BeetsBarSubgraph__meta: InContextSdkMethod<BeetsbarTypes.Subscription['BeetsBarSubgraph__meta'], BeetsbarTypes.SubscriptionBeetsBarSubgraph__metaArgs, MeshContext>
};


    export namespace MasterchefTypes {
      export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  MasterchefSubgraph_BigDecimal: any;
  BigInt: any;
  MasterchefSubgraph_Bytes: any;
};

export type MasterchefSubgraph_Block_height = {
  hash?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
};

export type MasterchefSubgraph_HarvestAction = {
  id: Scalars['ID'];
  user?: Maybe<MasterchefSubgraph_User>;
  token: Scalars['MasterchefSubgraph_Bytes'];
  amount: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  block: Scalars['BigInt'];
};

export type MasterchefSubgraph_HarvestAction_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  user?: InputMaybe<Scalars['String']>;
  user_not?: InputMaybe<Scalars['String']>;
  user_gt?: InputMaybe<Scalars['String']>;
  user_lt?: InputMaybe<Scalars['String']>;
  user_gte?: InputMaybe<Scalars['String']>;
  user_lte?: InputMaybe<Scalars['String']>;
  user_in?: InputMaybe<Array<Scalars['String']>>;
  user_not_in?: InputMaybe<Array<Scalars['String']>>;
  user_contains?: InputMaybe<Scalars['String']>;
  user_not_contains?: InputMaybe<Scalars['String']>;
  user_starts_with?: InputMaybe<Scalars['String']>;
  user_not_starts_with?: InputMaybe<Scalars['String']>;
  user_ends_with?: InputMaybe<Scalars['String']>;
  user_not_ends_with?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  token_not?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  token_in?: InputMaybe<Array<Scalars['MasterchefSubgraph_Bytes']>>;
  token_not_in?: InputMaybe<Array<Scalars['MasterchefSubgraph_Bytes']>>;
  token_contains?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  token_not_contains?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type MasterchefSubgraph_HarvestAction_orderBy =
  | 'id'
  | 'user'
  | 'token'
  | 'amount'
  | 'timestamp'
  | 'block';

export type MasterchefSubgraph_MasterChef = {
  id: Scalars['ID'];
  beets: Scalars['MasterchefSubgraph_Bytes'];
  beetsPerBlock: Scalars['BigInt'];
  totalAllocPoint: Scalars['BigInt'];
  pools?: Maybe<Array<MasterchefSubgraph_Pool>>;
  poolCount: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  block: Scalars['BigInt'];
};


export type MasterchefSubgraph_MasterChefpoolsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MasterchefSubgraph_Pool_orderBy>;
  orderDirection?: InputMaybe<MasterchefSubgraph_OrderDirection>;
  where?: InputMaybe<MasterchefSubgraph_Pool_filter>;
};

export type MasterchefSubgraph_MasterChef_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  beets?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  beets_not?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  beets_in?: InputMaybe<Array<Scalars['MasterchefSubgraph_Bytes']>>;
  beets_not_in?: InputMaybe<Array<Scalars['MasterchefSubgraph_Bytes']>>;
  beets_contains?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  beets_not_contains?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  beetsPerBlock?: InputMaybe<Scalars['BigInt']>;
  beetsPerBlock_not?: InputMaybe<Scalars['BigInt']>;
  beetsPerBlock_gt?: InputMaybe<Scalars['BigInt']>;
  beetsPerBlock_lt?: InputMaybe<Scalars['BigInt']>;
  beetsPerBlock_gte?: InputMaybe<Scalars['BigInt']>;
  beetsPerBlock_lte?: InputMaybe<Scalars['BigInt']>;
  beetsPerBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  beetsPerBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalAllocPoint?: InputMaybe<Scalars['BigInt']>;
  totalAllocPoint_not?: InputMaybe<Scalars['BigInt']>;
  totalAllocPoint_gt?: InputMaybe<Scalars['BigInt']>;
  totalAllocPoint_lt?: InputMaybe<Scalars['BigInt']>;
  totalAllocPoint_gte?: InputMaybe<Scalars['BigInt']>;
  totalAllocPoint_lte?: InputMaybe<Scalars['BigInt']>;
  totalAllocPoint_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalAllocPoint_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  poolCount?: InputMaybe<Scalars['BigInt']>;
  poolCount_not?: InputMaybe<Scalars['BigInt']>;
  poolCount_gt?: InputMaybe<Scalars['BigInt']>;
  poolCount_lt?: InputMaybe<Scalars['BigInt']>;
  poolCount_gte?: InputMaybe<Scalars['BigInt']>;
  poolCount_lte?: InputMaybe<Scalars['BigInt']>;
  poolCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  poolCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type MasterchefSubgraph_MasterChef_orderBy =
  | 'id'
  | 'beets'
  | 'beetsPerBlock'
  | 'totalAllocPoint'
  | 'pools'
  | 'poolCount'
  | 'timestamp'
  | 'block';

export type MasterchefSubgraph_OrderDirection =
  | 'asc'
  | 'desc';

export type MasterchefSubgraph_Pool = {
  id: Scalars['ID'];
  masterChef: MasterchefSubgraph_MasterChef;
  pair: Scalars['MasterchefSubgraph_Bytes'];
  rewarder?: Maybe<MasterchefSubgraph_Rewarder>;
  allocPoint: Scalars['BigInt'];
  lastRewardBlock: Scalars['BigInt'];
  accBeetsPerShare: Scalars['BigInt'];
  slpBalance: Scalars['BigInt'];
  users: Array<MasterchefSubgraph_User>;
  userCount: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  block: Scalars['BigInt'];
};


export type MasterchefSubgraph_PoolusersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MasterchefSubgraph_User_orderBy>;
  orderDirection?: InputMaybe<MasterchefSubgraph_OrderDirection>;
  where?: InputMaybe<MasterchefSubgraph_User_filter>;
};

export type MasterchefSubgraph_Pool_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  masterChef?: InputMaybe<Scalars['String']>;
  masterChef_not?: InputMaybe<Scalars['String']>;
  masterChef_gt?: InputMaybe<Scalars['String']>;
  masterChef_lt?: InputMaybe<Scalars['String']>;
  masterChef_gte?: InputMaybe<Scalars['String']>;
  masterChef_lte?: InputMaybe<Scalars['String']>;
  masterChef_in?: InputMaybe<Array<Scalars['String']>>;
  masterChef_not_in?: InputMaybe<Array<Scalars['String']>>;
  masterChef_contains?: InputMaybe<Scalars['String']>;
  masterChef_not_contains?: InputMaybe<Scalars['String']>;
  masterChef_starts_with?: InputMaybe<Scalars['String']>;
  masterChef_not_starts_with?: InputMaybe<Scalars['String']>;
  masterChef_ends_with?: InputMaybe<Scalars['String']>;
  masterChef_not_ends_with?: InputMaybe<Scalars['String']>;
  pair?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  pair_not?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  pair_in?: InputMaybe<Array<Scalars['MasterchefSubgraph_Bytes']>>;
  pair_not_in?: InputMaybe<Array<Scalars['MasterchefSubgraph_Bytes']>>;
  pair_contains?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  pair_not_contains?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  rewarder?: InputMaybe<Scalars['String']>;
  rewarder_not?: InputMaybe<Scalars['String']>;
  rewarder_gt?: InputMaybe<Scalars['String']>;
  rewarder_lt?: InputMaybe<Scalars['String']>;
  rewarder_gte?: InputMaybe<Scalars['String']>;
  rewarder_lte?: InputMaybe<Scalars['String']>;
  rewarder_in?: InputMaybe<Array<Scalars['String']>>;
  rewarder_not_in?: InputMaybe<Array<Scalars['String']>>;
  rewarder_contains?: InputMaybe<Scalars['String']>;
  rewarder_not_contains?: InputMaybe<Scalars['String']>;
  rewarder_starts_with?: InputMaybe<Scalars['String']>;
  rewarder_not_starts_with?: InputMaybe<Scalars['String']>;
  rewarder_ends_with?: InputMaybe<Scalars['String']>;
  rewarder_not_ends_with?: InputMaybe<Scalars['String']>;
  allocPoint?: InputMaybe<Scalars['BigInt']>;
  allocPoint_not?: InputMaybe<Scalars['BigInt']>;
  allocPoint_gt?: InputMaybe<Scalars['BigInt']>;
  allocPoint_lt?: InputMaybe<Scalars['BigInt']>;
  allocPoint_gte?: InputMaybe<Scalars['BigInt']>;
  allocPoint_lte?: InputMaybe<Scalars['BigInt']>;
  allocPoint_in?: InputMaybe<Array<Scalars['BigInt']>>;
  allocPoint_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastRewardBlock?: InputMaybe<Scalars['BigInt']>;
  lastRewardBlock_not?: InputMaybe<Scalars['BigInt']>;
  lastRewardBlock_gt?: InputMaybe<Scalars['BigInt']>;
  lastRewardBlock_lt?: InputMaybe<Scalars['BigInt']>;
  lastRewardBlock_gte?: InputMaybe<Scalars['BigInt']>;
  lastRewardBlock_lte?: InputMaybe<Scalars['BigInt']>;
  lastRewardBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastRewardBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  accBeetsPerShare?: InputMaybe<Scalars['BigInt']>;
  accBeetsPerShare_not?: InputMaybe<Scalars['BigInt']>;
  accBeetsPerShare_gt?: InputMaybe<Scalars['BigInt']>;
  accBeetsPerShare_lt?: InputMaybe<Scalars['BigInt']>;
  accBeetsPerShare_gte?: InputMaybe<Scalars['BigInt']>;
  accBeetsPerShare_lte?: InputMaybe<Scalars['BigInt']>;
  accBeetsPerShare_in?: InputMaybe<Array<Scalars['BigInt']>>;
  accBeetsPerShare_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slpBalance?: InputMaybe<Scalars['BigInt']>;
  slpBalance_not?: InputMaybe<Scalars['BigInt']>;
  slpBalance_gt?: InputMaybe<Scalars['BigInt']>;
  slpBalance_lt?: InputMaybe<Scalars['BigInt']>;
  slpBalance_gte?: InputMaybe<Scalars['BigInt']>;
  slpBalance_lte?: InputMaybe<Scalars['BigInt']>;
  slpBalance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slpBalance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  userCount?: InputMaybe<Scalars['BigInt']>;
  userCount_not?: InputMaybe<Scalars['BigInt']>;
  userCount_gt?: InputMaybe<Scalars['BigInt']>;
  userCount_lt?: InputMaybe<Scalars['BigInt']>;
  userCount_gte?: InputMaybe<Scalars['BigInt']>;
  userCount_lte?: InputMaybe<Scalars['BigInt']>;
  userCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  userCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type MasterchefSubgraph_Pool_orderBy =
  | 'id'
  | 'masterChef'
  | 'pair'
  | 'rewarder'
  | 'allocPoint'
  | 'lastRewardBlock'
  | 'accBeetsPerShare'
  | 'slpBalance'
  | 'users'
  | 'userCount'
  | 'timestamp'
  | 'block';

export type Query = {
  MasterchefSubgraph_masterChef?: Maybe<MasterchefSubgraph_MasterChef>;
  MasterchefSubgraph_masterChefs: Array<MasterchefSubgraph_MasterChef>;
  MasterchefSubgraph_pool?: Maybe<MasterchefSubgraph_Pool>;
  MasterchefSubgraph_pools: Array<MasterchefSubgraph_Pool>;
  MasterchefSubgraph_rewardToken?: Maybe<MasterchefSubgraph_RewardToken>;
  MasterchefSubgraph_rewardTokens: Array<MasterchefSubgraph_RewardToken>;
  MasterchefSubgraph_rewarder?: Maybe<MasterchefSubgraph_Rewarder>;
  MasterchefSubgraph_rewarders: Array<MasterchefSubgraph_Rewarder>;
  MasterchefSubgraph_harvestAction?: Maybe<MasterchefSubgraph_HarvestAction>;
  MasterchefSubgraph_harvestActions: Array<MasterchefSubgraph_HarvestAction>;
  MasterchefSubgraph_user?: Maybe<MasterchefSubgraph_User>;
  MasterchefSubgraph_users: Array<MasterchefSubgraph_User>;
  /** Access to subgraph metadata */
  MasterchefSubgraph__meta?: Maybe<MasterchefSubgraph__Meta_>;
};


export type QueryMasterchefSubgraph_masterChefArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type QueryMasterchefSubgraph_masterChefsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MasterchefSubgraph_MasterChef_orderBy>;
  orderDirection?: InputMaybe<MasterchefSubgraph_OrderDirection>;
  where?: InputMaybe<MasterchefSubgraph_MasterChef_filter>;
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type QueryMasterchefSubgraph_poolArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type QueryMasterchefSubgraph_poolsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MasterchefSubgraph_Pool_orderBy>;
  orderDirection?: InputMaybe<MasterchefSubgraph_OrderDirection>;
  where?: InputMaybe<MasterchefSubgraph_Pool_filter>;
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type QueryMasterchefSubgraph_rewardTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type QueryMasterchefSubgraph_rewardTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MasterchefSubgraph_RewardToken_orderBy>;
  orderDirection?: InputMaybe<MasterchefSubgraph_OrderDirection>;
  where?: InputMaybe<MasterchefSubgraph_RewardToken_filter>;
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type QueryMasterchefSubgraph_rewarderArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type QueryMasterchefSubgraph_rewardersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MasterchefSubgraph_Rewarder_orderBy>;
  orderDirection?: InputMaybe<MasterchefSubgraph_OrderDirection>;
  where?: InputMaybe<MasterchefSubgraph_Rewarder_filter>;
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type QueryMasterchefSubgraph_harvestActionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type QueryMasterchefSubgraph_harvestActionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MasterchefSubgraph_HarvestAction_orderBy>;
  orderDirection?: InputMaybe<MasterchefSubgraph_OrderDirection>;
  where?: InputMaybe<MasterchefSubgraph_HarvestAction_filter>;
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type QueryMasterchefSubgraph_userArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type QueryMasterchefSubgraph_usersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MasterchefSubgraph_User_orderBy>;
  orderDirection?: InputMaybe<MasterchefSubgraph_OrderDirection>;
  where?: InputMaybe<MasterchefSubgraph_User_filter>;
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type QueryMasterchefSubgraph__metaArgs = {
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};

export type MasterchefSubgraph_RewardToken = {
  id: Scalars['ID'];
  rewarder?: Maybe<MasterchefSubgraph_Rewarder>;
  token: Scalars['MasterchefSubgraph_Bytes'];
  decimals: Scalars['Int'];
  symbol: Scalars['String'];
  rewardPerSecond: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  block: Scalars['BigInt'];
};

export type MasterchefSubgraph_RewardToken_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  rewarder?: InputMaybe<Scalars['String']>;
  rewarder_not?: InputMaybe<Scalars['String']>;
  rewarder_gt?: InputMaybe<Scalars['String']>;
  rewarder_lt?: InputMaybe<Scalars['String']>;
  rewarder_gte?: InputMaybe<Scalars['String']>;
  rewarder_lte?: InputMaybe<Scalars['String']>;
  rewarder_in?: InputMaybe<Array<Scalars['String']>>;
  rewarder_not_in?: InputMaybe<Array<Scalars['String']>>;
  rewarder_contains?: InputMaybe<Scalars['String']>;
  rewarder_not_contains?: InputMaybe<Scalars['String']>;
  rewarder_starts_with?: InputMaybe<Scalars['String']>;
  rewarder_not_starts_with?: InputMaybe<Scalars['String']>;
  rewarder_ends_with?: InputMaybe<Scalars['String']>;
  rewarder_not_ends_with?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  token_not?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  token_in?: InputMaybe<Array<Scalars['MasterchefSubgraph_Bytes']>>;
  token_not_in?: InputMaybe<Array<Scalars['MasterchefSubgraph_Bytes']>>;
  token_contains?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  token_not_contains?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  decimals?: InputMaybe<Scalars['Int']>;
  decimals_not?: InputMaybe<Scalars['Int']>;
  decimals_gt?: InputMaybe<Scalars['Int']>;
  decimals_lt?: InputMaybe<Scalars['Int']>;
  decimals_gte?: InputMaybe<Scalars['Int']>;
  decimals_lte?: InputMaybe<Scalars['Int']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']>>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']>>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  rewardPerSecond?: InputMaybe<Scalars['BigInt']>;
  rewardPerSecond_not?: InputMaybe<Scalars['BigInt']>;
  rewardPerSecond_gt?: InputMaybe<Scalars['BigInt']>;
  rewardPerSecond_lt?: InputMaybe<Scalars['BigInt']>;
  rewardPerSecond_gte?: InputMaybe<Scalars['BigInt']>;
  rewardPerSecond_lte?: InputMaybe<Scalars['BigInt']>;
  rewardPerSecond_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rewardPerSecond_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type MasterchefSubgraph_RewardToken_orderBy =
  | 'id'
  | 'rewarder'
  | 'token'
  | 'decimals'
  | 'symbol'
  | 'rewardPerSecond'
  | 'timestamp'
  | 'block';

export type MasterchefSubgraph_Rewarder = {
  id: Scalars['ID'];
  rewardTokens: Array<MasterchefSubgraph_RewardToken>;
  timestamp: Scalars['BigInt'];
  block: Scalars['BigInt'];
};


export type MasterchefSubgraph_RewarderrewardTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MasterchefSubgraph_RewardToken_orderBy>;
  orderDirection?: InputMaybe<MasterchefSubgraph_OrderDirection>;
  where?: InputMaybe<MasterchefSubgraph_RewardToken_filter>;
};

export type MasterchefSubgraph_Rewarder_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type MasterchefSubgraph_Rewarder_orderBy =
  | 'id'
  | 'rewardTokens'
  | 'timestamp'
  | 'block';

export type Subscription = {
  MasterchefSubgraph_masterChef?: Maybe<MasterchefSubgraph_MasterChef>;
  MasterchefSubgraph_masterChefs: Array<MasterchefSubgraph_MasterChef>;
  MasterchefSubgraph_pool?: Maybe<MasterchefSubgraph_Pool>;
  MasterchefSubgraph_pools: Array<MasterchefSubgraph_Pool>;
  MasterchefSubgraph_rewardToken?: Maybe<MasterchefSubgraph_RewardToken>;
  MasterchefSubgraph_rewardTokens: Array<MasterchefSubgraph_RewardToken>;
  MasterchefSubgraph_rewarder?: Maybe<MasterchefSubgraph_Rewarder>;
  MasterchefSubgraph_rewarders: Array<MasterchefSubgraph_Rewarder>;
  MasterchefSubgraph_harvestAction?: Maybe<MasterchefSubgraph_HarvestAction>;
  MasterchefSubgraph_harvestActions: Array<MasterchefSubgraph_HarvestAction>;
  MasterchefSubgraph_user?: Maybe<MasterchefSubgraph_User>;
  MasterchefSubgraph_users: Array<MasterchefSubgraph_User>;
  /** Access to subgraph metadata */
  MasterchefSubgraph__meta?: Maybe<MasterchefSubgraph__Meta_>;
};


export type SubscriptionMasterchefSubgraph_masterChefArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type SubscriptionMasterchefSubgraph_masterChefsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MasterchefSubgraph_MasterChef_orderBy>;
  orderDirection?: InputMaybe<MasterchefSubgraph_OrderDirection>;
  where?: InputMaybe<MasterchefSubgraph_MasterChef_filter>;
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type SubscriptionMasterchefSubgraph_poolArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type SubscriptionMasterchefSubgraph_poolsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MasterchefSubgraph_Pool_orderBy>;
  orderDirection?: InputMaybe<MasterchefSubgraph_OrderDirection>;
  where?: InputMaybe<MasterchefSubgraph_Pool_filter>;
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type SubscriptionMasterchefSubgraph_rewardTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type SubscriptionMasterchefSubgraph_rewardTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MasterchefSubgraph_RewardToken_orderBy>;
  orderDirection?: InputMaybe<MasterchefSubgraph_OrderDirection>;
  where?: InputMaybe<MasterchefSubgraph_RewardToken_filter>;
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type SubscriptionMasterchefSubgraph_rewarderArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type SubscriptionMasterchefSubgraph_rewardersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MasterchefSubgraph_Rewarder_orderBy>;
  orderDirection?: InputMaybe<MasterchefSubgraph_OrderDirection>;
  where?: InputMaybe<MasterchefSubgraph_Rewarder_filter>;
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type SubscriptionMasterchefSubgraph_harvestActionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type SubscriptionMasterchefSubgraph_harvestActionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MasterchefSubgraph_HarvestAction_orderBy>;
  orderDirection?: InputMaybe<MasterchefSubgraph_OrderDirection>;
  where?: InputMaybe<MasterchefSubgraph_HarvestAction_filter>;
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type SubscriptionMasterchefSubgraph_userArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type SubscriptionMasterchefSubgraph_usersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MasterchefSubgraph_User_orderBy>;
  orderDirection?: InputMaybe<MasterchefSubgraph_OrderDirection>;
  where?: InputMaybe<MasterchefSubgraph_User_filter>;
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};


export type SubscriptionMasterchefSubgraph__metaArgs = {
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
};

export type MasterchefSubgraph_User = {
  id: Scalars['ID'];
  address: Scalars['MasterchefSubgraph_Bytes'];
  pool?: Maybe<MasterchefSubgraph_Pool>;
  amount: Scalars['BigInt'];
  rewardDebt: Scalars['BigInt'];
  beetsHarvested: Scalars['BigInt'];
  harvests: Array<MasterchefSubgraph_HarvestAction>;
  timestamp: Scalars['BigInt'];
  block: Scalars['BigInt'];
};


export type MasterchefSubgraph_UserharvestsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MasterchefSubgraph_HarvestAction_orderBy>;
  orderDirection?: InputMaybe<MasterchefSubgraph_OrderDirection>;
  where?: InputMaybe<MasterchefSubgraph_HarvestAction_filter>;
};

export type MasterchefSubgraph_User_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  address?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  address_not?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  address_in?: InputMaybe<Array<Scalars['MasterchefSubgraph_Bytes']>>;
  address_not_in?: InputMaybe<Array<Scalars['MasterchefSubgraph_Bytes']>>;
  address_contains?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  address_not_contains?: InputMaybe<Scalars['MasterchefSubgraph_Bytes']>;
  pool?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rewardDebt?: InputMaybe<Scalars['BigInt']>;
  rewardDebt_not?: InputMaybe<Scalars['BigInt']>;
  rewardDebt_gt?: InputMaybe<Scalars['BigInt']>;
  rewardDebt_lt?: InputMaybe<Scalars['BigInt']>;
  rewardDebt_gte?: InputMaybe<Scalars['BigInt']>;
  rewardDebt_lte?: InputMaybe<Scalars['BigInt']>;
  rewardDebt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rewardDebt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  beetsHarvested?: InputMaybe<Scalars['BigInt']>;
  beetsHarvested_not?: InputMaybe<Scalars['BigInt']>;
  beetsHarvested_gt?: InputMaybe<Scalars['BigInt']>;
  beetsHarvested_lt?: InputMaybe<Scalars['BigInt']>;
  beetsHarvested_gte?: InputMaybe<Scalars['BigInt']>;
  beetsHarvested_lte?: InputMaybe<Scalars['BigInt']>;
  beetsHarvested_in?: InputMaybe<Array<Scalars['BigInt']>>;
  beetsHarvested_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type MasterchefSubgraph_User_orderBy =
  | 'id'
  | 'address'
  | 'pool'
  | 'amount'
  | 'rewardDebt'
  | 'beetsHarvested'
  | 'harvests'
  | 'timestamp'
  | 'block';

export type MasterchefSubgraph__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['MasterchefSubgraph_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type MasterchefSubgraph__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: MasterchefSubgraph__Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

    }
    export type QueryMasterchefSdk = {
  /** null **/
  MasterchefSubgraph_masterChef: InContextSdkMethod<MasterchefTypes.Query['MasterchefSubgraph_masterChef'], MasterchefTypes.QueryMasterchefSubgraph_masterChefArgs, MeshContext>,
  /** null **/
  MasterchefSubgraph_masterChefs: InContextSdkMethod<MasterchefTypes.Query['MasterchefSubgraph_masterChefs'], MasterchefTypes.QueryMasterchefSubgraph_masterChefsArgs, MeshContext>,
  /** null **/
  MasterchefSubgraph_pool: InContextSdkMethod<MasterchefTypes.Query['MasterchefSubgraph_pool'], MasterchefTypes.QueryMasterchefSubgraph_poolArgs, MeshContext>,
  /** null **/
  MasterchefSubgraph_pools: InContextSdkMethod<MasterchefTypes.Query['MasterchefSubgraph_pools'], MasterchefTypes.QueryMasterchefSubgraph_poolsArgs, MeshContext>,
  /** null **/
  MasterchefSubgraph_rewardToken: InContextSdkMethod<MasterchefTypes.Query['MasterchefSubgraph_rewardToken'], MasterchefTypes.QueryMasterchefSubgraph_rewardTokenArgs, MeshContext>,
  /** null **/
  MasterchefSubgraph_rewardTokens: InContextSdkMethod<MasterchefTypes.Query['MasterchefSubgraph_rewardTokens'], MasterchefTypes.QueryMasterchefSubgraph_rewardTokensArgs, MeshContext>,
  /** null **/
  MasterchefSubgraph_rewarder: InContextSdkMethod<MasterchefTypes.Query['MasterchefSubgraph_rewarder'], MasterchefTypes.QueryMasterchefSubgraph_rewarderArgs, MeshContext>,
  /** null **/
  MasterchefSubgraph_rewarders: InContextSdkMethod<MasterchefTypes.Query['MasterchefSubgraph_rewarders'], MasterchefTypes.QueryMasterchefSubgraph_rewardersArgs, MeshContext>,
  /** null **/
  MasterchefSubgraph_harvestAction: InContextSdkMethod<MasterchefTypes.Query['MasterchefSubgraph_harvestAction'], MasterchefTypes.QueryMasterchefSubgraph_harvestActionArgs, MeshContext>,
  /** null **/
  MasterchefSubgraph_harvestActions: InContextSdkMethod<MasterchefTypes.Query['MasterchefSubgraph_harvestActions'], MasterchefTypes.QueryMasterchefSubgraph_harvestActionsArgs, MeshContext>,
  /** null **/
  MasterchefSubgraph_user: InContextSdkMethod<MasterchefTypes.Query['MasterchefSubgraph_user'], MasterchefTypes.QueryMasterchefSubgraph_userArgs, MeshContext>,
  /** null **/
  MasterchefSubgraph_users: InContextSdkMethod<MasterchefTypes.Query['MasterchefSubgraph_users'], MasterchefTypes.QueryMasterchefSubgraph_usersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  MasterchefSubgraph__meta: InContextSdkMethod<MasterchefTypes.Query['MasterchefSubgraph__meta'], MasterchefTypes.QueryMasterchefSubgraph__metaArgs, MeshContext>
};

export type MutationMasterchefSdk = {

};

export type SubscriptionMasterchefSdk = {
  /** null **/
  MasterchefSubgraph_masterChef: InContextSdkMethod<MasterchefTypes.Subscription['MasterchefSubgraph_masterChef'], MasterchefTypes.SubscriptionMasterchefSubgraph_masterChefArgs, MeshContext>,
  /** null **/
  MasterchefSubgraph_masterChefs: InContextSdkMethod<MasterchefTypes.Subscription['MasterchefSubgraph_masterChefs'], MasterchefTypes.SubscriptionMasterchefSubgraph_masterChefsArgs, MeshContext>,
  /** null **/
  MasterchefSubgraph_pool: InContextSdkMethod<MasterchefTypes.Subscription['MasterchefSubgraph_pool'], MasterchefTypes.SubscriptionMasterchefSubgraph_poolArgs, MeshContext>,
  /** null **/
  MasterchefSubgraph_pools: InContextSdkMethod<MasterchefTypes.Subscription['MasterchefSubgraph_pools'], MasterchefTypes.SubscriptionMasterchefSubgraph_poolsArgs, MeshContext>,
  /** null **/
  MasterchefSubgraph_rewardToken: InContextSdkMethod<MasterchefTypes.Subscription['MasterchefSubgraph_rewardToken'], MasterchefTypes.SubscriptionMasterchefSubgraph_rewardTokenArgs, MeshContext>,
  /** null **/
  MasterchefSubgraph_rewardTokens: InContextSdkMethod<MasterchefTypes.Subscription['MasterchefSubgraph_rewardTokens'], MasterchefTypes.SubscriptionMasterchefSubgraph_rewardTokensArgs, MeshContext>,
  /** null **/
  MasterchefSubgraph_rewarder: InContextSdkMethod<MasterchefTypes.Subscription['MasterchefSubgraph_rewarder'], MasterchefTypes.SubscriptionMasterchefSubgraph_rewarderArgs, MeshContext>,
  /** null **/
  MasterchefSubgraph_rewarders: InContextSdkMethod<MasterchefTypes.Subscription['MasterchefSubgraph_rewarders'], MasterchefTypes.SubscriptionMasterchefSubgraph_rewardersArgs, MeshContext>,
  /** null **/
  MasterchefSubgraph_harvestAction: InContextSdkMethod<MasterchefTypes.Subscription['MasterchefSubgraph_harvestAction'], MasterchefTypes.SubscriptionMasterchefSubgraph_harvestActionArgs, MeshContext>,
  /** null **/
  MasterchefSubgraph_harvestActions: InContextSdkMethod<MasterchefTypes.Subscription['MasterchefSubgraph_harvestActions'], MasterchefTypes.SubscriptionMasterchefSubgraph_harvestActionsArgs, MeshContext>,
  /** null **/
  MasterchefSubgraph_user: InContextSdkMethod<MasterchefTypes.Subscription['MasterchefSubgraph_user'], MasterchefTypes.SubscriptionMasterchefSubgraph_userArgs, MeshContext>,
  /** null **/
  MasterchefSubgraph_users: InContextSdkMethod<MasterchefTypes.Subscription['MasterchefSubgraph_users'], MasterchefTypes.SubscriptionMasterchefSubgraph_usersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  MasterchefSubgraph__meta: InContextSdkMethod<MasterchefTypes.Subscription['MasterchefSubgraph__meta'], MasterchefTypes.SubscriptionMasterchefSubgraph__metaArgs, MeshContext>
};


    export namespace BlocksTypes {
      export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BlocksSubgraph_BigDecimal: any;
  BigInt: any;
  BlocksSubgraph_Bytes: any;
};

export type BlocksSubgraph_Block = {
  id: Scalars['ID'];
  number: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  parentHash?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['String']>;
  difficulty?: Maybe<Scalars['BigInt']>;
  totalDifficulty?: Maybe<Scalars['BigInt']>;
  gasUsed?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  receiptsRoot?: Maybe<Scalars['String']>;
  transactionsRoot?: Maybe<Scalars['String']>;
  stateRoot?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['BigInt']>;
  unclesHash?: Maybe<Scalars['String']>;
};

export type BlocksSubgraph_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type BlocksSubgraph_Block_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  number?: InputMaybe<Scalars['BigInt']>;
  number_not?: InputMaybe<Scalars['BigInt']>;
  number_gt?: InputMaybe<Scalars['BigInt']>;
  number_lt?: InputMaybe<Scalars['BigInt']>;
  number_gte?: InputMaybe<Scalars['BigInt']>;
  number_lte?: InputMaybe<Scalars['BigInt']>;
  number_in?: InputMaybe<Array<Scalars['BigInt']>>;
  number_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  parentHash?: InputMaybe<Scalars['String']>;
  parentHash_not?: InputMaybe<Scalars['String']>;
  parentHash_gt?: InputMaybe<Scalars['String']>;
  parentHash_lt?: InputMaybe<Scalars['String']>;
  parentHash_gte?: InputMaybe<Scalars['String']>;
  parentHash_lte?: InputMaybe<Scalars['String']>;
  parentHash_in?: InputMaybe<Array<Scalars['String']>>;
  parentHash_not_in?: InputMaybe<Array<Scalars['String']>>;
  parentHash_contains?: InputMaybe<Scalars['String']>;
  parentHash_contains_nocase?: InputMaybe<Scalars['String']>;
  parentHash_not_contains?: InputMaybe<Scalars['String']>;
  parentHash_not_contains_nocase?: InputMaybe<Scalars['String']>;
  parentHash_starts_with?: InputMaybe<Scalars['String']>;
  parentHash_starts_with_nocase?: InputMaybe<Scalars['String']>;
  parentHash_not_starts_with?: InputMaybe<Scalars['String']>;
  parentHash_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  parentHash_ends_with?: InputMaybe<Scalars['String']>;
  parentHash_ends_with_nocase?: InputMaybe<Scalars['String']>;
  parentHash_not_ends_with?: InputMaybe<Scalars['String']>;
  parentHash_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  author?: InputMaybe<Scalars['String']>;
  author_not?: InputMaybe<Scalars['String']>;
  author_gt?: InputMaybe<Scalars['String']>;
  author_lt?: InputMaybe<Scalars['String']>;
  author_gte?: InputMaybe<Scalars['String']>;
  author_lte?: InputMaybe<Scalars['String']>;
  author_in?: InputMaybe<Array<Scalars['String']>>;
  author_not_in?: InputMaybe<Array<Scalars['String']>>;
  author_contains?: InputMaybe<Scalars['String']>;
  author_contains_nocase?: InputMaybe<Scalars['String']>;
  author_not_contains?: InputMaybe<Scalars['String']>;
  author_not_contains_nocase?: InputMaybe<Scalars['String']>;
  author_starts_with?: InputMaybe<Scalars['String']>;
  author_starts_with_nocase?: InputMaybe<Scalars['String']>;
  author_not_starts_with?: InputMaybe<Scalars['String']>;
  author_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  author_ends_with?: InputMaybe<Scalars['String']>;
  author_ends_with_nocase?: InputMaybe<Scalars['String']>;
  author_not_ends_with?: InputMaybe<Scalars['String']>;
  author_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  difficulty?: InputMaybe<Scalars['BigInt']>;
  difficulty_not?: InputMaybe<Scalars['BigInt']>;
  difficulty_gt?: InputMaybe<Scalars['BigInt']>;
  difficulty_lt?: InputMaybe<Scalars['BigInt']>;
  difficulty_gte?: InputMaybe<Scalars['BigInt']>;
  difficulty_lte?: InputMaybe<Scalars['BigInt']>;
  difficulty_in?: InputMaybe<Array<Scalars['BigInt']>>;
  difficulty_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalDifficulty?: InputMaybe<Scalars['BigInt']>;
  totalDifficulty_not?: InputMaybe<Scalars['BigInt']>;
  totalDifficulty_gt?: InputMaybe<Scalars['BigInt']>;
  totalDifficulty_lt?: InputMaybe<Scalars['BigInt']>;
  totalDifficulty_gte?: InputMaybe<Scalars['BigInt']>;
  totalDifficulty_lte?: InputMaybe<Scalars['BigInt']>;
  totalDifficulty_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalDifficulty_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasUsed?: InputMaybe<Scalars['BigInt']>;
  gasUsed_not?: InputMaybe<Scalars['BigInt']>;
  gasUsed_gt?: InputMaybe<Scalars['BigInt']>;
  gasUsed_lt?: InputMaybe<Scalars['BigInt']>;
  gasUsed_gte?: InputMaybe<Scalars['BigInt']>;
  gasUsed_lte?: InputMaybe<Scalars['BigInt']>;
  gasUsed_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasUsed_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasLimit?: InputMaybe<Scalars['BigInt']>;
  gasLimit_not?: InputMaybe<Scalars['BigInt']>;
  gasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  gasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  gasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  gasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  gasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  receiptsRoot?: InputMaybe<Scalars['String']>;
  receiptsRoot_not?: InputMaybe<Scalars['String']>;
  receiptsRoot_gt?: InputMaybe<Scalars['String']>;
  receiptsRoot_lt?: InputMaybe<Scalars['String']>;
  receiptsRoot_gte?: InputMaybe<Scalars['String']>;
  receiptsRoot_lte?: InputMaybe<Scalars['String']>;
  receiptsRoot_in?: InputMaybe<Array<Scalars['String']>>;
  receiptsRoot_not_in?: InputMaybe<Array<Scalars['String']>>;
  receiptsRoot_contains?: InputMaybe<Scalars['String']>;
  receiptsRoot_contains_nocase?: InputMaybe<Scalars['String']>;
  receiptsRoot_not_contains?: InputMaybe<Scalars['String']>;
  receiptsRoot_not_contains_nocase?: InputMaybe<Scalars['String']>;
  receiptsRoot_starts_with?: InputMaybe<Scalars['String']>;
  receiptsRoot_starts_with_nocase?: InputMaybe<Scalars['String']>;
  receiptsRoot_not_starts_with?: InputMaybe<Scalars['String']>;
  receiptsRoot_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  receiptsRoot_ends_with?: InputMaybe<Scalars['String']>;
  receiptsRoot_ends_with_nocase?: InputMaybe<Scalars['String']>;
  receiptsRoot_not_ends_with?: InputMaybe<Scalars['String']>;
  receiptsRoot_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transactionsRoot?: InputMaybe<Scalars['String']>;
  transactionsRoot_not?: InputMaybe<Scalars['String']>;
  transactionsRoot_gt?: InputMaybe<Scalars['String']>;
  transactionsRoot_lt?: InputMaybe<Scalars['String']>;
  transactionsRoot_gte?: InputMaybe<Scalars['String']>;
  transactionsRoot_lte?: InputMaybe<Scalars['String']>;
  transactionsRoot_in?: InputMaybe<Array<Scalars['String']>>;
  transactionsRoot_not_in?: InputMaybe<Array<Scalars['String']>>;
  transactionsRoot_contains?: InputMaybe<Scalars['String']>;
  transactionsRoot_contains_nocase?: InputMaybe<Scalars['String']>;
  transactionsRoot_not_contains?: InputMaybe<Scalars['String']>;
  transactionsRoot_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transactionsRoot_starts_with?: InputMaybe<Scalars['String']>;
  transactionsRoot_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transactionsRoot_not_starts_with?: InputMaybe<Scalars['String']>;
  transactionsRoot_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transactionsRoot_ends_with?: InputMaybe<Scalars['String']>;
  transactionsRoot_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transactionsRoot_not_ends_with?: InputMaybe<Scalars['String']>;
  transactionsRoot_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  stateRoot?: InputMaybe<Scalars['String']>;
  stateRoot_not?: InputMaybe<Scalars['String']>;
  stateRoot_gt?: InputMaybe<Scalars['String']>;
  stateRoot_lt?: InputMaybe<Scalars['String']>;
  stateRoot_gte?: InputMaybe<Scalars['String']>;
  stateRoot_lte?: InputMaybe<Scalars['String']>;
  stateRoot_in?: InputMaybe<Array<Scalars['String']>>;
  stateRoot_not_in?: InputMaybe<Array<Scalars['String']>>;
  stateRoot_contains?: InputMaybe<Scalars['String']>;
  stateRoot_contains_nocase?: InputMaybe<Scalars['String']>;
  stateRoot_not_contains?: InputMaybe<Scalars['String']>;
  stateRoot_not_contains_nocase?: InputMaybe<Scalars['String']>;
  stateRoot_starts_with?: InputMaybe<Scalars['String']>;
  stateRoot_starts_with_nocase?: InputMaybe<Scalars['String']>;
  stateRoot_not_starts_with?: InputMaybe<Scalars['String']>;
  stateRoot_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  stateRoot_ends_with?: InputMaybe<Scalars['String']>;
  stateRoot_ends_with_nocase?: InputMaybe<Scalars['String']>;
  stateRoot_not_ends_with?: InputMaybe<Scalars['String']>;
  stateRoot_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['BigInt']>;
  size_not?: InputMaybe<Scalars['BigInt']>;
  size_gt?: InputMaybe<Scalars['BigInt']>;
  size_lt?: InputMaybe<Scalars['BigInt']>;
  size_gte?: InputMaybe<Scalars['BigInt']>;
  size_lte?: InputMaybe<Scalars['BigInt']>;
  size_in?: InputMaybe<Array<Scalars['BigInt']>>;
  size_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  unclesHash?: InputMaybe<Scalars['String']>;
  unclesHash_not?: InputMaybe<Scalars['String']>;
  unclesHash_gt?: InputMaybe<Scalars['String']>;
  unclesHash_lt?: InputMaybe<Scalars['String']>;
  unclesHash_gte?: InputMaybe<Scalars['String']>;
  unclesHash_lte?: InputMaybe<Scalars['String']>;
  unclesHash_in?: InputMaybe<Array<Scalars['String']>>;
  unclesHash_not_in?: InputMaybe<Array<Scalars['String']>>;
  unclesHash_contains?: InputMaybe<Scalars['String']>;
  unclesHash_contains_nocase?: InputMaybe<Scalars['String']>;
  unclesHash_not_contains?: InputMaybe<Scalars['String']>;
  unclesHash_not_contains_nocase?: InputMaybe<Scalars['String']>;
  unclesHash_starts_with?: InputMaybe<Scalars['String']>;
  unclesHash_starts_with_nocase?: InputMaybe<Scalars['String']>;
  unclesHash_not_starts_with?: InputMaybe<Scalars['String']>;
  unclesHash_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  unclesHash_ends_with?: InputMaybe<Scalars['String']>;
  unclesHash_ends_with_nocase?: InputMaybe<Scalars['String']>;
  unclesHash_not_ends_with?: InputMaybe<Scalars['String']>;
  unclesHash_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlocksSubgraph_BlockChangedFilter>;
};

export type BlocksSubgraph_Block_height = {
  hash?: InputMaybe<Scalars['BlocksSubgraph_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type BlocksSubgraph_Block_orderBy =
  | 'id'
  | 'number'
  | 'timestamp'
  | 'parentHash'
  | 'author'
  | 'difficulty'
  | 'totalDifficulty'
  | 'gasUsed'
  | 'gasLimit'
  | 'receiptsRoot'
  | 'transactionsRoot'
  | 'stateRoot'
  | 'size'
  | 'unclesHash';

/** Defines the order direction, either ascending or descending */
export type BlocksSubgraph_OrderDirection =
  | 'asc'
  | 'desc';

export type Query = {
  BlocksSubgraph_block?: Maybe<BlocksSubgraph_Block>;
  BlocksSubgraph_blocks: Array<BlocksSubgraph_Block>;
  /** Access to subgraph metadata */
  BlocksSubgraph__meta?: Maybe<BlocksSubgraph__Meta_>;
};


export type QueryBlocksSubgraph_blockArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BlocksSubgraph_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryBlocksSubgraph_blocksArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BlocksSubgraph_Block_orderBy>;
  orderDirection?: InputMaybe<BlocksSubgraph_OrderDirection>;
  where?: InputMaybe<BlocksSubgraph_Block_filter>;
  block?: InputMaybe<BlocksSubgraph_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryBlocksSubgraph__metaArgs = {
  block?: InputMaybe<BlocksSubgraph_Block_height>;
};

export type Subscription = {
  BlocksSubgraph_block?: Maybe<BlocksSubgraph_Block>;
  BlocksSubgraph_blocks: Array<BlocksSubgraph_Block>;
  /** Access to subgraph metadata */
  BlocksSubgraph__meta?: Maybe<BlocksSubgraph__Meta_>;
};


export type SubscriptionBlocksSubgraph_blockArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BlocksSubgraph_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionBlocksSubgraph_blocksArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BlocksSubgraph_Block_orderBy>;
  orderDirection?: InputMaybe<BlocksSubgraph_OrderDirection>;
  where?: InputMaybe<BlocksSubgraph_Block_filter>;
  block?: InputMaybe<BlocksSubgraph_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionBlocksSubgraph__metaArgs = {
  block?: InputMaybe<BlocksSubgraph_Block_height>;
};

export type BlocksSubgraph__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['BlocksSubgraph_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type BlocksSubgraph__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: BlocksSubgraph__Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

    }
    export type QueryBlocksSdk = {
  /** null **/
  BlocksSubgraph_block: InContextSdkMethod<BlocksTypes.Query['BlocksSubgraph_block'], BlocksTypes.QueryBlocksSubgraph_blockArgs, MeshContext>,
  /** null **/
  BlocksSubgraph_blocks: InContextSdkMethod<BlocksTypes.Query['BlocksSubgraph_blocks'], BlocksTypes.QueryBlocksSubgraph_blocksArgs, MeshContext>,
  /** Access to subgraph metadata **/
  BlocksSubgraph__meta: InContextSdkMethod<BlocksTypes.Query['BlocksSubgraph__meta'], BlocksTypes.QueryBlocksSubgraph__metaArgs, MeshContext>
};

export type MutationBlocksSdk = {

};

export type SubscriptionBlocksSdk = {
  /** null **/
  BlocksSubgraph_block: InContextSdkMethod<BlocksTypes.Subscription['BlocksSubgraph_block'], BlocksTypes.SubscriptionBlocksSubgraph_blockArgs, MeshContext>,
  /** null **/
  BlocksSubgraph_blocks: InContextSdkMethod<BlocksTypes.Subscription['BlocksSubgraph_blocks'], BlocksTypes.SubscriptionBlocksSubgraph_blocksArgs, MeshContext>,
  /** Access to subgraph metadata **/
  BlocksSubgraph__meta: InContextSdkMethod<BlocksTypes.Subscription['BlocksSubgraph__meta'], BlocksTypes.SubscriptionBlocksSubgraph__metaArgs, MeshContext>
};


    export namespace BalancerTypes {
      export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BalancerSubgraph_BigDecimal: any;
  BigInt: any;
  BalancerSubgraph_Bytes: any;
};

export type BalancerSubgraph_AmpUpdate = {
  id: Scalars['ID'];
  poolId: BalancerSubgraph_Pool;
  scheduledTimestamp: Scalars['Int'];
  startTimestamp: Scalars['Int'];
  endTimestamp: Scalars['Int'];
  startAmp: Scalars['BigInt'];
  endAmp: Scalars['BigInt'];
};

export type BalancerSubgraph_AmpUpdate_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  poolId?: InputMaybe<Scalars['String']>;
  poolId_not?: InputMaybe<Scalars['String']>;
  poolId_gt?: InputMaybe<Scalars['String']>;
  poolId_lt?: InputMaybe<Scalars['String']>;
  poolId_gte?: InputMaybe<Scalars['String']>;
  poolId_lte?: InputMaybe<Scalars['String']>;
  poolId_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_contains?: InputMaybe<Scalars['String']>;
  poolId_not_contains?: InputMaybe<Scalars['String']>;
  poolId_starts_with?: InputMaybe<Scalars['String']>;
  poolId_not_starts_with?: InputMaybe<Scalars['String']>;
  poolId_ends_with?: InputMaybe<Scalars['String']>;
  poolId_not_ends_with?: InputMaybe<Scalars['String']>;
  scheduledTimestamp?: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_not?: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_gt?: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_lt?: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_gte?: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_lte?: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  scheduledTimestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  startTimestamp?: InputMaybe<Scalars['Int']>;
  startTimestamp_not?: InputMaybe<Scalars['Int']>;
  startTimestamp_gt?: InputMaybe<Scalars['Int']>;
  startTimestamp_lt?: InputMaybe<Scalars['Int']>;
  startTimestamp_gte?: InputMaybe<Scalars['Int']>;
  startTimestamp_lte?: InputMaybe<Scalars['Int']>;
  startTimestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  startTimestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  endTimestamp?: InputMaybe<Scalars['Int']>;
  endTimestamp_not?: InputMaybe<Scalars['Int']>;
  endTimestamp_gt?: InputMaybe<Scalars['Int']>;
  endTimestamp_lt?: InputMaybe<Scalars['Int']>;
  endTimestamp_gte?: InputMaybe<Scalars['Int']>;
  endTimestamp_lte?: InputMaybe<Scalars['Int']>;
  endTimestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  endTimestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  startAmp?: InputMaybe<Scalars['BigInt']>;
  startAmp_not?: InputMaybe<Scalars['BigInt']>;
  startAmp_gt?: InputMaybe<Scalars['BigInt']>;
  startAmp_lt?: InputMaybe<Scalars['BigInt']>;
  startAmp_gte?: InputMaybe<Scalars['BigInt']>;
  startAmp_lte?: InputMaybe<Scalars['BigInt']>;
  startAmp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  startAmp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  endAmp?: InputMaybe<Scalars['BigInt']>;
  endAmp_not?: InputMaybe<Scalars['BigInt']>;
  endAmp_gt?: InputMaybe<Scalars['BigInt']>;
  endAmp_lt?: InputMaybe<Scalars['BigInt']>;
  endAmp_gte?: InputMaybe<Scalars['BigInt']>;
  endAmp_lte?: InputMaybe<Scalars['BigInt']>;
  endAmp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  endAmp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type BalancerSubgraph_AmpUpdate_orderBy =
  | 'id'
  | 'poolId'
  | 'scheduledTimestamp'
  | 'startTimestamp'
  | 'endTimestamp'
  | 'startAmp'
  | 'endAmp';

export type BalancerSubgraph_Balancer = {
  id: Scalars['ID'];
  poolCount: Scalars['Int'];
  pools?: Maybe<Array<BalancerSubgraph_Pool>>;
  totalLiquidity: Scalars['BalancerSubgraph_BigDecimal'];
  totalSwapCount: Scalars['BigInt'];
  totalSwapVolume: Scalars['BalancerSubgraph_BigDecimal'];
  totalSwapFee: Scalars['BalancerSubgraph_BigDecimal'];
};


export type BalancerSubgraph_BalancerpoolsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_Pool_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_Pool_filter>;
};

export type BalancerSubgraph_BalancerSnapshot = {
  id: Scalars['ID'];
  vault: BalancerSubgraph_Balancer;
  timestamp: Scalars['Int'];
  poolCount: Scalars['Int'];
  totalLiquidity: Scalars['BalancerSubgraph_BigDecimal'];
  totalSwapCount: Scalars['BigInt'];
  totalSwapVolume: Scalars['BalancerSubgraph_BigDecimal'];
  totalSwapFee: Scalars['BalancerSubgraph_BigDecimal'];
};

export type BalancerSubgraph_BalancerSnapshot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  vault?: InputMaybe<Scalars['String']>;
  vault_not?: InputMaybe<Scalars['String']>;
  vault_gt?: InputMaybe<Scalars['String']>;
  vault_lt?: InputMaybe<Scalars['String']>;
  vault_gte?: InputMaybe<Scalars['String']>;
  vault_lte?: InputMaybe<Scalars['String']>;
  vault_in?: InputMaybe<Array<Scalars['String']>>;
  vault_not_in?: InputMaybe<Array<Scalars['String']>>;
  vault_contains?: InputMaybe<Scalars['String']>;
  vault_not_contains?: InputMaybe<Scalars['String']>;
  vault_starts_with?: InputMaybe<Scalars['String']>;
  vault_not_starts_with?: InputMaybe<Scalars['String']>;
  vault_ends_with?: InputMaybe<Scalars['String']>;
  vault_not_ends_with?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  poolCount?: InputMaybe<Scalars['Int']>;
  poolCount_not?: InputMaybe<Scalars['Int']>;
  poolCount_gt?: InputMaybe<Scalars['Int']>;
  poolCount_lt?: InputMaybe<Scalars['Int']>;
  poolCount_gte?: InputMaybe<Scalars['Int']>;
  poolCount_lte?: InputMaybe<Scalars['Int']>;
  poolCount_in?: InputMaybe<Array<Scalars['Int']>>;
  poolCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
  totalLiquidity?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalLiquidity_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapCount?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_not?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_gt?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_lt?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_gte?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_lte?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSwapCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSwapVolume?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapVolume_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapFee?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapFee_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
};

export type BalancerSubgraph_BalancerSnapshot_orderBy =
  | 'id'
  | 'vault'
  | 'timestamp'
  | 'poolCount'
  | 'totalLiquidity'
  | 'totalSwapCount'
  | 'totalSwapVolume'
  | 'totalSwapFee';

export type BalancerSubgraph_Balancer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  poolCount?: InputMaybe<Scalars['Int']>;
  poolCount_not?: InputMaybe<Scalars['Int']>;
  poolCount_gt?: InputMaybe<Scalars['Int']>;
  poolCount_lt?: InputMaybe<Scalars['Int']>;
  poolCount_gte?: InputMaybe<Scalars['Int']>;
  poolCount_lte?: InputMaybe<Scalars['Int']>;
  poolCount_in?: InputMaybe<Array<Scalars['Int']>>;
  poolCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
  totalLiquidity?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalLiquidity_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapCount?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_not?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_gt?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_lt?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_gte?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_lte?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSwapCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSwapVolume?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapVolume_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapFee?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapFee_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
};

export type BalancerSubgraph_Balancer_orderBy =
  | 'id'
  | 'poolCount'
  | 'pools'
  | 'totalLiquidity'
  | 'totalSwapCount'
  | 'totalSwapVolume'
  | 'totalSwapFee';

export type BalancerSubgraph_Block_height = {
  hash?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
};

export type BalancerSubgraph_GradualWeightUpdate = {
  id: Scalars['ID'];
  poolId: BalancerSubgraph_Pool;
  scheduledTimestamp: Scalars['Int'];
  startTimestamp: Scalars['Int'];
  endTimestamp: Scalars['Int'];
  startWeights: Array<Scalars['BigInt']>;
  endWeights: Array<Scalars['BigInt']>;
};

export type BalancerSubgraph_GradualWeightUpdate_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  poolId?: InputMaybe<Scalars['String']>;
  poolId_not?: InputMaybe<Scalars['String']>;
  poolId_gt?: InputMaybe<Scalars['String']>;
  poolId_lt?: InputMaybe<Scalars['String']>;
  poolId_gte?: InputMaybe<Scalars['String']>;
  poolId_lte?: InputMaybe<Scalars['String']>;
  poolId_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_contains?: InputMaybe<Scalars['String']>;
  poolId_not_contains?: InputMaybe<Scalars['String']>;
  poolId_starts_with?: InputMaybe<Scalars['String']>;
  poolId_not_starts_with?: InputMaybe<Scalars['String']>;
  poolId_ends_with?: InputMaybe<Scalars['String']>;
  poolId_not_ends_with?: InputMaybe<Scalars['String']>;
  scheduledTimestamp?: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_not?: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_gt?: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_lt?: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_gte?: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_lte?: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  scheduledTimestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  startTimestamp?: InputMaybe<Scalars['Int']>;
  startTimestamp_not?: InputMaybe<Scalars['Int']>;
  startTimestamp_gt?: InputMaybe<Scalars['Int']>;
  startTimestamp_lt?: InputMaybe<Scalars['Int']>;
  startTimestamp_gte?: InputMaybe<Scalars['Int']>;
  startTimestamp_lte?: InputMaybe<Scalars['Int']>;
  startTimestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  startTimestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  endTimestamp?: InputMaybe<Scalars['Int']>;
  endTimestamp_not?: InputMaybe<Scalars['Int']>;
  endTimestamp_gt?: InputMaybe<Scalars['Int']>;
  endTimestamp_lt?: InputMaybe<Scalars['Int']>;
  endTimestamp_gte?: InputMaybe<Scalars['Int']>;
  endTimestamp_lte?: InputMaybe<Scalars['Int']>;
  endTimestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  endTimestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  startWeights?: InputMaybe<Array<Scalars['BigInt']>>;
  startWeights_not?: InputMaybe<Array<Scalars['BigInt']>>;
  startWeights_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  startWeights_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  endWeights?: InputMaybe<Array<Scalars['BigInt']>>;
  endWeights_not?: InputMaybe<Array<Scalars['BigInt']>>;
  endWeights_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  endWeights_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type BalancerSubgraph_GradualWeightUpdate_orderBy =
  | 'id'
  | 'poolId'
  | 'scheduledTimestamp'
  | 'startTimestamp'
  | 'endTimestamp'
  | 'startWeights'
  | 'endWeights';

export type BalancerSubgraph_InvestType =
  | 'Join'
  | 'Exit';

export type BalancerSubgraph_Investment = {
  id: Scalars['ID'];
  assetManagerAddress: Scalars['BalancerSubgraph_Bytes'];
  amount: Scalars['BalancerSubgraph_BigDecimal'];
  poolTokenId: BalancerSubgraph_PoolToken;
  timestamp: Scalars['Int'];
};

export type BalancerSubgraph_Investment_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  assetManagerAddress?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  assetManagerAddress_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  assetManagerAddress_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  assetManagerAddress_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  assetManagerAddress_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  assetManagerAddress_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  amount?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  amount_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  poolTokenId?: InputMaybe<Scalars['String']>;
  poolTokenId_not?: InputMaybe<Scalars['String']>;
  poolTokenId_gt?: InputMaybe<Scalars['String']>;
  poolTokenId_lt?: InputMaybe<Scalars['String']>;
  poolTokenId_gte?: InputMaybe<Scalars['String']>;
  poolTokenId_lte?: InputMaybe<Scalars['String']>;
  poolTokenId_in?: InputMaybe<Array<Scalars['String']>>;
  poolTokenId_not_in?: InputMaybe<Array<Scalars['String']>>;
  poolTokenId_contains?: InputMaybe<Scalars['String']>;
  poolTokenId_not_contains?: InputMaybe<Scalars['String']>;
  poolTokenId_starts_with?: InputMaybe<Scalars['String']>;
  poolTokenId_not_starts_with?: InputMaybe<Scalars['String']>;
  poolTokenId_ends_with?: InputMaybe<Scalars['String']>;
  poolTokenId_not_ends_with?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
};

export type BalancerSubgraph_Investment_orderBy =
  | 'id'
  | 'assetManagerAddress'
  | 'amount'
  | 'poolTokenId'
  | 'timestamp';

export type BalancerSubgraph_JoinExit = {
  id: Scalars['ID'];
  type: BalancerSubgraph_InvestType;
  sender: Scalars['BalancerSubgraph_Bytes'];
  amounts: Array<Scalars['BalancerSubgraph_BigDecimal']>;
  pool: BalancerSubgraph_Pool;
  user: BalancerSubgraph_User;
  timestamp: Scalars['Int'];
  valueUSD: Scalars['BalancerSubgraph_BigDecimal'];
  tx: Scalars['BalancerSubgraph_Bytes'];
};

export type BalancerSubgraph_JoinExit_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<BalancerSubgraph_InvestType>;
  type_not?: InputMaybe<BalancerSubgraph_InvestType>;
  sender?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  sender_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  sender_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  sender_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  sender_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  sender_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  amounts?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  amounts_not?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  amounts_contains?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  amounts_not_contains?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  pool?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<Scalars['String']>;
  user_not?: InputMaybe<Scalars['String']>;
  user_gt?: InputMaybe<Scalars['String']>;
  user_lt?: InputMaybe<Scalars['String']>;
  user_gte?: InputMaybe<Scalars['String']>;
  user_lte?: InputMaybe<Scalars['String']>;
  user_in?: InputMaybe<Array<Scalars['String']>>;
  user_not_in?: InputMaybe<Array<Scalars['String']>>;
  user_contains?: InputMaybe<Scalars['String']>;
  user_not_contains?: InputMaybe<Scalars['String']>;
  user_starts_with?: InputMaybe<Scalars['String']>;
  user_not_starts_with?: InputMaybe<Scalars['String']>;
  user_ends_with?: InputMaybe<Scalars['String']>;
  user_not_ends_with?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  valueUSD?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  valueUSD_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  valueUSD_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  valueUSD_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  valueUSD_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  valueUSD_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  valueUSD_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  valueUSD_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  tx?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  tx_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  tx_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  tx_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  tx_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  tx_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
};

export type BalancerSubgraph_JoinExit_orderBy =
  | 'id'
  | 'type'
  | 'sender'
  | 'amounts'
  | 'pool'
  | 'user'
  | 'timestamp'
  | 'valueUSD'
  | 'tx';

export type BalancerSubgraph_LatestPrice = {
  id: Scalars['ID'];
  asset: Scalars['BalancerSubgraph_Bytes'];
  pricingAsset: Scalars['BalancerSubgraph_Bytes'];
  poolId: BalancerSubgraph_Pool;
  price: Scalars['BalancerSubgraph_BigDecimal'];
  priceUSD: Scalars['BalancerSubgraph_BigDecimal'];
  block: Scalars['BigInt'];
};

export type BalancerSubgraph_LatestPrice_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  asset?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  asset_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  pricingAsset?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  pricingAsset_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  pricingAsset_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  pricingAsset_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  pricingAsset_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  pricingAsset_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  poolId?: InputMaybe<Scalars['String']>;
  poolId_not?: InputMaybe<Scalars['String']>;
  poolId_gt?: InputMaybe<Scalars['String']>;
  poolId_lt?: InputMaybe<Scalars['String']>;
  poolId_gte?: InputMaybe<Scalars['String']>;
  poolId_lte?: InputMaybe<Scalars['String']>;
  poolId_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_contains?: InputMaybe<Scalars['String']>;
  poolId_not_contains?: InputMaybe<Scalars['String']>;
  poolId_starts_with?: InputMaybe<Scalars['String']>;
  poolId_not_starts_with?: InputMaybe<Scalars['String']>;
  poolId_ends_with?: InputMaybe<Scalars['String']>;
  poolId_not_ends_with?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  price_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  price_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  price_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  price_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  price_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  price_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  price_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  priceUSD?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  priceUSD_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  priceUSD_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  priceUSD_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  priceUSD_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  priceUSD_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  priceUSD_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  priceUSD_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type BalancerSubgraph_LatestPrice_orderBy =
  | 'id'
  | 'asset'
  | 'pricingAsset'
  | 'poolId'
  | 'price'
  | 'priceUSD'
  | 'block';

export type BalancerSubgraph_OrderDirection =
  | 'asc'
  | 'desc';

export type BalancerSubgraph_Pool = {
  id: Scalars['ID'];
  address: Scalars['BalancerSubgraph_Bytes'];
  poolType?: Maybe<Scalars['String']>;
  factory?: Maybe<Scalars['BalancerSubgraph_Bytes']>;
  strategyType: Scalars['Int'];
  symbol?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  swapEnabled: Scalars['Boolean'];
  swapFee: Scalars['BalancerSubgraph_BigDecimal'];
  owner?: Maybe<Scalars['BalancerSubgraph_Bytes']>;
  totalWeight?: Maybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume: Scalars['BalancerSubgraph_BigDecimal'];
  totalSwapFee: Scalars['BalancerSubgraph_BigDecimal'];
  totalLiquidity: Scalars['BalancerSubgraph_BigDecimal'];
  totalShares: Scalars['BalancerSubgraph_BigDecimal'];
  createTime: Scalars['Int'];
  swapsCount: Scalars['BigInt'];
  holdersCount: Scalars['BigInt'];
  vaultID: BalancerSubgraph_Balancer;
  tx?: Maybe<Scalars['BalancerSubgraph_Bytes']>;
  tokensList: Array<Scalars['BalancerSubgraph_Bytes']>;
  tokens?: Maybe<Array<BalancerSubgraph_PoolToken>>;
  swaps?: Maybe<Array<BalancerSubgraph_Swap>>;
  shares?: Maybe<Array<BalancerSubgraph_PoolShare>>;
  historicalValues?: Maybe<Array<BalancerSubgraph_PoolHistoricalLiquidity>>;
  weightUpdates?: Maybe<Array<BalancerSubgraph_GradualWeightUpdate>>;
  amp?: Maybe<Scalars['BigInt']>;
  priceRateProviders?: Maybe<Array<BalancerSubgraph_PriceRateProvider>>;
  principalToken?: Maybe<Scalars['BalancerSubgraph_Bytes']>;
  baseToken?: Maybe<Scalars['BalancerSubgraph_Bytes']>;
  expiryTime?: Maybe<Scalars['BigInt']>;
  unitSeconds?: Maybe<Scalars['BigInt']>;
  managementFee?: Maybe<Scalars['BalancerSubgraph_BigDecimal']>;
  mainIndex?: Maybe<Scalars['Int']>;
  wrappedIndex?: Maybe<Scalars['Int']>;
  lowerTarget?: Maybe<Scalars['BalancerSubgraph_BigDecimal']>;
  upperTarget?: Maybe<Scalars['BalancerSubgraph_BigDecimal']>;
};


export type BalancerSubgraph_PooltokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_PoolToken_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_PoolToken_filter>;
};


export type BalancerSubgraph_PoolswapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_Swap_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_Swap_filter>;
};


export type BalancerSubgraph_PoolsharesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_PoolShare_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_PoolShare_filter>;
};


export type BalancerSubgraph_PoolhistoricalValuesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_PoolHistoricalLiquidity_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_PoolHistoricalLiquidity_filter>;
};


export type BalancerSubgraph_PoolweightUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_GradualWeightUpdate_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_GradualWeightUpdate_filter>;
};


export type BalancerSubgraph_PoolpriceRateProvidersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_PriceRateProvider_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_PriceRateProvider_filter>;
};

export type BalancerSubgraph_PoolHistoricalLiquidity = {
  id: Scalars['ID'];
  poolId: BalancerSubgraph_Pool;
  poolTotalShares: Scalars['BalancerSubgraph_BigDecimal'];
  poolLiquidity: Scalars['BalancerSubgraph_BigDecimal'];
  poolLiquidityUSD: Scalars['BalancerSubgraph_BigDecimal'];
  poolShareValue: Scalars['BalancerSubgraph_BigDecimal'];
  pricingAsset: Scalars['BalancerSubgraph_Bytes'];
  block: Scalars['BigInt'];
  timestamp: Scalars['Int'];
};

export type BalancerSubgraph_PoolHistoricalLiquidity_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  poolId?: InputMaybe<Scalars['String']>;
  poolId_not?: InputMaybe<Scalars['String']>;
  poolId_gt?: InputMaybe<Scalars['String']>;
  poolId_lt?: InputMaybe<Scalars['String']>;
  poolId_gte?: InputMaybe<Scalars['String']>;
  poolId_lte?: InputMaybe<Scalars['String']>;
  poolId_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_contains?: InputMaybe<Scalars['String']>;
  poolId_not_contains?: InputMaybe<Scalars['String']>;
  poolId_starts_with?: InputMaybe<Scalars['String']>;
  poolId_not_starts_with?: InputMaybe<Scalars['String']>;
  poolId_ends_with?: InputMaybe<Scalars['String']>;
  poolId_not_ends_with?: InputMaybe<Scalars['String']>;
  poolTotalShares?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolTotalShares_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolTotalShares_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolTotalShares_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolTotalShares_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolTotalShares_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolTotalShares_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  poolTotalShares_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  poolLiquidity?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolLiquidity_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolLiquidity_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolLiquidity_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolLiquidity_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolLiquidity_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolLiquidity_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  poolLiquidity_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  poolLiquidityUSD?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolLiquidityUSD_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolLiquidityUSD_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolLiquidityUSD_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolLiquidityUSD_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolLiquidityUSD_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolLiquidityUSD_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  poolLiquidityUSD_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  poolShareValue?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolShareValue_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolShareValue_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolShareValue_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolShareValue_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolShareValue_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  poolShareValue_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  poolShareValue_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  pricingAsset?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  pricingAsset_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  pricingAsset_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  pricingAsset_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  pricingAsset_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  pricingAsset_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
};

export type BalancerSubgraph_PoolHistoricalLiquidity_orderBy =
  | 'id'
  | 'poolId'
  | 'poolTotalShares'
  | 'poolLiquidity'
  | 'poolLiquidityUSD'
  | 'poolShareValue'
  | 'pricingAsset'
  | 'block'
  | 'timestamp';

export type BalancerSubgraph_PoolShare = {
  id: Scalars['ID'];
  userAddress: BalancerSubgraph_User;
  poolId: BalancerSubgraph_Pool;
  balance: Scalars['BalancerSubgraph_BigDecimal'];
};

export type BalancerSubgraph_PoolShare_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  userAddress?: InputMaybe<Scalars['String']>;
  userAddress_not?: InputMaybe<Scalars['String']>;
  userAddress_gt?: InputMaybe<Scalars['String']>;
  userAddress_lt?: InputMaybe<Scalars['String']>;
  userAddress_gte?: InputMaybe<Scalars['String']>;
  userAddress_lte?: InputMaybe<Scalars['String']>;
  userAddress_in?: InputMaybe<Array<Scalars['String']>>;
  userAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  userAddress_contains?: InputMaybe<Scalars['String']>;
  userAddress_not_contains?: InputMaybe<Scalars['String']>;
  userAddress_starts_with?: InputMaybe<Scalars['String']>;
  userAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  userAddress_ends_with?: InputMaybe<Scalars['String']>;
  userAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  poolId?: InputMaybe<Scalars['String']>;
  poolId_not?: InputMaybe<Scalars['String']>;
  poolId_gt?: InputMaybe<Scalars['String']>;
  poolId_lt?: InputMaybe<Scalars['String']>;
  poolId_gte?: InputMaybe<Scalars['String']>;
  poolId_lte?: InputMaybe<Scalars['String']>;
  poolId_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_contains?: InputMaybe<Scalars['String']>;
  poolId_not_contains?: InputMaybe<Scalars['String']>;
  poolId_starts_with?: InputMaybe<Scalars['String']>;
  poolId_not_starts_with?: InputMaybe<Scalars['String']>;
  poolId_ends_with?: InputMaybe<Scalars['String']>;
  poolId_not_ends_with?: InputMaybe<Scalars['String']>;
  balance?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  balance_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  balance_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  balance_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  balance_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  balance_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  balance_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  balance_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
};

export type BalancerSubgraph_PoolShare_orderBy =
  | 'id'
  | 'userAddress'
  | 'poolId'
  | 'balance';

export type BalancerSubgraph_PoolSnapshot = {
  id: Scalars['ID'];
  pool: BalancerSubgraph_Pool;
  amounts: Array<Scalars['BalancerSubgraph_BigDecimal']>;
  totalShares: Scalars['BalancerSubgraph_BigDecimal'];
  swapVolume: Scalars['BalancerSubgraph_BigDecimal'];
  swapFees: Scalars['BalancerSubgraph_BigDecimal'];
  liquidity: Scalars['BalancerSubgraph_BigDecimal'];
  timestamp: Scalars['Int'];
  totalSwapVolume: Scalars['BalancerSubgraph_BigDecimal'];
  totalSwapFee: Scalars['BalancerSubgraph_BigDecimal'];
  totalLiquidity: Scalars['BalancerSubgraph_BigDecimal'];
  swapsCount: Scalars['BigInt'];
  holdersCount: Scalars['BigInt'];
};

export type BalancerSubgraph_PoolSnapshot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  pool?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  amounts?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  amounts_not?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  amounts_contains?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  amounts_not_contains?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalShares?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalShares_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalShares_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalShares_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalShares_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalShares_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalShares_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalShares_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  swapVolume?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  swapVolume_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  swapVolume_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  swapVolume_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  swapVolume_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  swapVolume_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  swapVolume_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  swapVolume_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  swapFees?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  swapFees_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  swapFees_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  swapFees_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  swapFees_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  swapFees_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  swapFees_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  swapFees_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  liquidity?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  liquidity_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  liquidity_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  liquidity_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  liquidity_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  liquidity_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  liquidity_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  liquidity_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  totalSwapVolume?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapVolume_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapFee?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapFee_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalLiquidity?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalLiquidity_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  swapsCount?: InputMaybe<Scalars['BigInt']>;
  swapsCount_not?: InputMaybe<Scalars['BigInt']>;
  swapsCount_gt?: InputMaybe<Scalars['BigInt']>;
  swapsCount_lt?: InputMaybe<Scalars['BigInt']>;
  swapsCount_gte?: InputMaybe<Scalars['BigInt']>;
  swapsCount_lte?: InputMaybe<Scalars['BigInt']>;
  swapsCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapsCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  holdersCount?: InputMaybe<Scalars['BigInt']>;
  holdersCount_not?: InputMaybe<Scalars['BigInt']>;
  holdersCount_gt?: InputMaybe<Scalars['BigInt']>;
  holdersCount_lt?: InputMaybe<Scalars['BigInt']>;
  holdersCount_gte?: InputMaybe<Scalars['BigInt']>;
  holdersCount_lte?: InputMaybe<Scalars['BigInt']>;
  holdersCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  holdersCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type BalancerSubgraph_PoolSnapshot_orderBy =
  | 'id'
  | 'pool'
  | 'amounts'
  | 'totalShares'
  | 'swapVolume'
  | 'swapFees'
  | 'liquidity'
  | 'timestamp'
  | 'totalSwapVolume'
  | 'totalSwapFee'
  | 'totalLiquidity'
  | 'swapsCount'
  | 'holdersCount';

export type BalancerSubgraph_PoolToken = {
  id: Scalars['ID'];
  poolId: BalancerSubgraph_Pool;
  token: BalancerSubgraph_Token;
  symbol: Scalars['String'];
  name: Scalars['String'];
  decimals: Scalars['Int'];
  address: Scalars['String'];
  priceRate: Scalars['BalancerSubgraph_BigDecimal'];
  balance: Scalars['BalancerSubgraph_BigDecimal'];
  invested: Scalars['BalancerSubgraph_BigDecimal'];
  investments?: Maybe<Array<BalancerSubgraph_Investment>>;
  weight?: Maybe<Scalars['BalancerSubgraph_BigDecimal']>;
};


export type BalancerSubgraph_PoolTokeninvestmentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_Investment_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_Investment_filter>;
};

export type BalancerSubgraph_PoolToken_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  poolId?: InputMaybe<Scalars['String']>;
  poolId_not?: InputMaybe<Scalars['String']>;
  poolId_gt?: InputMaybe<Scalars['String']>;
  poolId_lt?: InputMaybe<Scalars['String']>;
  poolId_gte?: InputMaybe<Scalars['String']>;
  poolId_lte?: InputMaybe<Scalars['String']>;
  poolId_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_contains?: InputMaybe<Scalars['String']>;
  poolId_not_contains?: InputMaybe<Scalars['String']>;
  poolId_starts_with?: InputMaybe<Scalars['String']>;
  poolId_not_starts_with?: InputMaybe<Scalars['String']>;
  poolId_ends_with?: InputMaybe<Scalars['String']>;
  poolId_not_ends_with?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  decimals?: InputMaybe<Scalars['Int']>;
  decimals_not?: InputMaybe<Scalars['Int']>;
  decimals_gt?: InputMaybe<Scalars['Int']>;
  decimals_lt?: InputMaybe<Scalars['Int']>;
  decimals_gte?: InputMaybe<Scalars['Int']>;
  decimals_lte?: InputMaybe<Scalars['Int']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']>>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']>>;
  address?: InputMaybe<Scalars['String']>;
  address_not?: InputMaybe<Scalars['String']>;
  address_gt?: InputMaybe<Scalars['String']>;
  address_lt?: InputMaybe<Scalars['String']>;
  address_gte?: InputMaybe<Scalars['String']>;
  address_lte?: InputMaybe<Scalars['String']>;
  address_in?: InputMaybe<Array<Scalars['String']>>;
  address_not_in?: InputMaybe<Array<Scalars['String']>>;
  address_contains?: InputMaybe<Scalars['String']>;
  address_not_contains?: InputMaybe<Scalars['String']>;
  address_starts_with?: InputMaybe<Scalars['String']>;
  address_not_starts_with?: InputMaybe<Scalars['String']>;
  address_ends_with?: InputMaybe<Scalars['String']>;
  address_not_ends_with?: InputMaybe<Scalars['String']>;
  priceRate?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  priceRate_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  priceRate_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  priceRate_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  priceRate_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  priceRate_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  priceRate_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  priceRate_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  balance?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  balance_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  balance_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  balance_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  balance_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  balance_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  balance_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  balance_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  invested?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  invested_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  invested_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  invested_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  invested_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  invested_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  invested_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  invested_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  weight?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  weight_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  weight_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  weight_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  weight_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  weight_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  weight_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  weight_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
};

export type BalancerSubgraph_PoolToken_orderBy =
  | 'id'
  | 'poolId'
  | 'token'
  | 'symbol'
  | 'name'
  | 'decimals'
  | 'address'
  | 'priceRate'
  | 'balance'
  | 'invested'
  | 'investments'
  | 'weight';

export type BalancerSubgraph_Pool_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  address?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  address_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  address_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  address_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  address_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  address_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  poolType?: InputMaybe<Scalars['String']>;
  poolType_not?: InputMaybe<Scalars['String']>;
  poolType_gt?: InputMaybe<Scalars['String']>;
  poolType_lt?: InputMaybe<Scalars['String']>;
  poolType_gte?: InputMaybe<Scalars['String']>;
  poolType_lte?: InputMaybe<Scalars['String']>;
  poolType_in?: InputMaybe<Array<Scalars['String']>>;
  poolType_not_in?: InputMaybe<Array<Scalars['String']>>;
  poolType_contains?: InputMaybe<Scalars['String']>;
  poolType_not_contains?: InputMaybe<Scalars['String']>;
  poolType_starts_with?: InputMaybe<Scalars['String']>;
  poolType_not_starts_with?: InputMaybe<Scalars['String']>;
  poolType_ends_with?: InputMaybe<Scalars['String']>;
  poolType_not_ends_with?: InputMaybe<Scalars['String']>;
  factory?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  factory_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  factory_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  factory_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  factory_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  factory_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  strategyType?: InputMaybe<Scalars['Int']>;
  strategyType_not?: InputMaybe<Scalars['Int']>;
  strategyType_gt?: InputMaybe<Scalars['Int']>;
  strategyType_lt?: InputMaybe<Scalars['Int']>;
  strategyType_gte?: InputMaybe<Scalars['Int']>;
  strategyType_lte?: InputMaybe<Scalars['Int']>;
  strategyType_in?: InputMaybe<Array<Scalars['Int']>>;
  strategyType_not_in?: InputMaybe<Array<Scalars['Int']>>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  swapEnabled?: InputMaybe<Scalars['Boolean']>;
  swapEnabled_not?: InputMaybe<Scalars['Boolean']>;
  swapEnabled_in?: InputMaybe<Array<Scalars['Boolean']>>;
  swapEnabled_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  swapFee?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  swapFee_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  swapFee_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  swapFee_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  swapFee_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  swapFee_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  swapFee_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  swapFee_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  owner?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  owner_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  totalWeight?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalWeight_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalWeight_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalWeight_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalWeight_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalWeight_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalWeight_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalWeight_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapVolume?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapVolume_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapFee?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapFee_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalLiquidity?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalLiquidity_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalLiquidity_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalShares?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalShares_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalShares_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalShares_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalShares_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalShares_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalShares_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalShares_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  createTime?: InputMaybe<Scalars['Int']>;
  createTime_not?: InputMaybe<Scalars['Int']>;
  createTime_gt?: InputMaybe<Scalars['Int']>;
  createTime_lt?: InputMaybe<Scalars['Int']>;
  createTime_gte?: InputMaybe<Scalars['Int']>;
  createTime_lte?: InputMaybe<Scalars['Int']>;
  createTime_in?: InputMaybe<Array<Scalars['Int']>>;
  createTime_not_in?: InputMaybe<Array<Scalars['Int']>>;
  swapsCount?: InputMaybe<Scalars['BigInt']>;
  swapsCount_not?: InputMaybe<Scalars['BigInt']>;
  swapsCount_gt?: InputMaybe<Scalars['BigInt']>;
  swapsCount_lt?: InputMaybe<Scalars['BigInt']>;
  swapsCount_gte?: InputMaybe<Scalars['BigInt']>;
  swapsCount_lte?: InputMaybe<Scalars['BigInt']>;
  swapsCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapsCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  holdersCount?: InputMaybe<Scalars['BigInt']>;
  holdersCount_not?: InputMaybe<Scalars['BigInt']>;
  holdersCount_gt?: InputMaybe<Scalars['BigInt']>;
  holdersCount_lt?: InputMaybe<Scalars['BigInt']>;
  holdersCount_gte?: InputMaybe<Scalars['BigInt']>;
  holdersCount_lte?: InputMaybe<Scalars['BigInt']>;
  holdersCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  holdersCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  vaultID?: InputMaybe<Scalars['String']>;
  vaultID_not?: InputMaybe<Scalars['String']>;
  vaultID_gt?: InputMaybe<Scalars['String']>;
  vaultID_lt?: InputMaybe<Scalars['String']>;
  vaultID_gte?: InputMaybe<Scalars['String']>;
  vaultID_lte?: InputMaybe<Scalars['String']>;
  vaultID_in?: InputMaybe<Array<Scalars['String']>>;
  vaultID_not_in?: InputMaybe<Array<Scalars['String']>>;
  vaultID_contains?: InputMaybe<Scalars['String']>;
  vaultID_not_contains?: InputMaybe<Scalars['String']>;
  vaultID_starts_with?: InputMaybe<Scalars['String']>;
  vaultID_not_starts_with?: InputMaybe<Scalars['String']>;
  vaultID_ends_with?: InputMaybe<Scalars['String']>;
  vaultID_not_ends_with?: InputMaybe<Scalars['String']>;
  tx?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  tx_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  tx_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  tx_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  tx_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  tx_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  tokensList?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  tokensList_not?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  tokensList_contains?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  tokensList_not_contains?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  amp?: InputMaybe<Scalars['BigInt']>;
  amp_not?: InputMaybe<Scalars['BigInt']>;
  amp_gt?: InputMaybe<Scalars['BigInt']>;
  amp_lt?: InputMaybe<Scalars['BigInt']>;
  amp_gte?: InputMaybe<Scalars['BigInt']>;
  amp_lte?: InputMaybe<Scalars['BigInt']>;
  amp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  principalToken?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  principalToken_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  principalToken_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  principalToken_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  principalToken_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  principalToken_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  baseToken?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  baseToken_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  baseToken_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  baseToken_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  baseToken_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  baseToken_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  expiryTime?: InputMaybe<Scalars['BigInt']>;
  expiryTime_not?: InputMaybe<Scalars['BigInt']>;
  expiryTime_gt?: InputMaybe<Scalars['BigInt']>;
  expiryTime_lt?: InputMaybe<Scalars['BigInt']>;
  expiryTime_gte?: InputMaybe<Scalars['BigInt']>;
  expiryTime_lte?: InputMaybe<Scalars['BigInt']>;
  expiryTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expiryTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  unitSeconds?: InputMaybe<Scalars['BigInt']>;
  unitSeconds_not?: InputMaybe<Scalars['BigInt']>;
  unitSeconds_gt?: InputMaybe<Scalars['BigInt']>;
  unitSeconds_lt?: InputMaybe<Scalars['BigInt']>;
  unitSeconds_gte?: InputMaybe<Scalars['BigInt']>;
  unitSeconds_lte?: InputMaybe<Scalars['BigInt']>;
  unitSeconds_in?: InputMaybe<Array<Scalars['BigInt']>>;
  unitSeconds_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  managementFee?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  managementFee_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  managementFee_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  managementFee_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  managementFee_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  managementFee_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  managementFee_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  managementFee_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  mainIndex?: InputMaybe<Scalars['Int']>;
  mainIndex_not?: InputMaybe<Scalars['Int']>;
  mainIndex_gt?: InputMaybe<Scalars['Int']>;
  mainIndex_lt?: InputMaybe<Scalars['Int']>;
  mainIndex_gte?: InputMaybe<Scalars['Int']>;
  mainIndex_lte?: InputMaybe<Scalars['Int']>;
  mainIndex_in?: InputMaybe<Array<Scalars['Int']>>;
  mainIndex_not_in?: InputMaybe<Array<Scalars['Int']>>;
  wrappedIndex?: InputMaybe<Scalars['Int']>;
  wrappedIndex_not?: InputMaybe<Scalars['Int']>;
  wrappedIndex_gt?: InputMaybe<Scalars['Int']>;
  wrappedIndex_lt?: InputMaybe<Scalars['Int']>;
  wrappedIndex_gte?: InputMaybe<Scalars['Int']>;
  wrappedIndex_lte?: InputMaybe<Scalars['Int']>;
  wrappedIndex_in?: InputMaybe<Array<Scalars['Int']>>;
  wrappedIndex_not_in?: InputMaybe<Array<Scalars['Int']>>;
  lowerTarget?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  lowerTarget_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  lowerTarget_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  lowerTarget_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  lowerTarget_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  lowerTarget_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  lowerTarget_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  lowerTarget_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  upperTarget?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  upperTarget_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  upperTarget_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  upperTarget_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  upperTarget_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  upperTarget_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  upperTarget_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  upperTarget_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
};

export type BalancerSubgraph_Pool_orderBy =
  | 'id'
  | 'address'
  | 'poolType'
  | 'factory'
  | 'strategyType'
  | 'symbol'
  | 'name'
  | 'swapEnabled'
  | 'swapFee'
  | 'owner'
  | 'totalWeight'
  | 'totalSwapVolume'
  | 'totalSwapFee'
  | 'totalLiquidity'
  | 'totalShares'
  | 'createTime'
  | 'swapsCount'
  | 'holdersCount'
  | 'vaultID'
  | 'tx'
  | 'tokensList'
  | 'tokens'
  | 'swaps'
  | 'shares'
  | 'historicalValues'
  | 'weightUpdates'
  | 'amp'
  | 'priceRateProviders'
  | 'principalToken'
  | 'baseToken'
  | 'expiryTime'
  | 'unitSeconds'
  | 'managementFee'
  | 'mainIndex'
  | 'wrappedIndex'
  | 'lowerTarget'
  | 'upperTarget';

export type BalancerSubgraph_PriceRateProvider = {
  id: Scalars['ID'];
  poolId: BalancerSubgraph_Pool;
  token: BalancerSubgraph_PoolToken;
  address: Scalars['BalancerSubgraph_Bytes'];
  rate: Scalars['BalancerSubgraph_BigDecimal'];
  lastCached: Scalars['Int'];
  cacheDuration: Scalars['Int'];
  cacheExpiry: Scalars['Int'];
};

export type BalancerSubgraph_PriceRateProvider_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  poolId?: InputMaybe<Scalars['String']>;
  poolId_not?: InputMaybe<Scalars['String']>;
  poolId_gt?: InputMaybe<Scalars['String']>;
  poolId_lt?: InputMaybe<Scalars['String']>;
  poolId_gte?: InputMaybe<Scalars['String']>;
  poolId_lte?: InputMaybe<Scalars['String']>;
  poolId_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_contains?: InputMaybe<Scalars['String']>;
  poolId_not_contains?: InputMaybe<Scalars['String']>;
  poolId_starts_with?: InputMaybe<Scalars['String']>;
  poolId_not_starts_with?: InputMaybe<Scalars['String']>;
  poolId_ends_with?: InputMaybe<Scalars['String']>;
  poolId_not_ends_with?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  address?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  address_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  address_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  address_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  address_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  address_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  rate?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  rate_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  rate_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  rate_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  rate_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  rate_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  rate_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  rate_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  lastCached?: InputMaybe<Scalars['Int']>;
  lastCached_not?: InputMaybe<Scalars['Int']>;
  lastCached_gt?: InputMaybe<Scalars['Int']>;
  lastCached_lt?: InputMaybe<Scalars['Int']>;
  lastCached_gte?: InputMaybe<Scalars['Int']>;
  lastCached_lte?: InputMaybe<Scalars['Int']>;
  lastCached_in?: InputMaybe<Array<Scalars['Int']>>;
  lastCached_not_in?: InputMaybe<Array<Scalars['Int']>>;
  cacheDuration?: InputMaybe<Scalars['Int']>;
  cacheDuration_not?: InputMaybe<Scalars['Int']>;
  cacheDuration_gt?: InputMaybe<Scalars['Int']>;
  cacheDuration_lt?: InputMaybe<Scalars['Int']>;
  cacheDuration_gte?: InputMaybe<Scalars['Int']>;
  cacheDuration_lte?: InputMaybe<Scalars['Int']>;
  cacheDuration_in?: InputMaybe<Array<Scalars['Int']>>;
  cacheDuration_not_in?: InputMaybe<Array<Scalars['Int']>>;
  cacheExpiry?: InputMaybe<Scalars['Int']>;
  cacheExpiry_not?: InputMaybe<Scalars['Int']>;
  cacheExpiry_gt?: InputMaybe<Scalars['Int']>;
  cacheExpiry_lt?: InputMaybe<Scalars['Int']>;
  cacheExpiry_gte?: InputMaybe<Scalars['Int']>;
  cacheExpiry_lte?: InputMaybe<Scalars['Int']>;
  cacheExpiry_in?: InputMaybe<Array<Scalars['Int']>>;
  cacheExpiry_not_in?: InputMaybe<Array<Scalars['Int']>>;
};

export type BalancerSubgraph_PriceRateProvider_orderBy =
  | 'id'
  | 'poolId'
  | 'token'
  | 'address'
  | 'rate'
  | 'lastCached'
  | 'cacheDuration'
  | 'cacheExpiry';

export type Query = {
  BalancerSubgraph_balancer?: Maybe<BalancerSubgraph_Balancer>;
  BalancerSubgraph_balancers: Array<BalancerSubgraph_Balancer>;
  BalancerSubgraph_pool?: Maybe<BalancerSubgraph_Pool>;
  BalancerSubgraph_pools: Array<BalancerSubgraph_Pool>;
  BalancerSubgraph_poolToken?: Maybe<BalancerSubgraph_PoolToken>;
  BalancerSubgraph_poolTokens: Array<BalancerSubgraph_PoolToken>;
  BalancerSubgraph_priceRateProvider?: Maybe<BalancerSubgraph_PriceRateProvider>;
  BalancerSubgraph_priceRateProviders: Array<BalancerSubgraph_PriceRateProvider>;
  BalancerSubgraph_poolShare?: Maybe<BalancerSubgraph_PoolShare>;
  BalancerSubgraph_poolShares: Array<BalancerSubgraph_PoolShare>;
  BalancerSubgraph_user?: Maybe<BalancerSubgraph_User>;
  BalancerSubgraph_users: Array<BalancerSubgraph_User>;
  BalancerSubgraph_userInternalBalance?: Maybe<BalancerSubgraph_UserInternalBalance>;
  BalancerSubgraph_userInternalBalances: Array<BalancerSubgraph_UserInternalBalance>;
  BalancerSubgraph_gradualWeightUpdate?: Maybe<BalancerSubgraph_GradualWeightUpdate>;
  BalancerSubgraph_gradualWeightUpdates: Array<BalancerSubgraph_GradualWeightUpdate>;
  BalancerSubgraph_ampUpdate?: Maybe<BalancerSubgraph_AmpUpdate>;
  BalancerSubgraph_ampUpdates: Array<BalancerSubgraph_AmpUpdate>;
  BalancerSubgraph_swap?: Maybe<BalancerSubgraph_Swap>;
  BalancerSubgraph_swaps: Array<BalancerSubgraph_Swap>;
  BalancerSubgraph_joinExit?: Maybe<BalancerSubgraph_JoinExit>;
  BalancerSubgraph_joinExits: Array<BalancerSubgraph_JoinExit>;
  BalancerSubgraph_latestPrice?: Maybe<BalancerSubgraph_LatestPrice>;
  BalancerSubgraph_latestPrices: Array<BalancerSubgraph_LatestPrice>;
  BalancerSubgraph_poolHistoricalLiquidity?: Maybe<BalancerSubgraph_PoolHistoricalLiquidity>;
  BalancerSubgraph_poolHistoricalLiquidities: Array<BalancerSubgraph_PoolHistoricalLiquidity>;
  BalancerSubgraph_tokenPrice?: Maybe<BalancerSubgraph_TokenPrice>;
  BalancerSubgraph_tokenPrices: Array<BalancerSubgraph_TokenPrice>;
  BalancerSubgraph_investment?: Maybe<BalancerSubgraph_Investment>;
  BalancerSubgraph_investments: Array<BalancerSubgraph_Investment>;
  BalancerSubgraph_poolSnapshot?: Maybe<BalancerSubgraph_PoolSnapshot>;
  BalancerSubgraph_poolSnapshots: Array<BalancerSubgraph_PoolSnapshot>;
  BalancerSubgraph_token?: Maybe<BalancerSubgraph_Token>;
  BalancerSubgraph_tokens: Array<BalancerSubgraph_Token>;
  BalancerSubgraph_tokenSnapshot?: Maybe<BalancerSubgraph_TokenSnapshot>;
  BalancerSubgraph_tokenSnapshots: Array<BalancerSubgraph_TokenSnapshot>;
  BalancerSubgraph_tradePair?: Maybe<BalancerSubgraph_TradePair>;
  BalancerSubgraph_tradePairs: Array<BalancerSubgraph_TradePair>;
  BalancerSubgraph_tradePairSnapshot?: Maybe<BalancerSubgraph_TradePairSnapshot>;
  BalancerSubgraph_tradePairSnapshots: Array<BalancerSubgraph_TradePairSnapshot>;
  BalancerSubgraph_balancerSnapshot?: Maybe<BalancerSubgraph_BalancerSnapshot>;
  BalancerSubgraph_balancerSnapshots: Array<BalancerSubgraph_BalancerSnapshot>;
  /** Access to subgraph metadata */
  BalancerSubgraph__meta?: Maybe<BalancerSubgraph__Meta_>;
};


export type QueryBalancerSubgraph_balancerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_balancersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_Balancer_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_Balancer_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_poolArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_poolsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_Pool_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_Pool_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_poolTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_poolTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_PoolToken_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_PoolToken_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_priceRateProviderArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_priceRateProvidersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_PriceRateProvider_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_PriceRateProvider_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_poolShareArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_poolSharesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_PoolShare_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_PoolShare_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_userArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_usersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_User_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_User_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_userInternalBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_userInternalBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_UserInternalBalance_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_UserInternalBalance_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_gradualWeightUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_gradualWeightUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_GradualWeightUpdate_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_GradualWeightUpdate_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_ampUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_ampUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_AmpUpdate_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_AmpUpdate_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_swapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_swapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_Swap_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_Swap_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_joinExitArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_joinExitsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_JoinExit_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_JoinExit_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_latestPriceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_latestPricesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_LatestPrice_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_LatestPrice_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_poolHistoricalLiquidityArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_poolHistoricalLiquiditiesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_PoolHistoricalLiquidity_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_PoolHistoricalLiquidity_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_tokenPriceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_tokenPricesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_TokenPrice_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_TokenPrice_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_investmentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_investmentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_Investment_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_Investment_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_poolSnapshotArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_poolSnapshotsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_PoolSnapshot_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_PoolSnapshot_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_tokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_tokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_Token_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_Token_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_tokenSnapshotArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_tokenSnapshotsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_TokenSnapshot_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_TokenSnapshot_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_tradePairArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_tradePairsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_TradePair_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_TradePair_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_tradePairSnapshotArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_tradePairSnapshotsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_TradePairSnapshot_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_TradePairSnapshot_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_balancerSnapshotArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph_balancerSnapshotsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_BalancerSnapshot_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_BalancerSnapshot_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type QueryBalancerSubgraph__metaArgs = {
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};

export type Subscription = {
  BalancerSubgraph_balancer?: Maybe<BalancerSubgraph_Balancer>;
  BalancerSubgraph_balancers: Array<BalancerSubgraph_Balancer>;
  BalancerSubgraph_pool?: Maybe<BalancerSubgraph_Pool>;
  BalancerSubgraph_pools: Array<BalancerSubgraph_Pool>;
  BalancerSubgraph_poolToken?: Maybe<BalancerSubgraph_PoolToken>;
  BalancerSubgraph_poolTokens: Array<BalancerSubgraph_PoolToken>;
  BalancerSubgraph_priceRateProvider?: Maybe<BalancerSubgraph_PriceRateProvider>;
  BalancerSubgraph_priceRateProviders: Array<BalancerSubgraph_PriceRateProvider>;
  BalancerSubgraph_poolShare?: Maybe<BalancerSubgraph_PoolShare>;
  BalancerSubgraph_poolShares: Array<BalancerSubgraph_PoolShare>;
  BalancerSubgraph_user?: Maybe<BalancerSubgraph_User>;
  BalancerSubgraph_users: Array<BalancerSubgraph_User>;
  BalancerSubgraph_userInternalBalance?: Maybe<BalancerSubgraph_UserInternalBalance>;
  BalancerSubgraph_userInternalBalances: Array<BalancerSubgraph_UserInternalBalance>;
  BalancerSubgraph_gradualWeightUpdate?: Maybe<BalancerSubgraph_GradualWeightUpdate>;
  BalancerSubgraph_gradualWeightUpdates: Array<BalancerSubgraph_GradualWeightUpdate>;
  BalancerSubgraph_ampUpdate?: Maybe<BalancerSubgraph_AmpUpdate>;
  BalancerSubgraph_ampUpdates: Array<BalancerSubgraph_AmpUpdate>;
  BalancerSubgraph_swap?: Maybe<BalancerSubgraph_Swap>;
  BalancerSubgraph_swaps: Array<BalancerSubgraph_Swap>;
  BalancerSubgraph_joinExit?: Maybe<BalancerSubgraph_JoinExit>;
  BalancerSubgraph_joinExits: Array<BalancerSubgraph_JoinExit>;
  BalancerSubgraph_latestPrice?: Maybe<BalancerSubgraph_LatestPrice>;
  BalancerSubgraph_latestPrices: Array<BalancerSubgraph_LatestPrice>;
  BalancerSubgraph_poolHistoricalLiquidity?: Maybe<BalancerSubgraph_PoolHistoricalLiquidity>;
  BalancerSubgraph_poolHistoricalLiquidities: Array<BalancerSubgraph_PoolHistoricalLiquidity>;
  BalancerSubgraph_tokenPrice?: Maybe<BalancerSubgraph_TokenPrice>;
  BalancerSubgraph_tokenPrices: Array<BalancerSubgraph_TokenPrice>;
  BalancerSubgraph_investment?: Maybe<BalancerSubgraph_Investment>;
  BalancerSubgraph_investments: Array<BalancerSubgraph_Investment>;
  BalancerSubgraph_poolSnapshot?: Maybe<BalancerSubgraph_PoolSnapshot>;
  BalancerSubgraph_poolSnapshots: Array<BalancerSubgraph_PoolSnapshot>;
  BalancerSubgraph_token?: Maybe<BalancerSubgraph_Token>;
  BalancerSubgraph_tokens: Array<BalancerSubgraph_Token>;
  BalancerSubgraph_tokenSnapshot?: Maybe<BalancerSubgraph_TokenSnapshot>;
  BalancerSubgraph_tokenSnapshots: Array<BalancerSubgraph_TokenSnapshot>;
  BalancerSubgraph_tradePair?: Maybe<BalancerSubgraph_TradePair>;
  BalancerSubgraph_tradePairs: Array<BalancerSubgraph_TradePair>;
  BalancerSubgraph_tradePairSnapshot?: Maybe<BalancerSubgraph_TradePairSnapshot>;
  BalancerSubgraph_tradePairSnapshots: Array<BalancerSubgraph_TradePairSnapshot>;
  BalancerSubgraph_balancerSnapshot?: Maybe<BalancerSubgraph_BalancerSnapshot>;
  BalancerSubgraph_balancerSnapshots: Array<BalancerSubgraph_BalancerSnapshot>;
  /** Access to subgraph metadata */
  BalancerSubgraph__meta?: Maybe<BalancerSubgraph__Meta_>;
};


export type SubscriptionBalancerSubgraph_balancerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_balancersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_Balancer_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_Balancer_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_poolArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_poolsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_Pool_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_Pool_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_poolTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_poolTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_PoolToken_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_PoolToken_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_priceRateProviderArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_priceRateProvidersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_PriceRateProvider_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_PriceRateProvider_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_poolShareArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_poolSharesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_PoolShare_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_PoolShare_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_userArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_usersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_User_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_User_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_userInternalBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_userInternalBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_UserInternalBalance_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_UserInternalBalance_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_gradualWeightUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_gradualWeightUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_GradualWeightUpdate_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_GradualWeightUpdate_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_ampUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_ampUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_AmpUpdate_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_AmpUpdate_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_swapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_swapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_Swap_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_Swap_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_joinExitArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_joinExitsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_JoinExit_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_JoinExit_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_latestPriceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_latestPricesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_LatestPrice_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_LatestPrice_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_poolHistoricalLiquidityArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_poolHistoricalLiquiditiesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_PoolHistoricalLiquidity_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_PoolHistoricalLiquidity_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_tokenPriceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_tokenPricesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_TokenPrice_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_TokenPrice_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_investmentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_investmentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_Investment_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_Investment_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_poolSnapshotArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_poolSnapshotsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_PoolSnapshot_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_PoolSnapshot_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_tokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_tokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_Token_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_Token_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_tokenSnapshotArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_tokenSnapshotsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_TokenSnapshot_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_TokenSnapshot_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_tradePairArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_tradePairsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_TradePair_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_TradePair_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_tradePairSnapshotArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_tradePairSnapshotsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_TradePairSnapshot_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_TradePairSnapshot_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_balancerSnapshotArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph_balancerSnapshotsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_BalancerSnapshot_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_BalancerSnapshot_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};


export type SubscriptionBalancerSubgraph__metaArgs = {
  block?: InputMaybe<BalancerSubgraph_Block_height>;
};

export type BalancerSubgraph_Swap = {
  id: Scalars['ID'];
  caller: Scalars['BalancerSubgraph_Bytes'];
  tokenIn: Scalars['BalancerSubgraph_Bytes'];
  tokenInSym: Scalars['String'];
  tokenOut: Scalars['BalancerSubgraph_Bytes'];
  tokenOutSym: Scalars['String'];
  tokenAmountIn: Scalars['BalancerSubgraph_BigDecimal'];
  tokenAmountOut: Scalars['BalancerSubgraph_BigDecimal'];
  poolId: BalancerSubgraph_Pool;
  userAddress: BalancerSubgraph_User;
  timestamp: Scalars['Int'];
  tx: Scalars['BalancerSubgraph_Bytes'];
  valueUSD: Scalars['BalancerSubgraph_BigDecimal'];
};

export type BalancerSubgraph_Swap_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  caller?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  caller_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  tokenIn?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  tokenIn_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  tokenIn_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  tokenIn_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  tokenIn_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  tokenIn_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  tokenInSym?: InputMaybe<Scalars['String']>;
  tokenInSym_not?: InputMaybe<Scalars['String']>;
  tokenInSym_gt?: InputMaybe<Scalars['String']>;
  tokenInSym_lt?: InputMaybe<Scalars['String']>;
  tokenInSym_gte?: InputMaybe<Scalars['String']>;
  tokenInSym_lte?: InputMaybe<Scalars['String']>;
  tokenInSym_in?: InputMaybe<Array<Scalars['String']>>;
  tokenInSym_not_in?: InputMaybe<Array<Scalars['String']>>;
  tokenInSym_contains?: InputMaybe<Scalars['String']>;
  tokenInSym_not_contains?: InputMaybe<Scalars['String']>;
  tokenInSym_starts_with?: InputMaybe<Scalars['String']>;
  tokenInSym_not_starts_with?: InputMaybe<Scalars['String']>;
  tokenInSym_ends_with?: InputMaybe<Scalars['String']>;
  tokenInSym_not_ends_with?: InputMaybe<Scalars['String']>;
  tokenOut?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  tokenOut_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  tokenOut_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  tokenOut_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  tokenOut_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  tokenOut_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  tokenOutSym?: InputMaybe<Scalars['String']>;
  tokenOutSym_not?: InputMaybe<Scalars['String']>;
  tokenOutSym_gt?: InputMaybe<Scalars['String']>;
  tokenOutSym_lt?: InputMaybe<Scalars['String']>;
  tokenOutSym_gte?: InputMaybe<Scalars['String']>;
  tokenOutSym_lte?: InputMaybe<Scalars['String']>;
  tokenOutSym_in?: InputMaybe<Array<Scalars['String']>>;
  tokenOutSym_not_in?: InputMaybe<Array<Scalars['String']>>;
  tokenOutSym_contains?: InputMaybe<Scalars['String']>;
  tokenOutSym_not_contains?: InputMaybe<Scalars['String']>;
  tokenOutSym_starts_with?: InputMaybe<Scalars['String']>;
  tokenOutSym_not_starts_with?: InputMaybe<Scalars['String']>;
  tokenOutSym_ends_with?: InputMaybe<Scalars['String']>;
  tokenOutSym_not_ends_with?: InputMaybe<Scalars['String']>;
  tokenAmountIn?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  tokenAmountIn_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  tokenAmountIn_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  tokenAmountIn_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  tokenAmountIn_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  tokenAmountIn_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  tokenAmountIn_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  tokenAmountIn_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  tokenAmountOut?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  tokenAmountOut_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  tokenAmountOut_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  tokenAmountOut_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  tokenAmountOut_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  tokenAmountOut_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  tokenAmountOut_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  tokenAmountOut_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  poolId?: InputMaybe<Scalars['String']>;
  poolId_not?: InputMaybe<Scalars['String']>;
  poolId_gt?: InputMaybe<Scalars['String']>;
  poolId_lt?: InputMaybe<Scalars['String']>;
  poolId_gte?: InputMaybe<Scalars['String']>;
  poolId_lte?: InputMaybe<Scalars['String']>;
  poolId_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_contains?: InputMaybe<Scalars['String']>;
  poolId_not_contains?: InputMaybe<Scalars['String']>;
  poolId_starts_with?: InputMaybe<Scalars['String']>;
  poolId_not_starts_with?: InputMaybe<Scalars['String']>;
  poolId_ends_with?: InputMaybe<Scalars['String']>;
  poolId_not_ends_with?: InputMaybe<Scalars['String']>;
  userAddress?: InputMaybe<Scalars['String']>;
  userAddress_not?: InputMaybe<Scalars['String']>;
  userAddress_gt?: InputMaybe<Scalars['String']>;
  userAddress_lt?: InputMaybe<Scalars['String']>;
  userAddress_gte?: InputMaybe<Scalars['String']>;
  userAddress_lte?: InputMaybe<Scalars['String']>;
  userAddress_in?: InputMaybe<Array<Scalars['String']>>;
  userAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  userAddress_contains?: InputMaybe<Scalars['String']>;
  userAddress_not_contains?: InputMaybe<Scalars['String']>;
  userAddress_starts_with?: InputMaybe<Scalars['String']>;
  userAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  userAddress_ends_with?: InputMaybe<Scalars['String']>;
  userAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  tx?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  tx_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  tx_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  tx_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  tx_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  tx_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  valueUSD?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  valueUSD_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  valueUSD_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  valueUSD_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  valueUSD_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  valueUSD_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  valueUSD_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  valueUSD_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
};

export type BalancerSubgraph_Swap_orderBy =
  | 'id'
  | 'caller'
  | 'tokenIn'
  | 'tokenInSym'
  | 'tokenOut'
  | 'tokenOutSym'
  | 'tokenAmountIn'
  | 'tokenAmountOut'
  | 'poolId'
  | 'userAddress'
  | 'timestamp'
  | 'tx'
  | 'valueUSD';

export type BalancerSubgraph_Token = {
  id: Scalars['ID'];
  symbol?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  decimals: Scalars['Int'];
  address: Scalars['String'];
  totalBalanceUSD: Scalars['BalancerSubgraph_BigDecimal'];
  totalBalanceNotional: Scalars['BalancerSubgraph_BigDecimal'];
  totalVolumeUSD: Scalars['BalancerSubgraph_BigDecimal'];
  totalVolumeNotional: Scalars['BalancerSubgraph_BigDecimal'];
  totalSwapCount: Scalars['BigInt'];
  latestPrice?: Maybe<BalancerSubgraph_LatestPrice>;
};

export type BalancerSubgraph_TokenPrice = {
  id: Scalars['ID'];
  poolId: BalancerSubgraph_Pool;
  asset: Scalars['BalancerSubgraph_Bytes'];
  amount: Scalars['BalancerSubgraph_BigDecimal'];
  pricingAsset: Scalars['BalancerSubgraph_Bytes'];
  price: Scalars['BalancerSubgraph_BigDecimal'];
  block: Scalars['BigInt'];
  timestamp: Scalars['Int'];
  priceUSD: Scalars['BalancerSubgraph_BigDecimal'];
};

export type BalancerSubgraph_TokenPrice_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  poolId?: InputMaybe<Scalars['String']>;
  poolId_not?: InputMaybe<Scalars['String']>;
  poolId_gt?: InputMaybe<Scalars['String']>;
  poolId_lt?: InputMaybe<Scalars['String']>;
  poolId_gte?: InputMaybe<Scalars['String']>;
  poolId_lte?: InputMaybe<Scalars['String']>;
  poolId_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_contains?: InputMaybe<Scalars['String']>;
  poolId_not_contains?: InputMaybe<Scalars['String']>;
  poolId_starts_with?: InputMaybe<Scalars['String']>;
  poolId_not_starts_with?: InputMaybe<Scalars['String']>;
  poolId_ends_with?: InputMaybe<Scalars['String']>;
  poolId_not_ends_with?: InputMaybe<Scalars['String']>;
  asset?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  asset_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  amount?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  amount_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  pricingAsset?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  pricingAsset_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  pricingAsset_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  pricingAsset_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  pricingAsset_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  pricingAsset_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  price?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  price_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  price_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  price_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  price_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  price_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  price_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  price_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  priceUSD?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  priceUSD_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  priceUSD_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  priceUSD_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  priceUSD_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  priceUSD_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  priceUSD_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  priceUSD_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
};

export type BalancerSubgraph_TokenPrice_orderBy =
  | 'id'
  | 'poolId'
  | 'asset'
  | 'amount'
  | 'pricingAsset'
  | 'price'
  | 'block'
  | 'timestamp'
  | 'priceUSD';

export type BalancerSubgraph_TokenSnapshot = {
  id: Scalars['ID'];
  token: BalancerSubgraph_Token;
  timestamp: Scalars['Int'];
  totalBalanceUSD: Scalars['BalancerSubgraph_BigDecimal'];
  totalBalanceNotional: Scalars['BalancerSubgraph_BigDecimal'];
  totalVolumeUSD: Scalars['BalancerSubgraph_BigDecimal'];
  totalVolumeNotional: Scalars['BalancerSubgraph_BigDecimal'];
  totalSwapCount: Scalars['BigInt'];
};

export type BalancerSubgraph_TokenSnapshot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  token?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  totalBalanceUSD?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceUSD_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceUSD_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceUSD_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceUSD_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceUSD_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceUSD_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalBalanceUSD_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalBalanceNotional?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceNotional_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceNotional_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceNotional_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceNotional_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceNotional_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceNotional_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalBalanceNotional_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalVolumeUSD?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeUSD_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeUSD_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeUSD_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeUSD_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeUSD_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeUSD_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalVolumeUSD_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalVolumeNotional?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeNotional_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeNotional_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeNotional_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeNotional_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeNotional_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeNotional_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalVolumeNotional_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapCount?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_not?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_gt?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_lt?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_gte?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_lte?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSwapCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type BalancerSubgraph_TokenSnapshot_orderBy =
  | 'id'
  | 'token'
  | 'timestamp'
  | 'totalBalanceUSD'
  | 'totalBalanceNotional'
  | 'totalVolumeUSD'
  | 'totalVolumeNotional'
  | 'totalSwapCount';

export type BalancerSubgraph_Token_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  decimals?: InputMaybe<Scalars['Int']>;
  decimals_not?: InputMaybe<Scalars['Int']>;
  decimals_gt?: InputMaybe<Scalars['Int']>;
  decimals_lt?: InputMaybe<Scalars['Int']>;
  decimals_gte?: InputMaybe<Scalars['Int']>;
  decimals_lte?: InputMaybe<Scalars['Int']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']>>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']>>;
  address?: InputMaybe<Scalars['String']>;
  address_not?: InputMaybe<Scalars['String']>;
  address_gt?: InputMaybe<Scalars['String']>;
  address_lt?: InputMaybe<Scalars['String']>;
  address_gte?: InputMaybe<Scalars['String']>;
  address_lte?: InputMaybe<Scalars['String']>;
  address_in?: InputMaybe<Array<Scalars['String']>>;
  address_not_in?: InputMaybe<Array<Scalars['String']>>;
  address_contains?: InputMaybe<Scalars['String']>;
  address_not_contains?: InputMaybe<Scalars['String']>;
  address_starts_with?: InputMaybe<Scalars['String']>;
  address_not_starts_with?: InputMaybe<Scalars['String']>;
  address_ends_with?: InputMaybe<Scalars['String']>;
  address_not_ends_with?: InputMaybe<Scalars['String']>;
  totalBalanceUSD?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceUSD_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceUSD_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceUSD_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceUSD_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceUSD_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceUSD_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalBalanceUSD_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalBalanceNotional?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceNotional_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceNotional_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceNotional_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceNotional_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceNotional_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalBalanceNotional_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalBalanceNotional_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalVolumeUSD?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeUSD_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeUSD_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeUSD_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeUSD_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeUSD_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeUSD_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalVolumeUSD_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalVolumeNotional?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeNotional_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeNotional_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeNotional_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeNotional_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeNotional_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalVolumeNotional_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalVolumeNotional_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapCount?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_not?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_gt?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_lt?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_gte?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_lte?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSwapCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  latestPrice?: InputMaybe<Scalars['String']>;
  latestPrice_not?: InputMaybe<Scalars['String']>;
  latestPrice_gt?: InputMaybe<Scalars['String']>;
  latestPrice_lt?: InputMaybe<Scalars['String']>;
  latestPrice_gte?: InputMaybe<Scalars['String']>;
  latestPrice_lte?: InputMaybe<Scalars['String']>;
  latestPrice_in?: InputMaybe<Array<Scalars['String']>>;
  latestPrice_not_in?: InputMaybe<Array<Scalars['String']>>;
  latestPrice_contains?: InputMaybe<Scalars['String']>;
  latestPrice_not_contains?: InputMaybe<Scalars['String']>;
  latestPrice_starts_with?: InputMaybe<Scalars['String']>;
  latestPrice_not_starts_with?: InputMaybe<Scalars['String']>;
  latestPrice_ends_with?: InputMaybe<Scalars['String']>;
  latestPrice_not_ends_with?: InputMaybe<Scalars['String']>;
};

export type BalancerSubgraph_Token_orderBy =
  | 'id'
  | 'symbol'
  | 'name'
  | 'decimals'
  | 'address'
  | 'totalBalanceUSD'
  | 'totalBalanceNotional'
  | 'totalVolumeUSD'
  | 'totalVolumeNotional'
  | 'totalSwapCount'
  | 'latestPrice';

export type BalancerSubgraph_TradePair = {
  /** Token Address - Token Address */
  id: Scalars['ID'];
  token0: BalancerSubgraph_Token;
  token1: BalancerSubgraph_Token;
  totalSwapVolume: Scalars['BalancerSubgraph_BigDecimal'];
  totalSwapFee: Scalars['BalancerSubgraph_BigDecimal'];
};

export type BalancerSubgraph_TradePairSnapshot = {
  id: Scalars['ID'];
  pair: BalancerSubgraph_TradePair;
  timestamp: Scalars['Int'];
  totalSwapVolume: Scalars['BalancerSubgraph_BigDecimal'];
  totalSwapFee: Scalars['BalancerSubgraph_BigDecimal'];
};

export type BalancerSubgraph_TradePairSnapshot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  pair?: InputMaybe<Scalars['String']>;
  pair_not?: InputMaybe<Scalars['String']>;
  pair_gt?: InputMaybe<Scalars['String']>;
  pair_lt?: InputMaybe<Scalars['String']>;
  pair_gte?: InputMaybe<Scalars['String']>;
  pair_lte?: InputMaybe<Scalars['String']>;
  pair_in?: InputMaybe<Array<Scalars['String']>>;
  pair_not_in?: InputMaybe<Array<Scalars['String']>>;
  pair_contains?: InputMaybe<Scalars['String']>;
  pair_not_contains?: InputMaybe<Scalars['String']>;
  pair_starts_with?: InputMaybe<Scalars['String']>;
  pair_not_starts_with?: InputMaybe<Scalars['String']>;
  pair_ends_with?: InputMaybe<Scalars['String']>;
  pair_not_ends_with?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  totalSwapVolume?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapVolume_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapFee?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapFee_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
};

export type BalancerSubgraph_TradePairSnapshot_orderBy =
  | 'id'
  | 'pair'
  | 'timestamp'
  | 'totalSwapVolume'
  | 'totalSwapFee';

export type BalancerSubgraph_TradePair_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  token0?: InputMaybe<Scalars['String']>;
  token0_not?: InputMaybe<Scalars['String']>;
  token0_gt?: InputMaybe<Scalars['String']>;
  token0_lt?: InputMaybe<Scalars['String']>;
  token0_gte?: InputMaybe<Scalars['String']>;
  token0_lte?: InputMaybe<Scalars['String']>;
  token0_in?: InputMaybe<Array<Scalars['String']>>;
  token0_not_in?: InputMaybe<Array<Scalars['String']>>;
  token0_contains?: InputMaybe<Scalars['String']>;
  token0_not_contains?: InputMaybe<Scalars['String']>;
  token0_starts_with?: InputMaybe<Scalars['String']>;
  token0_not_starts_with?: InputMaybe<Scalars['String']>;
  token0_ends_with?: InputMaybe<Scalars['String']>;
  token0_not_ends_with?: InputMaybe<Scalars['String']>;
  token1?: InputMaybe<Scalars['String']>;
  token1_not?: InputMaybe<Scalars['String']>;
  token1_gt?: InputMaybe<Scalars['String']>;
  token1_lt?: InputMaybe<Scalars['String']>;
  token1_gte?: InputMaybe<Scalars['String']>;
  token1_lte?: InputMaybe<Scalars['String']>;
  token1_in?: InputMaybe<Array<Scalars['String']>>;
  token1_not_in?: InputMaybe<Array<Scalars['String']>>;
  token1_contains?: InputMaybe<Scalars['String']>;
  token1_not_contains?: InputMaybe<Scalars['String']>;
  token1_starts_with?: InputMaybe<Scalars['String']>;
  token1_not_starts_with?: InputMaybe<Scalars['String']>;
  token1_ends_with?: InputMaybe<Scalars['String']>;
  token1_not_ends_with?: InputMaybe<Scalars['String']>;
  totalSwapVolume?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapVolume_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapVolume_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapFee?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  totalSwapFee_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  totalSwapFee_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
};

export type BalancerSubgraph_TradePair_orderBy =
  | 'id'
  | 'token0'
  | 'token1'
  | 'totalSwapVolume'
  | 'totalSwapFee';

export type BalancerSubgraph_User = {
  id: Scalars['ID'];
  sharesOwned?: Maybe<Array<BalancerSubgraph_PoolShare>>;
  swaps?: Maybe<Array<BalancerSubgraph_Swap>>;
  userInternalBalances?: Maybe<Array<BalancerSubgraph_UserInternalBalance>>;
};


export type BalancerSubgraph_UsersharesOwnedArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_PoolShare_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_PoolShare_filter>;
};


export type BalancerSubgraph_UserswapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_Swap_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_Swap_filter>;
};


export type BalancerSubgraph_UseruserInternalBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_UserInternalBalance_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_UserInternalBalance_filter>;
};

export type BalancerSubgraph_UserInternalBalance = {
  id: Scalars['ID'];
  userAddress?: Maybe<BalancerSubgraph_User>;
  token: Scalars['BalancerSubgraph_Bytes'];
  balance: Scalars['BalancerSubgraph_BigDecimal'];
};

export type BalancerSubgraph_UserInternalBalance_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  userAddress?: InputMaybe<Scalars['String']>;
  userAddress_not?: InputMaybe<Scalars['String']>;
  userAddress_gt?: InputMaybe<Scalars['String']>;
  userAddress_lt?: InputMaybe<Scalars['String']>;
  userAddress_gte?: InputMaybe<Scalars['String']>;
  userAddress_lte?: InputMaybe<Scalars['String']>;
  userAddress_in?: InputMaybe<Array<Scalars['String']>>;
  userAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  userAddress_contains?: InputMaybe<Scalars['String']>;
  userAddress_not_contains?: InputMaybe<Scalars['String']>;
  userAddress_starts_with?: InputMaybe<Scalars['String']>;
  userAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  userAddress_ends_with?: InputMaybe<Scalars['String']>;
  userAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  token_not?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  token_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  token_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_Bytes']>>;
  token_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  token_not_contains?: InputMaybe<Scalars['BalancerSubgraph_Bytes']>;
  balance?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  balance_not?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  balance_gt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  balance_lt?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  balance_gte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  balance_lte?: InputMaybe<Scalars['BalancerSubgraph_BigDecimal']>;
  balance_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
  balance_not_in?: InputMaybe<Array<Scalars['BalancerSubgraph_BigDecimal']>>;
};

export type BalancerSubgraph_UserInternalBalance_orderBy =
  | 'id'
  | 'userAddress'
  | 'token'
  | 'balance';

export type BalancerSubgraph_User_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
};

export type BalancerSubgraph_User_orderBy =
  | 'id'
  | 'sharesOwned'
  | 'swaps'
  | 'userInternalBalances';

export type BalancerSubgraph__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['BalancerSubgraph_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type BalancerSubgraph__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: BalancerSubgraph__Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

    }
    export type QueryBalancerSdk = {
  /** null **/
  BalancerSubgraph_balancer: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_balancer'], BalancerTypes.QueryBalancerSubgraph_balancerArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_balancers: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_balancers'], BalancerTypes.QueryBalancerSubgraph_balancersArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_pool: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_pool'], BalancerTypes.QueryBalancerSubgraph_poolArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_pools: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_pools'], BalancerTypes.QueryBalancerSubgraph_poolsArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_poolToken: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_poolToken'], BalancerTypes.QueryBalancerSubgraph_poolTokenArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_poolTokens: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_poolTokens'], BalancerTypes.QueryBalancerSubgraph_poolTokensArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_priceRateProvider: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_priceRateProvider'], BalancerTypes.QueryBalancerSubgraph_priceRateProviderArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_priceRateProviders: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_priceRateProviders'], BalancerTypes.QueryBalancerSubgraph_priceRateProvidersArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_poolShare: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_poolShare'], BalancerTypes.QueryBalancerSubgraph_poolShareArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_poolShares: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_poolShares'], BalancerTypes.QueryBalancerSubgraph_poolSharesArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_user: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_user'], BalancerTypes.QueryBalancerSubgraph_userArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_users: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_users'], BalancerTypes.QueryBalancerSubgraph_usersArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_userInternalBalance: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_userInternalBalance'], BalancerTypes.QueryBalancerSubgraph_userInternalBalanceArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_userInternalBalances: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_userInternalBalances'], BalancerTypes.QueryBalancerSubgraph_userInternalBalancesArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_gradualWeightUpdate: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_gradualWeightUpdate'], BalancerTypes.QueryBalancerSubgraph_gradualWeightUpdateArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_gradualWeightUpdates: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_gradualWeightUpdates'], BalancerTypes.QueryBalancerSubgraph_gradualWeightUpdatesArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_ampUpdate: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_ampUpdate'], BalancerTypes.QueryBalancerSubgraph_ampUpdateArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_ampUpdates: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_ampUpdates'], BalancerTypes.QueryBalancerSubgraph_ampUpdatesArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_swap: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_swap'], BalancerTypes.QueryBalancerSubgraph_swapArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_swaps: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_swaps'], BalancerTypes.QueryBalancerSubgraph_swapsArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_joinExit: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_joinExit'], BalancerTypes.QueryBalancerSubgraph_joinExitArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_joinExits: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_joinExits'], BalancerTypes.QueryBalancerSubgraph_joinExitsArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_latestPrice: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_latestPrice'], BalancerTypes.QueryBalancerSubgraph_latestPriceArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_latestPrices: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_latestPrices'], BalancerTypes.QueryBalancerSubgraph_latestPricesArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_poolHistoricalLiquidity: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_poolHistoricalLiquidity'], BalancerTypes.QueryBalancerSubgraph_poolHistoricalLiquidityArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_poolHistoricalLiquidities: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_poolHistoricalLiquidities'], BalancerTypes.QueryBalancerSubgraph_poolHistoricalLiquiditiesArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_tokenPrice: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_tokenPrice'], BalancerTypes.QueryBalancerSubgraph_tokenPriceArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_tokenPrices: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_tokenPrices'], BalancerTypes.QueryBalancerSubgraph_tokenPricesArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_investment: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_investment'], BalancerTypes.QueryBalancerSubgraph_investmentArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_investments: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_investments'], BalancerTypes.QueryBalancerSubgraph_investmentsArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_poolSnapshot: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_poolSnapshot'], BalancerTypes.QueryBalancerSubgraph_poolSnapshotArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_poolSnapshots: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_poolSnapshots'], BalancerTypes.QueryBalancerSubgraph_poolSnapshotsArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_token: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_token'], BalancerTypes.QueryBalancerSubgraph_tokenArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_tokens: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_tokens'], BalancerTypes.QueryBalancerSubgraph_tokensArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_tokenSnapshot: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_tokenSnapshot'], BalancerTypes.QueryBalancerSubgraph_tokenSnapshotArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_tokenSnapshots: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_tokenSnapshots'], BalancerTypes.QueryBalancerSubgraph_tokenSnapshotsArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_tradePair: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_tradePair'], BalancerTypes.QueryBalancerSubgraph_tradePairArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_tradePairs: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_tradePairs'], BalancerTypes.QueryBalancerSubgraph_tradePairsArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_tradePairSnapshot: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_tradePairSnapshot'], BalancerTypes.QueryBalancerSubgraph_tradePairSnapshotArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_tradePairSnapshots: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_tradePairSnapshots'], BalancerTypes.QueryBalancerSubgraph_tradePairSnapshotsArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_balancerSnapshot: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_balancerSnapshot'], BalancerTypes.QueryBalancerSubgraph_balancerSnapshotArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_balancerSnapshots: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph_balancerSnapshots'], BalancerTypes.QueryBalancerSubgraph_balancerSnapshotsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  BalancerSubgraph__meta: InContextSdkMethod<BalancerTypes.Query['BalancerSubgraph__meta'], BalancerTypes.QueryBalancerSubgraph__metaArgs, MeshContext>
};

export type MutationBalancerSdk = {

};

export type SubscriptionBalancerSdk = {
  /** null **/
  BalancerSubgraph_balancer: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_balancer'], BalancerTypes.SubscriptionBalancerSubgraph_balancerArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_balancers: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_balancers'], BalancerTypes.SubscriptionBalancerSubgraph_balancersArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_pool: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_pool'], BalancerTypes.SubscriptionBalancerSubgraph_poolArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_pools: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_pools'], BalancerTypes.SubscriptionBalancerSubgraph_poolsArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_poolToken: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_poolToken'], BalancerTypes.SubscriptionBalancerSubgraph_poolTokenArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_poolTokens: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_poolTokens'], BalancerTypes.SubscriptionBalancerSubgraph_poolTokensArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_priceRateProvider: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_priceRateProvider'], BalancerTypes.SubscriptionBalancerSubgraph_priceRateProviderArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_priceRateProviders: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_priceRateProviders'], BalancerTypes.SubscriptionBalancerSubgraph_priceRateProvidersArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_poolShare: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_poolShare'], BalancerTypes.SubscriptionBalancerSubgraph_poolShareArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_poolShares: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_poolShares'], BalancerTypes.SubscriptionBalancerSubgraph_poolSharesArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_user: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_user'], BalancerTypes.SubscriptionBalancerSubgraph_userArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_users: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_users'], BalancerTypes.SubscriptionBalancerSubgraph_usersArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_userInternalBalance: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_userInternalBalance'], BalancerTypes.SubscriptionBalancerSubgraph_userInternalBalanceArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_userInternalBalances: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_userInternalBalances'], BalancerTypes.SubscriptionBalancerSubgraph_userInternalBalancesArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_gradualWeightUpdate: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_gradualWeightUpdate'], BalancerTypes.SubscriptionBalancerSubgraph_gradualWeightUpdateArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_gradualWeightUpdates: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_gradualWeightUpdates'], BalancerTypes.SubscriptionBalancerSubgraph_gradualWeightUpdatesArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_ampUpdate: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_ampUpdate'], BalancerTypes.SubscriptionBalancerSubgraph_ampUpdateArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_ampUpdates: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_ampUpdates'], BalancerTypes.SubscriptionBalancerSubgraph_ampUpdatesArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_swap: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_swap'], BalancerTypes.SubscriptionBalancerSubgraph_swapArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_swaps: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_swaps'], BalancerTypes.SubscriptionBalancerSubgraph_swapsArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_joinExit: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_joinExit'], BalancerTypes.SubscriptionBalancerSubgraph_joinExitArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_joinExits: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_joinExits'], BalancerTypes.SubscriptionBalancerSubgraph_joinExitsArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_latestPrice: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_latestPrice'], BalancerTypes.SubscriptionBalancerSubgraph_latestPriceArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_latestPrices: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_latestPrices'], BalancerTypes.SubscriptionBalancerSubgraph_latestPricesArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_poolHistoricalLiquidity: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_poolHistoricalLiquidity'], BalancerTypes.SubscriptionBalancerSubgraph_poolHistoricalLiquidityArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_poolHistoricalLiquidities: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_poolHistoricalLiquidities'], BalancerTypes.SubscriptionBalancerSubgraph_poolHistoricalLiquiditiesArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_tokenPrice: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_tokenPrice'], BalancerTypes.SubscriptionBalancerSubgraph_tokenPriceArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_tokenPrices: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_tokenPrices'], BalancerTypes.SubscriptionBalancerSubgraph_tokenPricesArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_investment: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_investment'], BalancerTypes.SubscriptionBalancerSubgraph_investmentArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_investments: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_investments'], BalancerTypes.SubscriptionBalancerSubgraph_investmentsArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_poolSnapshot: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_poolSnapshot'], BalancerTypes.SubscriptionBalancerSubgraph_poolSnapshotArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_poolSnapshots: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_poolSnapshots'], BalancerTypes.SubscriptionBalancerSubgraph_poolSnapshotsArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_token: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_token'], BalancerTypes.SubscriptionBalancerSubgraph_tokenArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_tokens: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_tokens'], BalancerTypes.SubscriptionBalancerSubgraph_tokensArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_tokenSnapshot: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_tokenSnapshot'], BalancerTypes.SubscriptionBalancerSubgraph_tokenSnapshotArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_tokenSnapshots: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_tokenSnapshots'], BalancerTypes.SubscriptionBalancerSubgraph_tokenSnapshotsArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_tradePair: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_tradePair'], BalancerTypes.SubscriptionBalancerSubgraph_tradePairArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_tradePairs: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_tradePairs'], BalancerTypes.SubscriptionBalancerSubgraph_tradePairsArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_tradePairSnapshot: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_tradePairSnapshot'], BalancerTypes.SubscriptionBalancerSubgraph_tradePairSnapshotArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_tradePairSnapshots: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_tradePairSnapshots'], BalancerTypes.SubscriptionBalancerSubgraph_tradePairSnapshotsArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_balancerSnapshot: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_balancerSnapshot'], BalancerTypes.SubscriptionBalancerSubgraph_balancerSnapshotArgs, MeshContext>,
  /** null **/
  BalancerSubgraph_balancerSnapshots: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph_balancerSnapshots'], BalancerTypes.SubscriptionBalancerSubgraph_balancerSnapshotsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  BalancerSubgraph__meta: InContextSdkMethod<BalancerTypes.Subscription['BalancerSubgraph__meta'], BalancerTypes.SubscriptionBalancerSubgraph__metaArgs, MeshContext>
};

export type BeetsbarContext = {
      ["beetsbar"]: { Query: QueryBeetsbarSdk, Mutation: MutationBeetsbarSdk, Subscription: SubscriptionBeetsbarSdk },
    };

export type MasterchefContext = {
      ["masterchef"]: { Query: QueryMasterchefSdk, Mutation: MutationMasterchefSdk, Subscription: SubscriptionMasterchefSdk },
    };

export type BlocksContext = {
      ["blocks"]: { Query: QueryBlocksSdk, Mutation: MutationBlocksSdk, Subscription: SubscriptionBlocksSdk },
    };

export type BalancerContext = {
      ["balancer"]: { Query: QueryBalancerSdk, Mutation: MutationBalancerSdk, Subscription: SubscriptionBalancerSdk },
    };

export type MeshContext = BeetsbarContext & MasterchefContext & BlocksContext & BalancerContext & BaseMeshContext;


import { getMesh } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { fileURLToPath } from '@graphql-mesh/utils';
import * as ExternalModule_0 from '@graphql-mesh/cache-inmemory-lru';
import * as ExternalModule_1 from '@graphql-mesh/graphql';
import * as ExternalModule_2 from '@graphql-mesh/merger-stitching';
import * as ExternalModule_3 from '@graphql-mesh/transform-prefix';
import * as ExternalModule_4 from '@graphprotocol/client-auto-pagination';
import * as ExternalModule_5 from './sources/beetsbar/introspectionSchema';
import * as ExternalModule_6 from './sources/masterchef/introspectionSchema';
import * as ExternalModule_7 from './sources/blocks/introspectionSchema';
import * as ExternalModule_8 from './sources/balancer/introspectionSchema';

const importedModules: Record<string, any> = {
  // @ts-ignore
  ["@graphql-mesh/cache-inmemory-lru"]: ExternalModule_0,
  // @ts-ignore
  ["@graphql-mesh/graphql"]: ExternalModule_1,
  // @ts-ignore
  ["@graphql-mesh/merger-stitching"]: ExternalModule_2,
  // @ts-ignore
  ["@graphql-mesh/transform-prefix"]: ExternalModule_3,
  // @ts-ignore
  ["@graphprotocol/client-auto-pagination"]: ExternalModule_4,
  // @ts-ignore
  [".graphclient/sources/beetsbar/introspectionSchema"]: ExternalModule_5,
  // @ts-ignore
  [".graphclient/sources/masterchef/introspectionSchema"]: ExternalModule_6,
  // @ts-ignore
  [".graphclient/sources/blocks/introspectionSchema"]: ExternalModule_7,
  // @ts-ignore
  [".graphclient/sources/balancer/introspectionSchema"]: ExternalModule_8
};

const baseDir = pathModule.join(__dirname, '..');

const importFn = (moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  if (!(relativeModuleId in importedModules)) {
    throw new Error(`Cannot find module '${relativeModuleId}'.`);
  }
  return Promise.resolve(importedModules[relativeModuleId]);
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: 'ts',
}), {
  readonly: true,
  validate: false
});

import { GetMeshOptions } from '@graphql-mesh/runtime';
import { YamlConfig } from '@graphql-mesh/types';
import { parse } from 'graphql';
import { PubSub } from '@graphql-mesh/utils';
import MeshCache from '@graphql-mesh/cache-inmemory-lru';
import { DefaultLogger } from '@graphql-mesh/utils';
import GraphqlHandler from '@graphql-mesh/graphql'
import StitchingMerger from '@graphql-mesh/merger-stitching';
import PrefixTransform from '@graphql-mesh/transform-prefix';
import AutoPaginationTransform from '@graphprotocol/client-auto-pagination';
import { resolveAdditionalResolvers } from '@graphql-mesh/utils';
import { parseWithCache } from '@graphql-mesh/utils';
export const rawConfig: YamlConfig.Config = {"sources":[{"name":"balancer","handler":{"graphql":{"endpoint":"https://graph-node.beets-ftm-node.com/subgraphs/name/beethovenx"}},"transforms":[{"prefix":{"value":"BalancerSubgraph_","includeRootOperations":true,"ignore":["_SubgraphErrorPolicy_"]}},{"autoPagination":{"validateSchema":true,"limitOfRecords":1000}}]},{"name":"blocks","handler":{"graphql":{"endpoint":"https://api.thegraph.com/subgraphs/name/danielmkm/optimism-blocks"}},"transforms":[{"prefix":{"value":"BlocksSubgraph_","includeRootOperations":true,"ignore":["_SubgraphErrorPolicy_"]}},{"autoPagination":{"validateSchema":true,"limitOfRecords":1000}}]},{"name":"masterchef","handler":{"graphql":{"endpoint":"https://graph-node.beets-ftm-node.com/subgraphs/name/masterchefV2"}},"transforms":[{"prefix":{"value":"MasterchefSubgraph_","includeRootOperations":true,"ignore":["_SubgraphErrorPolicy_"]}},{"autoPagination":{"validateSchema":true,"limitOfRecords":1000}}]},{"name":"beetsbar","handler":{"graphql":{"endpoint":"https://graph-node.beets-ftm-node.com/subgraphs/name/beets-bar"}},"transforms":[{"prefix":{"value":"BeetsBarSubgraph_","includeRootOperations":true,"ignore":["_SubgraphErrorPolicy_"]}},{"autoPagination":{"validateSchema":true,"limitOfRecords":1000}}]}],"documents":["./modules/subgraph/**/*.graphql"]} as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const cache = new (MeshCache as any)({
      ...(rawConfig.cache || {}),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
    } as any)
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger('🕸️  Mesh');
const sources = [];
const transforms = [];
const balancerTransforms = [];
const blocksTransforms = [];
const masterchefTransforms = [];
const beetsbarTransforms = [];
const additionalTypeDefs = [] as any[];
const balancerHandler = new GraphqlHandler({
              name: rawConfig.sources[0].name,
              config: rawConfig.sources[0].handler["graphql"],
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child(rawConfig.sources[0].name),
              logger: logger.child(rawConfig.sources[0].name),
              importFn
            });
const blocksHandler = new GraphqlHandler({
              name: rawConfig.sources[1].name,
              config: rawConfig.sources[1].handler["graphql"],
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child(rawConfig.sources[1].name),
              logger: logger.child(rawConfig.sources[1].name),
              importFn
            });
const masterchefHandler = new GraphqlHandler({
              name: rawConfig.sources[2].name,
              config: rawConfig.sources[2].handler["graphql"],
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child(rawConfig.sources[2].name),
              logger: logger.child(rawConfig.sources[2].name),
              importFn
            });
const beetsbarHandler = new GraphqlHandler({
              name: rawConfig.sources[3].name,
              config: rawConfig.sources[3].handler["graphql"],
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child(rawConfig.sources[3].name),
              logger: logger.child(rawConfig.sources[3].name),
              importFn
            });
const merger = new(StitchingMerger as any)({
        cache,
        pubsub,
        logger: logger.child('StitchingMerger'),
        store: rootStore.child('stitchingMerger')
      })
balancerTransforms.push(
                new PrefixTransform({
                  apiName: rawConfig.sources[0].name,
                  config: rawConfig.sources[0].transforms[0]["prefix"],
                  baseDir,
                  cache,
                  pubsub,
                  importFn
                })
              );
blocksTransforms.push(
                new PrefixTransform({
                  apiName: rawConfig.sources[1].name,
                  config: rawConfig.sources[1].transforms[0]["prefix"],
                  baseDir,
                  cache,
                  pubsub,
                  importFn
                })
              );
masterchefTransforms.push(
                new PrefixTransform({
                  apiName: rawConfig.sources[2].name,
                  config: rawConfig.sources[2].transforms[0]["prefix"],
                  baseDir,
                  cache,
                  pubsub,
                  importFn
                })
              );
beetsbarTransforms.push(
                new PrefixTransform({
                  apiName: rawConfig.sources[3].name,
                  config: rawConfig.sources[3].transforms[0]["prefix"],
                  baseDir,
                  cache,
                  pubsub,
                  importFn
                })
              );
balancerTransforms.push(
                new AutoPaginationTransform({
                  apiName: rawConfig.sources[0].name,
                  config: rawConfig.sources[0].transforms[1]["autoPagination"],
                  baseDir,
                  cache,
                  pubsub,
                  importFn
                })
              );
blocksTransforms.push(
                new AutoPaginationTransform({
                  apiName: rawConfig.sources[1].name,
                  config: rawConfig.sources[1].transforms[1]["autoPagination"],
                  baseDir,
                  cache,
                  pubsub,
                  importFn
                })
              );
masterchefTransforms.push(
                new AutoPaginationTransform({
                  apiName: rawConfig.sources[2].name,
                  config: rawConfig.sources[2].transforms[1]["autoPagination"],
                  baseDir,
                  cache,
                  pubsub,
                  importFn
                })
              );
beetsbarTransforms.push(
                new AutoPaginationTransform({
                  apiName: rawConfig.sources[3].name,
                  config: rawConfig.sources[3].transforms[1]["autoPagination"],
                  baseDir,
                  cache,
                  pubsub,
                  importFn
                })
              );
sources.push({
          name: 'balancer',
          handler: balancerHandler,
          transforms: balancerTransforms
        })
sources.push({
          name: 'blocks',
          handler: blocksHandler,
          transforms: blocksTransforms
        })
sources.push({
          name: 'masterchef',
          handler: masterchefHandler,
          transforms: masterchefTransforms
        })
sources.push({
          name: 'beetsbar',
          handler: beetsbarHandler,
          transforms: beetsbarTransforms
        })
const additionalResolversRawConfig = [];
const additionalResolvers = await resolveAdditionalResolvers(
      baseDir,
      additionalResolversRawConfig,
      importFn,
      pubsub
  )
const liveQueryInvalidations = rawConfig.liveQueryInvalidations;
const additionalEnvelopPlugins = [];
const documents = documentsInSDL.map((documentSdl: string, i: number) => ({
              rawSDL: documentSdl,
              document: parseWithCache(documentSdl),
              location: `document_${i}.graphql`,
            }))

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    liveQueryInvalidations,
    additionalEnvelopPlugins,
    documents,
  };
}

export const documentsInSDL = /*#__PURE__*/ [/* GraphQL */`query BalancerProtocolData($skip: Int, $first: Int, $orderBy: BalancerSubgraph_Balancer_orderBy, $orderDirection: BalancerSubgraph_OrderDirection, $where: BalancerSubgraph_Balancer_filter, $block: BalancerSubgraph_Block_height) {
  balancers: BalancerSubgraph_balancers(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    id
    totalLiquidity
    totalSwapVolume
    totalSwapFee
    poolCount
  }
}

query BalancerUser($id: ID!, $block: BalancerSubgraph_Block_height) {
  user: BalancerSubgraph_user(id: $id, block: $block) {
    ...BalancerUser
  }
}

query BalancerUsers($skip: Int, $first: Int, $orderBy: BalancerSubgraph_User_orderBy, $orderDirection: BalancerSubgraph_OrderDirection, $where: BalancerSubgraph_User_filter, $block: BalancerSubgraph_Block_height) {
  users: BalancerSubgraph_users(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    ...BalancerUser
  }
}

fragment BalancerUser on BalancerSubgraph_User {
  __typename
  id
  sharesOwned(first: 1000) {
    id
    balance
    poolId {
      id
    }
  }
}

query BalancerPoolShares($skip: Int, $first: Int, $orderBy: BalancerSubgraph_PoolShare_orderBy, $orderDirection: BalancerSubgraph_OrderDirection, $where: BalancerSubgraph_PoolShare_filter, $block: BalancerSubgraph_Block_height) {
  poolShares: BalancerSubgraph_poolShares(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    ...BalancerPoolShare
  }
}

fragment BalancerPoolShare on BalancerSubgraph_PoolShare {
  __typename
  id
  balance
}

query BalancerTokenPrices($skip: Int, $first: Int, $orderBy: BalancerSubgraph_TokenPrice_orderBy, $orderDirection: BalancerSubgraph_OrderDirection, $where: BalancerSubgraph_TokenPrice_filter, $block: BalancerSubgraph_Block_height) {
  tokenPrices: BalancerSubgraph_tokenPrices(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    ...BalancerTokenPrice
  }
}

fragment BalancerTokenPrice on BalancerSubgraph_TokenPrice {
  __typename
  id
  poolId {
    id
  }
  asset
  amount
  pricingAsset
  price
  block
  timestamp
  priceUSD
}

fragment BalancerPool on BalancerSubgraph_Pool {
  __typename
  id
  address
  poolType
  symbol
  name
  swapFee
  totalWeight
  totalSwapVolume
  totalSwapFee
  totalLiquidity
  totalShares
  swapsCount
  holdersCount
  createTime
  swapEnabled
  tokensList
  lowerTarget
  upperTarget
  mainIndex
  wrappedIndex
  factory
  expiryTime
  unitSeconds
  principalToken
  baseToken
  owner
  amp
  tokens {
    ...BalancerPoolToken
  }
}

fragment BalancerPoolToken on BalancerSubgraph_PoolToken {
  __typename
  id
  symbol
  name
  decimals
  address
  balance
  invested
  weight
  priceRate
}

query BalancerPools($skip: Int, $first: Int, $orderBy: BalancerSubgraph_Pool_orderBy, $orderDirection: BalancerSubgraph_OrderDirection, $where: BalancerSubgraph_Pool_filter, $block: BalancerSubgraph_Block_height) {
  pools: BalancerSubgraph_pools(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    ...BalancerPool
  }
}

query BalancerPool($id: ID!, $block: BalancerSubgraph_Block_height) {
  pool: BalancerSubgraph_pool(id: $id, block: $block) {
    ...BalancerPool
  }
}

query BalancerPoolHistoricalLiquidities($skip: Int, $first: Int, $orderBy: BalancerSubgraph_PoolHistoricalLiquidity_orderBy, $orderDirection: BalancerSubgraph_OrderDirection, $where: BalancerSubgraph_PoolHistoricalLiquidity_filter, $block: BalancerSubgraph_Block_height) {
  poolHistoricalLiquidities: BalancerSubgraph_poolHistoricalLiquidities(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    id
    poolId {
      id
    }
    poolTotalShares
    poolLiquidity
    poolShareValue
    pricingAsset
    block
  }
}

query BalancerPoolSnapshots($skip: Int, $first: Int, $orderBy: BalancerSubgraph_PoolSnapshot_orderBy, $orderDirection: BalancerSubgraph_OrderDirection, $where: BalancerSubgraph_PoolSnapshot_filter, $block: BalancerSubgraph_Block_height) {
  poolSnapshots: BalancerSubgraph_poolSnapshots(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    ...BalancerPoolSnapshot
  }
}

fragment BalancerPoolSnapshot on BalancerSubgraph_PoolSnapshot {
  __typename
  id
  pool {
    id
  }
  totalShares
  swapVolume
  swapFees
  timestamp
}

query BalancerLatestPrices($skip: Int, $first: Int, $orderBy: BalancerSubgraph_LatestPrice_orderBy, $orderDirection: BalancerSubgraph_OrderDirection, $where: BalancerSubgraph_LatestPrice_filter, $block: BalancerSubgraph_Block_height) {
  latestPrices: BalancerSubgraph_latestPrices(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    ...BalancerLatestPrice
  }
}

query BalancerLatestPrice($id: ID!) {
  latestPrice: BalancerSubgraph_latestPrice(id: $id) {
    ...BalancerLatestPrice
  }
}

query BalancerJoinExits($skip: Int, $first: Int, $orderBy: BalancerSubgraph_JoinExit_orderBy, $orderDirection: BalancerSubgraph_OrderDirection, $where: BalancerSubgraph_JoinExit_filter, $block: BalancerSubgraph_Block_height) {
  joinExits: BalancerSubgraph_joinExits(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    ...BalancerJoinExit
  }
}

fragment BalancerLatestPrice on BalancerSubgraph_LatestPrice {
  __typename
  id
  asset
  price
  poolId {
    id
  }
  pricingAsset
  block
  priceUSD
}

fragment BalancerJoinExit on BalancerSubgraph_JoinExit {
  __typename
  amounts
  id
  sender
  timestamp
  tx
  type
  user {
    id
  }
  pool {
    id
    tokensList
  }
  valueUSD
}

query BalancerPortfolioData($id: ID!, $previousBlockNumber: Int!) {
  user: BalancerSubgraph_user(id: $id) {
    ...BalancerUser
  }
  previousUser: BalancerSubgraph_user(
    id: $id
    block: {number: $previousBlockNumber}
  ) {
    ...BalancerUser
  }
}

query BalancerPortfolioPoolsData($previousBlockNumber: Int!) {
  pools: BalancerSubgraph_pools(first: 1000, where: {totalShares_gt: "0"}) {
    ...BalancerPool
  }
  previousPools: BalancerSubgraph_pools(
    first: 1000
    where: {totalShares_gt: "0"}
    block: {number: $previousBlockNumber}
  ) {
    ...BalancerPool
  }
}

query BalancerTradePairSnapshots($skip: Int, $first: Int, $orderBy: BalancerSubgraph_TradePairSnapshot_orderBy, $orderDirection: BalancerSubgraph_OrderDirection, $where: BalancerSubgraph_TradePairSnapshot_filter, $block: BalancerSubgraph_Block_height) {
  tradePairSnapshots: BalancerSubgraph_tradePairSnapshots(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    ...BalancerTradePairSnapshot
  }
}

fragment BalancerTradePairSnapshot on BalancerSubgraph_TradePairSnapshot {
  __typename
  id
  totalSwapFee
  totalSwapVolume
  timestamp
  pair {
    token0 {
      address
      symbol
    }
    token1 {
      address
      symbol
    }
  }
}

query BalancerSwaps($skip: Int, $first: Int, $orderBy: BalancerSubgraph_Swap_orderBy, $orderDirection: BalancerSubgraph_OrderDirection, $where: BalancerSubgraph_Swap_filter, $block: BalancerSubgraph_Block_height) {
  swaps: BalancerSubgraph_swaps(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    ...BalancerSwap
  }
}

fragment BalancerSwap on BalancerSubgraph_Swap {
  __typename
  id
  caller
  tokenIn
  tokenInSym
  tokenOut
  tokenOutSym
  tokenAmountIn
  tokenAmountOut
  poolId {
    id
  }
  userAddress {
    id
  }
  timestamp
  tx
  valueUSD
}`,/* GraphQL */`query GetBeetsBar($id: ID!, $block: BeetsBarSubgraph_Block_height) {
  bar: BeetsBarSubgraph_bar(id: $id, block: $block) {
    ...BeetsBar
  }
}

query GetBeetsBarUser($id: ID!, $block: BeetsBarSubgraph_Block_height) {
  user: BeetsBarSubgraph_user(id: $id, block: $block) {
    ...BeetsBarUser
  }
}

query BeetsBarUsers($skip: Int, $first: Int, $orderBy: BeetsBarSubgraph_User_orderBy, $orderDirection: BeetsBarSubgraph_OrderDirection, $where: BeetsBarSubgraph_User_filter, $block: BeetsBarSubgraph_Block_height) {
  users: BeetsBarSubgraph_users(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    ...BeetsBarUser
  }
}

fragment BeetsBar on BeetsBarSubgraph_Bar {
  __typename
  id
  address
  block
  decimals
  fBeetsBurned
  fBeetsMinted
  name
  ratio
  sharedVestingTokenRevenue
  symbol
  timestamp
  totalSupply
  vestingToken
  vestingTokenStaked
}

fragment BeetsBarUser on BeetsBarSubgraph_User {
  __typename
  id
  address
  block
  fBeets
  timestamp
  vestingTokenHarvested
  vestingTokenIn
  vestingTokenOut
}

query BeetsBarPortfolioData($barId: ID!, $userAddress: ID!, $previousBlockNumber: Int!) {
  beetsBar: BeetsBarSubgraph_bar(id: $barId) {
    ...BeetsBar
  }
  previousBeetsBar: BeetsBarSubgraph_bar(
    id: $barId
    block: {number: $previousBlockNumber}
  ) {
    ...BeetsBar
  }
  beetsBarUser: BeetsBarSubgraph_user(id: $userAddress) {
    ...BeetsBarUser
  }
  previousBeetsBarUser: BeetsBarSubgraph_user(
    id: $userAddress
    block: {number: $previousBlockNumber}
  ) {
    ...BeetsBarUser
  }
}

query BeetsBarData($barId: ID!, $previousBlockNumber: Int!) {
  beetsBar: BeetsBarSubgraph_bar(id: $barId) {
    ...BeetsBar
  }
  previousBeetsBar: BeetsBarSubgraph_bar(
    id: $barId
    block: {number: $previousBlockNumber}
  ) {
    ...BeetsBar
  }
}`,/* GraphQL */`query Blocks($skip: Int, $first: Int, $orderBy: BlocksSubgraph_Block_orderBy, $orderDirection: BlocksSubgraph_OrderDirection, $where: BlocksSubgraph_Block_filter, $block: BlocksSubgraph_Block_height) {
  blocks: BlocksSubgraph_blocks(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    ...Block
  }
}

fragment Block on BlocksSubgraph_Block {
  __typename
  id
  number
  timestamp
}`,/* GraphQL */`query MasterchefUsers($skip: Int, $first: Int, $orderBy: MasterchefSubgraph_User_orderBy, $orderDirection: MasterchefSubgraph_OrderDirection, $where: MasterchefSubgraph_User_filter, $block: MasterchefSubgraph_Block_height) {
  farmUsers: MasterchefSubgraph_users(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    ...FarmUser
  }
}

fragment FarmUser on MasterchefSubgraph_User {
  __typename
  id
  address
  amount
  rewardDebt
  beetsHarvested
  timestamp
  pool {
    id
    pair
  }
}

query Masterchefs($skip: Int, $first: Int, $orderBy: MasterchefSubgraph_MasterChef_orderBy, $orderDirection: MasterchefSubgraph_OrderDirection, $where: MasterchefSubgraph_MasterChef_filter, $block: MasterchefSubgraph_Block_height) {
  masterChefs: MasterchefSubgraph_masterChefs(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    id
    beets
    beetsPerBlock
    totalAllocPoint
    poolCount
    timestamp
    block
  }
}

query MasterchefFarms($skip: Int, $first: Int, $orderBy: MasterchefSubgraph_Pool_orderBy, $orderDirection: MasterchefSubgraph_OrderDirection, $where: MasterchefSubgraph_Pool_filter, $block: MasterchefSubgraph_Block_height) {
  farms: MasterchefSubgraph_pools(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    ...Farm
  }
}

fragment Farm on MasterchefSubgraph_Pool {
  __typename
  id
  pair
  allocPoint
  lastRewardBlock
  accBeetsPerShare
  slpBalance
  userCount
  timestamp
  block
  masterChef {
    id
    totalAllocPoint
    beetsPerBlock
  }
  rewarder {
    id
    rewardTokens {
      token
      decimals
      symbol
      rewardPerSecond
    }
  }
}

query MasterchefPortfolioData($address: Bytes!, $previousBlockNumber: Int!) {
  farmUsers: MasterchefSubgraph_users(first: 1000, where: {address: $address}) {
    ...FarmUser
  }
  previousFarmUsers: MasterchefSubgraph_users(
    first: 1000
    where: {address: $address}
    block: {number: $previousBlockNumber}
  ) {
    ...FarmUser
  }
}`];

export async function getBuiltGraphClient(): Promise<MeshInstance<MeshContext>> {
  const meshConfig = await getMeshOptions();
  return getMesh<MeshContext>(meshConfig);
}

export async function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const { sdkRequesterFactory } = await getBuiltGraphClient();
  return getSdk<TOperationContext>(sdkRequesterFactory(globalContext));
}
export type BalancerProtocolDataQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_Balancer_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_Balancer_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
}>;


export type BalancerProtocolDataQuery = { balancers: Array<Pick<BalancerSubgraph_Balancer, 'id' | 'totalLiquidity' | 'totalSwapVolume' | 'totalSwapFee' | 'poolCount'>> };

export type BalancerUserQueryVariables = Exact<{
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
}>;


export type BalancerUserQuery = { user?: Maybe<(
    { __typename: 'BalancerSubgraph_User' }
    & Pick<BalancerSubgraph_User, 'id'>
    & { sharesOwned?: Maybe<Array<(
      Pick<BalancerSubgraph_PoolShare, 'id' | 'balance'>
      & { poolId: Pick<BalancerSubgraph_Pool, 'id'> }
    )>> }
  )> };

export type BalancerUsersQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_User_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_User_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
}>;


export type BalancerUsersQuery = { users: Array<(
    { __typename: 'BalancerSubgraph_User' }
    & Pick<BalancerSubgraph_User, 'id'>
    & { sharesOwned?: Maybe<Array<(
      Pick<BalancerSubgraph_PoolShare, 'id' | 'balance'>
      & { poolId: Pick<BalancerSubgraph_Pool, 'id'> }
    )>> }
  )> };

export type BalancerUserFragment = (
  { __typename: 'BalancerSubgraph_User' }
  & Pick<BalancerSubgraph_User, 'id'>
  & { sharesOwned?: Maybe<Array<(
    Pick<BalancerSubgraph_PoolShare, 'id' | 'balance'>
    & { poolId: Pick<BalancerSubgraph_Pool, 'id'> }
  )>> }
);

export type BalancerPoolSharesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_PoolShare_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_PoolShare_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
}>;


export type BalancerPoolSharesQuery = { poolShares: Array<(
    { __typename: 'BalancerSubgraph_PoolShare' }
    & Pick<BalancerSubgraph_PoolShare, 'id' | 'balance'>
  )> };

export type BalancerPoolShareFragment = (
  { __typename: 'BalancerSubgraph_PoolShare' }
  & Pick<BalancerSubgraph_PoolShare, 'id' | 'balance'>
);

export type BalancerTokenPricesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_TokenPrice_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_TokenPrice_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
}>;


export type BalancerTokenPricesQuery = { tokenPrices: Array<(
    { __typename: 'BalancerSubgraph_TokenPrice' }
    & Pick<BalancerSubgraph_TokenPrice, 'id' | 'asset' | 'amount' | 'pricingAsset' | 'price' | 'block' | 'timestamp' | 'priceUSD'>
    & { poolId: Pick<BalancerSubgraph_Pool, 'id'> }
  )> };

export type BalancerTokenPriceFragment = (
  { __typename: 'BalancerSubgraph_TokenPrice' }
  & Pick<BalancerSubgraph_TokenPrice, 'id' | 'asset' | 'amount' | 'pricingAsset' | 'price' | 'block' | 'timestamp' | 'priceUSD'>
  & { poolId: Pick<BalancerSubgraph_Pool, 'id'> }
);

export type BalancerPoolFragment = (
  { __typename: 'BalancerSubgraph_Pool' }
  & Pick<BalancerSubgraph_Pool, 'id' | 'address' | 'poolType' | 'symbol' | 'name' | 'swapFee' | 'totalWeight' | 'totalSwapVolume' | 'totalSwapFee' | 'totalLiquidity' | 'totalShares' | 'swapsCount' | 'holdersCount' | 'createTime' | 'swapEnabled' | 'tokensList' | 'lowerTarget' | 'upperTarget' | 'mainIndex' | 'wrappedIndex' | 'factory' | 'expiryTime' | 'unitSeconds' | 'principalToken' | 'baseToken' | 'owner' | 'amp'>
  & { tokens?: Maybe<Array<(
    { __typename: 'BalancerSubgraph_PoolToken' }
    & Pick<BalancerSubgraph_PoolToken, 'id' | 'symbol' | 'name' | 'decimals' | 'address' | 'balance' | 'invested' | 'weight' | 'priceRate'>
  )>> }
);

export type BalancerPoolTokenFragment = (
  { __typename: 'BalancerSubgraph_PoolToken' }
  & Pick<BalancerSubgraph_PoolToken, 'id' | 'symbol' | 'name' | 'decimals' | 'address' | 'balance' | 'invested' | 'weight' | 'priceRate'>
);

export type BalancerPoolsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_Pool_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_Pool_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
}>;


export type BalancerPoolsQuery = { pools: Array<(
    { __typename: 'BalancerSubgraph_Pool' }
    & Pick<BalancerSubgraph_Pool, 'id' | 'address' | 'poolType' | 'symbol' | 'name' | 'swapFee' | 'totalWeight' | 'totalSwapVolume' | 'totalSwapFee' | 'totalLiquidity' | 'totalShares' | 'swapsCount' | 'holdersCount' | 'createTime' | 'swapEnabled' | 'tokensList' | 'lowerTarget' | 'upperTarget' | 'mainIndex' | 'wrappedIndex' | 'factory' | 'expiryTime' | 'unitSeconds' | 'principalToken' | 'baseToken' | 'owner' | 'amp'>
    & { tokens?: Maybe<Array<(
      { __typename: 'BalancerSubgraph_PoolToken' }
      & Pick<BalancerSubgraph_PoolToken, 'id' | 'symbol' | 'name' | 'decimals' | 'address' | 'balance' | 'invested' | 'weight' | 'priceRate'>
    )>> }
  )> };

export type BalancerPoolQueryVariables = Exact<{
  id: Scalars['ID'];
  block?: InputMaybe<BalancerSubgraph_Block_height>;
}>;


export type BalancerPoolQuery = { pool?: Maybe<(
    { __typename: 'BalancerSubgraph_Pool' }
    & Pick<BalancerSubgraph_Pool, 'id' | 'address' | 'poolType' | 'symbol' | 'name' | 'swapFee' | 'totalWeight' | 'totalSwapVolume' | 'totalSwapFee' | 'totalLiquidity' | 'totalShares' | 'swapsCount' | 'holdersCount' | 'createTime' | 'swapEnabled' | 'tokensList' | 'lowerTarget' | 'upperTarget' | 'mainIndex' | 'wrappedIndex' | 'factory' | 'expiryTime' | 'unitSeconds' | 'principalToken' | 'baseToken' | 'owner' | 'amp'>
    & { tokens?: Maybe<Array<(
      { __typename: 'BalancerSubgraph_PoolToken' }
      & Pick<BalancerSubgraph_PoolToken, 'id' | 'symbol' | 'name' | 'decimals' | 'address' | 'balance' | 'invested' | 'weight' | 'priceRate'>
    )>> }
  )> };

export type BalancerPoolHistoricalLiquiditiesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_PoolHistoricalLiquidity_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_PoolHistoricalLiquidity_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
}>;


export type BalancerPoolHistoricalLiquiditiesQuery = { poolHistoricalLiquidities: Array<(
    Pick<BalancerSubgraph_PoolHistoricalLiquidity, 'id' | 'poolTotalShares' | 'poolLiquidity' | 'poolShareValue' | 'pricingAsset' | 'block'>
    & { poolId: Pick<BalancerSubgraph_Pool, 'id'> }
  )> };

export type BalancerPoolSnapshotsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_PoolSnapshot_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_PoolSnapshot_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
}>;


export type BalancerPoolSnapshotsQuery = { poolSnapshots: Array<(
    { __typename: 'BalancerSubgraph_PoolSnapshot' }
    & Pick<BalancerSubgraph_PoolSnapshot, 'id' | 'totalShares' | 'swapVolume' | 'swapFees' | 'timestamp'>
    & { pool: Pick<BalancerSubgraph_Pool, 'id'> }
  )> };

export type BalancerPoolSnapshotFragment = (
  { __typename: 'BalancerSubgraph_PoolSnapshot' }
  & Pick<BalancerSubgraph_PoolSnapshot, 'id' | 'totalShares' | 'swapVolume' | 'swapFees' | 'timestamp'>
  & { pool: Pick<BalancerSubgraph_Pool, 'id'> }
);

export type BalancerLatestPricesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_LatestPrice_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_LatestPrice_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
}>;


export type BalancerLatestPricesQuery = { latestPrices: Array<(
    { __typename: 'BalancerSubgraph_LatestPrice' }
    & Pick<BalancerSubgraph_LatestPrice, 'id' | 'asset' | 'price' | 'pricingAsset' | 'block' | 'priceUSD'>
    & { poolId: Pick<BalancerSubgraph_Pool, 'id'> }
  )> };

export type BalancerLatestPriceQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type BalancerLatestPriceQuery = { latestPrice?: Maybe<(
    { __typename: 'BalancerSubgraph_LatestPrice' }
    & Pick<BalancerSubgraph_LatestPrice, 'id' | 'asset' | 'price' | 'pricingAsset' | 'block' | 'priceUSD'>
    & { poolId: Pick<BalancerSubgraph_Pool, 'id'> }
  )> };

export type BalancerJoinExitsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_JoinExit_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_JoinExit_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
}>;


export type BalancerJoinExitsQuery = { joinExits: Array<(
    { __typename: 'BalancerSubgraph_JoinExit' }
    & Pick<BalancerSubgraph_JoinExit, 'amounts' | 'id' | 'sender' | 'timestamp' | 'tx' | 'type' | 'valueUSD'>
    & { user: Pick<BalancerSubgraph_User, 'id'>, pool: Pick<BalancerSubgraph_Pool, 'id' | 'tokensList'> }
  )> };

export type BalancerLatestPriceFragment = (
  { __typename: 'BalancerSubgraph_LatestPrice' }
  & Pick<BalancerSubgraph_LatestPrice, 'id' | 'asset' | 'price' | 'pricingAsset' | 'block' | 'priceUSD'>
  & { poolId: Pick<BalancerSubgraph_Pool, 'id'> }
);

export type BalancerJoinExitFragment = (
  { __typename: 'BalancerSubgraph_JoinExit' }
  & Pick<BalancerSubgraph_JoinExit, 'amounts' | 'id' | 'sender' | 'timestamp' | 'tx' | 'type' | 'valueUSD'>
  & { user: Pick<BalancerSubgraph_User, 'id'>, pool: Pick<BalancerSubgraph_Pool, 'id' | 'tokensList'> }
);

export type BalancerPortfolioDataQueryVariables = Exact<{
  id: Scalars['ID'];
  previousBlockNumber: Scalars['Int'];
}>;


export type BalancerPortfolioDataQuery = { user?: Maybe<(
    { __typename: 'BalancerSubgraph_User' }
    & Pick<BalancerSubgraph_User, 'id'>
    & { sharesOwned?: Maybe<Array<(
      Pick<BalancerSubgraph_PoolShare, 'id' | 'balance'>
      & { poolId: Pick<BalancerSubgraph_Pool, 'id'> }
    )>> }
  )>, previousUser?: Maybe<(
    { __typename: 'BalancerSubgraph_User' }
    & Pick<BalancerSubgraph_User, 'id'>
    & { sharesOwned?: Maybe<Array<(
      Pick<BalancerSubgraph_PoolShare, 'id' | 'balance'>
      & { poolId: Pick<BalancerSubgraph_Pool, 'id'> }
    )>> }
  )> };

export type BalancerPortfolioPoolsDataQueryVariables = Exact<{
  previousBlockNumber: Scalars['Int'];
}>;


export type BalancerPortfolioPoolsDataQuery = { pools: Array<(
    { __typename: 'BalancerSubgraph_Pool' }
    & Pick<BalancerSubgraph_Pool, 'id' | 'address' | 'poolType' | 'symbol' | 'name' | 'swapFee' | 'totalWeight' | 'totalSwapVolume' | 'totalSwapFee' | 'totalLiquidity' | 'totalShares' | 'swapsCount' | 'holdersCount' | 'createTime' | 'swapEnabled' | 'tokensList' | 'lowerTarget' | 'upperTarget' | 'mainIndex' | 'wrappedIndex' | 'factory' | 'expiryTime' | 'unitSeconds' | 'principalToken' | 'baseToken' | 'owner' | 'amp'>
    & { tokens?: Maybe<Array<(
      { __typename: 'BalancerSubgraph_PoolToken' }
      & Pick<BalancerSubgraph_PoolToken, 'id' | 'symbol' | 'name' | 'decimals' | 'address' | 'balance' | 'invested' | 'weight' | 'priceRate'>
    )>> }
  )>, previousPools: Array<(
    { __typename: 'BalancerSubgraph_Pool' }
    & Pick<BalancerSubgraph_Pool, 'id' | 'address' | 'poolType' | 'symbol' | 'name' | 'swapFee' | 'totalWeight' | 'totalSwapVolume' | 'totalSwapFee' | 'totalLiquidity' | 'totalShares' | 'swapsCount' | 'holdersCount' | 'createTime' | 'swapEnabled' | 'tokensList' | 'lowerTarget' | 'upperTarget' | 'mainIndex' | 'wrappedIndex' | 'factory' | 'expiryTime' | 'unitSeconds' | 'principalToken' | 'baseToken' | 'owner' | 'amp'>
    & { tokens?: Maybe<Array<(
      { __typename: 'BalancerSubgraph_PoolToken' }
      & Pick<BalancerSubgraph_PoolToken, 'id' | 'symbol' | 'name' | 'decimals' | 'address' | 'balance' | 'invested' | 'weight' | 'priceRate'>
    )>> }
  )> };

export type BalancerTradePairSnapshotsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_TradePairSnapshot_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_TradePairSnapshot_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
}>;


export type BalancerTradePairSnapshotsQuery = { tradePairSnapshots: Array<(
    { __typename: 'BalancerSubgraph_TradePairSnapshot' }
    & Pick<BalancerSubgraph_TradePairSnapshot, 'id' | 'totalSwapFee' | 'totalSwapVolume' | 'timestamp'>
    & { pair: { token0: Pick<BalancerSubgraph_Token, 'address' | 'symbol'>, token1: Pick<BalancerSubgraph_Token, 'address' | 'symbol'> } }
  )> };

export type BalancerTradePairSnapshotFragment = (
  { __typename: 'BalancerSubgraph_TradePairSnapshot' }
  & Pick<BalancerSubgraph_TradePairSnapshot, 'id' | 'totalSwapFee' | 'totalSwapVolume' | 'timestamp'>
  & { pair: { token0: Pick<BalancerSubgraph_Token, 'address' | 'symbol'>, token1: Pick<BalancerSubgraph_Token, 'address' | 'symbol'> } }
);

export type BalancerSwapsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSubgraph_Swap_orderBy>;
  orderDirection?: InputMaybe<BalancerSubgraph_OrderDirection>;
  where?: InputMaybe<BalancerSubgraph_Swap_filter>;
  block?: InputMaybe<BalancerSubgraph_Block_height>;
}>;


export type BalancerSwapsQuery = { swaps: Array<(
    { __typename: 'BalancerSubgraph_Swap' }
    & Pick<BalancerSubgraph_Swap, 'id' | 'caller' | 'tokenIn' | 'tokenInSym' | 'tokenOut' | 'tokenOutSym' | 'tokenAmountIn' | 'tokenAmountOut' | 'timestamp' | 'tx' | 'valueUSD'>
    & { poolId: Pick<BalancerSubgraph_Pool, 'id'>, userAddress: Pick<BalancerSubgraph_User, 'id'> }
  )> };

export type BalancerSwapFragment = (
  { __typename: 'BalancerSubgraph_Swap' }
  & Pick<BalancerSubgraph_Swap, 'id' | 'caller' | 'tokenIn' | 'tokenInSym' | 'tokenOut' | 'tokenOutSym' | 'tokenAmountIn' | 'tokenAmountOut' | 'timestamp' | 'tx' | 'valueUSD'>
  & { poolId: Pick<BalancerSubgraph_Pool, 'id'>, userAddress: Pick<BalancerSubgraph_User, 'id'> }
);

export type GetBeetsBarQueryVariables = Exact<{
  id: Scalars['ID'];
  block?: InputMaybe<BeetsBarSubgraph_Block_height>;
}>;


export type GetBeetsBarQuery = { bar?: Maybe<(
    { __typename: 'BeetsBarSubgraph_Bar' }
    & Pick<BeetsBarSubgraph_Bar, 'id' | 'address' | 'block' | 'decimals' | 'fBeetsBurned' | 'fBeetsMinted' | 'name' | 'ratio' | 'sharedVestingTokenRevenue' | 'symbol' | 'timestamp' | 'totalSupply' | 'vestingToken' | 'vestingTokenStaked'>
  )> };

export type GetBeetsBarUserQueryVariables = Exact<{
  id: Scalars['ID'];
  block?: InputMaybe<BeetsBarSubgraph_Block_height>;
}>;


export type GetBeetsBarUserQuery = { user?: Maybe<(
    { __typename: 'BeetsBarSubgraph_User' }
    & Pick<BeetsBarSubgraph_User, 'id' | 'address' | 'block' | 'fBeets' | 'timestamp' | 'vestingTokenHarvested' | 'vestingTokenIn' | 'vestingTokenOut'>
  )> };

export type BeetsBarUsersQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BeetsBarSubgraph_User_orderBy>;
  orderDirection?: InputMaybe<BeetsBarSubgraph_OrderDirection>;
  where?: InputMaybe<BeetsBarSubgraph_User_filter>;
  block?: InputMaybe<BeetsBarSubgraph_Block_height>;
}>;


export type BeetsBarUsersQuery = { users: Array<(
    { __typename: 'BeetsBarSubgraph_User' }
    & Pick<BeetsBarSubgraph_User, 'id' | 'address' | 'block' | 'fBeets' | 'timestamp' | 'vestingTokenHarvested' | 'vestingTokenIn' | 'vestingTokenOut'>
  )> };

export type BeetsBarFragment = (
  { __typename: 'BeetsBarSubgraph_Bar' }
  & Pick<BeetsBarSubgraph_Bar, 'id' | 'address' | 'block' | 'decimals' | 'fBeetsBurned' | 'fBeetsMinted' | 'name' | 'ratio' | 'sharedVestingTokenRevenue' | 'symbol' | 'timestamp' | 'totalSupply' | 'vestingToken' | 'vestingTokenStaked'>
);

export type BeetsBarUserFragment = (
  { __typename: 'BeetsBarSubgraph_User' }
  & Pick<BeetsBarSubgraph_User, 'id' | 'address' | 'block' | 'fBeets' | 'timestamp' | 'vestingTokenHarvested' | 'vestingTokenIn' | 'vestingTokenOut'>
);

export type BeetsBarPortfolioDataQueryVariables = Exact<{
  barId: Scalars['ID'];
  userAddress: Scalars['ID'];
  previousBlockNumber: Scalars['Int'];
}>;


export type BeetsBarPortfolioDataQuery = { beetsBar?: Maybe<(
    { __typename: 'BeetsBarSubgraph_Bar' }
    & Pick<BeetsBarSubgraph_Bar, 'id' | 'address' | 'block' | 'decimals' | 'fBeetsBurned' | 'fBeetsMinted' | 'name' | 'ratio' | 'sharedVestingTokenRevenue' | 'symbol' | 'timestamp' | 'totalSupply' | 'vestingToken' | 'vestingTokenStaked'>
  )>, previousBeetsBar?: Maybe<(
    { __typename: 'BeetsBarSubgraph_Bar' }
    & Pick<BeetsBarSubgraph_Bar, 'id' | 'address' | 'block' | 'decimals' | 'fBeetsBurned' | 'fBeetsMinted' | 'name' | 'ratio' | 'sharedVestingTokenRevenue' | 'symbol' | 'timestamp' | 'totalSupply' | 'vestingToken' | 'vestingTokenStaked'>
  )>, beetsBarUser?: Maybe<(
    { __typename: 'BeetsBarSubgraph_User' }
    & Pick<BeetsBarSubgraph_User, 'id' | 'address' | 'block' | 'fBeets' | 'timestamp' | 'vestingTokenHarvested' | 'vestingTokenIn' | 'vestingTokenOut'>
  )>, previousBeetsBarUser?: Maybe<(
    { __typename: 'BeetsBarSubgraph_User' }
    & Pick<BeetsBarSubgraph_User, 'id' | 'address' | 'block' | 'fBeets' | 'timestamp' | 'vestingTokenHarvested' | 'vestingTokenIn' | 'vestingTokenOut'>
  )> };

export type BeetsBarDataQueryVariables = Exact<{
  barId: Scalars['ID'];
  previousBlockNumber: Scalars['Int'];
}>;


export type BeetsBarDataQuery = { beetsBar?: Maybe<(
    { __typename: 'BeetsBarSubgraph_Bar' }
    & Pick<BeetsBarSubgraph_Bar, 'id' | 'address' | 'block' | 'decimals' | 'fBeetsBurned' | 'fBeetsMinted' | 'name' | 'ratio' | 'sharedVestingTokenRevenue' | 'symbol' | 'timestamp' | 'totalSupply' | 'vestingToken' | 'vestingTokenStaked'>
  )>, previousBeetsBar?: Maybe<(
    { __typename: 'BeetsBarSubgraph_Bar' }
    & Pick<BeetsBarSubgraph_Bar, 'id' | 'address' | 'block' | 'decimals' | 'fBeetsBurned' | 'fBeetsMinted' | 'name' | 'ratio' | 'sharedVestingTokenRevenue' | 'symbol' | 'timestamp' | 'totalSupply' | 'vestingToken' | 'vestingTokenStaked'>
  )> };

export type BlocksQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BlocksSubgraph_Block_orderBy>;
  orderDirection?: InputMaybe<BlocksSubgraph_OrderDirection>;
  where?: InputMaybe<BlocksSubgraph_Block_filter>;
  block?: InputMaybe<BlocksSubgraph_Block_height>;
}>;


export type BlocksQuery = { blocks: Array<(
    { __typename: 'BlocksSubgraph_Block' }
    & Pick<BlocksSubgraph_Block, 'id' | 'number' | 'timestamp'>
  )> };

export type BlockFragment = (
  { __typename: 'BlocksSubgraph_Block' }
  & Pick<BlocksSubgraph_Block, 'id' | 'number' | 'timestamp'>
);

export type MasterchefUsersQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MasterchefSubgraph_User_orderBy>;
  orderDirection?: InputMaybe<MasterchefSubgraph_OrderDirection>;
  where?: InputMaybe<MasterchefSubgraph_User_filter>;
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
}>;


export type MasterchefUsersQuery = { farmUsers: Array<(
    { __typename: 'MasterchefSubgraph_User' }
    & Pick<MasterchefSubgraph_User, 'id' | 'address' | 'amount' | 'rewardDebt' | 'beetsHarvested' | 'timestamp'>
    & { pool?: Maybe<Pick<MasterchefSubgraph_Pool, 'id' | 'pair'>> }
  )> };

export type FarmUserFragment = (
  { __typename: 'MasterchefSubgraph_User' }
  & Pick<MasterchefSubgraph_User, 'id' | 'address' | 'amount' | 'rewardDebt' | 'beetsHarvested' | 'timestamp'>
  & { pool?: Maybe<Pick<MasterchefSubgraph_Pool, 'id' | 'pair'>> }
);

export type MasterchefsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MasterchefSubgraph_MasterChef_orderBy>;
  orderDirection?: InputMaybe<MasterchefSubgraph_OrderDirection>;
  where?: InputMaybe<MasterchefSubgraph_MasterChef_filter>;
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
}>;


export type MasterchefsQuery = { masterChefs: Array<Pick<MasterchefSubgraph_MasterChef, 'id' | 'beets' | 'beetsPerBlock' | 'totalAllocPoint' | 'poolCount' | 'timestamp' | 'block'>> };

export type MasterchefFarmsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MasterchefSubgraph_Pool_orderBy>;
  orderDirection?: InputMaybe<MasterchefSubgraph_OrderDirection>;
  where?: InputMaybe<MasterchefSubgraph_Pool_filter>;
  block?: InputMaybe<MasterchefSubgraph_Block_height>;
}>;


export type MasterchefFarmsQuery = { farms: Array<(
    { __typename: 'MasterchefSubgraph_Pool' }
    & Pick<MasterchefSubgraph_Pool, 'id' | 'pair' | 'allocPoint' | 'lastRewardBlock' | 'accBeetsPerShare' | 'slpBalance' | 'userCount' | 'timestamp' | 'block'>
    & { masterChef: Pick<MasterchefSubgraph_MasterChef, 'id' | 'totalAllocPoint' | 'beetsPerBlock'>, rewarder?: Maybe<(
      Pick<MasterchefSubgraph_Rewarder, 'id'>
      & { rewardTokens: Array<Pick<MasterchefSubgraph_RewardToken, 'token' | 'decimals' | 'symbol' | 'rewardPerSecond'>> }
    )> }
  )> };

export type FarmFragment = (
  { __typename: 'MasterchefSubgraph_Pool' }
  & Pick<MasterchefSubgraph_Pool, 'id' | 'pair' | 'allocPoint' | 'lastRewardBlock' | 'accBeetsPerShare' | 'slpBalance' | 'userCount' | 'timestamp' | 'block'>
  & { masterChef: Pick<MasterchefSubgraph_MasterChef, 'id' | 'totalAllocPoint' | 'beetsPerBlock'>, rewarder?: Maybe<(
    Pick<MasterchefSubgraph_Rewarder, 'id'>
    & { rewardTokens: Array<Pick<MasterchefSubgraph_RewardToken, 'token' | 'decimals' | 'symbol' | 'rewardPerSecond'>> }
  )> }
);

export type MasterchefPortfolioDataQueryVariables = Exact<{
  address: Bytes;
  previousBlockNumber: Scalars['Int'];
}>;


export type MasterchefPortfolioDataQuery = { farmUsers: Array<(
    { __typename: 'MasterchefSubgraph_User' }
    & Pick<MasterchefSubgraph_User, 'id' | 'address' | 'amount' | 'rewardDebt' | 'beetsHarvested' | 'timestamp'>
    & { pool?: Maybe<Pick<MasterchefSubgraph_Pool, 'id' | 'pair'>> }
  )>, previousFarmUsers: Array<(
    { __typename: 'MasterchefSubgraph_User' }
    & Pick<MasterchefSubgraph_User, 'id' | 'address' | 'amount' | 'rewardDebt' | 'beetsHarvested' | 'timestamp'>
    & { pool?: Maybe<Pick<MasterchefSubgraph_Pool, 'id' | 'pair'>> }
  )> };

export const BalancerUserFragmentDoc = gql`
    fragment BalancerUser on BalancerSubgraph_User {
  __typename
  id
  sharesOwned(first: 1000) {
    id
    balance
    poolId {
      id
    }
  }
}
    ` as unknown as DocumentNode<BalancerUserFragment, unknown>;
export const BalancerPoolShareFragmentDoc = gql`
    fragment BalancerPoolShare on BalancerSubgraph_PoolShare {
  __typename
  id
  balance
}
    ` as unknown as DocumentNode<BalancerPoolShareFragment, unknown>;
export const BalancerTokenPriceFragmentDoc = gql`
    fragment BalancerTokenPrice on BalancerSubgraph_TokenPrice {
  __typename
  id
  poolId {
    id
  }
  asset
  amount
  pricingAsset
  price
  block
  timestamp
  priceUSD
}
    ` as unknown as DocumentNode<BalancerTokenPriceFragment, unknown>;
export const BalancerPoolTokenFragmentDoc = gql`
    fragment BalancerPoolToken on BalancerSubgraph_PoolToken {
  __typename
  id
  symbol
  name
  decimals
  address
  balance
  invested
  weight
  priceRate
}
    ` as unknown as DocumentNode<BalancerPoolTokenFragment, unknown>;
export const BalancerPoolFragmentDoc = gql`
    fragment BalancerPool on BalancerSubgraph_Pool {
  __typename
  id
  address
  poolType
  symbol
  name
  swapFee
  totalWeight
  totalSwapVolume
  totalSwapFee
  totalLiquidity
  totalShares
  swapsCount
  holdersCount
  createTime
  swapEnabled
  tokensList
  lowerTarget
  upperTarget
  mainIndex
  wrappedIndex
  factory
  expiryTime
  unitSeconds
  principalToken
  baseToken
  owner
  amp
  tokens {
    ...BalancerPoolToken
  }
}
    ${BalancerPoolTokenFragmentDoc}` as unknown as DocumentNode<BalancerPoolFragment, unknown>;
export const BalancerPoolSnapshotFragmentDoc = gql`
    fragment BalancerPoolSnapshot on BalancerSubgraph_PoolSnapshot {
  __typename
  id
  pool {
    id
  }
  totalShares
  swapVolume
  swapFees
  timestamp
}
    ` as unknown as DocumentNode<BalancerPoolSnapshotFragment, unknown>;
export const BalancerLatestPriceFragmentDoc = gql`
    fragment BalancerLatestPrice on BalancerSubgraph_LatestPrice {
  __typename
  id
  asset
  price
  poolId {
    id
  }
  pricingAsset
  block
  priceUSD
}
    ` as unknown as DocumentNode<BalancerLatestPriceFragment, unknown>;
export const BalancerJoinExitFragmentDoc = gql`
    fragment BalancerJoinExit on BalancerSubgraph_JoinExit {
  __typename
  amounts
  id
  sender
  timestamp
  tx
  type
  user {
    id
  }
  pool {
    id
    tokensList
  }
  valueUSD
}
    ` as unknown as DocumentNode<BalancerJoinExitFragment, unknown>;
export const BalancerTradePairSnapshotFragmentDoc = gql`
    fragment BalancerTradePairSnapshot on BalancerSubgraph_TradePairSnapshot {
  __typename
  id
  totalSwapFee
  totalSwapVolume
  timestamp
  pair {
    token0 {
      address
      symbol
    }
    token1 {
      address
      symbol
    }
  }
}
    ` as unknown as DocumentNode<BalancerTradePairSnapshotFragment, unknown>;
export const BalancerSwapFragmentDoc = gql`
    fragment BalancerSwap on BalancerSubgraph_Swap {
  __typename
  id
  caller
  tokenIn
  tokenInSym
  tokenOut
  tokenOutSym
  tokenAmountIn
  tokenAmountOut
  poolId {
    id
  }
  userAddress {
    id
  }
  timestamp
  tx
  valueUSD
}
    ` as unknown as DocumentNode<BalancerSwapFragment, unknown>;
export const BeetsBarFragmentDoc = gql`
    fragment BeetsBar on BeetsBarSubgraph_Bar {
  __typename
  id
  address
  block
  decimals
  fBeetsBurned
  fBeetsMinted
  name
  ratio
  sharedVestingTokenRevenue
  symbol
  timestamp
  totalSupply
  vestingToken
  vestingTokenStaked
}
    ` as unknown as DocumentNode<BeetsBarFragment, unknown>;
export const BeetsBarUserFragmentDoc = gql`
    fragment BeetsBarUser on BeetsBarSubgraph_User {
  __typename
  id
  address
  block
  fBeets
  timestamp
  vestingTokenHarvested
  vestingTokenIn
  vestingTokenOut
}
    ` as unknown as DocumentNode<BeetsBarUserFragment, unknown>;
export const BlockFragmentDoc = gql`
    fragment Block on BlocksSubgraph_Block {
  __typename
  id
  number
  timestamp
}
    ` as unknown as DocumentNode<BlockFragment, unknown>;
export const FarmUserFragmentDoc = gql`
    fragment FarmUser on MasterchefSubgraph_User {
  __typename
  id
  address
  amount
  rewardDebt
  beetsHarvested
  timestamp
  pool {
    id
    pair
  }
}
    ` as unknown as DocumentNode<FarmUserFragment, unknown>;
export const FarmFragmentDoc = gql`
    fragment Farm on MasterchefSubgraph_Pool {
  __typename
  id
  pair
  allocPoint
  lastRewardBlock
  accBeetsPerShare
  slpBalance
  userCount
  timestamp
  block
  masterChef {
    id
    totalAllocPoint
    beetsPerBlock
  }
  rewarder {
    id
    rewardTokens {
      token
      decimals
      symbol
      rewardPerSecond
    }
  }
}
    ` as unknown as DocumentNode<FarmFragment, unknown>;
export const BalancerProtocolDataDocument = gql`
    query BalancerProtocolData($skip: Int, $first: Int, $orderBy: BalancerSubgraph_Balancer_orderBy, $orderDirection: BalancerSubgraph_OrderDirection, $where: BalancerSubgraph_Balancer_filter, $block: BalancerSubgraph_Block_height) {
  balancers: BalancerSubgraph_balancers(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    id
    totalLiquidity
    totalSwapVolume
    totalSwapFee
    poolCount
  }
}
    ` as unknown as DocumentNode<BalancerProtocolDataQuery, BalancerProtocolDataQueryVariables>;
export const BalancerUserDocument = gql`
    query BalancerUser($id: ID!, $block: BalancerSubgraph_Block_height) {
  user: BalancerSubgraph_user(id: $id, block: $block) {
    ...BalancerUser
  }
}
    ${BalancerUserFragmentDoc}` as unknown as DocumentNode<BalancerUserQuery, BalancerUserQueryVariables>;
export const BalancerUsersDocument = gql`
    query BalancerUsers($skip: Int, $first: Int, $orderBy: BalancerSubgraph_User_orderBy, $orderDirection: BalancerSubgraph_OrderDirection, $where: BalancerSubgraph_User_filter, $block: BalancerSubgraph_Block_height) {
  users: BalancerSubgraph_users(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    ...BalancerUser
  }
}
    ${BalancerUserFragmentDoc}` as unknown as DocumentNode<BalancerUsersQuery, BalancerUsersQueryVariables>;
export const BalancerPoolSharesDocument = gql`
    query BalancerPoolShares($skip: Int, $first: Int, $orderBy: BalancerSubgraph_PoolShare_orderBy, $orderDirection: BalancerSubgraph_OrderDirection, $where: BalancerSubgraph_PoolShare_filter, $block: BalancerSubgraph_Block_height) {
  poolShares: BalancerSubgraph_poolShares(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    ...BalancerPoolShare
  }
}
    ${BalancerPoolShareFragmentDoc}` as unknown as DocumentNode<BalancerPoolSharesQuery, BalancerPoolSharesQueryVariables>;
export const BalancerTokenPricesDocument = gql`
    query BalancerTokenPrices($skip: Int, $first: Int, $orderBy: BalancerSubgraph_TokenPrice_orderBy, $orderDirection: BalancerSubgraph_OrderDirection, $where: BalancerSubgraph_TokenPrice_filter, $block: BalancerSubgraph_Block_height) {
  tokenPrices: BalancerSubgraph_tokenPrices(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    ...BalancerTokenPrice
  }
}
    ${BalancerTokenPriceFragmentDoc}` as unknown as DocumentNode<BalancerTokenPricesQuery, BalancerTokenPricesQueryVariables>;
export const BalancerPoolsDocument = gql`
    query BalancerPools($skip: Int, $first: Int, $orderBy: BalancerSubgraph_Pool_orderBy, $orderDirection: BalancerSubgraph_OrderDirection, $where: BalancerSubgraph_Pool_filter, $block: BalancerSubgraph_Block_height) {
  pools: BalancerSubgraph_pools(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    ...BalancerPool
  }
}
    ${BalancerPoolFragmentDoc}` as unknown as DocumentNode<BalancerPoolsQuery, BalancerPoolsQueryVariables>;
export const BalancerPoolDocument = gql`
    query BalancerPool($id: ID!, $block: BalancerSubgraph_Block_height) {
  pool: BalancerSubgraph_pool(id: $id, block: $block) {
    ...BalancerPool
  }
}
    ${BalancerPoolFragmentDoc}` as unknown as DocumentNode<BalancerPoolQuery, BalancerPoolQueryVariables>;
export const BalancerPoolHistoricalLiquiditiesDocument = gql`
    query BalancerPoolHistoricalLiquidities($skip: Int, $first: Int, $orderBy: BalancerSubgraph_PoolHistoricalLiquidity_orderBy, $orderDirection: BalancerSubgraph_OrderDirection, $where: BalancerSubgraph_PoolHistoricalLiquidity_filter, $block: BalancerSubgraph_Block_height) {
  poolHistoricalLiquidities: BalancerSubgraph_poolHistoricalLiquidities(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    id
    poolId {
      id
    }
    poolTotalShares
    poolLiquidity
    poolShareValue
    pricingAsset
    block
  }
}
    ` as unknown as DocumentNode<BalancerPoolHistoricalLiquiditiesQuery, BalancerPoolHistoricalLiquiditiesQueryVariables>;
export const BalancerPoolSnapshotsDocument = gql`
    query BalancerPoolSnapshots($skip: Int, $first: Int, $orderBy: BalancerSubgraph_PoolSnapshot_orderBy, $orderDirection: BalancerSubgraph_OrderDirection, $where: BalancerSubgraph_PoolSnapshot_filter, $block: BalancerSubgraph_Block_height) {
  poolSnapshots: BalancerSubgraph_poolSnapshots(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    ...BalancerPoolSnapshot
  }
}
    ${BalancerPoolSnapshotFragmentDoc}` as unknown as DocumentNode<BalancerPoolSnapshotsQuery, BalancerPoolSnapshotsQueryVariables>;
export const BalancerLatestPricesDocument = gql`
    query BalancerLatestPrices($skip: Int, $first: Int, $orderBy: BalancerSubgraph_LatestPrice_orderBy, $orderDirection: BalancerSubgraph_OrderDirection, $where: BalancerSubgraph_LatestPrice_filter, $block: BalancerSubgraph_Block_height) {
  latestPrices: BalancerSubgraph_latestPrices(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    ...BalancerLatestPrice
  }
}
    ${BalancerLatestPriceFragmentDoc}` as unknown as DocumentNode<BalancerLatestPricesQuery, BalancerLatestPricesQueryVariables>;
export const BalancerLatestPriceDocument = gql`
    query BalancerLatestPrice($id: ID!) {
  latestPrice: BalancerSubgraph_latestPrice(id: $id) {
    ...BalancerLatestPrice
  }
}
    ${BalancerLatestPriceFragmentDoc}` as unknown as DocumentNode<BalancerLatestPriceQuery, BalancerLatestPriceQueryVariables>;
export const BalancerJoinExitsDocument = gql`
    query BalancerJoinExits($skip: Int, $first: Int, $orderBy: BalancerSubgraph_JoinExit_orderBy, $orderDirection: BalancerSubgraph_OrderDirection, $where: BalancerSubgraph_JoinExit_filter, $block: BalancerSubgraph_Block_height) {
  joinExits: BalancerSubgraph_joinExits(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    ...BalancerJoinExit
  }
}
    ${BalancerJoinExitFragmentDoc}` as unknown as DocumentNode<BalancerJoinExitsQuery, BalancerJoinExitsQueryVariables>;
export const BalancerPortfolioDataDocument = gql`
    query BalancerPortfolioData($id: ID!, $previousBlockNumber: Int!) {
  user: BalancerSubgraph_user(id: $id) {
    ...BalancerUser
  }
  previousUser: BalancerSubgraph_user(
    id: $id
    block: {number: $previousBlockNumber}
  ) {
    ...BalancerUser
  }
}
    ${BalancerUserFragmentDoc}` as unknown as DocumentNode<BalancerPortfolioDataQuery, BalancerPortfolioDataQueryVariables>;
export const BalancerPortfolioPoolsDataDocument = gql`
    query BalancerPortfolioPoolsData($previousBlockNumber: Int!) {
  pools: BalancerSubgraph_pools(first: 1000, where: {totalShares_gt: "0"}) {
    ...BalancerPool
  }
  previousPools: BalancerSubgraph_pools(
    first: 1000
    where: {totalShares_gt: "0"}
    block: {number: $previousBlockNumber}
  ) {
    ...BalancerPool
  }
}
    ${BalancerPoolFragmentDoc}` as unknown as DocumentNode<BalancerPortfolioPoolsDataQuery, BalancerPortfolioPoolsDataQueryVariables>;
export const BalancerTradePairSnapshotsDocument = gql`
    query BalancerTradePairSnapshots($skip: Int, $first: Int, $orderBy: BalancerSubgraph_TradePairSnapshot_orderBy, $orderDirection: BalancerSubgraph_OrderDirection, $where: BalancerSubgraph_TradePairSnapshot_filter, $block: BalancerSubgraph_Block_height) {
  tradePairSnapshots: BalancerSubgraph_tradePairSnapshots(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    ...BalancerTradePairSnapshot
  }
}
    ${BalancerTradePairSnapshotFragmentDoc}` as unknown as DocumentNode<BalancerTradePairSnapshotsQuery, BalancerTradePairSnapshotsQueryVariables>;
export const BalancerSwapsDocument = gql`
    query BalancerSwaps($skip: Int, $first: Int, $orderBy: BalancerSubgraph_Swap_orderBy, $orderDirection: BalancerSubgraph_OrderDirection, $where: BalancerSubgraph_Swap_filter, $block: BalancerSubgraph_Block_height) {
  swaps: BalancerSubgraph_swaps(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    ...BalancerSwap
  }
}
    ${BalancerSwapFragmentDoc}` as unknown as DocumentNode<BalancerSwapsQuery, BalancerSwapsQueryVariables>;
export const GetBeetsBarDocument = gql`
    query GetBeetsBar($id: ID!, $block: BeetsBarSubgraph_Block_height) {
  bar: BeetsBarSubgraph_bar(id: $id, block: $block) {
    ...BeetsBar
  }
}
    ${BeetsBarFragmentDoc}` as unknown as DocumentNode<GetBeetsBarQuery, GetBeetsBarQueryVariables>;
export const GetBeetsBarUserDocument = gql`
    query GetBeetsBarUser($id: ID!, $block: BeetsBarSubgraph_Block_height) {
  user: BeetsBarSubgraph_user(id: $id, block: $block) {
    ...BeetsBarUser
  }
}
    ${BeetsBarUserFragmentDoc}` as unknown as DocumentNode<GetBeetsBarUserQuery, GetBeetsBarUserQueryVariables>;
export const BeetsBarUsersDocument = gql`
    query BeetsBarUsers($skip: Int, $first: Int, $orderBy: BeetsBarSubgraph_User_orderBy, $orderDirection: BeetsBarSubgraph_OrderDirection, $where: BeetsBarSubgraph_User_filter, $block: BeetsBarSubgraph_Block_height) {
  users: BeetsBarSubgraph_users(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    ...BeetsBarUser
  }
}
    ${BeetsBarUserFragmentDoc}` as unknown as DocumentNode<BeetsBarUsersQuery, BeetsBarUsersQueryVariables>;
export const BeetsBarPortfolioDataDocument = gql`
    query BeetsBarPortfolioData($barId: ID!, $userAddress: ID!, $previousBlockNumber: Int!) {
  beetsBar: BeetsBarSubgraph_bar(id: $barId) {
    ...BeetsBar
  }
  previousBeetsBar: BeetsBarSubgraph_bar(
    id: $barId
    block: {number: $previousBlockNumber}
  ) {
    ...BeetsBar
  }
  beetsBarUser: BeetsBarSubgraph_user(id: $userAddress) {
    ...BeetsBarUser
  }
  previousBeetsBarUser: BeetsBarSubgraph_user(
    id: $userAddress
    block: {number: $previousBlockNumber}
  ) {
    ...BeetsBarUser
  }
}
    ${BeetsBarFragmentDoc}
${BeetsBarUserFragmentDoc}` as unknown as DocumentNode<BeetsBarPortfolioDataQuery, BeetsBarPortfolioDataQueryVariables>;
export const BeetsBarDataDocument = gql`
    query BeetsBarData($barId: ID!, $previousBlockNumber: Int!) {
  beetsBar: BeetsBarSubgraph_bar(id: $barId) {
    ...BeetsBar
  }
  previousBeetsBar: BeetsBarSubgraph_bar(
    id: $barId
    block: {number: $previousBlockNumber}
  ) {
    ...BeetsBar
  }
}
    ${BeetsBarFragmentDoc}` as unknown as DocumentNode<BeetsBarDataQuery, BeetsBarDataQueryVariables>;
export const BlocksDocument = gql`
    query Blocks($skip: Int, $first: Int, $orderBy: BlocksSubgraph_Block_orderBy, $orderDirection: BlocksSubgraph_OrderDirection, $where: BlocksSubgraph_Block_filter, $block: BlocksSubgraph_Block_height) {
  blocks: BlocksSubgraph_blocks(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    ...Block
  }
}
    ${BlockFragmentDoc}` as unknown as DocumentNode<BlocksQuery, BlocksQueryVariables>;
export const MasterchefUsersDocument = gql`
    query MasterchefUsers($skip: Int, $first: Int, $orderBy: MasterchefSubgraph_User_orderBy, $orderDirection: MasterchefSubgraph_OrderDirection, $where: MasterchefSubgraph_User_filter, $block: MasterchefSubgraph_Block_height) {
  farmUsers: MasterchefSubgraph_users(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    ...FarmUser
  }
}
    ${FarmUserFragmentDoc}` as unknown as DocumentNode<MasterchefUsersQuery, MasterchefUsersQueryVariables>;
export const MasterchefsDocument = gql`
    query Masterchefs($skip: Int, $first: Int, $orderBy: MasterchefSubgraph_MasterChef_orderBy, $orderDirection: MasterchefSubgraph_OrderDirection, $where: MasterchefSubgraph_MasterChef_filter, $block: MasterchefSubgraph_Block_height) {
  masterChefs: MasterchefSubgraph_masterChefs(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    id
    beets
    beetsPerBlock
    totalAllocPoint
    poolCount
    timestamp
    block
  }
}
    ` as unknown as DocumentNode<MasterchefsQuery, MasterchefsQueryVariables>;
export const MasterchefFarmsDocument = gql`
    query MasterchefFarms($skip: Int, $first: Int, $orderBy: MasterchefSubgraph_Pool_orderBy, $orderDirection: MasterchefSubgraph_OrderDirection, $where: MasterchefSubgraph_Pool_filter, $block: MasterchefSubgraph_Block_height) {
  farms: MasterchefSubgraph_pools(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    ...Farm
  }
}
    ${FarmFragmentDoc}` as unknown as DocumentNode<MasterchefFarmsQuery, MasterchefFarmsQueryVariables>;
export const MasterchefPortfolioDataDocument = gql`
    query MasterchefPortfolioData($address: Bytes!, $previousBlockNumber: Int!) {
  farmUsers: MasterchefSubgraph_users(first: 1000, where: {address: $address}) {
    ...FarmUser
  }
  previousFarmUsers: MasterchefSubgraph_users(
    first: 1000
    where: {address: $address}
    block: {number: $previousBlockNumber}
  ) {
    ...FarmUser
  }
}
    ${FarmUserFragmentDoc}` as unknown as DocumentNode<MasterchefPortfolioDataQuery, MasterchefPortfolioDataQueryVariables>;



























export type Requester<C= {}> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R>
export function getSdk<C>(requester: Requester<C>) {
  return {
    BalancerProtocolData(variables?: BalancerProtocolDataQueryVariables, options?: C): Promise<BalancerProtocolDataQuery> {
      return requester<BalancerProtocolDataQuery, BalancerProtocolDataQueryVariables>(BalancerProtocolDataDocument, variables, options);
    },
    BalancerUser(variables: BalancerUserQueryVariables, options?: C): Promise<BalancerUserQuery> {
      return requester<BalancerUserQuery, BalancerUserQueryVariables>(BalancerUserDocument, variables, options);
    },
    BalancerUsers(variables?: BalancerUsersQueryVariables, options?: C): Promise<BalancerUsersQuery> {
      return requester<BalancerUsersQuery, BalancerUsersQueryVariables>(BalancerUsersDocument, variables, options);
    },
    BalancerPoolShares(variables?: BalancerPoolSharesQueryVariables, options?: C): Promise<BalancerPoolSharesQuery> {
      return requester<BalancerPoolSharesQuery, BalancerPoolSharesQueryVariables>(BalancerPoolSharesDocument, variables, options);
    },
    BalancerTokenPrices(variables?: BalancerTokenPricesQueryVariables, options?: C): Promise<BalancerTokenPricesQuery> {
      return requester<BalancerTokenPricesQuery, BalancerTokenPricesQueryVariables>(BalancerTokenPricesDocument, variables, options);
    },
    BalancerPools(variables?: BalancerPoolsQueryVariables, options?: C): Promise<BalancerPoolsQuery> {
      return requester<BalancerPoolsQuery, BalancerPoolsQueryVariables>(BalancerPoolsDocument, variables, options);
    },
    BalancerPool(variables: BalancerPoolQueryVariables, options?: C): Promise<BalancerPoolQuery> {
      return requester<BalancerPoolQuery, BalancerPoolQueryVariables>(BalancerPoolDocument, variables, options);
    },
    BalancerPoolHistoricalLiquidities(variables?: BalancerPoolHistoricalLiquiditiesQueryVariables, options?: C): Promise<BalancerPoolHistoricalLiquiditiesQuery> {
      return requester<BalancerPoolHistoricalLiquiditiesQuery, BalancerPoolHistoricalLiquiditiesQueryVariables>(BalancerPoolHistoricalLiquiditiesDocument, variables, options);
    },
    BalancerPoolSnapshots(variables?: BalancerPoolSnapshotsQueryVariables, options?: C): Promise<BalancerPoolSnapshotsQuery> {
      return requester<BalancerPoolSnapshotsQuery, BalancerPoolSnapshotsQueryVariables>(BalancerPoolSnapshotsDocument, variables, options);
    },
    BalancerLatestPrices(variables?: BalancerLatestPricesQueryVariables, options?: C): Promise<BalancerLatestPricesQuery> {
      return requester<BalancerLatestPricesQuery, BalancerLatestPricesQueryVariables>(BalancerLatestPricesDocument, variables, options);
    },
    BalancerLatestPrice(variables: BalancerLatestPriceQueryVariables, options?: C): Promise<BalancerLatestPriceQuery> {
      return requester<BalancerLatestPriceQuery, BalancerLatestPriceQueryVariables>(BalancerLatestPriceDocument, variables, options);
    },
    BalancerJoinExits(variables?: BalancerJoinExitsQueryVariables, options?: C): Promise<BalancerJoinExitsQuery> {
      return requester<BalancerJoinExitsQuery, BalancerJoinExitsQueryVariables>(BalancerJoinExitsDocument, variables, options);
    },
    BalancerPortfolioData(variables: BalancerPortfolioDataQueryVariables, options?: C): Promise<BalancerPortfolioDataQuery> {
      return requester<BalancerPortfolioDataQuery, BalancerPortfolioDataQueryVariables>(BalancerPortfolioDataDocument, variables, options);
    },
    BalancerPortfolioPoolsData(variables: BalancerPortfolioPoolsDataQueryVariables, options?: C): Promise<BalancerPortfolioPoolsDataQuery> {
      return requester<BalancerPortfolioPoolsDataQuery, BalancerPortfolioPoolsDataQueryVariables>(BalancerPortfolioPoolsDataDocument, variables, options);
    },
    BalancerTradePairSnapshots(variables?: BalancerTradePairSnapshotsQueryVariables, options?: C): Promise<BalancerTradePairSnapshotsQuery> {
      return requester<BalancerTradePairSnapshotsQuery, BalancerTradePairSnapshotsQueryVariables>(BalancerTradePairSnapshotsDocument, variables, options);
    },
    BalancerSwaps(variables?: BalancerSwapsQueryVariables, options?: C): Promise<BalancerSwapsQuery> {
      return requester<BalancerSwapsQuery, BalancerSwapsQueryVariables>(BalancerSwapsDocument, variables, options);
    },
    GetBeetsBar(variables: GetBeetsBarQueryVariables, options?: C): Promise<GetBeetsBarQuery> {
      return requester<GetBeetsBarQuery, GetBeetsBarQueryVariables>(GetBeetsBarDocument, variables, options);
    },
    GetBeetsBarUser(variables: GetBeetsBarUserQueryVariables, options?: C): Promise<GetBeetsBarUserQuery> {
      return requester<GetBeetsBarUserQuery, GetBeetsBarUserQueryVariables>(GetBeetsBarUserDocument, variables, options);
    },
    BeetsBarUsers(variables?: BeetsBarUsersQueryVariables, options?: C): Promise<BeetsBarUsersQuery> {
      return requester<BeetsBarUsersQuery, BeetsBarUsersQueryVariables>(BeetsBarUsersDocument, variables, options);
    },
    BeetsBarPortfolioData(variables: BeetsBarPortfolioDataQueryVariables, options?: C): Promise<BeetsBarPortfolioDataQuery> {
      return requester<BeetsBarPortfolioDataQuery, BeetsBarPortfolioDataQueryVariables>(BeetsBarPortfolioDataDocument, variables, options);
    },
    BeetsBarData(variables: BeetsBarDataQueryVariables, options?: C): Promise<BeetsBarDataQuery> {
      return requester<BeetsBarDataQuery, BeetsBarDataQueryVariables>(BeetsBarDataDocument, variables, options);
    },
    Blocks(variables?: BlocksQueryVariables, options?: C): Promise<BlocksQuery> {
      return requester<BlocksQuery, BlocksQueryVariables>(BlocksDocument, variables, options);
    },
    MasterchefUsers(variables?: MasterchefUsersQueryVariables, options?: C): Promise<MasterchefUsersQuery> {
      return requester<MasterchefUsersQuery, MasterchefUsersQueryVariables>(MasterchefUsersDocument, variables, options);
    },
    Masterchefs(variables?: MasterchefsQueryVariables, options?: C): Promise<MasterchefsQuery> {
      return requester<MasterchefsQuery, MasterchefsQueryVariables>(MasterchefsDocument, variables, options);
    },
    MasterchefFarms(variables?: MasterchefFarmsQueryVariables, options?: C): Promise<MasterchefFarmsQuery> {
      return requester<MasterchefFarmsQuery, MasterchefFarmsQueryVariables>(MasterchefFarmsDocument, variables, options);
    },
    MasterchefPortfolioData(variables: MasterchefPortfolioDataQueryVariables, options?: C): Promise<MasterchefPortfolioDataQuery> {
      return requester<MasterchefPortfolioDataQuery, MasterchefPortfolioDataQueryVariables>(MasterchefPortfolioDataDocument, variables, options);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;