import React, {useEffect, useState} from 'react';
import NavBar from '../components/NavBar';
import type { Schema } from '../../amplify/data/resource';
import {generateClient} from "aws-amplify/data";

const client = generateClient<Schema>();


const Profile: React.FC = () => {
    const [profiles, setProfiles] = useState<Schema["Producer"]["type"][]>([]);
    const fetchProfiles = async () => {
        const { data: items, errors } = await client.models.Producer.list();
        console.log(errors);
        setProfiles(items);
    };

    useEffect(() => {
        fetchProfiles();
    }, []);

    const createProfile = async () => {
        await client.models.Producer.create({
            name: window.prompt("Name?"),
            region: window.prompt("Region?"),
        });

        fetchProfiles();
    }
    return (
    <>
      <NavBar />
        <div>
            <button onClick={createProfile}>Add new Profile</button>
            <ul>
                {profiles.map(({ id, name, region }) => (
                    <>
                        <li key={id}>{name}</li>
                        <li key={id}>{region}</li>
                    </>
                ))}
            </ul>
        </div>
    </>
  );
}
export default Profile;