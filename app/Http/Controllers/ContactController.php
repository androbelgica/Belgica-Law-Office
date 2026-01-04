<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Mail\ContactFormMail;
use App\Mail\ContactAcknowledgmentMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:2000',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        // Save to database
        $contact = Contact::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'subject' => $request->subject,
            'message' => $request->message,
            'ip_address' => $request->ip(),
        ]);

        // Prepare contact data for emails
        $contactData = [
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'subject' => $request->subject,
            'message' => $request->message,
            'ip_address' => $request->ip(),
        ];

        try {
            // Send email notification to admin
            $adminEmail = config('mail.admin_email', 'info@belgicalaw.com');
            Mail::to($adminEmail)->send(new ContactFormMail($contactData));

            // Send acknowledgment email to client
            Mail::to($request->email)->send(new ContactAcknowledgmentMail($contactData));

            Log::info('Contact form emails sent successfully', [
                'contact_id' => $contact->id,
                'client_email' => $request->email,
                'admin_email' => $adminEmail
            ]);

        } catch (\Exception $e) {
            // Log the error but don't fail the form submission
            Log::error('Failed to send contact form emails', [
                'contact_id' => $contact->id,
                'error' => $e->getMessage(),
                'client_email' => $request->email
            ]);
        }

        return back()->with('success', 'Thank you for your message. We will get back to you soon!');
    }
}
