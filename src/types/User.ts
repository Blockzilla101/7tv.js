export interface ApiUser {
    id: string;
    billing: unknown;
    connections: unknown[];
    editorFor: unknown[];
    editors: unknown[];
    emoteSets: unknown[];
    events: unknown;
    highestRoleColor: string;
    highestRoleRank: unknown;
    inventory: unknown;
    mainConnection: unknown;
    ownedEmoteSets: unknown[];
    ownedEmotes: unknown[];
    permissions: unknown;
    personalEmoteSet: unknown;
    rawEntitlements: unknown;
    relatedEvents: unknown;
    roleIds: unknown;
    roles: unknown;
    specialEmoteSets: unknown;
    style: unknown;
}

export enum UserPlatform {
    Twitch = "TWITCH",
    YouTube = "YOUTUBE",
    Kick = "KICK",
    Discord = "DISCORD",
}