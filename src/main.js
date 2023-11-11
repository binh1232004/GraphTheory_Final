import Draw from "./draw";
import CNS from "./constant";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const draw = new Draw(canvas, ctx);
canvas.width = CNS.WIDTH;
canvas.height = CNS.HEIGHT;
document.addEventListener("DOMContentLoaded", () => {
    console.log("Hello");
})