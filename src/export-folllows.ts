import * as fs from 'fs';
import { TwitterApi } from 'twitter-api-v2';
import * as dotenv from 'dotenv';

dotenv.config();

if (typeof process.env.BEARER_TOKEN === 'undefined') {
    console.log(`The environmental variable "BEARER_TOKEN" must be set for this script to work`);
    process.abort();
}

if (!process.env.USER_NAME) {
    console.log(`The environmental variable "USER_NAME" must be set for this script to work`);
    process.abort();
}

const bearerToken = process.env.BEARER_TOKEN;
const username = process.env.USER_NAME;

async function main() {
    // Instantiate with desired auth type (here's Bearer v2 auth)
    const twitterClient = new TwitterApi(bearerToken);
    const fullClient = twitterClient.readOnly;
    const client = fullClient.v2;

    const user = await client.userByUsername(username);
    console.log({user});

    // 'created_at' | 'description' | 'entities' | 'id' | 'location' | 'name' | 'pinned_tweet_id' |
    // 'profile_image_url' | 'protected' | 'public_metrics' | 'url' | 'username' | 'verified' | 'withheld'

    const followees = await client.following(user.data.id, {
        asPaginator: true,
        max_results: 1000,
        "user.fields": ['description', 'entities', 'id', 'name', 'profile_image_url', 'protected', 'url', 'username', 'verified', 'withheld'],
    });

    let count = 0;
    const allFollowees: any[] = [];
    for await (const followee of followees) {
        allFollowees.push(followee);
        count++;
    }
    console.log(`${count} followees found`);

    const jsonContents: string = JSON.stringify(allFollowees, null, 4);
    fs.writeFileSync(`follows-${(new Date()).getTime()}.json`, jsonContents);
}


main().catch(console.error);
