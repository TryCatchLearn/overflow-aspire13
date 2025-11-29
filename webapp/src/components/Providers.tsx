'use client';

import {HeroUIProvider, ToastProvider} from "@heroui/react";
import {ReactNode, useEffect} from "react";
import {useRouter} from "next/navigation";
import {ThemeProvider} from "next-themes";
import {useTagStore} from "@/lib/hooks/useTagStore";
import {getTags} from "@/lib/actions/tag-actions";
import {handleError} from "@/lib/util";

export default function Providers({children}: {children: ReactNode}) {
    const router = useRouter();
    const setTags = useTagStore((state) => state.setTags);

    useEffect(() => {
        const loadTags = async () => {
            const {data: tags, error} = await getTags();
            if (error) handleError(error);
            if (tags) setTags(tags);
        };

        void loadTags();
    }, [setTags]);
    
    return (
        <HeroUIProvider navigate={router.push} className='h-full flex flex-col'>
            <ToastProvider />
            <ThemeProvider
                attribute='class'
                defaultTheme='light'
                disableTransitionOnChange={true}
                enableSystem={false}
                storageKey='theme'
            >
                {children}
            </ThemeProvider>
        </HeroUIProvider>
    );
}