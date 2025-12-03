import { cloudinary } from '@/lib/cloudinary';

export async function POST(req: Request) {
    const publicId = await req.json();

    try {
        await cloudinary.v2.uploader.destroy(publicId);
        return new Response(null, { status: 200 });
    } catch (err) {
        console.error('Cloudinary delete failed', err);
        return new Response("Failed to delete", { status: 500 });
    }
}