import { useState, useEffect } from "react";
import type { Schema } from "../amplify/data/resource.ts";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

export default function ProfileList() {
    const [profiles, setProfiles] = useState<Schema["Producer"]["type"][]>([]);

    const fetchProfiles = async () => {
        const { data: items, errors } = await client.models.Producer.list();
        console.log(errors)
        setProfiles(items);
    };

    useEffect(() => {
        fetchProfiles();
    }, []);

    const createProfile = async () => {
        await client.models.Producer.create({
            name: window.prompt("Producer name?"),
        });

        fetchProfiles();
    }

    return (
        <div>
            <button onClick={createProfile}>Add new profile</button>
            <ul>
                {profiles.map(({ id, name }) => (
                    <li key={id}>{name}</li>
                ))}
            </ul>
        </div>
    );
}