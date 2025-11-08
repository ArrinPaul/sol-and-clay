
'use client';

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
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { FadeIn } from '@/components/utils/fade-in';
import { Mail, Phone, Instagram, Twitch } from 'lucide-react';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Your message must be at least 10 characters.' }),
  image: z.any().optional(),
});


export default function ContactPage() {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Simulate form submission (e.g., upload image to Firebase Storage)
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(values);
    
    toast({
        title: 'Message Sent!',
        description: "Thank you for reaching out. We'll get back to you shortly.",
        variant: 'default',
    });
    form.reset();
  }

  return (
    <div className="container mx-auto px-4 py-12">
        <FadeIn>
            <h1 className="text-center font-headline text-5xl font-bold tracking-tight text-foreground md:text-6xl">
                Get in Touch
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
                We’d love to hear from you — whether you’re looking to collaborate, customize, or just say hello.
            </p>
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
            <FadeIn direction="left">
                <h2 className="font-headline text-3xl font-bold">Contact Info</h2>
                <div className="mt-6 space-y-6 text-muted-foreground">
                    <div className="flex items-start gap-4">
                        <Mail className="h-6 w-6 mt-1 text-primary"/>
                        <div>
                            <h3 className="font-semibold text-foreground">Email</h3>
                            <a href="mailto:hello@solandclay.com" className="hover:underline">hello@solandclay.com</a>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <Phone className="h-6 w-6 mt-1 text-primary"/>
                        <div>
                            <h3 className="font-semibold text-foreground">Phone</h3>
                            <span>+91-XXXX-XXX-XXX</span>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <Instagram className="h-6 w-6 mt-1 text-primary"/>
                        <div>
                            <h3 className="font-semibold text-foreground">Instagram</h3>
                            <a href="#" className="hover:underline">@solandclay</a>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <Twitch className="h-6 w-6 mt-1 text-primary"/>
                        <div>
                            <h3 className="font-semibold text-foreground">Pinterest</h3>
                            <a href="#" className="hover:underline">@solandclay</a>
                        </div>
                    </div>
                </div>
            </FadeIn>
            <FadeIn direction="right" delay="delay-200">
                <Card>
                    <CardContent className="p-6">
                        <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your Name" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
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
                            <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                    <Textarea
                                    placeholder="Your message for collaboration or customization..."
                                    className="min-h-[120px]"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                             <FormField
                              control={form.control}
                              name="image"
                              render={({ field: { onChange, value, ...rest } }) => (
                                <FormItem>
                                  <FormLabel>Attach Image (Optional)</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="file"
                                      accept="image/png, image/jpeg, image/webp"
                                      onChange={(e) => {
                                        onChange(e.target.files);
                                      }}
                                      {...rest}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </Button>
                        </form>
                        </Form>
                    </CardContent>
                </Card>
            </FadeIn>
        </div>
    </div>
  );
}
