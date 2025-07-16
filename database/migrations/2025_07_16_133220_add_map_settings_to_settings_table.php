<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Setting;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Add map-related settings
        $mapSettings = [
            [
                'key' => 'office_latitude',
                'value' => '14.5995', // Default to Manila coordinates
                'type' => 'text',
                'group' => 'contact',
                'description' => 'Office latitude coordinate for map display'
            ],
            [
                'key' => 'office_longitude',
                'value' => '120.9842', // Default to Manila coordinates
                'type' => 'text',
                'group' => 'contact',
                'description' => 'Office longitude coordinate for map display'
            ],
            [
                'key' => 'map_zoom_level',
                'value' => '15',
                'type' => 'text',
                'group' => 'contact',
                'description' => 'Default zoom level for office location map'
            ]
        ];

        foreach ($mapSettings as $setting) {
            Setting::updateOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Remove map-related settings
        Setting::whereIn('key', [
            'office_latitude',
            'office_longitude',
            'map_zoom_level'
        ])->delete();
    }
};
