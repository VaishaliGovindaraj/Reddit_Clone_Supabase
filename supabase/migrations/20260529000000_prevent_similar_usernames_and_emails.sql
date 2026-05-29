create or replace function public.prevent_similar_usernames()
returns trigger
language plpgsql
as $$
declare
  normalized_username text := lower(trim(new.username));
  normalized_email text := lower(trim(new.email));
  email_local_part text := split_part(normalized_email, '@', 1);
  email_domain text := split_part(normalized_email, '@', 2);
begin
  if exists (
    select 1
    from public.users
    where id <> new.id
      and (
        lower(trim(username)) = normalized_username
        or lower(trim(email)) = normalized_email
        or (
          least(length(username), length(new.username)) >= 6
          and (
            normalized_username like lower(trim(username)) || '%'
            or lower(trim(username)) like normalized_username || '%'
          )
        )
        or (
          split_part(lower(trim(email)), '@', 2) = email_domain
          and least(length(split_part(lower(trim(email)), '@', 1)), length(email_local_part)) >= 6
          and (
            email_local_part like split_part(lower(trim(email)), '@', 1) || '%'
            or split_part(lower(trim(email)), '@', 1) like email_local_part || '%'
          )
        )
      )
  ) then
    raise exception 'An account with this email or username already exists.'
      using errcode = '23505';
  end if;

  return new;
end;
$$;
