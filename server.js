import "dotenv/config"
import app from "./app.js"

// Terminate process on unhandled rejections and uncaught exceptions
process.on('unhandledRejection', (err) => {
    console.log(err.name);
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');

    process.exit(1);
});

process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name);

    process.exit(1);
});

// Run App
const port = process.env.PORT || 5100

try {
    //TODO: Add DB Connection
    // mongoose
    //     .connect(process.env.MONGO_URL, {
    //         useNewUrlParser: true,
    //         useCreateIndex: true,
    //         useFindAndModify: false,
    //     })
    //     .then(() => {
    //         console.log('DB Connection Successful!');
    //     });
    app.listen(port, () => {
        console.log(`Server running on PORT ${port}`)
    })
} catch (error) {
    console.log(error)
    process.exit(1)
}
