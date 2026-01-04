<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
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
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
            margin: -30px -30px 30px -30px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .field-group {
            margin-bottom: 20px;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 5px;
            border-left: 4px solid #1e40af;
        }
        .field-label {
            font-weight: bold;
            color: #1e40af;
            margin-bottom: 5px;
            display: block;
        }
        .field-value {
            color: #333;
            word-wrap: break-word;
        }
        .message-content {
            background-color: #fff;
            padding: 20px;
            border: 1px solid #e5e7eb;
            border-radius: 5px;
            margin-top: 10px;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            font-size: 12px;
            color: #6b7280;
            text-align: center;
        }
        .urgent {
            background-color: #fef2f2;
            border-left-color: #dc2626;
        }
        .urgent .field-label {
            color: #dc2626;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>🏛️ New Contact Form Submission</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Belgica Law Office Website</p>
        </div>

        <p><strong>A new contact form has been submitted on your website.</strong></p>

        <div class="field-group">
            <span class="field-label">👤 Full Name:</span>
            <div class="field-value">{{ $contactData['name'] }}</div>
        </div>

        <div class="field-group">
            <span class="field-label">📧 Email Address:</span>
            <div class="field-value">
                <a href="mailto:{{ $contactData['email'] }}">{{ $contactData['email'] }}</a>
            </div>
        </div>

        @if(!empty($contactData['phone']))
        <div class="field-group">
            <span class="field-label">📞 Phone Number:</span>
            <div class="field-value">
                <a href="tel:{{ $contactData['phone'] }}">{{ $contactData['phone'] }}</a>
            </div>
        </div>
        @endif

        <div class="field-group {{ in_array($contactData['subject'], ['legal-consultation', 'family-law']) ? 'urgent' : '' }}">
            <span class="field-label">📋 Subject:</span>
            <div class="field-value">
                @switch($contactData['subject'])
                    @case('legal-consultation')
                        🏛️ Legal Consultation
                        @break
                    @case('notarial-services')
                        📜 Notarial Services
                        @break
                    @case('corporate-legal')
                        🏢 Corporate Legal
                        @break
                    @case('real-estate')
                        🏠 Real Estate Law
                        @break
                    @case('family-law')
                        👨‍👩‍👧‍👦 Family Law
                        @break
                    @default
                        ❓ {{ ucfirst(str_replace('-', ' ', $contactData['subject'])) }}
                @endswitch
            </div>
        </div>

        <div class="field-group">
            <span class="field-label">💬 Message:</span>
            <div class="message-content">
                {{ $contactData['message'] }}
            </div>
        </div>

        <div class="field-group">
            <span class="field-label">🕒 Submitted:</span>
            <div class="field-value">{{ now()->format('F j, Y \a\t g:i A') }}</div>
        </div>

        @if(!empty($contactData['ip_address']))
        <div class="field-group">
            <span class="field-label">🌐 IP Address:</span>
            <div class="field-value">{{ $contactData['ip_address'] }}</div>
        </div>
        @endif

        <div style="margin-top: 30px; padding: 20px; background-color: #eff6ff; border-radius: 5px; border-left: 4px solid #3b82f6;">
            <h3 style="margin-top: 0; color: #1e40af;">📞 Quick Actions</h3>
            <p style="margin-bottom: 15px;">Respond to this inquiry:</p>
            <div style="margin-bottom: 10px;">
                <a href="mailto:{{ $contactData['email'] }}?subject=Re: {{ $contactData['subject'] }}" 
                   style="display: inline-block; background-color: #1e40af; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-right: 10px;">
                    📧 Reply via Email
                </a>
                @if(!empty($contactData['phone']))
                <a href="tel:{{ $contactData['phone'] }}" 
                   style="display: inline-block; background-color: #059669; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                    📞 Call Client
                </a>
                @endif
            </div>
        </div>

        <div class="footer">
            <p>This email was automatically generated from your website contact form.</p>
            <p>Please respond to the client within 24 hours for optimal service.</p>
        </div>
    </div>
</body>
</html>
