-- Create Enum for Roles
CREATE TYPE public.user_role AS ENUM ('admin', 'employee');

-- Profiles Table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  birth_date DATE,
  phone TEXT,
  role public.user_role DEFAULT 'employee'::public.user_role,
  pin_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Farms Table
CREATE TABLE public.farms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  country TEXT,
  cattle_type TEXT,
  invite_code TEXT UNIQUE, -- Code for employees to join
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Farm Lots Table
CREATE TABLE public.farm_lots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Farm Members Table (Associates employees to a farm)
CREATE TABLE public.farm_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(farm_id, user_id)
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farm_lots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farm_members ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Farms Policies
CREATE POLICY "Admins can view their farms" ON public.farms
  FOR SELECT USING (auth.uid() = admin_id);

CREATE POLICY "Members can view their assigned farms" ON public.farms
  FOR SELECT USING (
    id IN (SELECT farm_id FROM public.farm_members WHERE user_id = auth.uid())
  );

CREATE POLICY "Admins can insert farms" ON public.farms
  FOR INSERT WITH CHECK (auth.uid() = admin_id);

CREATE POLICY "Admins can update their farms" ON public.farms
  FOR UPDATE USING (auth.uid() = admin_id);

CREATE POLICY "Admins can delete their farms" ON public.farms
  FOR DELETE USING (auth.uid() = admin_id);

-- Farm Lots Policies
CREATE POLICY "Admins can view their farm lots" ON public.farm_lots
  FOR SELECT USING (
    farm_id IN (SELECT id FROM public.farms WHERE admin_id = auth.uid())
  );

CREATE POLICY "Members can view lots of assigned farms" ON public.farm_lots
  FOR SELECT USING (
    farm_id IN (SELECT farm_id FROM public.farm_members WHERE user_id = auth.uid())
  );

CREATE POLICY "Admins can insert farm lots" ON public.farm_lots
  FOR INSERT WITH CHECK (
    farm_id IN (SELECT id FROM public.farms WHERE admin_id = auth.uid())
  );

CREATE POLICY "Admins can update their farm lots" ON public.farm_lots
  FOR UPDATE USING (
    farm_id IN (SELECT id FROM public.farms WHERE admin_id = auth.uid())
  );

CREATE POLICY "Admins can delete their farm lots" ON public.farm_lots
  FOR DELETE USING (
    farm_id IN (SELECT id FROM public.farms WHERE admin_id = auth.uid())
  );

-- Farm Members Policies
CREATE POLICY "Admins can view members of their farms" ON public.farm_members
  FOR SELECT USING (
    farm_id IN (SELECT id FROM public.farms WHERE admin_id = auth.uid())
  );

CREATE POLICY "Users can view their own memberships" ON public.farm_members
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can insert members" ON public.farm_members
  FOR INSERT WITH CHECK (
    farm_id IN (SELECT id FROM public.farms WHERE admin_id = auth.uid())
  );

CREATE POLICY "Users can join a farm (assuming they have invite_code logic handled elsewhere or open join for now)" ON public.farm_members
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can remove members" ON public.farm_members
  FOR DELETE USING (
    farm_id IN (SELECT id FROM public.farms WHERE admin_id = auth.uid())
  );

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_modtime BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_farms_modtime BEFORE UPDATE ON public.farms FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_farm_lots_modtime BEFORE UPDATE ON public.farm_lots FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
