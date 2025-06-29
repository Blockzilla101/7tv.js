import { GqlClient } from "./gql/GqlClient.js";

export class SevenTVClient {
    public gql: GqlClient;

    constructor() {
        this.gql = new GqlClient();
    }
}
