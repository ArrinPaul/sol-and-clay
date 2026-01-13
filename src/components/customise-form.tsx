
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
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  customisation: z
    .string()
    .min(20, { message: 'Please describe what you would like to customise.' })
    .max(500, { message: 'Description cannot exceed 500 characters.' }),
  referenceImages: z.string().optional(),
  timeline: z.string().optional(),
});

export function CustomiseForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      customisation: '',
      referenceImages: '',
      timeline: '',
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // For now, just show a success message
    // In production, this would send to a backend API
    toast({
      title: 'Request Submitted!',
      description:
        "Thank you for your custom order request. We'll review it and get back to you soon.",
      variant: 'default',
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black font-medium">Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" className="bg-white border-brand-brown/30 focus:border-brand-brown" {...field} />
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
                <Input type="email" placeholder="you@example.com" className="bg-white border-brand-brown/30 focus:border-brand-brown" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customisation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black font-medium">What would you like to customise?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the custom piece you're looking for - size, color, design modifications, etc."
                  className="min-h-[120px] bg-white border-brand-brown/30 focus:border-brand-brown"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="referenceImages"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black font-medium">Reference images (optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Link to reference images (e.g., Dropbox, Google Drive)"
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
          name="timeline"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black font-medium">Timeline (optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="When do you need this by?"
                  className="bg-white border-brand-brown/30 focus:border-brand-brown"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-brand-brown text-brand-beige hover:shadow-brown font-semibold py-6 text-lg" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? 'Submitting...' : 'Request a custom piece'}
        </Button>
      </form>
    </Form>
  );
}
    
