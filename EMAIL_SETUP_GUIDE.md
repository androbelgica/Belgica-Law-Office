# Email Notification System Setup Guide
## Belgica Law Office Contact & Inquiry Forms

This guide explains how to set up and configure the email notification system for the contact and inquiry forms on the Belgica Law Office website.

## 📧 What's Implemented

### Email Types
1. **Contact Form Admin Notification** - Sent to law office when someone submits the contact form
2. **Contact Form Client Acknowledgment** - Sent to client confirming their submission
3. **Inquiry Form Admin Notification** - Sent to law office when someone submits an inquiry
4. **Inquiry Form Client Acknowledgment** - Sent to client confirming their inquiry (only if email provided)

### Features
- ✅ Professional HTML email templates with law office branding
- ✅ Automatic email sending on form submission
- ✅ Error handling and logging
- ✅ Support for anonymous inquiries
- ✅ Reply-to functionality for easy client communication
- ✅ Mobile-responsive email design
- ✅ Emergency contact highlighting for urgent matters

## 🚀 Quick Setup

### Step 1: Configure SMTP Settings

Copy the email configuration from `.env.email.example` to your `.env` file:

```bash
# Basic SMTP Configuration
MAIL_MAILER=smtp
MAIL_HOST=your-smtp-host.com
MAIL_PORT=587
MAIL_USERNAME=your-email@domain.com
MAIL_PASSWORD=your-password
MAIL_ENCRYPTION=tls

# From Address
MAIL_FROM_ADDRESS=info@belgicalaw.com
MAIL_FROM_NAME="Belgica Law Office"

# Admin Email (where notifications are sent)
MAIL_ADMIN_EMAIL=info@belgicalaw.com
```

### Step 2: Choose Your Email Provider

#### Gmail Setup
```env
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-gmail@gmail.com
MAIL_PASSWORD=your-app-password  # Use App Password, not regular password
MAIL_ENCRYPTION=tls
```

#### Outlook/Hotmail Setup
```env
MAIL_HOST=smtp-mail.outlook.com
MAIL_PORT=587
MAIL_USERNAME=your-email@outlook.com
MAIL_PASSWORD=your-password
MAIL_ENCRYPTION=tls
```

#### Custom Domain/cPanel Setup
```env
MAIL_HOST=mail.yourdomain.com
MAIL_PORT=587
MAIL_USERNAME=info@yourdomain.com
MAIL_PASSWORD=your-password
MAIL_ENCRYPTION=tls
```

### Step 3: Test the Configuration

#### Option 1: Command Line Test
```bash
php artisan email:test all --to=your-test-email@example.com
```

#### Option 2: Web Interface Test (Development Only)
Visit: `http://your-domain.com/test-email/all`

#### Option 3: Manual Test with Tinker
```bash
php artisan tinker
```
Then run:
```php
Mail::raw('Test email', function($msg) { 
    $msg->to('test@example.com')->subject('Test Email'); 
});
```

## 📁 File Structure

```
app/
├── Mail/
│   ├── ContactFormMail.php              # Admin notification for contact form
│   ├── ContactAcknowledgmentMail.php    # Client acknowledgment for contact form
│   ├── InquiryFormMail.php              # Admin notification for inquiry form
│   └── InquiryAcknowledgmentMail.php    # Client acknowledgment for inquiry form
├── Http/Controllers/
│   ├── ContactController.php            # Updated with email functionality
│   └── InquiryController.php            # Updated with email functionality
└── Console/Commands/
    └── TestEmailCommand.php             # Email testing command

resources/views/emails/
├── contact-form.blade.php               # Admin notification template
├── contact-acknowledgment.blade.php     # Client acknowledgment template
├── inquiry-form.blade.php               # Admin inquiry notification template
└── inquiry-acknowledgment.blade.php     # Client inquiry acknowledgment template

config/
└── mail.php                             # Updated with admin_email config
```

## 🔧 Configuration Options

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MAIL_MAILER` | Mail driver | `smtp` |
| `MAIL_HOST` | SMTP server | `smtp.gmail.com` |
| `MAIL_PORT` | SMTP port | `587` |
| `MAIL_USERNAME` | SMTP username | `info@belgicalaw.com` |
| `MAIL_PASSWORD` | SMTP password | `your-password` |
| `MAIL_ENCRYPTION` | Encryption type | `tls` |
| `MAIL_FROM_ADDRESS` | Sender email | `info@belgicalaw.com` |
| `MAIL_FROM_NAME` | Sender name | `"Belgica Law Office"` |
| `MAIL_ADMIN_EMAIL` | Admin notification email | `info@belgicalaw.com` |

### Testing Configuration

For development/testing, you can use the `log` driver to save emails to log files instead of sending them:

```env
MAIL_MAILER=log
```

Emails will be saved to `storage/logs/laravel.log`.

## 🛠️ Troubleshooting

### Common Issues

1. **Emails not sending**
   - Check SMTP credentials
   - Verify firewall/port settings
   - Check Laravel logs: `storage/logs/laravel.log`

2. **Gmail "Less secure app" error**
   - Use App Passwords instead of regular password
   - Enable 2-factor authentication first

3. **Emails going to spam**
   - Set up SPF, DKIM, and DMARC records
   - Use a professional email address
   - Avoid spam trigger words

4. **SSL/TLS errors**
   - Try `MAIL_ENCRYPTION=ssl` instead of `tls`
   - Check if port 465 works better than 587

### Debug Commands

```bash
# Test email configuration
php artisan email:test contact --to=your-email@example.com

# Check mail configuration
php artisan tinker
>>> config('mail')

# View email logs
tail -f storage/logs/laravel.log
```

## 📧 Email Templates

The email templates are professionally designed with:
- Law office branding and colors
- Mobile-responsive design
- Clear call-to-action buttons
- Professional formatting
- Emergency contact highlighting
- Client information summary

### Customization

To customize email templates, edit the files in `resources/views/emails/`:
- Update colors, fonts, and styling
- Modify content and messaging
- Add law office logo
- Update contact information

## 🔒 Security Considerations

1. **Use App Passwords** for Gmail instead of regular passwords
2. **Store credentials securely** in `.env` file (never commit to version control)
3. **Use TLS encryption** for SMTP connections
4. **Validate email addresses** before sending
5. **Rate limit** form submissions to prevent spam
6. **Log email activities** for audit purposes

## 📊 Monitoring

The system includes comprehensive logging:
- Successful email sends are logged with recipient information
- Failed email attempts are logged with error details
- Form submissions are tracked with IP addresses
- Email delivery status is monitored

Check logs regularly:
```bash
tail -f storage/logs/laravel.log | grep -i mail
```

## 🎯 Next Steps

1. Set up your SMTP credentials
2. Test the email functionality
3. Customize email templates with your branding
4. Configure DNS records (SPF, DKIM, DMARC) for better deliverability
5. Set up email monitoring and alerts
6. Consider using a professional email service like SendGrid or Mailgun for high volume

## 📞 Support

If you need help setting up the email system:
1. Check the troubleshooting section above
2. Review Laravel's mail documentation
3. Test with the provided commands
4. Check server logs for detailed error messages
