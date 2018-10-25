{{#if customBootstrap}}
import 'bootstrap-tuoqun-theme/dist/css/bootstrap-tuoqun-theme.css';
{{else}}
import 'bootstrap/dist/css/bootstrap.css';
{{/if}}
import '@assets/css/style.css';
import advert from '@layout/advert.html';

// 引用页面
$("#panel").html(advert);
