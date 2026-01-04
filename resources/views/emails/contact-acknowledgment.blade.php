<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank you for contacting Belgica Law Office</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .email-container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            background-color: #1e40af;
            color: white;
            padding: 30px 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
            margin: -30px -30px 30px -30px;
        }
        .header h1 {
            margin: 0 0 10px 0;
            font-size: 28px;
        }
        .header p {
            margin: 0;
            opacity: 0.9;
            font-size: 16px;
        }
        .content {
            margin-bottom: 30px;
        }
        .highlight-box {
            background-color: #eff6ff;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #3b82f6;
            margin: 20px 0;
        }
        .contact-info {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .contact-info h3 {
            margin-top: 0;
            color: #1e40af;
        }
        .contact-item {
            margin-bottom: 10px;
            display: flex;
            align-items: center;
        }
        .contact-item strong {
            min-width: 100px;
            color: #1e40af;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            font-size: 14px;
            color: #6b7280;
            text-align: center;
        }
        .cta-button {
            display: inline-block;
            background-color: #1e40af;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            margin: 10px 5px;
        }
        .cta-button:hover {
            background-color: #1d4ed8;
        }
        .summary-box {
            background-color: #f0f9ff;
            padding: 15px;
            border-radius: 6px;
            margin: 15px 0;
            border: 1px solid #bae6fd;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>🏛️ Thank You!</h1>
            <p>Your message has been received</p>
        </div>

        <div class="content">
            <p>Dear {{ $contactData['name'] }},</p>
            
            <p>Thank you for contacting <strong>Belgica Law Office</strong>. We have successfully received your inquiry and appreciate you taking the time to reach out to us.</p>

            <div class="summary-box">
                <h3 style="margin-top: 0; color: #1e40af;">📋 Your Submission Summary</h3>
                <p><strong>Subject:</strong> 
                    @switch($contactData['subject'])
                        @case('legal-consultation')
                            Legal Consultation
                            @break
                        @case('notarial-services')
                            Notarial Services
                            @break
                        @case('corporate-legal')
                            Corporate Legal
                            @break
                        @case('real-estate')
                            Real Estate Law
                            @break
                        @case('family-law')
                            Family Law
                            @break
                        @default
                            {{ ucfirst(str_replace('-', ' ', $contactData['subject'])) }}
                    @endswitch
                </p>
                <p><strong>Submitted:</strong> {{ now()->format('F j, Y \a\t g:i A') }}</p>
            </div>

            <div class="highlight-box">
                <h3 style="margin-top: 0; color: #1e40af;">⏰ What Happens Next?</h3>
                <ul style="margin: 0; padding-left: 20px;">
                    <li><strong>Response Time:</strong> We will review your inquiry and respond within 24 hours during business days</li>
                    <li><strong>Initial Consultation:</strong> If needed, we'll schedule a consultation to discuss your legal needs in detail</li>
                    <li><strong>Professional Service:</strong> Our experienced legal team will provide you with expert guidance</li>
                </ul>
            </div>

            @if(in_array($contactData['subject'], ['legal-consultation', 'family-law']))
            <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; border-left: 4px solid #dc2626; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #dc2626;">🚨 Urgent Legal Matter?</h3>
                <p>If this is an urgent legal matter that requires immediate attention, please call our office directly at <strong>+63 XXX XXX XXXX</strong> during business hours.</p>
            </div>
            @endif
        </div>

        <div class="contact-info">
            <h3>📞 Contact Information</h3>
            <div class="contact-item">
                <strong>📧 Email:</strong> info@belgicalaw.com
            </div>
            <div class="contact-item">
                <strong>📞 Phone:</strong> +63 XXX XXX XXXX
            </div>
            <div class="contact-item">
                <strong>🏢 Office:</strong> Metro Manila, Philippines
            </div>
            <div class="contact-item">
                <strong>🕒 Hours:</strong> Mon-Fri: 9:00 AM - 6:00 PM, Sat: 9:00 AM - 12:00 PM
            </div>
        </div>

        <div style="text-align: center; margin: 30px 0;">
            <a href="tel:+63XXXXXXXXXX" class="cta-button">📞 Call Us</a>
            <a href="https://wa.me/63XXXXXXXXXX" class="cta-button" style="background-color: #059669;">💬 WhatsApp</a>
        </div>

        <div class="footer">
            <p><strong>Belgica Law Office</strong></p>
            <p>Professional Legal Services | Trusted Legal Counsel</p>
            <p style="margin-top: 15px; font-size: 12px;">
                This is an automated confirmation email. Please do not reply to this email address. 
                For any questions, please contact us using the information provided above.
            </p>
        </div>
    </div>
</body>
</html>
