import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import '@assets/css/style.css';
import menu from '@layout/menu.html';
import navbar from '@layout/navbar.html';

$(document).ready(() => {
    $("#menu").html(menu);
    $("#navbar").html(navbar);
});