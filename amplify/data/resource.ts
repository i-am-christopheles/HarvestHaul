import {type ClientSchema, a, defineData} from "@aws-amplify/backend";

const schema = a.schema({
    Producer: a
        .model({
            id: a.string(),
            farm_name: a.string(),
            region: a.string(),
            address: a.string(),
            community: a.string(),
            postalCode: a.string(),
            updatedAt: a.string(),
            createdAt: a.string(),
            products: a.customType({
                product: a.string(),
                items: a.customType({
                    item: a.string(),
                    price: a.string(),
                    unit_size: a.string()
                })
            })
        })
    })
    .authorization((allow) => [allow.publicApiKey()]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: "apiKey",
        // API Key is used for a.allow.public() rules
        apiKeyAuthorizationMode: {
            expiresInDays: 30,
        },
    },
});
