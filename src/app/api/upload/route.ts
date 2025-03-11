import { v2 as cloudinary } from "cloudinary";
import { Buffer } from "buffer";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const image = formData.get("file") as File | null;
        const pathName = formData.get("pathName") as string || "uploads";

        if (!image) {
            return Response.json({ error: "No file provided" }, { status: 400 });
        }
 

      
        const MAX_SIZE = 5 * 1024 * 1024;
        if (image.size > MAX_SIZE) {
            return Response.json(
                { error: "الصوره حجمها اكبر من 5 ميجا" },
                { status: 400 },
            );
        }

 
        const buffer = await image.arrayBuffer();
        const base64Image = `data:${image.type};base64,${Buffer.from(buffer).toString("base64")}`;


        const uploadResponse = await cloudinary.uploader.upload(base64Image, {
            folder: pathName,
            transformation: [{ width: 1500, height: 1500, crop: "scale" }],
            resource_type: "image",
        });

        console.log("✅ Cloudinary Response:", uploadResponse);
        return Response.json({ url: uploadResponse.secure_url });
    } catch (error: any) {
        console.error("❌ Full Error Details:", error);
        return Response.json(
            {
                error: "فشل في رفع الصورة",
                message: error.message || "حدث خطأ غير متوقع",
            },
            { status: 500 },
        );
    }
}








