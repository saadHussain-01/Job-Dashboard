'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData) {
  const supabase = createClient()

 const { email, password } = formData;

  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  })

  if (error) {
    console.log(error)
    redirect('/error')
  }

  revalidatePath('/dashboard', 'layout')
  redirect('/dashboard')
}

