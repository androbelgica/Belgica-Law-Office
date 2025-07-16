<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InquiryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Inquiry::query();

        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Search
        if ($request->has('search') && $request->search) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%')
                  ->orWhere('message', 'like', '%' . $request->search . '%');
            });
        }

        $inquiries = $query->latest()->paginate(15)->withQueryString();

        return Inertia::render('Admin/Inquiries/Index', [
            'inquiries' => $inquiries,
            'filters' => $request->only(['status', 'search']),
            'stats' => [
                'total' => Inquiry::count(),
                'unread' => Inquiry::unread()->count(),
                'read' => Inquiry::read()->count(),
                'replied' => Inquiry::replied()->count(),
            ]
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Inquiry $inquiry)
    {
        // Mark as read when viewed
        if ($inquiry->status === 'unread') {
            $inquiry->markAsRead();
        }

        return Inertia::render('Admin/Inquiries/Show', [
            'inquiry' => $inquiry
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Inquiry $inquiry)
    {
        $request->validate([
            'admin_reply' => 'required|string|max:2000',
        ]);

        $inquiry->markAsReplied($request->admin_reply);

        return redirect()->back()->with('success', 'Reply sent successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Inquiry $inquiry)
    {
        $inquiry->delete();

        return redirect()->route('admin.inquiries.index')
            ->with('success', 'Inquiry deleted successfully.');
    }
}
