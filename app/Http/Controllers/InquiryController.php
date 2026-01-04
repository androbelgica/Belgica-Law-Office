<?php

namespace App\Http\Controllers;

use App\Models\Inquiry;
use App\Mail\InquiryFormMail;
use App\Mail\InquiryAcknowledgmentMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class InquiryController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'message' => 'required|string|max:1000',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        // Save to database
        $inquiry = Inquiry::create([
            'name' => $request->name,
            'email' => $request->email,
            'message' => $request->message,
            'ip_address' => $request->ip(),
        ]);

        // Prepare inquiry data for emails
        $inquiryData = [
            'name' => $request->name,
            'email' => $request->email,
            'message' => $request->message,
            'ip_address' => $request->ip(),
        ];

        try {
            // Send email notification to admin
            $adminEmail = config('mail.admin_email', 'info@belgicalaw.com');
            Mail::to($adminEmail)->send(new InquiryFormMail($inquiryData));

            // Send acknowledgment email to client (only if email is provided)
            if (!empty($request->email)) {
                Mail::to($request->email)->send(new InquiryAcknowledgmentMail($inquiryData));
            }

            Log::info('Inquiry form emails sent successfully', [
                'inquiry_id' => $inquiry->id,
                'client_email' => $request->email ?? 'anonymous',
                'admin_email' => $adminEmail
            ]);

        } catch (\Exception $e) {
            // Log the error but don't fail the form submission
            Log::error('Failed to send inquiry form emails', [
                'inquiry_id' => $inquiry->id,
                'error' => $e->getMessage(),
                'client_email' => $request->email ?? 'anonymous'
            ]);
        }

        return back()->with('success', 'Your inquiry has been sent successfully!');
    }
}
