import { GqlClient } from "./gql/GqlClient";

export class SevenTVClient {
    public gql: GqlClient;

    constructor() {
        this.gql = new GqlClient();
    }
}
