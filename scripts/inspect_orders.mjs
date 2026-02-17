#!/usr/bin/env node
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const env = fs.readFileSync('.env.local','utf8');
env.split('\n').filter(l=>l && !l.startsWith('#')).forEach(l=>{const i=l.indexOf('='); if(i>0) process.env[l.slice(0,i)]=l.slice(i+1)});

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing env');
  process.exit(2);
}

const sup = createClient(SUPABASE_URL, SUPABASE_KEY);

(async ()=>{
  const { data, error } = await sup.from('orders').select('id,order_number,email,total,status,created_at,items').order('created_at', { ascending: false }).limit(20);
  if (error) {
    console.error('Supabase error:', error);
    process.exit(3);
  }
  console.log(JSON.stringify(data, null, 2));
})();
