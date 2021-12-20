const production = {
    db: process.env.DB || "mongodb+srv://varinder:testcrud@cluster0.czlrz.mongodb.net/fueling?retryWrites=true&w=majority",
    PORT: process.env.PORT || 3000,
    secret: process.env.JWT_TOKEN
};

const development = {
    db: process.env.DB || "mongodb+srv://varinder:testcrud@cluster0.czlrz.mongodb.net/fueling?retryWrites=true&w=majority",
    PORT: process.env.PORT || 3011,
    secret: process.env.JWT_TOKEN
};

module.exports =
    process.env.NODE_ENV === "production" ? production : development;