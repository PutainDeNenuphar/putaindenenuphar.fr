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
const quotation = document.getElementById("quotation");
const colorPicker1 = document.getElementById("bgColorPicker1");
const colorPicker2 = document.getElementById("bgColorPicker2");

function updateBackgroundGradient() {
    quotation.style.background = `linear-gradient(
        135deg,
        ${colorPicker1.value},
        ${colorPicker2.value}
    )`;
}

colorPicker1.addEventListener("input", updateBackgroundGradient);
colorPicker2.addEventListener("input", updateBackgroundGradient);