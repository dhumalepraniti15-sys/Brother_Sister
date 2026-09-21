/* ==========================================================
   BROTHER & SISTER ALBUM
========================================================== */


/* ==========================================================
   PHOTO DATA
========================================================== */

const photos = [
    "photos/photo1.jpg",
    "photos/photo2.jpg",
    "photos/photo3.jpg",
    "photos/photo4.jpg",
    "photos/photo5.jpg",
    "photos/photo6.jpg"
];


const captions = [
    "Partners in Crime 😎❤️",
    "Childhood Memories 🥹❤️",
    "Always Together 🤝❤️",
    "Crazy Moments 😂❤️",
    "Our Beautiful Memories ✨",
    "Brother & Sister Forever ♾️❤️"
];


/* ==========================================================
   SETTINGS
========================================================== */

const PHOTO_DURATION = 6000;

const WELCOME_DELAY = 5000;


/* ==========================================================
   VARIABLES
========================================================== */

let currentIndex = 0;

let slideshowTimer = null;

let progressTimer = null;

let albumStarted = false;


/* ==========================================================
   ELEMENTS
========================================================== */

const welcomeScreen =
    document.getElementById(
        "welcomeScreen"
    );


const albumScreen =
    document.getElementById(
        "albumScreen"
    );


const continueButton =
    document.getElementById(
        "continueButton"
    );


const continueMessage =
    document.getElementById(
        "continueMessage"
    );


const albumImage =
    document.getElementById(
        "albumImage"
    );


const imageLoader =
    document.getElementById(
        "imageLoader"
    );


const photoCaption =
    document.getElementById(
        "photoCaption"
    );


const photoCounter =
    document.getElementById(
        "photoCounter"
    );


const progressBar =
    document.getElementById(
        "progressBar"
    );


const popup =
    document.getElementById(
        "popup"
    );


const okButton =
    document.getElementById(
        "okButton"
    );


const finalScreen =
    document.getElementById(
        "finalScreen"
    );


const music =
    document.getElementById(
        "backgroundMusic"
    );


/* ==========================================================
   PRELOAD ALL PHOTOS
========================================================== */

function preloadImages() {

    photos.forEach(
        function (photoPath) {

            const image =
                new Image();


            image.src =
                photoPath;


            image.onload =
                function () {

                    console.log(
                        "Loaded:",
                        photoPath
                    );

                };


            image.onerror =
                function () {

                    console.error(
                        "Could not load:",
                        photoPath
                    );

                };

        }
    );

}


/* ==========================================================
   SHOW CONTINUE BUTTON AFTER 5 SECONDS
========================================================== */

setTimeout(
    function () {

        continueMessage.textContent =
            "Ready for our memories? ❤️";


        continueButton.classList.remove(
            "hidden"
        );

    },
    WELCOME_DELAY
);


/* ==========================================================
   START ALBUM
========================================================== */

function startAlbum() {

    if (albumStarted) {
        return;
    }


    albumStarted = true;


    /*
       Hide welcome
    */

    welcomeScreen.classList.add(
        "hidden"
    );


    /*
       Show album
    */

    albumScreen.classList.remove(
        "hidden"
    );


    /*
       First photo
    */

    currentIndex = 0;

    showPhoto(
        currentIndex
    );


    /*
       Start music
    */

    music.currentTime = 0;


    music.play()
        .then(
            function () {

                console.log(
                    "Music started ❤️"
                );

            }
        )
        .catch(
            function (error) {

                console.log(
                    "Music could not start:",
                    error
                );

            }
        );


    /*
       Start slideshow
    */

    startSlideshow();

}


/* ==========================================================
   SHOW PHOTO
========================================================== */

function showPhoto(index) {

    if (
        index < 0 ||
        index >= photos.length
    ) {
        return;
    }


    const imagePath =
        photos[index];


    /*
       Show loader
    */

    imageLoader.classList.remove(
        "hide"
    );


    /*
       Fade current image
    */

    albumImage.classList.add(
        "fade-out"
    );


    /*
       Create temporary image.
       This prevents blank/half-loaded
       images from appearing.
    */

    const nextImage =
        new Image();


    nextImage.onload =
        function () {

            /*
               Set image only after
               completely loaded.
            */

            albumImage.src =
                imagePath;


            albumImage.alt =
                captions[index];


            photoCaption.textContent =
                captions[index];


            photoCounter.textContent =
                `${index + 1} / ${photos.length}`;


            /*
               Hide loader
            */

            imageLoader.classList.add(
                "hide"
            );


            /*
               Show new image
            */

            requestAnimationFrame(
                function () {

                    albumImage.classList.remove(
                        "fade-out"
                    );

                }
            );

        };


    nextImage.onerror =
        function () {

            console.error(
                "Image failed:",
                imagePath
            );


            imageLoader.textContent =
                "Image could not load 😔";

        };


    /*
       Start loading
    */

    nextImage.src =
        imagePath;

}


/* ==========================================================
   START SLIDESHOW
========================================================== */

function startSlideshow() {

    stopSlideshow();


    slideshowTimer =
        setInterval(
            function () {

                nextPhoto();

            },
            PHOTO_DURATION
        );


    startProgress();

}


/* ==========================================================
   NEXT PHOTO
========================================================== */

function nextPhoto() {

    currentIndex++;


    /*
       All photos finished
    */

    if (
        currentIndex >=
        photos.length
    ) {

        finishAlbum();

        return;
    }


    /*
       Show next photo
    */

    showPhoto(
        currentIndex
    );


    /*
       Restart progress
    */

    startProgress();

}


/* ==========================================================
   STOP SLIDESHOW
========================================================== */

function stopSlideshow() {

    if (
        slideshowTimer !== null
    ) {

        clearInterval(
            slideshowTimer
        );

        slideshowTimer = null;

    }


    if (
        progressTimer !== null
    ) {

        clearInterval(
            progressTimer
        );

        progressTimer = null;

    }

}


/* ==========================================================
   PROGRESS BAR
========================================================== */

function startProgress() {

    if (
        progressTimer !== null
    ) {

        clearInterval(
            progressTimer
        );

    }


    const startTime =
        Date.now();


    progressBar.style.width =
        "0%";


    progressTimer =
        setInterval(
            function () {

                const elapsed =
                    Date.now() -
                    startTime;


                const percentage =
                    Math.min(
                        (
                            elapsed /
                            PHOTO_DURATION
                        ) * 100,
                        100
                    );


                progressBar.style.width =
                    percentage + "%";


                if (
                    percentage >= 100
                ) {

                    clearInterval(
                        progressTimer
                    );

                }

            },
            100
        );

}


/* ==========================================================
   FINISH ALBUM
========================================================== */

function finishAlbum() {

    stopSlideshow();


    /*
       Hide album only.
       DO NOT stop music.
    */

    albumScreen.classList.add(
        "hidden"
    );


    /*
       Show popup
    */

    setTimeout(
        function () {

            popup.classList.remove(
                "hidden"
            );

        },
        800
    );

}


/* ==========================================================
   FINAL SURPRISE
========================================================== */

function openFinalSurprise() {

    popup.classList.add(
        "hidden"
    );


    finalScreen.classList.remove(
        "hidden"
    );


    createHearts();

}


/* ==========================================================
   FLOATING HEARTS
========================================================== */

function createHearts() {

    const hearts = [
        "❤️",
        "💕",
        "💖",
        "💗",
        "💓",
        "💞"
    ];


    for (
        let i = 0;
        i < 35;
        i++
    ) {

        const heart =
            document.createElement(
                "div"
            );


        heart.textContent =
            hearts[
                Math.floor(
                    Math.random() *
                    hearts.length
                )
            ];


        heart.style.position =
            "fixed";


        heart.style.left =
            Math.random() * 100 +
            "%";


        heart.style.bottom =
            "-40px";


        heart.style.zIndex =
            "2100";


        heart.style.pointerEvents =
            "none";


        heart.style.fontSize =
            (
                18 +
                Math.random() * 18
            ) + "px";


        heart.style.animation =
            `
            floatingHeart
            ${4 + Math.random() * 4}s
            linear
            forwards
            `;


        document.body.appendChild(
            heart
        );


        setTimeout(
            function () {

                heart.remove();

            },
            9000
        );

    }

}


/* ==========================================================
   HEART ANIMATION
========================================================== */

const heartAnimation =
    document.createElement(
        "style"
    );


heartAnimation.textContent = `

    @keyframes floatingHeart {

        0% {

            transform:
                translateY(0)
                scale(0.8);

            opacity: 0;
        }


        20% {

            opacity: 1;

        }


        100% {

            transform:
                translateY(-110vh)
                scale(1.2);

            opacity: 0;

        }

    }

`;


document.head.appendChild(
    heartAnimation
);


/* ==========================================================
   BUTTON EVENTS
========================================================== */

continueButton.addEventListener(
    "click",
    startAlbum
);


okButton.addEventListener(
    "click",
    openFinalSurprise
);


/* ==========================================================
   SONG LOOP
========================================================== */

music.addEventListener(
    "ended",
    function () {

        music.currentTime = 0;

        music.play()
            .catch(
                function (error) {

                    console.log(
                        "Music restart blocked:",
                        error
                    );

                }
            );

    }
);


/* ==========================================================
   INITIALIZE
========================================================== */

preloadImages();


console.log(
    "Brother & Sister Album Ready ❤️"
);