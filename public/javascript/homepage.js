const soshulBannerEl = document.querySelector("#soshul-banner");

const animateText = (event) => {
    // Wrap every letter in a span
    const textWrapper = document.querySelector('.ml6 .letters');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({loop: false})
    .add({
        targets: '.ml6 .letter',
        translateY: ["1.1em", 0],
        translateZ: 0,
        duration: 750,
        delay: (el, i) => 50 * i
    });
}

soshulBannerEl.addEventListener("click", animateText);