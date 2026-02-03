import { notFound } from 'next/navigation';

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://nextjs-dashboard-nine-psi-50.vercel.app' : 'http://localhost:3000';

async function fetchJson(url, options) {
    const res = await fetch(url, options);
    
    if (!res.ok) return null;

    const contentType = res.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
        console.error(`Expected JSON from ${url}, but got ${contentType}`);
        return null;
    }
    return res.json();
}
 
export async function generateStaticParams() {
    const posts = await fetchJson(`${baseUrl}/api/posts`);

    return posts ? posts.map((post) => ({ slug: post.slug })) : [];
}
 
export async function generateMetadata({ params }) {
    const { slug } = await params;
    const data = await fetchJson(`${baseUrl}/api/blog/${slug}`);
    
    if (!data) return { title: 'Post not found.' };

    return {
        title: `${data.title} | My Site`,
    };
}
 
export default async function BlogPost({ params }) {
    const { slug } = await params;

    const blog = await fetchJson(`${baseUrl}/api/blog/${slug}`, {
        next: { revalidate: 60 }
    });

    if(!blog) notFound();

    return (
        <article>
            <div>
                <h1>{blog.title}</h1>
                <p>{blog.text}</p>
                <small>Generated at: {new Date().toLocaleTimeString()}</small>
            </div>
        </article>
    );
}
