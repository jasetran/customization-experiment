// routes/api/upload-url/+server.js
import { json } from '@sveltejs/kit';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { REGION, ACCESS_KEY_ID, SECRET_ACCESS_KEY, S3_BUCKET_NAME } from "$env/static/private";

const s3Client = new S3Client({
  region: REGION || 'us-west-1',
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = S3_BUCKET_NAME;

export const POST = async ({ request }) => {
  try {
    const { fileName, contentType, userId} = await request.json();

    // Validation
    if (!fileName) {
      return json(
        { error: 'fileName is required' }, 
        { status: 400 }
      );
    }

    if (!userId) {
      return json(
        { error: 'userId is required' }, 
        { status: 400 }
      );
    }

    // Generate unique file key
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2);
    const safeFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    
    const key = `uploads/${userId}/${timestamp}_${randomId}_${safeFileName}`;

    console.log({BUCKET_NAME});

    // Create the command for signing
    const putObjectCommand = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      ContentType: contentType || 'application/octet-stream',
      Metadata: {
        userId: userId,
        originalFileName: fileName,
        uploadedAt: new Date().toISOString(),
      },
    });

    // Generate signed URL (expires in 15 minutes)
    const signedUrl = await getSignedUrl(s3Client, putObjectCommand, {
      expiresIn: 900, // 15 minutes
    });

    // Return the signed URL and metadata
    return json({
      success: true,
      uploadUrl: signedUrl,
      key: key,
      bucket: BUCKET_NAME,
      fields: {
        key: key,
        'Content-Type': contentType || 'application/octet-stream',
      },
      expiresAt: new Date(Date.now() + 900 * 1000).toISOString(),
    });

  } catch (error) {
    console.error('Error generating signed URL:', error);
    return json(
      { error: 'Failed to generate upload URL', details: error.message },
      { status: 500 }
    );
  }
};