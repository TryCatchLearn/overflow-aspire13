// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { type DefaultSession } from "next-auth"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {JWT} from 'next-auth/jwt';

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            displayName: string
            reputation: number
        } & DefaultUser
        accessToken: string
    }

    interface User {
        username: string;
        displayName: string;
        reputation: number;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        accessToken: string
        refreshToken: string
        accessTokenExpires: number // Unix timestamp in seconds
        error?: string
        user: {
            id: string;
            displayName: string;
            reputation: number;
        }
    }
}