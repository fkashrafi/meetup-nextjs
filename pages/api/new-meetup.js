import { MongoClient } from 'mongodb';
//  api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
    console.log("HANDLER REQ", req.method)
    // return
    let client = null;
    try {
        if (req.method === 'POST') {
            const data = req.body;
            client = await MongoClient.connect("mongodb+srv://fahad:PS5AnhJcEpBED4q8@cluster0.txfhk.mongodb.net/meetups?retryWrites=true&w=majority")
            console.log("server running")
            const db = client.db('meetups');
            const meetupsCollection = db.collection('meetups');
            const result = await meetupsCollection.insertOne(data);
            console.log("[result]", result);
            client.close();
            res.status(201).json({
                message: 'meetup inserted!'
            });
        }
    }
    catch (error) {
        console.log("error", error)
    } finally {
        client.close();
    }
}

export default handler;