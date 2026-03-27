import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://www.weavefox.cn/api/open/v1/supabase_proxy/2890';
const SUPABASE_ANON_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzcxOTk5NDA3LCJleHAiOjEzMjgyNjM5NDA3fQ.PpDJ1BV-AVp9oq83ea6Yw1AhYLMRivM2moP9b8w_leo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);