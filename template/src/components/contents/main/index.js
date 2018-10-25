{{#if customBootstrap}}
import 'bootstrap-tuoqun-theme/dist/css/bootstrap-tuoqun-theme.css';
import 'bootstrap-tuoqun-theme/dist/js/bootstrap-tuoqun-theme';
{{else}}
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
{{/if}}
import '@assets/css/style.css';
import menu from '@layout/menu.html';
import navbar from '@layout/navbar.html';

$(document).ready(() => {
    $("#menu").html(menu);
    $("#navbar").html(navbar);
});