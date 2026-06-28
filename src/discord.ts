/**
 * putaindenenuphar.fr - Copyright (C) 2026 Projet ℕénuphar
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import { DiscordSDK } from "@discord/embedded-app-sdk";

const inIframe = window !== window.top;
const onDiscordDomain = window.location.hostname.endsWith(".discordsays.com");
const params = new URLSearchParams(window.location.search);
const hasDiscordParams = params.has("frame_id") && params.has("instance_id") && params.has("platform");

export async function discord() {
    let access_token;
    let sdk;

    if (!inIframe || !onDiscordDomain || !hasDiscordParams) {
        return {
            access_token,
            sdk,
        };
    }

    try {
        sdk = new DiscordSDK(import.meta.env.VITE_CLIENT_ID);
        await sdk.ready();

        const { code } = await sdk.commands.authorize({
            client_id: import.meta.env.VITE_CLIENT_ID,
            response_type: "code",
            state: "",
            prompt: "none",
            scope: [
                "identify",
                "rpc.activities.write"
            ],
        });

        access_token = (await fetch("/discord/token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
        }).then(response => response.json()))["access_token"];

        await sdk.commands.authenticate({ access_token });
        await sdk.commands.setActivity({ activity: { type: 0 } });
    } catch (e) {
        sdk = null;
        console.error(e);
    }

    return {
        access_token,
        sdk,
    };
}