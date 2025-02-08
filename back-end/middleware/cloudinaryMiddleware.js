// Duration Explanation:
//                1)Jab request process ho rahi hoti hai aur file Multer ke memoryStorage se Cloudinary pe upload hoti hai, 
//                  tab tak woh RAM mein hoti hai.
//                2)Upload process complete hone ke baad, file ko memory se delete kar diya jata hai.
//                3)Toh, basically file memory mein utni der tak hoti hai jab tak aap upload process complete nahi kar lete. 
//                  Jaise hi upload complete hoti hai, Multer file ko memory se remove kar deta hai.

// Example Process:
//                1)Client uploads a file (via Multer).
//                2)Multer stores the file in memory (as a buffer).
//                3)File is then uploaded to Cloudinary.
//                4)Once uploaded, the file is removed from memory after Cloudinary responds with the file URL.
// Memory Lifecycle:
//                1)File RAM mein temporary rehti hai, request complete hone tak.
//                2)Multer automatically memory clean kar deta hai once the file is uploaded to the external server (like Cloudinary).

// *********************************************************************************************************************************************
// Multer library ko import karte hain, jo file uploads handle karta hai
const multer = require('multer');

// Cloudinary configuration ko import kar rahe hain, jo Cloudinary ke API interaction ke liye use hota hai
const cloudinary = require('../utils/cloudinary');  // Cloudinary config

// UUID library ko import kar rahe hain, jo unique file names generate karne ke liye use hoti hai
const { v4: uuidv4 } = require('uuid');  // For generating unique file names

// Set file size limit (in bytes) — yahan 5MB size limit set kiya gaya hai
const MAX_FILE_SIZE = 2000 * 1024 * 1024; // 5 MB (Aap is limit ko apne requirement ke according adjust kar sakte hain)

// Multer ka **memoryStorage** option use karte hain, jisme file ko server ke memory (RAM) mein store kiya jata hai
const storage = multer.memoryStorage();  // Memory storage


// Multer ki configuration mein, hum storage aur limits set kar rahe hain
const upload = multer({
    storage: storage,  // Memory storage ka use karenge
    limits: { fileSize: MAX_FILE_SIZE },  // File size limit ko set karte hain (5MB)
    // File type validation ke liye fileFilter function use kar rahe hain
    fileFilter: (req, file, cb) => {
        // Allowed MIME types ko list kar rahe hain (sirf image files allow karenge)
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif','image/webp'];
        // Agar file ka MIME type allowed types mein nahi hai, toh error throw karte hain
        if (!allowedMimeTypes.includes(file.mimetype)) {
            // Error ko reject karte hain aur file ko reject karte hain
            return cb(new Error('Only image files are allowed!'), false);
        }
        // Agar file type valid hai, toh file ko accept karte hain
        cb(null, true);
    }
});

// Single file upload middleware. Yeh file ko upload karega (name: 'file' field se)
// const uploadSingle = upload.single('profilePhoto'); only ek file se hi file upload hi skti hai
const uploadSingle = (fieldName) => { // dynamic file name aayega
    return (req, res, next) => {
        const uploader = upload.single(fieldName); // Field name dynamically pass
        uploader(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                // Multer-specific error handling
                return res.status(400).json({ error: err.message });
            } else if (err) {
                // General error handling
                return res.status(400).json({ error: err.message });
            }
            // File uploaded successfully, move to the next middleware
            next();
        });
    };
};

const uploadFields = (fieldNames) => {
    return (req, res, next) => {
        // Dynamically create the fields array based on the provided field names.
        // This will be used to configure Multer to handle specific file fields.
        const fields = fieldNames.map((fieldName) => ({
            name: fieldName,   // Name of the file field in the form
            maxCount: 2        // Maximum number of files allowed per field (here we allow 1 file per field)
        }));

        // Multer's upload.fields() method is used to process multiple fields with files
        // 'fields' is the array that tells Multer what fields to expect in the request
        const uploader = upload.fields(fields); // This is the function responsible for handling file uploads.

        // Log a message indicating that Multer is now processing the request
        console.log("Request is being processed by multer...");

        // Now call the 'uploader' function (which is the Multer middleware)
        // This is where Multer will process the incoming request (i.e., handling files and fields).
        uploader(req, res, function (err) {
            // If there is an error, check if it's a Multer-specific error.
            if (err instanceof multer.MulterError) {
                // Log the error for debugging purposes
                console.log("Multer error:", err);

                // Send a response with a 400 status code and the error message
                // This will stop further execution of the middleware chain
                return res.status(400).json({ error: err.message });
            } else if (err) {
                // For any other error (non-Multer error)
                // Log it for debugging
                console.log("General error:", err);

                // Send a response with a 400 status code and the error message
                return res.status(400).json({ error: err.message });
            }

            // After the files are successfully processed, log the files and fields in the request
            // 'req.files' will contain the uploaded files, and 'req.body' will contain other form fields.
            console.log("Files and fields after multer processing:", req.files, req.body);

            // Proceed to the next middleware (e.g., the 'fillUserInformation' function).
            // This ensures that Multer's job is complete and we can continue processing the request.
            next();  // Continue to the next middleware (in this case, `fillUserInformation`)
        });
    };
};

const uploadMultiple = upload.array('files',5);

// Cloudinary pe file ko upload karne ke liye function
const uploadToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        // Cloudinary ke upload_stream function ka use kar rahe hain, jo file ko stream ke through upload karta hai
        cloudinary.uploader.upload_stream(
            {
                folder: 'uploads',  // Cloudinary mein 'uploads' folder mein store karenge
                public_id: uuidv4(),  // Unique public_id generate karenge (UUID se)
                resource_type: 'auto',  // File ka type automatically detect hoga (image/video/etc.)
            },
            (error, result) => {
                if (error) {
                    // Agar upload mein error hota hai, toh promise ko reject karte hain
                    console.log("error upload me hai");
                    return reject(error);
                }
                // Agar upload successful hota hai, toh Cloudinary se response ko resolve karte hain
                resolve(result);  // Cloudinary response (file URL aur metadata)
            }
        ).end(file.buffer);  // File ko memory se buffer ke through upload karte hain
    });
};

// Exports: uploadSingle middleware aur uploadToCloudinary function ko export kar rahe hain
module.exports = {
    uploadSingle,        // Single file upload middleware  #### // jis file se(routes me) limitation lagani hai en function ko require kro or use kro as a middleware
    uploadFields,        // upload multiple image from different input fields
    uploadMultiple,     // Multiple file upload middleware #### // jis file se(routes me) limitation lagani hai en function ko require kro or use kro as a middleware
    uploadToCloudinary // Function to upload file to Cloudinary #### // jis file se(controllers me) image upload krni hai en function ko require kro or use kro
};

