const production = {
    db: process.env.DB || "mongodb+srv://varinder:testcrud@cluster0.czlrz.mongodb.net/fueling?retryWrites=true&w=majority",
    PORT: process.env.PORT || 3000,
    secret: process.env.JWT_TOKEN,
    pass_secret: process.env.PASS_JWT_TOKEN,
    bucketName: process.env.BUCKET_NAME,
    bucketDpName: process.env.BUCKET_DP_NAME,
    s3Key: process.env.S3_KEY,
    s3Secret: process.env.S3_SECRET,
    aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
    aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
    aws_ses_region: process.env.AWS_SES_REGION,
    email_from: process.env.EMAIL_FROM,
    email_secret: process.env.EMAIL_SECRET,
    host: process.env.HOST || "http://172.0.0.1",
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
    stripe_secret_key: process.env.STRIPE_SECRET_KEY,
    basic_product_id:process.env.BASIC_PRODUCT_ID,
    basic_price_id:process.env.BASIC_PRICE_ID,
    pro_product_id:process.env.PRO_PRODUCT_ID,
    enterprise_product_id:process.env.ENTERPRISE_PRODUCT_ID
};

const development = {
    db: process.env.DB || "mongodb+srv://varinder:testcrud@cluster0.czlrz.mongodb.net/fueling?retryWrites=true&w=majority",
    PORT: process.env.PORT || 3011,
    secret: process.env.JWT_TOKEN,
    pass_secret: process.env.PASS_JWT_TOKEN,
    bucketName: process.env.BUCKET_NAME,
    bucketDpName: process.env.BUCKET_DP_NAME,
    s3Key: process.env.S3_KEY,
    s3Secret: process.env.S3_SECRET,
    aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
    aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
    aws_ses_region: process.env.AWS_SES_REGION,
    email_from: process.env.EMAIL_FROM,
    email_secret: process.env.EMAIL_SECRET,
    host: process.env.HOST | "http://localhost:3001",
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
    stripe_secret_key: process.env.STRIPE_SECRET_KEY,
    basic_product_id:process.env.BASIC_PRODUCT_ID,
    basic_price_id:process.env.BASIC_PRICE_ID,
    pro_product_id:process.env.PRO_PRODUCT_ID,
    enterprise_product_id:process.env.ENTERPRISE_PRODUCT_ID
};

module.exports =
    process.env.NODE_ENV === "production" ? production : development;