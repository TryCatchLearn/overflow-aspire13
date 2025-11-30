'use client';

import { signIn } from "next-auth/react";
import {Button} from "@heroui/button";

export default function LoginButton() {
    return (
        <Button
            color='secondary'
            variant='bordered'
            onPress={() => signIn('keycloak', 
                {redirectTo: '/questions'}, {prompt: 'login'})}
        >
            Login
        </Button>
    )
}