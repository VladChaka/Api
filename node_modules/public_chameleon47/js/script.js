
function updateUser(clickedbtn) {
    var x = clickedbtn.parentNode.parentNode.parentNode.parentNode.style.display = "none";
    if (document.body.offsetHeight > window.innerHeight) {
        document.body.style.overflow = 'auto';
        document.body.style.paddingRight = '0';
    };
    $.post('http://localhost:4000/user/update', $('#userEditForm').serialize());
    location.reload(true);
}
function show(element, id) {
    document.getElementById(element).style.display = "flex";
    document.getElementById("popupsContainer").style.display = "flex";
    if (document.body.offsetHeight > window.innerHeight) {
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '15px';
    };
};


function hideEditForm(ths) {
    var counter = +ths.parentNode.parentNode.parentNode.getElementsByClassName('user-counter')[0].getAttribute('value');
    var profileBlock = document.getElementsByClassName('list-user-block')[counter];
    var profileContainer = profileBlock.getElementsByClassName('user-profile-container')[0];
    profileBlock.removeChild(profileContainer);
    if (document.body.offsetHeight > window.innerHeight) {
        document.body.style.overflow = 'auto';
        document.body.style.paddingRight = '0';
    };
};

function hide(element) {
    element.parentNode.style.display = "none";
    document.getElementById("popupsContainer").style.display = "none";
    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = '0';
}

document.getElementById("orderPopup").style.display = "none";

function showHideOrders() {
    var toggle = document.getElementById("orderPopup").style.display;
    if (toggle == "none") {
        document.getElementById("orderPopup").style.display = "flex";
    } else {
        document.getElementById("orderPopup").style.display = "none";
    }
}
var activeFiltler = document.getElementsByClassName('filters-order-active');

function filterByRating() {
    var rating = document.getElementsByClassName('list-user-rating');
    var date = document.getElementsByClassName('list-user-date');
    for (i = 0; i < date.length; i++) {
        date[i].style.display = "none";
    }
    for (i = 0; i < rating.length; i++) {
        rating[i].style.display = "block";
    }
    activeFiltler[0].innerHTML = "By Rating";
    showHideOrders();
}

function deleteUser(element) {
    var id = "." + element.parentNode.id.value;
    $.post('http://localhost:4000/user/delete', $(id).serialize());
    var x = element.parentNode.parentNode.parentNode.style.display = "none";
}

function filterByDate() {
    var rating = document.getElementsByClassName('list-user-rating');
    var date = document.getElementsByClassName('list-user-date');
    for (i = 0; i < rating.length; i++) {
        rating[i].style.display = "none";
    }
    for (i = 0; i < date.length; i++) {
        date[i].style.display = "block";
    }
    activeFiltler[0].innerHTML = "By Date";
    showHideOrders();
}