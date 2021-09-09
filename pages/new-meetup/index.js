import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import Layout from "../../components/layout/Layout";
import { useRouter } from "next/router";
import Head from "next/head";
import { Fragment } from "react";

export default function NewMeetupPage() {

    const router = useRouter();

    async function addMeetupHandler(enterMeetupData) {
        const responce = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enterMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await responce.json();
        //await responce 
        console.log("[addMeetupHandler]", data);
        router.push('/');
    }

    return (
        <Fragment>
            <Head>
                <title>Add Meetup</title>
                <meta
                    name="discription"
                    content="New Meetup form"
                />
            </Head>
            <Layout>
                <NewMeetupForm onAddMeetup={addMeetupHandler} />
            </Layout>
        </Fragment>
    );
}
