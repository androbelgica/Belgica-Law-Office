<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Inquiry from Website</title>
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
            background-color: #059669;
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
            background-color: #f0fdf4;
            border-radius: 5px;
            border-left: 4px solid #059669;
        }
        .field-label {
            font-weight: bold;
            color: #059669;
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
        .anonymous {
            background-color: #fef3c7;
            border-left-color: #f59e0b;
        }
        .anonymous .field-label {
            color: #f59e0b;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>💬 New Website Inquiry</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Quick Inquiry Widget</p>
        </div>

        <p><strong>Someone has submitted an inquiry through your website's inquiry widget.</strong></p>

        @if(!empty($inquiryData['name']))
        <div class="field-group">
            <span class="field-label">👤 Name:</span>
            <div class="field-value">{{ $inquiryData['name'] }}</div>
        </div>
        @else
        <div class="field-group anonymous">
            <span class="field-label">👤 Name:</span>
            <div class="field-value">Anonymous Visitor</div>
        </div>
        @endif

        @if(!empty($inquiryData['email']))
        <div class="field-group">
            <span class="field-label">📧 Email Address:</span>
            <div class="field-value">
                <a href="mailto:{{ $inquiryData['email'] }}">{{ $inquiryData['email'] }}</a>
            </div>
        </div>
        @else
        <div class="field-group anonymous">
            <span class="field-label">📧 Email Address:</span>
            <div class="field-value">Not provided</div>
        </div>
        @endif

        <div class="field-group">
            <span class="field-label">💬 Inquiry Message:</span>
            <div class="message-content">
                {{ $inquiryData['message'] }}
            </div>
        </div>

        <div class="field-group">
            <span class="field-label">🕒 Submitted:</span>
            <div class="field-value">{{ now()->format('F j, Y \a\t g:i A') }}</div>
        </div>

        @if(!empty($inquiryData['ip_address']))
        <div class="field-group">
            <span class="field-label">🌐 IP Address:</span>
            <div class="field-value">{{ $inquiryData['ip_address'] }}</div>
        </div>
        @endif

        @if(!empty($inquiryData['email']))
        <div style="margin-top: 30px; padding: 20px; background-color: #ecfdf5; border-radius: 5px; border-left: 4px solid #10b981;">
            <h3 style="margin-top: 0; color: #059669;">📞 Quick Response</h3>
            <p style="margin-bottom: 15px;">Respond to this inquiry:</p>
            <a href="mailto:{{ $inquiryData['email'] }}?subject=Re: Your inquiry to Belgica Law Office" 
               style="display: inline-block; background-color: #059669; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                📧 Reply via Email
            </a>
        </div>
        @else
        <div style="margin-top: 30px; padding: 20px; background-color: #fef3c7; border-radius: 5px; border-left: 4px solid #f59e0b;">
            <h3 style="margin-top: 0; color: #f59e0b;">⚠️ Anonymous Inquiry</h3>
            <p style="margin-bottom: 0;">This visitor didn't provide contact information. Consider adding this inquiry to your FAQ or blog if it's a common question.</p>
        </div>
        @endif

        <div class="footer">
            <p>This email was automatically generated from your website inquiry widget.</p>
            <p>Inquiries are typically shorter and may be anonymous.</p>
        </div>
    </div>
</body>
</html>
