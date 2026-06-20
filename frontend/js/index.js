var users = [
    {
        "name": "John doe",
        "gender": "male",
        "images": "/images/john.png"
    },
    {
        "name": "sriharsha",
        "gender": "female",
        "images": "/images/jane.png"
    }
];

var curId = 0;

function render() {
    var user = users[curId];
    document.getElementById("user-img").src = user.images;
    document.getElementById("user-name").innerText = user.name;
    document.getElementById("user-gender").innerText = user.gender;
}

function toggle() {
    curId = (curId + 1) % 2;
    render();
}

// Show the first user when the page loads
render();