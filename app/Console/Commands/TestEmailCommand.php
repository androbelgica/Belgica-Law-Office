<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactFormMail;
use App\Mail\ContactAcknowledgmentMail;
use App\Mail\InquiryFormMail;
use App\Mail\InquiryAcknowledgmentMail;

class TestEmailCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'email:test {type=all} {--to=test@example.com}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test email functionality for contact and inquiry forms';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $type = $this->argument('type');
        $toEmail = $this->option('to');

        $this->info("Testing email functionality...");
        $this->info("Recipient: {$toEmail}");
        $this->info("Mail driver: " . config('mail.default'));
        $this->newLine();

        // Sample contact data
        $contactData = [
            'name' => 'John Doe',
            'email' => 'john.doe@example.com',
            'phone' => '+63 912 345 6789',
            'subject' => 'legal-consultation',
            'message' => 'I need legal advice regarding a contract dispute. Could you please help me understand my options?',
            'ip_address' => '127.0.0.1'
        ];

        // Sample inquiry data
        $inquiryData = [
            'name' => 'Jane Smith',
            'email' => 'jane.smith@example.com',
            'message' => 'What are your consultation fees for family law matters?',
            'ip_address' => '127.0.0.1'
        ];

        try {
            if ($type === 'all' || $type === 'contact') {
                $this->info("📧 Testing Contact Form Admin Notification...");
                Mail::to($toEmail)->send(new ContactFormMail($contactData));
                $this->info("✅ Contact form admin email sent successfully!");

                $this->info("📧 Testing Contact Form Client Acknowledgment...");
                Mail::to($toEmail)->send(new ContactAcknowledgmentMail($contactData));
                $this->info("✅ Contact form acknowledgment email sent successfully!");
                $this->newLine();
            }

            if ($type === 'all' || $type === 'inquiry') {
                $this->info("📧 Testing Inquiry Form Admin Notification...");
                Mail::to($toEmail)->send(new InquiryFormMail($inquiryData));
                $this->info("✅ Inquiry form admin email sent successfully!");

                $this->info("📧 Testing Inquiry Form Client Acknowledgment...");
                Mail::to($toEmail)->send(new InquiryAcknowledgmentMail($inquiryData));
                $this->info("✅ Inquiry form acknowledgment email sent successfully!");
                $this->newLine();
            }

            if (!in_array($type, ['all', 'contact', 'inquiry'])) {
                $this->error("Invalid type. Use: all, contact, or inquiry");
                return 1;
            }

            $this->info("🎉 All email tests completed successfully!");
            $this->info("Check your email inbox at: {$toEmail}");
            
            if (config('mail.default') === 'log') {
                $this->warn("📝 Note: Mail driver is set to 'log'. Check storage/logs/laravel.log for email content.");
            }

        } catch (\Exception $e) {
            $this->error("❌ Email test failed: " . $e->getMessage());
            $this->error("Stack trace: " . $e->getTraceAsString());
            return 1;
        }

        return 0;
    }
}
