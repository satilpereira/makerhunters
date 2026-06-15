'use client';
import { signIn } from 'next-auth/react';
import { GoogleIcon } from '@/components/svg/google';
import { GithubIcon } from '@/components/svg/github';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default function SignInPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-8 px-4">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <p className="text-sm text-muted-foreground">Choose a provider to continue.</p>
      </div>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-full"
          onClick={() => signIn('google', { callbackUrl: '/' })}
        >
          <GoogleIcon size={18} /> <span>Continue with Google</span>
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-full"
          onClick={() => signIn('github', { callbackUrl: '/' })}
        >
          <GithubIcon size={18} /> <span>Continue with GitHub</span>
        </Button>
      </div>
      <Link href="/" className="text-xs underline text-muted-foreground hover:text-foreground">
        Back home
      </Link>
    </div>
  );
}
