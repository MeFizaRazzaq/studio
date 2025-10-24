'use client';

import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your API call to MongoDB later
    console.log('Subscribed:', email);
    setSubmitted(true);
    setEmail('');
  };

  return submitted ? (
    <p className="text-green-500 font-semibold">Thank you for subscribing!</p>
  ) : (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
      <Input
        type="email"
        placeholder="Enter your email address"
        className="text-base"
        aria-label="Email for newsletter"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button type="submit" className="w-full sm:w-auto">
        Subscribe
      </Button>
    </form>
  );
}
