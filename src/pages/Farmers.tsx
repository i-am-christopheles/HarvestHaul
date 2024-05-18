import React, {useState} from 'react';
import NavBar from '../components/NavBar';
import {Schema} from "../../amplify/data/resource.ts";
import {generateClient} from "aws-amplify/src/api";

const client = generateClient<Schema>();

const Farmers: React.FC = () => {
    const [profiles, setProfiles] = useState<Schema["Producer"]["type"][]>([]);
    const fetchProfiles = async () => {
        const { data: items, errors } = await client.models.Producer.list();
        console.log(errors);
        setProfiles(items);
    };

    fetchProfiles();
  return (
    <>
      <NavBar />
      <h1>Farmers</h1>
        <div>
            <ul>
                {profiles.map(({ id, name, region }) => (
                    <>
                        <li key={id}>Farm name: {name}</li>
                        <li key={id}>Region: {region}</li>
                    </>
                ))}
            </ul>
        </div>
    </>
  );
}
export default Farmers;