import type { Metadata } from 'next';
import { ContactForm } from './_components/contact-form';

export const metadata: Metadata = {
  title: 'Contact Us | Jobsyde',
  description: 'Get in touch with the Jobsyde team.',
};

export default function ContactPage() {
  return <ContactForm />;
}
