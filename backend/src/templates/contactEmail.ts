export const contactEmailTemplate = (name: string, email: string, message: string) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #4F46E5; padding: 20px; color: #ffffff; text-align: center;">
        <h2 style="margin: 0;">New Contact Message</h2>
      </div>
      <div style="padding: 20px; background-color: #f7f7f8; color: #0B0C10;">
        <p style="margin: 0 0 10px;"><strong>Name:</strong> ${name}</p>
        <p style="margin: 0 0 20px;"><strong>Email:</strong> ${email}</p>
        <h3 style="margin: 0 0 10px; color: #4F46E5;">Message:</h3>
        <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #4F46E5; border-radius: 4px;">
          <p style="margin: 0; white-space: pre-wrap;">${message}</p>
        </div>
      </div>
      <div style="background-color: #ECECEF; padding: 10px; text-align: center; font-size: 12px; color: #6B7280;">
        <p style="margin: 0;">This email was sent from your portfolio website.</p>
      </div>
    </div>
  `;
};
