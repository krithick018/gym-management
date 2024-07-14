const { MongoClient } = require('mongodb');
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "add your mongodb atlas connnection string here";  
const client = new MongoClient(uri);
var status = "1";

exports.insertlocal = async function (fullName, Aadhaarcard, email, phoneNumber, weight, options, gender, passdata) {
    console.log(`${fullName} + ${Aadhaarcard} + ${email} + ${phoneNumber} + ${weight} + ${options} + ${gender} + ${passdata}`);
    async function run() {
        try {
            await client.connect();
            const database = client.db("Kultfitdb"); //replace with your database name 
            const registration = database.collection("registration"); // replace with your collection name  

            const doc = JSON.parse(passdata);
            const result = await registration.insertOne(doc); // replace with your collection name  


            console.log("Number of documents inserted: " + result.insertedCount);

            if (!result) {
                status = "0";
            }

        } finally {
            await client.close();
        }
    }
    await run().catch(console.dir);
    return Date() + status;
}
