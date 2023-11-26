import { NextResponse } from 'next/server'
import { getToken } from './lib/data'
import { jwtVerify } from 'jose'

export const config = {
    matcher: '/dashboard/:path*',
}

export async function middleware(request) {
    const token = getToken()
    const { pathname } = request.nextUrl

    if (pathname.includes('/dashboard')) {
        if (token === undefined) {
            return NextResponse.redirect(new URL('/login'), request.url)
        }

        try {
            const { payload } = await jwtVerify(token, new TextDecoder().decode("b5a1453zxk"))
            console.log(payload)
            return NextResponse.next()
        } catch (error) {
            console.error(error)
            return NextResponse.redirect(new URL('/login'), request.url)
        }
    }

    return NextResponse.next()
}