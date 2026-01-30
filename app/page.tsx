import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Dashboard from '@/components/dashboard'

export default async function Home() {
  // In production, we'll check authentication
  // For now, show the dashboard directly
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-cf-blue-50 to-cf-purple-50">
      <Dashboard />
    </div>
  )
}