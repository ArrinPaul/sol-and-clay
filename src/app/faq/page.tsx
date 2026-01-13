
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FadeIn } from "@/components/utils/fade-in";

export const metadata = {
  title: 'Frequently Asked Questions - Sol & Clay',
  description: 'Find answers to common questions about our products, shipping, returns, and collaborations.',
};

const faqs = [
  {
    question: "What makes your products special?",
    answer: "Each item at Sol & Clay is handcrafted by independent artisans. This means every piece is unique and carries the touch of its maker. We prioritize quality materials and soulful design over mass production."
  },
  {
    question: "How should I care for my ceramic items?",
    answer: "Most of our ceramics are dishwasher and microwave safe, unless otherwise noted on the product page. We recommend hand-washing for pieces with delicate details or metallic glazes to ensure their longevity."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. Please see our Shipping & Returns page for more detailed information."
  },
  {
    question: "What is your return policy?",
    answer: "We accept returns on most items within 30 days of delivery. The item must be in its original, unused condition. Please visit our Shipping & Returns page to initiate a return and for a full list of non-returnable items."
  },
  {
    question: "I'm an artisan. How can I collaborate with Sol & Clay?",
    answer: "We are always excited to connect with new makers! Please visit our Collaborate page to submit your portfolio and tell us about your work. Our team reviews every submission."
  },
  {
    question: "Is the packaging eco-friendly?",
    answer: "We are committed to sustainability. All of our packaging is recyclable, and we use biodegradable materials wherever possible to minimize our environmental impact."
  }
];

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <FadeIn>
        <h1 className="text-center font-headline text-5xl font-bold tracking-tight text-dark-brown md:text-6xl">
          Frequently Asked Questions
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
          Have questions? We have answers. If you can&apos;t find what you&apos;re looking for, feel free to contact us.
        </p>
      </FadeIn>

      <div className="mx-auto mt-16 max-w-3xl">
        <FadeIn delay="delay-200">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-headline text-lg font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </div>
  );
}
