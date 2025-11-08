
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
import { submitCollaborationRequest } from '@/app/actions/collaboration';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  studioName: z
    .string()
    .min(2, { message: 'Studio name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  portfolioURL: z.string().url({ message: 'Please enter a valid URL.' }),
  message: z
    .string()
    .min(20, { message: 'Your message must be at least 20 characters.' })
    .max(500, { message: 'Message cannot exceed 500 characters.' }),
  image: z.instanceof(File).optional(),
});

export function CollaborateForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studioName: '',
      email: '',
      portfolioURL: '',
      message: '',
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append('studioName', values.studioName);
    formData.append('email', values.email);
    formData.append('portfolioURL', values.portfolioURL);
    formData.append('message', values.message);

    // Add file if it exists
    if (values.image) {
      formData.append('image', values.image);
    } else {
      // Create a dummy file if image is not required or provided
      const dummyFile = new File([''], 'dummy.txt', { type: 'text/plain' });
      formData.append('image', dummyFile);
    }

    const result = await submitCollaborationRequest(formData);

    if (result.success) {
      toast({
        title: 'Submission Received!',
        description:
          "Thank you for your interest. We'll review your submission and be in touch soon.",
        variant: 'default',
      });
      form.reset();
    } else {
      toast({
        title: 'Submission Failed',
        description:
          result.error || 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="studioName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Studio Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Artisan Pots" {...field} />
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
          name="portfolioURL"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Portfolio Link</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://your-portfolio.com"
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
              <FormLabel>Message / Pitch</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your work and why you'd be a great fit for Sol & Clay..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </Button>
      </form>
    </Form>
  );
}

    