with similar_users as (
  select
    users.id,
    'user' || substr(replace(users.id::text, '-', ''), 1, 8) as new_username
  from public.users as users
  where exists (
    select 1
    from public.users as existing_users
    where existing_users.id <> users.id
      and (
        existing_users.created_at < users.created_at
        or (
          existing_users.created_at = users.created_at
          and existing_users.id::text < users.id::text
        )
      )
      and (
        lower(existing_users.username) = lower(users.username)
        or (
          length(existing_users.username) >= 6
          and lower(users.username) like lower(existing_users.username) || '%'
        )
        or (
          length(users.username) >= 6
          and lower(existing_users.username) like lower(users.username) || '%'
        )
      )
  )
)
update public.users as users
set username = similar_users.new_username
from similar_users
where users.id = similar_users.id;

update public.comments as comments
set commentor_name = users.username
from public.users as users
where comments.user_id = users.id
  and comments.commentor_name <> users.username;

create or replace function public.prevent_similar_usernames()
returns trigger
language plpgsql
as $$
declare
  normalized_username text := lower(new.username);
begin
  if exists (
    select 1
    from public.users
    where id <> new.id
      and (
        lower(username) = normalized_username
        or (
          length(username) >= 6
          and normalized_username like lower(username) || '%'
        )
        or (
          length(new.username) >= 6
          and lower(username) like normalized_username || '%'
        )
      )
  ) then
    raise exception 'An account with this email or username already exists.'
      using errcode = '23505';
  end if;

  return new;
end;
$$;

drop trigger if exists prevent_similar_usernames_on_users on public.users;

create trigger prevent_similar_usernames_on_users
before insert or update of username on public.users
for each row
execute function public.prevent_similar_usernames();
