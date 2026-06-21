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
import { snapdom } from "@zumer/snapdom";
import { discord } from "./discord";

const discordInstance = await discord();
const post = document.querySelector<HTMLDivElement>("#post")!;
const colorToolbar = document.querySelector<HTMLDivElement>("#color-toolbar")!;
const shareButton = document.querySelector<HTMLDivElement>("#share-button")!;

shareButton.addEventListener("click", async () => {
    shareButton.classList.remove("hover:bg-[#3B3D3E]");
    colorToolbar.style.display = "none";

    await new Promise(resolve => {
        setTimeout(resolve, 100);
    });

    const image = await snapdom(post);
    const filename = `${crypto.randomUUID()}.png`;

    if (discordInstance.sdk) {
        if (!discordInstance.access_token) {
            console.error("The code was not exchanged for a token usable by Discord's SDK.");
            return;
        }

        const body = new FormData();
        body.append("file", await image.toBlob({ type: "png" }), filename);

        const { attachment } = await fetch(`https://discord.com/api/applications/${discordInstance.sdk.clientId}/attachment`, {
            method: "POST",
            headers: { Authorization: `Bearer ${discordInstance.access_token}` },
            body,
        }).then(response => response.json());
        await discordInstance.sdk.commands.openShareMomentDialog({ mediaUrl: attachment.url });
    } else {
        await image.download({
            format: "png",
            filename,
        });
    }

    shareButton.classList.add("hover:bg-[#3B3D3E]");
    colorToolbar.style.display = "";
});