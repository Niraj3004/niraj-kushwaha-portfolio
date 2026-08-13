import { ContactSubmission, IContactSubmission } from '../models/contact.model';
import { transporter } from '../config/mailer.config';
import { env } from '../config/env.config';
import { contactEmailTemplate } from '../templates/contactEmail';

export class ContactService {
  static async submitMessage(data: Partial<IContactSubmission> & { website?: string }) {
    // Honeypot check
    if (data.website) {
      throw { statusCode: 400, message: 'Spam detected' };
    }

    const submission = await ContactSubmission.create({
      name: data.name,
      email: data.email,
      message: data.message,
    });

    try {
      await transporter.sendMail({
        from: `"${data.name}" <${env.EMAIL_FROM}>`,
        to: env.EMAIL_TO,
        replyTo: data.email,
        subject: `New Contact Message from ${data.name}`,
        html: contactEmailTemplate(data.name!, data.email!, data.message!),
      });
    } catch (error) {
      console.error('Failed to send email:', error);
      // We don't fail the submission if email fails, but we could
    }

    return submission;
  }

  static async getAll() {
    return ContactSubmission.find().sort({ createdAt: -1 });
  }

  static async updateStatus(id: string, status: 'unread' | 'read' | 'archived') {
    const submission = await ContactSubmission.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!submission) throw { statusCode: 404, message: 'Message not found' };
    return submission;
  }
}
