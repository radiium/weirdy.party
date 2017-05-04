// Buttons
function index() {
    window.location.href = '/'
}

/*
function next(page) {
    if (!page) {
        window.location.href = '/';
    } else {
        window.location.href = '/page/' + page;
    }
}
*/

function openEditor() {
    window.location.href = '/editor';
}

function getHtml() {
    console.log($('#editor').trumbowyg('html'));
}
function save() {
    console.log($('#editor').trumbowyg('html'));
}
