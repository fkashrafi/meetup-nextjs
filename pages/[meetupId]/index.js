import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";
import Layout from "../../components/layout/Layout";
import MeetupDetail from "../../components/meetups/MeetupDetail";

export default function MeetupIdPage(props) {
    return (
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta 
                name="discription"
                content={props.meetupData.description}
                 />
            </Head>
            <Layout>
                {props?.meetupData && <MeetupDetail
                    image={props.meetupData.image}
                    title={props.meetupData.title}
                    address={props.meetupData.address}
                    description={props.meetupData.description}
                />}
            </Layout>
        </Fragment>
    );
}

export async function getStaticPaths() {
    const client = await MongoClient.connect("mongodb+srv://fahad:PS5AnhJcEpBED4q8@cluster0.txfhk.mongodb.net/meetups?retryWrites=true&w=majority")
    console.log("server running")
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
    console.log("[MEET UPS]", meetups);
    client.close();


    return {
        fallback: false,
        paths: meetups.map((meetup) => ({
            params: {
                meetupId: meetup._id.toString()
            }
        }))
    }
}

export async function getStaticProps(contex) {
    const { meetupId } = contex.params;

    const client = await MongoClient.connect("mongodb+srv://fahad:PS5AnhJcEpBED4q8@cluster0.txfhk.mongodb.net/meetups?retryWrites=true&w=majority")
    console.log("server running")
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const selectedMeetup = await meetupsCollection.findOne({
        _id: ObjectId(meetupId)
    });
    console.log("selectedMeetup", selectedMeetup)
    client.close();

    return {
        props: {
            meetupData: {
                image: selectedMeetup.image,
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                description: selectedMeetup.description,
                id: selectedMeetup._id.toString()
            }
        }
    }

}