-- Enable UUID extension
create extension if not exists "uuid-ossp";
create extension if not exists vector;

-- Enums
create type user_role as enum ('admin', 'collaborator', 'participant');
create type org_type as enum ('sponsor', 'school', 'other');
create type survey_type as enum ('pre', 'post', '3m', '6m');
create type chat_mode as enum ('coach', 'mentor');

-- Organizations Table
create table organizations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  type org_type not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Users Table (Extends Supabase Auth)
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role user_role default 'participant'::user_role,
  organization_id uuid references organizations(id),
  health_score float, -- 0 to 10 scale
  nps_last_rating int,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Workshops Table
create table workshops (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  date timestamp with time zone not null,
  status text default 'scheduled',
  organization_id uuid references organizations(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Surveys Table
create table surveys (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) not null,
  workshop_id uuid references workshops(id),
  type survey_type not null,
  answers_json jsonb not null default '{}'::jsonb,
  completed_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Chat Logs Table (For AI analysis)
create table chat_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id),
  mode chat_mode not null,
  message text not null, -- User query
  response text not null, -- AI response
  sentiment_score float, -- -1.0 to 1.0
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Embeddings for RAG (Optional for now)
create table documents (
  id uuid primary key default uuid_generate_v4(),
  content text,
  metadata jsonb,
  embedding vector(1536)
);

-- Policies (RLS)
alter table profiles enable row level security;
alter table organizations enable row level security;
alter table workshops enable row level security;
alter table surveys enable row level security;
alter table chat_logs enable row level security;

-- Simple policies for dev (Refine later)
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );
