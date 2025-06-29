import axios from "axios";
import { ApiUser, UserPlatform } from "../types";

const base = "https://7tv.io/v4/gql";

interface GqlError {
    message: string;
    locations: { line: number, column: number }[];
}

interface GqlErrorResult {
    data: null,
    errors: GqlError[]
}

interface GqlResult<T> {
    data: T;
    extensions?: Record<string, unknown>;
}

class GqlError extends Error {
    public readonly result: GqlErrorResult;

    constructor(result: GqlErrorResult) {
        if (result.errors.length === 1) {
            super(`GraphQL Error: ${result.errors[0].message}`);
        } else {
            super(`GraphQL Error: Multiple errors occurred`);
        }

        this.result = result;
    }
}

export class GqlClient {
    public async userByConnection(id: string, platform: UserPlatform): Promise<ApiUser> {
        const result = await this.raw<{
            users: {
                userByConnection: ApiUser
            }
        }>(`
            query UserByConnection($platform: String!, $platformId: String!) {
                users {
                    userByConnection(platform: $platform, platformId: $platformId) {
                        id
                    }
                }
            }
        `, {
            platform,
            platformId: id,
        });

        return result.data.users.userByConnection;
    }

    public async raw<T extends unknown>(query: string, variables?: Record<string, unknown>): Promise<GqlResult<T>> {
        const res = await axios.post(base, {
            query,
            variables,
        }, {
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "7tv.js",
            },
        });

        const result = res.data as GqlResult<T> | GqlErrorResult;
        if ("errors" in result) {
            throw new GqlError(result);
        }

        return result;
    }
}