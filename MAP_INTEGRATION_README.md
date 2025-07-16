# Map Integration for BelgicaLaw Contact Page

## Overview
A map has been successfully integrated into the contact page to show the office location with a pinned marker. The map uses Leaflet (OpenStreetMap) for a free, open-source mapping solution.

## Features Added

### 1. Interactive Map Component
- **Location**: `resources/js/Components/Map.jsx`
- **Features**:
  - Interactive map with zoom and pan controls
  - Custom office location marker with popup
  - Responsive design that works on all devices
  - Link to Google Maps for directions
  - Office information overlay

### 2. Contact Page Integration
- **Location**: `resources/js/Pages/Contact.jsx`
- **Features**:
  - Map section added below contact form and information
  - Additional sections for directions and visit information
  - Responsive grid layout for transportation and visit details

### 3. Admin Settings Management
- **Location**: Admin Dashboard → Settings
- **New Settings Added**:
  - `office_latitude`: Latitude coordinate for map display
  - `office_longitude`: Longitude coordinate for map display  
  - `map_zoom_level`: Default zoom level (1-20, recommended: 15-17)

### 4. Database Changes
- **Migration**: `database/migrations/2025_07_16_133220_add_map_settings_to_settings_table.php`
- **Seeder**: Updated `database/seeders/AdminSeeder.php` to include default map settings

## How to Configure the Map

### Step 1: Access Admin Settings
1. Log in to the admin dashboard
2. Navigate to "Settings" in the admin menu
3. Look for the "Contact" settings group

### Step 2: Find Your Office Coordinates
1. Go to [Google Maps](https://www.google.com/maps)
2. Search for your office address
3. Right-click on the exact location of your office
4. Click on the coordinates that appear (e.g., "14.5995, 120.9842")
5. Copy the latitude (first number) and longitude (second number)

### Step 3: Update Settings
1. **Office Latitude**: Enter the latitude coordinate (e.g., 14.5995)
2. **Office Longitude**: Enter the longitude coordinate (e.g., 120.9842)
3. **Map Zoom Level**: Set zoom level 1-20 (recommended: 15-17 for office locations)
4. **Office Address**: Update the text address that appears in the marker popup
5. Click "Save Settings"

## Technical Details

### Dependencies Added
- `leaflet`: ^1.9.4 - Core mapping library
- `react-leaflet`: ^4.2.1 - React components for Leaflet

### Files Modified/Created
1. `resources/js/Components/Map.jsx` - New map component
2. `resources/js/Pages/Contact.jsx` - Updated contact page
3. `resources/js/Pages/Admin/Settings/Index.jsx` - Enhanced admin settings
4. `database/migrations/2025_07_16_133220_add_map_settings_to_settings_table.php` - New migration
5. `database/seeders/AdminSeeder.php` - Updated seeder
6. `package.json` - Added new dependencies

### Default Configuration
- **Default Location**: Manila, Philippines (14.5995, 120.9842)
- **Default Zoom**: Level 15
- **Map Provider**: OpenStreetMap (free, no API key required)

## Customization Options

### Changing Map Style
The map currently uses OpenStreetMap tiles. To use different map styles, modify the tile layer in `Map.jsx`:

```javascript
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);
```

### Marker Customization
The marker uses a custom design with Tailwind CSS. To modify the marker appearance, edit the `customIcon` section in `Map.jsx`.

### Map Size
The map height can be adjusted by modifying the `className` prop in `Contact.jsx`:
```javascript
<Map className="h-96 lg:h-[500px]" />
```

## Troubleshooting

### Map Not Loading
1. Check browser console for JavaScript errors
2. Ensure all dependencies are installed: `npm install`
3. Rebuild assets: `npm run build`
4. Clear browser cache

### Incorrect Location
1. Verify coordinates in Admin Settings
2. Ensure latitude/longitude are in decimal format (not degrees/minutes/seconds)
3. Check that coordinates are for the correct location on Google Maps

### Performance Issues
1. The map loads efficiently with lazy loading
2. Tiles are cached by the browser
3. No API keys or rate limits with OpenStreetMap

## Future Enhancements

Potential improvements that could be added:
1. Multiple office locations support
2. Driving directions integration
3. Street view integration
4. Custom map themes
5. Mobile-specific optimizations
6. Accessibility improvements

## Support

For technical support or customization requests, refer to:
- Leaflet documentation: https://leafletjs.com/
- React Leaflet documentation: https://react-leaflet.js.org/
- OpenStreetMap: https://www.openstreetmap.org/

The map integration is now complete and ready for use!
