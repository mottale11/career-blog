-- Enable pgcrypto for password hashing
create extension if not exists "pgcrypto";

DO $$
DECLARE
  target_email text := 'mottale619@gmail.com';
  target_password text := '$Moses26';
  user_id uuid;
BEGIN
  -- Check if user exists
  SELECT id INTO user_id FROM auth.users WHERE email = target_email;

  IF user_id IS NOT NULL THEN
    -- Update existing user
    UPDATE auth.users
    SET encrypted_password = crypt(target_password, gen_salt('bf')),
        email_confirmed_at = now(),
        raw_user_meta_data = '{"role":"admin"}',
        updated_at = now()
    WHERE id = user_id;
    
    RAISE NOTICE 'User updated.';
  ELSE
    -- Create new user
    user_id := gen_random_uuid();
    
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      recovery_token,
      email_change_token_new,
      email_change
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      user_id,
      'authenticated',
      'authenticated',
      target_email,
      crypt(target_password, gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{"role":"admin"}',
      now(),
      now(),
      '',
      '',
      '',
      ''
    );
    
    -- Insert identity
    INSERT INTO auth.identities (
      id,
      user_id,
      identity_data,
      provider,
      provider_id,
      last_sign_in_at,
      created_at,
      updated_at
    ) VALUES (
      gen_random_uuid(),
      user_id,
      jsonb_build_object('sub', user_id, 'email', target_email),
      'email',
      user_id::text,
      now(),
      now(),
      now()
    );
    
    RAISE NOTICE 'User created.';
  END IF;
END $$;
