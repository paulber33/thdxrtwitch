export * as Realtime from "./realtime";
import {
  IoTDataPlaneClient,
  PublishCommand,
} from "@aws-sdk/client-iot-data-plane";
import { Config } from "sst/node/config";

const client = new IoTDataPlaneClient({});

export interface Events {
  "twitch.channel.follow": {
    user_id: string;
    user_login: string;
    user_name: string;
    broadcaster_user_id: string;
    broadcaster_user_login: string;
    broadcaster_user_name: string;
  };
  "twitch.channel.subscribe": {
    test: string;
  };
  "twitch.channel.channel_points_custom_reward_redemption.add": {
    user_id: string;
    user_login: string;
    reward: {
      title: string;
    };
  };
  "twitch.channel.update": {
    title: string;
  };
}

export function publish<T extends keyof Events>(
  type: T,
  properties: Events[T]
) {
  const payload = {
    type: type,
    properties,
  };
  console.log("Publishing", payload);
  return client.send(
    new PublishCommand({
      payload: Buffer.from(JSON.stringify(payload)),
      topic: `${Config.APP}/${Config.STAGE}/${type}`,
    })
  );
}
