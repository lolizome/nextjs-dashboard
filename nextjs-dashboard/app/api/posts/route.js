import { NextResponse } from "next/server";

const mockPosts = [
    { slug: 'first-article', title: 'My First Article' },
    { slug: 'second-article', title: 'My Second Article' }
];

export async function GET() {
    return NextResponse.json(mockPosts);
}