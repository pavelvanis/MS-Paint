
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const brushTypes = {
    normal: {
        color: '#000000',
        size: 1,
        style: 'round'
    },
    airbrush: {
        color: '#000000',
        size: 15,
        style: 'square'
    },
    calligraphy: {
        color: '#000000',
        size: 5,
        style: 'flat'
    }
};

let selectedBrush = 'calligraphy';


const brushWeightP = document.getElementById('brushWeight');
const brushStyleP = document.querySelectorAll('.brushStyle');
const colorP = document.getElementById('color');
const save = document.getElementById('save');
const load = document.getElementById('load');
const clear = document.getElementById('clear');

save.addEventListener('click', () => {
    ctx.save();
    console.log(`save`);
})

load.addEventListener('click', () => {
    ctx.fillRect(150, 40, 100, 100);
    ctx.restore();
})

clear.addEventListener('click', () => {
    ctx.reset();
    console.log(`Reset`);
})


brushWeightP.addEventListener('change', () => {
    brushTypes[selectedBrush].size = brushWeightP.value;
    console.log(`${brushTypes[selectedBrush].size}`)
});


brushStyleP.forEach(brush => {
    brush.addEventListener('click', () => {
        selectedBrush = toString(brush.value);
        console.log(`brush style: ${selectedBrush}`)
});


})
colorP.addEventListener('change', () => {
    brushTypes[selectedBrush].color = colorP.value;
    console.log(`color: ${brushTypes[selectedBrush].color}`)
});


let drawing = false;
let lastX = 0;
let lastY = 0;

canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    console.log(`mosedown '${drawing}'`);
    lastX = e.offsetX;
    lastY = e.offsetY;
});

canvas.addEventListener("mousemove", (e) => {
    if (!drawing) return;
    console.log(`drawing  ${brushTypes[selectedBrush].style}`)
    ctx.lineWidth = brushTypes[selectedBrush].size;
    ctx.strokeStyle = brushTypes[selectedBrush].color;
    ctx.setLineDash(brushTypes[selectedBrush].style === 'square' ? [2, 2] : []);
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    lastX = e.offsetX;
    lastY = e.offsetY;
});


canvas.addEventListener("mouseup", () => {
    drawing = false;
    console.log(`mosedown '${drawing}'`);

});
