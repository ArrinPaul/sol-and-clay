
'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { FadeIn } from '@/components/utils/fade-in';
import { Logo } from '@/components/logo';
import { Loader2 } from 'lucide-react';


const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(values);
    
    toast({
        title: 'Password Reset Email Sent',
        description: `If an account exists for ${values.email}, you will receive password reset instructions.`,
        variant: 'default',
    });
    form.reset();
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center py-12">
      <FadeIn>
        <div className="mx-auto grid w-[380px] gap-6">
            <div className="grid gap-2 text-center">
                <div className="flex justify-center mb-4">
                    <Logo />
                </div>
                <h1 className="text-3xl font-bold font-headline">Forgot Your Password?</h1>
                <p className="text-balance text-muted-foreground">
                    No problem. Enter your email and we&apos;ll send you a link to reset it.
                </p>
            </div>
            <Card>
                <CardContent className="p-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="you@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <div className="mt-4 text-center text-sm">
                Remembered your password?{' '}
                <Link href="/login" className="underline">
                    Login
                </Link>
            </div>
        </div>
      </FadeIn>
    </div>
  );
}
