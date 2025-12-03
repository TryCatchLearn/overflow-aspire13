'use client'

import {forwardRef} from 'react';
import Link, {LinkProps} from 'next/link';

export const LinkComponent = forwardRef<HTMLAnchorElement, LinkProps>(function LinkComponent(props, ref) {
    return <Link suppressHydrationWarning ref={ref} {...props} />;
});