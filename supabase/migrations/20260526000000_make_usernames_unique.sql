-- Existing duplicate usernames are renamed before the unique index is added.
with duplicate_users as (
  select
    id,
    row_number() over (partition by lower(username) order by created_at, id) as duplicate_number
  from public.users
)
update public.users as users
set username = users.username || '_' || substr(replace(users.id::text, '-', ''), 1, 8)
from duplicate_users
where users.id = duplicate_users.id
  and duplicate_users.duplicate_number > 1;

update public.comments as comments
set commentor_name = users.username
from public.users as users
where comments.user_id = users.id
  and comments.commentor_name <> users.username;

create unique index if not exists users_username_unique_idx
  on public.users (lower(username));
