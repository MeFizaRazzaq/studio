"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactForm() {
  return (
    <form
      className="space-y-6"
      onSubmit={async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const payload = {
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        };

        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          alert("Message sent successfully!");
          form.reset();
        } else {
          alert("Failed to send message. Please try again.");
        }
      }}
    >
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          Full Name
        </label>
        <Input name="name" type="text" placeholder="John Doe" required />
      </div>

      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          Email Address
        </label>
        <Input name="email" type="email" placeholder="you@example.com" required />
      </div>

      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          Message
        </label>
        <Textarea name="message" rows={5} placeholder="Your message..." required />
      </div>

      <Button type="submit" className="w-full">
        Send Message
      </Button>
    </form>
  );
}
