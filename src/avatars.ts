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
const ALLOWED_IMAGE_TYPES = [
    "image/avif",
    "image/gif",
    "image/jpeg",
    "image/png",
    "image/webp",
];

document.getElementById("avatar-input").addEventListener("change", e => {
    if (!e.target.files || !e.target.files[0]) {
        return;
    }

    const [file] = e.target.files;
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        alert("L'image téléversée a un format non supporté.");
        return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", ev => {
        document.getElementById("avatar").src = ev.target.result;
    });

    reader.readAsDataURL(file);
});