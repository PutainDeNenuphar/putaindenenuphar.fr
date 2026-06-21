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
const hashtagsSpan = document.getElementById("hashtags");
const sounds = [
    "charlie-kirk",
    "nggyu",
    "urss",
];

const audios = {};
for (const sound of sounds) {
    audios[sound] = new Audio(`/sounds/${sound}.mp3`);
}

hashtagsSpan.addEventListener("keyup", e => {
    for (const sound of sounds) {
        if (hashtagsSpan.innerText.toLowerCase().includes(`#${sound}`)) {
            audios[sound].play();
        } else {
            audios[sound].pause();
            audios[sound].currentTime = 0;
        }
    }
});