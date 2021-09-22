
function preloader() {
    setTimeout(()=>{document.querySelector('.preloader').classList.add('loaded')},500)
}

export default preloader;