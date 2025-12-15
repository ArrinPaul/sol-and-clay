
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
import { Mail, Phone, Instagram } from 'lucide-react';
import { Loader2 } from 'lucide-react';

const PinterestIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12.017 10.922c.399.02.793.04 1.18.06.443.022.886.046 1.32.07.45.024.885.05 1.3.08.383.027.757.057 1.112.09.115.01.22.023.314.036.02.003.03.007.032.008.018.002.03.007.035.01.118.008.225.02.315.033.01.002.016.003.02.005.152.02.29.044.414.07.003 0 .004.002.005.002.13.028.248.06.35.093.012.003.02.008.026.01.092.03.172.064.24.1.004.002.006.005.008.006.07.036.128.075.174.115.002.002.003.003.004.004.103.09.186.187.247.288.002.004.004.007.005.01.05.084.088.17.114.256.002.005.002.01.003.014.028.09.046.183.053.275.002.02.002.04.002.056.002.106-.008.21-.03.313.0 0 .002 0 .002-.002.017-.116.03-.23.04-.343.003-.02.004-.038.004-.055.01-.15.013-.3.013-.452 0-.25-.02-.5-.058-.737-.005-.022-.01-.044-.015-.065-.04-.18-.1-.358-.18-.528-.002-.005-.005-.01-.007-.014-.085-.175-.19-.342-.31-.5-.002-.003-.005-.005-.007-.008-.13-.17-.28-.328-.45-.47-.004-.003-.008-.007-.012-.01-.17-.14-.36-.26-.56-.36-.003-.002-.005-.003-.008-.005-.2-.1-.41-.18-.63-.24-.003-.002-.007-.002-.01-.003-.22-.06-.45-.1-.68-.13-.03-.004-.06-.007-.08-.01-.46-.06-.92-.1-1.38-.11-.03-.002-.07-.002-.1-.002-.48-.01-.96-.01-1.44-.01-.2 0-.4 0-.6.003l-2.1.08-3.92 1.07-5.4 2.5-1.5 1.44-2.1 3.63-1.6 5.8.3 1.28.9 2.45 1.7 3.5.25.32.5.63.8.96.02.02.04.04.06.06.25.3.5.6.8.9.1.1.2.2.3.3.18.2.37.38.55.56.28.28.55.55.8.8.18.17.34.34.5.5.03.03.05.06.07.08.3.32.6.63.85.95.12.15.22.3.3.44.02.02.03.05.05.07.2.3.4.6.55.9.1.18.2.36.3.54.02.04.04.08.06.12.12.28.23.56.33.84.02.05.04.1.06.15.08.25.15.5.2.75.02.07.03.14.04.2.03.18.06.36.08.54.02.14.02.28.02.42 0 .15-.01.3-.02.44-.1.82-.4 1.63-.8 2.37-.05.1-.1.2-.16.3-.4.7-.9 1.35-1.5 1.9-.12.1-.24.2-.36.3-.6.5-1.2.9-1.9.9-1.1 0-2.1-.8-2.5-1.9-.1-.2-.1-.4-.2-.6 0-.02-.02-.04-.03-.06-.1-.3-.2-.6-.2-.9 0-.2.02-.4.04-.6.02-.1.05-.2.08-.3.3-.8.2-1.7-.2-2.5-.2.4-.4.8-.6 1.2-.1.2-.2.4-.3.5-.2.4-.3.8-.5 1.2-.1.2-.2.4-.3-.6-.1-.2-.3-.4-.4-.6-.1-.2-.2-.3-.3-.5-.1-.1-.2-.3-.3-.4-.1-.1-.2-.2-.2-.3-.2-.3-.4-.6-.6-.9-.1-.1-.2-.2-.3-.3-1-1.2-1.5-2.8-1.4-4.3 0-.1 0-.2-.02-.3-.12-1.1.2-2.2.8-3.2.1-.14.2-.28.3-.4.6-1 1.4-1.8 2.4-2.4.08-.05.16-.1.24-.15.9-.5 1.8-.8 2.8-.9.1 0 .2 0 .3-.02.3-.02.6-.04.9-.05zm-1.07-2.06c.01.002.02.003.03.005.01 0 .02.002.03.003.01 0 .02.002.03.003.01 0 .02 0 .03-.002l.03-.002.03-.003.03-.003.02-.003c.01 0 .02-.002.03-.003l.03-.002.03-.003.02-.002.02-.002.02-.002.02-.002h.02c.8-.02 1.6-.02 2.4 0 .07 0 .14 0 .2.002.02 0 .03.002.05.002.2.005.4.01.6.02.1.002.18.005.28.008.2.01.4.02.6.04.1.01.2.02.3.03l.28.03c.2.02.4.04.6.06.1.01.2.02.3.03l.26.03c.2.02.4.05.58.08.1.01.18.03.27.04.18.03.35.05.52.08.08.01.17.03.25.04.17.03.33.06.5.1.08.02.16.03.24.05.16.03.32.07.47.1.07.02.15.03.22.05.14.03.28.07.42.1.07.02.14.03.2.05.13.03.26.07.38.1.06.02.12.03.18.05.12.03.23.07.35.1.06.01.1.03.16.04.1.03.2.06.3.08.05.01.1.03.14.04.1.03.18.06.27.09.04.01.08.03.12.04.08.03.16.05.24.08.04.01.08.03.1.04.08.03.15.06.22.08.03.01.07.02.1.03.07.02.14.05.2.07.03.01.06.02.08.03.06.02.12.04.18.06.03.01.05.02.08.03.06.02.1.04.16.06.02.01.05.02.07.03.05.02.08.03.12.05.02.01.03.02.05.03.08.03.15.06.22.09l.1.04c.06.03.1.05.16.08.02.01.03.02.05.03l.08.04c.04.02.08.04.1.06l.06.04c.03.02.05.03.07.05l.04.03c.01.01.02.02.02.02.08.06.15.12.22.18.01.01.01.01.02.02a6.4 6.4 0 0 1 1.7 5.5c-.3 2.4-1.6 4.3-3.6 5.6-1.5 1-3.2 1.3-5 1-1-.2-1.9-.6-2.7-1.3-.8-.7-1.3-1.6-1.6-2.6-.3-1.1-.3-2.3 0-3.4.2-.8.5-1.5.9-2.2.4-.7.8-1.4 1.2-2.1.3-.5.6-1 1-1.5.2-.2.3-.5.5-.7.4-.5.8-1 1.2-1.5.1-.1.2-.2.3-.3.4-.5.8-.9 1.1-1.4.1-.1.2-.3.3-.4.3-.4.6-.8.8-1.2.1-.2.2-.3.3-.5.2-.4.4-.7.5-1.1.1-.2.2-.4.2-.6.1-.2.2-.4.3-.7.1-.2.1-.4.2-.6.1-.2.1-.4.1-.6 0-.5-.1-.9-.4-1.3-.3-.4-.7-.7-1.2-.8-.4-.1-.8 0-1.2.2-.4.2-.8.5-1 .8-.2.3-.4.6-.5.9-.1.3-.2.6-.2.9 0 .2.02.4.04.6.02.1.05.2.08.3.3.8.2 1.7-.2 2.5-.2.4-.4.8-.6 1.2-.1.2-.2.4-.3.5-.2.4-.3.8-.5 1.2-.1.2-.2.4-.3-.6-.1-.2-.3-.4-.4-.6-.1-.2-.2-.3-.3-.5-.1-.1-.2-.3-.3-.4-.1-.1-.2-.2-.2-.3-.2-.3-.4-.6-.6-.9-.1-.1-.2-.2-.3-.3-1-1.2-1.5-2.8-1.4-4.3z" />
  </svg>
);

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z
    .string()
    .min(10, { message: 'Your message must be at least 10 characters.' }),
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
    // In a real app, you'd handle file upload to Firebase Storage here
    // and then save the message to Firestore.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(values);

    toast({
      title: 'Message Sent!',
      description: "Thank you for reaching out. We'll get back to you shortly.",
      variant: 'default',
    });
    form.reset();
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-accent/10 to-background py-20 md:py-28">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center">
              <span className="inline-block mb-4 rounded-full bg-primary/10 px-6 py-2 backdrop-blur-sm text-sm font-semibold tracking-wide text-primary">
                Contact Us
              </span>
              <h1 className="font-headline text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
                Get in Touch
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
                We'd love to hear from you — whether you're looking to collaborate,
                customize, or just say hello.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">

          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <FadeIn direction="left">
              <div className="space-y-10">
                <div>
                  <h2 className="font-headline text-3xl md:text-4xl font-bold mb-8">Contact Info</h2>
                  <div className="space-y-8">
                    <div className="flex items-start gap-5 p-6 rounded-xl border-2 border-border/50 bg-card/30 hover:border-primary/50 hover:bg-card/50 transition-all duration-300">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-lg mb-1">Email</h3>
                        <a href="mailto:hello@solandclay.com" className="text-muted-foreground hover:text-primary transition-colors">
                          hello@solandclay.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-5 p-6 rounded-xl border-2 border-border/50 bg-card/30 hover:border-primary/50 hover:bg-card/50 transition-all duration-300">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-lg mb-1">Phone</h3>
                        <span className="text-muted-foreground">+91-XXXX-XXX-XXX</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-5 p-6 rounded-xl border-2 border-border/50 bg-card/30 hover:border-primary/50 hover:bg-card/50 transition-all duration-300">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                        <Instagram className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-lg mb-1">Instagram</h3>
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                          @solandclay
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-5 p-6 rounded-xl border-2 border-border/50 bg-card/30 hover:border-primary/50 hover:bg-card/50 transition-all duration-300">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                        <PinterestIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-lg mb-1">Pinterest</h3>
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                          @solandclay
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn direction="right" delay="delay-200">
              <Card className="border-2 border-border/50 bg-card/50 backdrop-blur-sm shadow-xl">
                <CardContent className="p-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
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
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            {...field}
                          />
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
                    render={({ field: { onChange } }) => (
                      <FormItem>
                        <FormLabel>Attach Image (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/png, image/jpeg, image/webp"
                            onChange={(e) => {
                              onChange(e.target.files?.[0]);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
        </div>
      </section>
    </div>
  );
}
