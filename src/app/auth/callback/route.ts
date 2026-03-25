import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    const error_param = requestUrl.searchParams.get('error')
    const error_description = requestUrl.searchParams.get('error_description')
    const redirectTo = requestUrl.searchParams.get('redirectTo') || '/dashboard'
    const origin = requestUrl.origin

    console.log('=== AUTH CALLBACK DEBUG ===')
    console.log('Origin:', origin)
    console.log('Code present:', !!code)
    console.log('Error param:', error_param)
    console.log('Error description:', error_description)
    console.log('RedirectTo:', redirectTo)
    console.log('Full URL:', request.url)
    console.log('===========================')

    // If Supabase/Google returned an error directly
    if (error_param) {
        console.error('OAuth provider error:', error_param, error_description)
        return NextResponse.redirect(
            `${origin}/login?error=${encodeURIComponent(error_description || error_param)}`
        )
    }

    if (code) {
        const supabase = await createClient()
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)

        console.log('Exchange result - User:', data?.user?.email)
        console.log('Exchange result - Error:', error?.message)

        if (!error) {
            // Redirect to the requested page or dashboard
            return NextResponse.redirect(`${origin}${redirectTo}`)
        }

        console.error('Code exchange failed:', error.message)
        return NextResponse.redirect(
            `${origin}/login?error=${encodeURIComponent(error.message)}`
        )
    }

    // No code provided
    console.error('No code in callback URL')
    return NextResponse.redirect(`${origin}/login?error=no_code_provided`)
}
