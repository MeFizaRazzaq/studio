import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata = {
  title: "Contact Us | Meem Artisan",
  description: "Get in touch with the Haus of Meem team.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-headline text-primary mb-4">Get in Touch</h1>
          <p className="text-lg text-muted-foreground">
            We'd love to hear from you. Whether you have a question about our products, our process, or anything else, our team is ready to answer all your questions.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-12">
          <div className="bg-card p-8 rounded-lg">
            <h2 className="text-2xl font-headline text-primary mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">Full Name</label>
                <Input id="name" type="text" placeholder="John Doe" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">Email Address</label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">Message</label>
                <Textarea id="message" placeholder="Your message..." rows={5} />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </div>
          <div className="space-y-8">
            <h2 className="text-2xl font-headline text-primary mb-6">Contact Information</h2>
            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-accent mt-1" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <a href="mailto:support@meemartisan.com" className="text-muted-foreground hover:text-primary">support@meemartisan.com</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 text-accent mt-1" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-muted-foreground">+92 300 1234567</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-accent mt-1" />
              <div>
                <h3 className="font-semibold">Workshop</h3>
                <p className="text-muted-foreground">123 Leather Lane, Karachi, Pakistan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
