import { Asset, Blockchain } from '@dfx.swiss/react';

export const AvailableTokens: { [c in Blockchain]?: string[] } = {
  [Blockchain.ETHEREUM]: ['ZCHF', 'ETH', 'WBTC', 'USDT', 'FPS', 'WFPS'],
  [Blockchain.POLYGON]: ['ZCHF', 'MATIC', 'WBTC', 'USDT', 'WFPS'],
  [Blockchain.OPTIMISM]: ['ZCHF', 'ETH', 'WBTC', 'USDT', 'WFPS'],
  [Blockchain.ARBITRUM]: ['ZCHF', 'ETH', 'WBTC', 'USDT', 'WFPS'],
  [Blockchain.BINANCE_SMART_CHAIN]: ['ZCHF', 'BNB', 'BTCB', 'USDT', 'WFPS'],
  [Blockchain.BASE]: ['ZCHF', 'ETH', 'WFPS'],
};
export const AvailableChains = Object.keys(AvailableTokens) as Blockchain[];

export function isTokenAvailable(asset: Asset): boolean {
  return AvailableTokens[asset.blockchain]?.includes(asset.name) ?? false;
}

export function getTokenIndex(asset: Asset): number {
  return AvailableTokens[asset.blockchain]?.indexOf(asset.name) ?? 0;
}
