$('document').ready(function() {
    window.addEventListener('message', function(event) {
        switch(event.data.action) {
            case 'start':
                draw(event.data)
                break;
        }
    });
});

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let W = canvas.width;
let H = canvas.height;
let time = 0;
let degrees = 0;
let new_degrees = 0;
let addition = 0
let color = "rgb(220, 0, 0)";
let bgcolor = "rgba(0, 0, 0, 0.45)";
let bgcolor2 = "rgb(200, 0, 0)";
let animation_loop;
let cancel_timeout;

function draw(data) {
    color = "rgb(220, 0, 0)";  
    ctx.clearRect(0,0,W,H);
    addition = 0;
    degrees = 0;
    $(".label").css("color", color);
    if (typeof cancel_timeout !== undefined) clearTimeout(cancel_timeout);
    $(".icon").html(`<i class=\"fa-solid fa-bars-progress\" style=\"color:${color}\"></i>`);
    if (typeof animation_loop !== undefined) clearInterval(animation_loop);
    let time = data.time;
    $(".label").text(data.label);
    $(".container").css("opacity", "0");
    if (data.icon !== null && data.icon !== undefined) {
        $(".icon").html(`<i style=\"color:${color}\" class=\"${data.icon}\"> <img src=${data.icon} onerror="this.onerror=null; this.remove();"> </i>`);
    }
    $( ".container" ).animate({
        opacity: 1,
    }, 500);
    degrees = 0;
    time = time * 0.25;
    new_degrees = 360;
    addition = (360 / time);
    animation_loop = setInterval(animate, 1);
}

function init() {
    ctx.clearRect(0,0,W,H);

    ctx.beginPath();
    ctx.strokeStyle = bgcolor;
    ctx.lineWidth = 28.5;
    ctx.arc(W / 2, H / 2, 100, 0, Math.PI * 2, false);
    ctx.stroke();

    let radians = degrees * Math.PI / 180;
    ctx.beginPath();
    ctx.strokeStyle = bgcolor2;
    ctx.lineCap = 'round';
    ctx.lineWidth = 20;
    ctx.arc(W / 2, H / 2, 100, 0 - 90 * Math.PI / 180, radians - 90 * Math.PI / 180, false);
    ctx.stroke();
}

function animate() {
    if (degrees >= 360) {
        $(".icon").html(`<i class=\"fa-solid fa-check\" style=\"color:green\"></i>`);
        clearInterval(animation_loop);
        $( ".container" ).animate({
            opacity: 0,
        }, 500, function() {
            $.post('https://smd_progressbar/FinishAction', JSON.stringify({
                })
            );
        });
        return;
    }
    init();
    degrees+=addition;
}
