export type Configuration = {
  RPC_URL: string;

  DEFAULT_SLIPPAGE_SWAP: number;
  PANCAKE_ROUTER_ADDRESS: string;
  BACKEND_WALLET_PRIVATE_KEY: string;
  BACKEND_WALLET_ADDRESS: string;

  TELEGRAM_API_KEY: string;
  START_TELEGRAM_BOT: boolean;
  TELEGRAM_GROUP_ID: string;
  TELEGRAM_ERROR_GROUP_ID: string;
};

const get = (
  name: string,
  opts: { required?: boolean; default?: string },
): string => {
  const value = process.env[name];
  if (!opts.required) return value || opts.default;
  if (!value) throw new Error(`${name} is required`);
  return value;
};

export const configuration = (): Configuration => {
  return {
    RPC_URL: get('RPC_URL', {
      required: true,
    }),

    DEFAULT_SLIPPAGE_SWAP: +get('DEFAULT_SLIPPAGE_SWAP', { required: true }),
    PANCAKE_ROUTER_ADDRESS: get('PANCAKE_ROUTER_ADDRESS', { required: true }),
    BACKEND_WALLET_PRIVATE_KEY: get('BACKEND_WALLET_PRIVATE_KEY', {
      required: true,
    }),
    BACKEND_WALLET_ADDRESS: get('BACKEND_WALLET_ADDRESS', { required: true }),

    TELEGRAM_API_KEY: get('TELEGRAM_API_KEY', { required: true }),
    START_TELEGRAM_BOT: !!get('START_TELEGRAM_BOT', { required: true }),
    TELEGRAM_GROUP_ID: get('TELEGRAM_GROUP_ID', { required: true }),
    TELEGRAM_ERROR_GROUP_ID: get('TELEGRAM_ERROR_GROUP_ID', { required: true }),
  };
};
