import { ethers, Wallet } from 'ethers';
import { env } from '../../app/env';

const EXPECTED_PONG_BACK = 15000;
const KEEP_ALIVE_CHECK_INTERVAL = 7500;

export function initEthersWebsocketListeners<EthersSdk>(
    sdkFactory: (wallet: Wallet) => EthersSdk,
    listeners: Array<(sdk: EthersSdk) => void>,
) {
    console.log('start connection');
    const provider = new ethers.providers.WebSocketProvider(env.RPC_WS_URL);

    let pingTimeout: NodeJS.Timeout | null = null;
    let keepAliveInterval: NodeJS.Timer | null = null;

    provider._websocket.on('open', () => {
        keepAliveInterval = setInterval(() => {
            console.debug('Checking if the connection is alive, sending a ping');

            provider._websocket.ping();

            // Use `WebSocket#terminate()`, which immediately destroys the connection,
            // instead of `WebSocket#close()`, which waits for the close timer.
            // Delay should be equal to the interval at which your server
            // sends out pings plus a conservative assumption of the latency.
            pingTimeout = setTimeout(() => {
                console.log('terminating');
                provider._websocket.terminate();
            }, EXPECTED_PONG_BACK);
        }, KEEP_ALIVE_CHECK_INTERVAL);

        // TODO: handle contract listeners setup + indexing
        const defaultSigner = ethers.Wallet.createRandom().connect(provider);
        const sdk: EthersSdk = sdkFactory(defaultSigner);
        listeners.forEach((listener) => listener(sdk));
    });

    provider._websocket.on('close', () => {
        console.error('The websocket connection was closed');
        clearInterval(keepAliveInterval!);
        clearTimeout(pingTimeout!);
        initEthersWebsocketListeners(sdkFactory, listeners);
    });

    provider._websocket.on('pong', () => {
        console.debug('Received pong, so connection is alive, clearing the timeout');
        clearInterval(pingTimeout!);
    });
}
