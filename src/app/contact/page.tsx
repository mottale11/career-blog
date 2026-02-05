import type { Metadata } from 'next';
import { ContactForm } from './_components/contact-form';

export const metadata: Metadata = {
  title: 'Contact Us | Jobslot',
  description: 'Get in touch with the Jobslot team.',
};

export default function ContactPage() {
  return <ContactForm />;
}
