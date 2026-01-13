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
import { FadeIn } from '@/components/utils/fade-in';
import { Mail, Phone, Instagram, MapPin, ArrowRight } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-gradient-to-br from-brand-beige via-white to-accent-beige">
        <div className="container-luxury">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-brand-brown font-medium tracking-widest uppercase text-sm mb-6 md:mb-8 letter-spacing-2">
                Get In Touch
              </p>
              <h1 className="font-headline text-6xl md:text-7xl lg:text-7xl font-bold text-dark-brown mb-8 leading-tight">
                Let&apos;s Start a Conversation
              </h1>
              <p className="text-lg md:text-xl text-brand-brown max-w-2xl mx-auto leading-relaxed mb-2">
                We&apos;d love to hear from you. Whether it&apos;s about collaborations, custom orders, or simply to say hello.
              </p>
              <div className="h-1 w-24 bg-brand-brown mx-auto mt-8"></div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <FadeIn>
              <div className="space-y-8">
                <div>
                  <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-dark-brown mb-8">
                    Contact Information
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-5 p-6 bg-brand-beige border border-brand-brown/20 hover:shadow-luxury transition-all duration-300 group">
                      <div className="w-14 h-14 flex items-center justify-center bg-brand-brown text-brand-beige flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-black text-lg mb-1">Email</h3>
                        <a href="mailto:hello@solandclay.com" className="text-brand-brown hover:text-dark-brown transition-colors">
                          hello@solandclay.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-5 p-6 bg-brand-beige border border-brand-brown/20 hover:shadow-luxury transition-all duration-300 group">
                      <div className="w-14 h-14 flex items-center justify-center bg-brand-brown text-brand-beige flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-black text-lg mb-1">Phone</h3>
                        <span className="text-brand-brown">+91 98765 43210</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-5 p-6 bg-brand-beige border border-brand-brown/20 hover:shadow-luxury transition-all duration-300 group">
                      <div className="w-14 h-14 flex items-center justify-center bg-brand-brown text-brand-beige flex-shrink-0 group-hover:scale-110 transition-transform">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-black text-lg mb-1">Studio Location</h3>
                        <span className="text-brand-brown">Koramangala, Bangalore, India</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-5 p-6 bg-brand-beige border border-brand-brown/20 hover:shadow-luxury transition-all duration-300 group">
                      <div className="w-14 h-14 flex items-center justify-center bg-brand-brown text-brand-beige flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Instagram className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-black text-lg mb-1">Follow Us</h3>
                        <a href="#" className="text-brand-brown hover:text-dark-brown transition-colors">
                          @solandclay
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Contact Form */}
            <FadeIn delay="delay-200">
              <div className="bg-brand-beige p-10 border border-brand-brown/20">
                <h2 className="font-headline text-3xl font-bold text-dark-brown mb-8">
                  Send a Message
                </h2>
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
                          <FormLabel className="text-black font-medium">Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your Name"
                              className="bg-white border-brand-brown/30 focus:border-brand-brown"
                              {...field}
                            />
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
                          <FormLabel className="text-black font-medium">Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="you@example.com"
                              className="bg-white border-brand-brown/30 focus:border-brand-brown"
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
                          <FormLabel className="text-black font-medium">Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your inquiry or custom order..."
                              className="min-h-[150px] bg-white border-brand-brown/30 focus:border-brand-brown"
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
                          <FormLabel className="text-black font-medium">Attach Image (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept="image/png, image/jpeg, image/webp"
                              className="bg-white border-brand-brown/30"
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
                      size="lg"
                      className="w-full bg-brand-brown text-brand-beige hover:shadow-brown font-semibold py-6 text-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting && (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      )}
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </Form>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-accent-beige text-dark-brown">
        <div className="container-luxury">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-dark-brown">
                Want to Collaborate?
              </h2>
              <p className="text-brand-brown text-lg md:text-xl mb-8 leading-relaxed">
                Are you a ceramic maker or studio? We&apos;re always looking for talented artisans to partner with.
              </p>
              <Link href="/collaborate" className="inline-flex items-center gap-2 text-dark-brown bg-brand-beige hover:bg-brand-beige/90 transition-colors font-medium text-lg px-6 py-3 rounded-lg border-2 border-dark-brown">
                Partner With Us <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
