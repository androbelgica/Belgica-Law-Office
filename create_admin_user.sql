-- INSTRUCTIONS TO CREATE AN ADMIN USER
-- ======================================

-- Step 1: Create the User
-- Go to your Supabase Dashboard -> Authentication -> Users
-- Click "Add User" and create a new user with email/password.
-- (e.g., admin@belgicalaw.com)

-- Step 2: Get the User ID (UUID)
-- Copy the "User UID" from the dashboard for the newly created user.

-- Step 3: Run the following SQL
-- Replace 'PASTE_USER_UUID_HERE' with the actual UID you copied.

INSERT INTO public.profiles (id, full_name, role)
VALUES 
    ('fbb8be80-14e2-4246-9a32-08f4539454b0', 'Admin User', 'admin')
ON CONFLICT (id) DO UPDATE 
SET role = 'admin';

-- Step 4: Verify
-- SELECT * FROM public.profiles WHERE role = 'admin';
