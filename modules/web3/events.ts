import { Event } from '@ethersproject/contracts';
import { Interface } from '@ethersproject/abi';
import { chunk } from 'lodash';

export const getEvents = async (
    fromBlock: number,
    toBlock: number,
    addresses: string[],
    topics: string[],
    rpcUrl: string,
    rpcMaxBlockRange: number,
    abi?: any,
): Promise<Event[]> => {
    let iEvents: Interface;
    if (abi && abi.length > 0) {
        iEvents = new Interface(abi);
        // check if topics are event names
        const alreadyEncoded = topics.every((topic) => topic.startsWith('0x'));
        if (!alreadyEncoded) topics = topics.map((topic) => iEvents.getEventTopic(topic));
    }
    const range = toBlock - fromBlock;

    return Promise.all(
        // Getting logs in batches of max blocks allowed by RPC
        Array.from({ length: Math.ceil(range / rpcMaxBlockRange) }, (_, i) => i).map(async (i) => {
            const from = fromBlock + (i > 0 ? 1 : 0) + i * rpcMaxBlockRange;
            const to = Math.min(fromBlock + (i + 1) * rpcMaxBlockRange, toBlock);

            // Usually RPCs are handling any number of addresses, but it here batching just to be on the safe side
            const logRequests: Promise<Event[]>[] = chunk(addresses, 500).map(async (addresses) => {
                // Fetch logs with a raw json request until we support Viem or Ethers6
                const payload = {
                    jsonrpc: '2.0',
                    id: 1,
                    method: 'eth_getLogs',
                    params: [
                        {
                            address: addresses,
                            topics: topics.length === 1 ? topics : [topics],
                            fromBlock: '0x' + BigInt(from).toString(16),
                            toBlock: '0x' + BigInt(to).toString(16),
                        },
                    ],
                };

                return fetch(rpcUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                })
                    .then(
                        (response) =>
                            response.json() as Promise<
                                { result: Event[] } | { error: { code: string; message: string } }
                            >,
                    )
                    .then((response) => {
                        if ('error' in response) {
                            return Promise.reject(response.error.message);
                        }

                        return response.result;
                    })
                    .catch((e: any) => {
                        // Ankr RPC returns error if block range is too wide
                        if (e.includes('block range is too wide')) {
                            return getEvents(from, to, addresses, topics, rpcUrl, rpcMaxBlockRange / 2);
                        }

                        // Infura returns 'more than 10000 results' error if block range is too wide
                        if (e.includes('query returned more than 10000 results')) {
                            const range = e
                                .match(/\[([0-9a-fA-F, x]+)\]/)
                                .pop()
                                .split(', ')
                                .map((hex: string) => parseInt(hex, 16));

                            return getEvents(from, to, addresses, topics, rpcUrl, range[1] - range[0]);
                        }

                        console.error('Error fetching logs:', e);
                        return Promise.reject(e);
                    });

                // Fetching logs with Viem
                // viemClient.getLogs({
                //     address: addresses,
                //     event: parseAbiItem('event Transfer(address indexed, address indexed, uint256)'),
                //     fromBlock: BigInt(from),
                //     toBlock: BigInt(to),
                // })
            });

            const events = await Promise.all(logRequests).then((res) => res.flat());

            return events;
        }),
    )
        .then((res) => res.flat().filter((log) => log))
        .then((logs) =>
            logs.map((log) => {
                // Decode event args
                const event = iEvents ? iEvents.parseLog(log) : undefined;
                const args: any = {};
                if (event) {
                    const argNames = iEvents.events[event.signature].inputs.map((input) => input.name);
                    for (let i = 0; i < argNames.length; i++) {
                        args[argNames[i]] = event.args[i];
                    }
                }

                return {
                    ...log,
                    args,
                };
            }),
        );
};
