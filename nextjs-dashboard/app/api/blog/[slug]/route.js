import { NextResponse } from "next/server";

const mockPosts = [
    { slug: 'first-article', title: 'My First Article' },
    { slug: 'second-article', title: 'My Second Article' }
];

export async function GET(request, { params }) {
    const { slug } = await params;
    const post = mockPosts.find(p => p.slug === slug);

    if(!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    return NextResponse.json(post);
}