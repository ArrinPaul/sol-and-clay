/**
 * Email notification utilities.
 * 
 * This module provides email sending capabilities for the application.
 * Configure your preferred email provider (SendGrid, Resend, AWS SES, etc.)
 * by setting the appropriate environment variables.
 * 
 * For production, install your preferred email SDK:
 * - SendGrid: npm install @sendgrid/mail
 * - Resend: npm install resend
 * - AWS SES: npm install @aws-sdk/client-ses
 */

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Default sender email address.
 * Override with EMAIL_FROM environment variable.
 */
const DEFAULT_FROM = process.env.EMAIL_FROM || 'Sol & Clay <noreply@solandclay.com>';

/**
 * Send an email using the configured provider.
 * 
 * In development, this logs the email to the console.
 * In production, configure one of the supported providers.
 */
export async function sendEmail(options: EmailOptions): Promise<EmailResult> {
  const { to, subject, html, text, from = DEFAULT_FROM, replyTo } = options;

  // In development or if no provider is configured, log to console
  if (process.env.NODE_ENV === 'development' || !process.env.EMAIL_PROVIDER) {
    console.log('📧 Email would be sent:');
    console.log('   To:', to);
    console.log('   From:', from);
    console.log('   Subject:', subject);
    console.log('   Reply-To:', replyTo || 'N/A');
    console.log('   ---');
    console.log('   Body preview:', text?.substring(0, 200) || html.substring(0, 200));
    
    return { success: true, messageId: `dev-${Date.now()}` };
  }

  // Production email sending
  // Uncomment and configure your preferred provider:

  /*
  // --- SendGrid ---
  // npm install @sendgrid/mail
  // Set EMAIL_PROVIDER=sendgrid and SENDGRID_API_KEY
  
  if (process.env.EMAIL_PROVIDER === 'sendgrid') {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    try {
      const [response] = await sgMail.send({
        to,
        from,
        subject,
        text,
        html,
        replyTo,
      });
      return { success: true, messageId: response.headers['x-message-id'] };
    } catch (error) {
      console.error('SendGrid error:', error);
      return { success: false, error: 'Failed to send email' };
    }
  }
  */

  /*
  // --- Resend ---
  // npm install resend
  // Set EMAIL_PROVIDER=resend and RESEND_API_KEY
  
  if (process.env.EMAIL_PROVIDER === 'resend') {
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    try {
      const { data, error } = await resend.emails.send({
        from,
        to,
        subject,
        html,
        text,
        reply_to: replyTo,
      });
      
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true, messageId: data?.id };
    } catch (error) {
      console.error('Resend error:', error);
      return { success: false, error: 'Failed to send email' };
    }
  }
  */

  console.warn('No email provider configured. Set EMAIL_PROVIDER environment variable.');
  return { success: false, error: 'Email provider not configured' };
}

// ============================================================================
// Email Templates
// ============================================================================

/**
 * Send order confirmation email to customer.
 */
export async function sendOrderConfirmationEmail(
  customerEmail: string,
  orderId: string,
  orderDetails: {
    items: Array<{ title: string; quantity: number; price: number }>;
    subtotal: number;
    shipping: number;
    total: number;
  }
): Promise<EmailResult> {
  const itemsHtml = orderDetails.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #eee;">${item.title}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">$${item.price.toFixed(2)}</td>
      </tr>
    `
    )
    .join('');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f5f5f0;">
      <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <div style="background-color: #8B7355; padding: 32px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 400;">Sol & Clay</h1>
          </div>
          
          <!-- Content -->
          <div style="padding: 32px;">
            <h2 style="color: #1a1a1a; margin: 0 0 16px;">Thank you for your order!</h2>
            <p style="color: #666; line-height: 1.6; margin: 0 0 24px;">
              Your payment has been confirmed. We're preparing your handcrafted items with care.
            </p>
            
            <div style="background-color: #f5f5f0; padding: 16px; border-radius: 4px; margin-bottom: 24px;">
              <p style="margin: 0; color: #666;"><strong>Order ID:</strong> ${orderId}</p>
            </div>
            
            <!-- Items -->
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <thead>
                <tr style="background-color: #f5f5f0;">
                  <th style="padding: 12px; text-align: left; color: #1a1a1a;">Item</th>
                  <th style="padding: 12px; text-align: center; color: #1a1a1a;">Qty</th>
                  <th style="padding: 12px; text-align: right; color: #1a1a1a;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2" style="padding: 12px; text-align: right; color: #666;">Subtotal</td>
                  <td style="padding: 12px; text-align: right;">$${orderDetails.subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding: 12px; text-align: right; color: #666;">Shipping</td>
                  <td style="padding: 12px; text-align: right;">$${orderDetails.shipping.toFixed(2)}</td>
                </tr>
                <tr style="font-weight: bold;">
                  <td colspan="2" style="padding: 12px; text-align: right; color: #1a1a1a;">Total</td>
                  <td style="padding: 12px; text-align: right; color: #8B7355;">$${orderDetails.total.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
            
            <p style="color: #666; line-height: 1.6; margin: 0;">
              We'll send you another email when your order ships.
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f5f5f0; padding: 24px; text-align: center;">
            <p style="margin: 0; color: #999; font-size: 14px;">
              Questions? Reply to this email or contact us at support@solandclay.com
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
Thank you for your order!

Order ID: ${orderId}

Items:
${orderDetails.items.map((item) => `- ${item.title} (x${item.quantity}) - $${item.price.toFixed(2)}`).join('\n')}

Subtotal: $${orderDetails.subtotal.toFixed(2)}
Shipping: $${orderDetails.shipping.toFixed(2)}
Total: $${orderDetails.total.toFixed(2)}

We'll send you another email when your order ships.

Questions? Reply to this email or contact us at support@solandclay.com
  `.trim();

  return sendEmail({
    to: customerEmail,
    subject: `Order Confirmed - Sol & Clay #${orderId.slice(-8).toUpperCase()}`,
    html,
    text,
    replyTo: 'support@solandclay.com',
  });
}

/**
 * Send notification to admin about new order.
 */
export async function sendAdminOrderNotification(
  orderId: string,
  customerEmail: string,
  total: number
): Promise<EmailResult> {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@solandclay.com';

  const html = `
    <h2>New Order Received</h2>
    <p><strong>Order ID:</strong> ${orderId}</p>
    <p><strong>Customer:</strong> ${customerEmail}</p>
    <p><strong>Total:</strong> $${total.toFixed(2)}</p>
    <p><a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9003'}/admin">View in Admin Dashboard</a></p>
  `;

  return sendEmail({
    to: adminEmail,
    subject: `New Order #${orderId.slice(-8).toUpperCase()} - $${total.toFixed(2)}`,
    html,
    text: `New order received. Order ID: ${orderId}, Customer: ${customerEmail}, Total: $${total.toFixed(2)}`,
  });
}

/**
 * Send collaboration request notification to admin.
 */
export async function sendCollaborationNotification(
  studioName: string,
  email: string,
  status: string
): Promise<EmailResult> {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@solandclay.com';

  const html = `
    <h2>New Collaboration Request</h2>
    <p><strong>Studio:</strong> ${studioName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>AI Status:</strong> ${status}</p>
    <p><a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9003'}/admin">Review in Admin Dashboard</a></p>
  `;

  return sendEmail({
    to: adminEmail,
    subject: `New Collaboration Request from ${studioName}`,
    html,
    text: `New collaboration request from ${studioName} (${email}). Status: ${status}`,
  });
}
