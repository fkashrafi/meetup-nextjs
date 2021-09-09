import { Fragment, useEffect, useState } from "react";
import { MongoClient } from 'mongodb';

import MeetupList from "../components/meetups/MeetupList";
import Layout from "../components/layout/Layout";
import Head from "next/head";

const TEMP_DATA = [
    {
        id: "m1",
        title: "first meet up",
        image: "https://blog.close.com/content/images/hubfs/315483/customer-meetup.jpeg",
        address: "some address 123, some city",
        description: "This is first meet up."
    },
    {
        id: "m2",
        title: "second meet up",
        image: "https://blog.close.com/content/images/hubfs/315483/customer-meetup.jpeg",
        address: "some address 123, some city",
        description: "This is second meet up."
    }
]

function HomePage(props) {
    const [loadedMeetup, setLoadedMeetup] = useState([]);

    useEffect(() => {
        setLoadedMeetup(TEMP_DATA);
    }, []);

    return (
        <Fragment>
            <Head>
                <title>Meetup</title>
                <meta name="discription"
                    content="Meetup app on next js"
                />
            </Head>
            <Layout>
                <MeetupList meetups={props.meetups} />
            </Layout>
        </Fragment>
    );
}

// export async function getServerSideProps(contex) {
// const {req,res} = contex;
//     return {
//         props: {
//             meetups: TEMP_DATA
//         }
//     };
// }

export async function getStaticProps() {
    // fetch data from an API
    const client = await MongoClient.connect("mongodb+srv://fahad:PS5AnhJcEpBED4q8@cluster0.txfhk.mongodb.net/meetups?retryWrites=true&w=majority")
    console.log("server running")
    const db = client.db('meetups');
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find().toArray();
    client.close();
    return {
        props: {
            meetups:
                // TEMP_DATA
                meetups.map((meetup) => ({
                    image: meetup.image,
                    address: meetup.address,
                    title: meetup.title,
                    description: meetup.description,
                    id: meetup._id.toString()
                })
                )
        },
        revalidate: 1
    }

}

export default HomePage;

// 6010 8203 0571 4231 921