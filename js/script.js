javascript
/* ==========================================================
   BROTHER & SISTER ALBUM
   VERCEL READY JAVASCRIPT
========================================================== */


/* ==========================================================
   1. PHOTO DATA
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
   2. SETTINGS
========================================================== */

const PHOTO_DURATION = 6000;

const WELCOME_DELAY = 5000;


/* ==========================================================
   3. STATE
========================================================== */

let currentIndex = 0;

let slideshowTimer = null;

let progressTimer = null;

let albumStarted = false;

let imagesReady = false;


/* ==========================================================
   4. HTML ELEMENTS
========================================================== */

const welcomeScreen =
    document.getElementById("welcomeScreen");


const albumScreen =
    document.getElementById("albumScreen");


const continueButton =
    document.getElementById("continueButton");


const continueMessage =
    document.getElementById("continueMessage");


const albumImage =
    document.getElementById("albumImage");


const imageLoader =
    document.getElementById("imageLoader");


const photoCaption =
    document.getElementById("photoCaption");


const photoCounter =
    document.getElementById("photoCounter");


const progressBar =
    document.getElementById("progressBar");


const popup =
    document.getElementById("popup");


const okButton =
    document.getElementById("okButton");


const finalScreen =
    document.getElementById("finalScreen");


const music =
    document.getElementById("backgroundMusic");


/* ==========================================================
   5. PRELOAD ALL IMAGES
========================================================== */

function preloadImages() {

    const imagePromises =
        photos.map(
            (photoPath) => {

                return new Promise(
                    (resolve) => {

                        const image =
                            new Image();


                        image.onload =
                            resolve;


                        image.onerror =
                            function () {

                                console.error(
                                    "Image could not load:",
                                    photoPath
                                );

                                resolve();

                            };


                        image.src =
                            photoPath;

                    }
                );

            }
        );


    Promise.all(imagePromises)
        .then(
            function () {

                imagesReady = true;

                console.log(
                    "All images are ready."
                );

            }
        );

}


/* ==========================================================
   6. WAIT BEFORE SHOWING CONTINUE BUTTON
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
   7. START ALBUM
========================================================== */

function startAlbum() {

    if (albumStarted) {
        return;
    }


    albumStarted = true;


    /* ------------------------------------------
       Hide welcome screen
    ------------------------------------------ */

    welcomeScreen.classList.add(
        "hidden"
    );


    /* ------------------------------------------
       Show album screen
    ------------------------------------------ */

    albumScreen.classList.remove(
        "hidden"
    );


    /* ------------------------------------------
       Start first image
    ------------------------------------------ */

    currentIndex = 0;


    showPhoto(
        currentIndex
    );


    /* ------------------------------------------
       Start music
    ------------------------------------------ */

    music.currentTime = 0;


    music.play()
        .catch(
            function (error) {

                console.log(
                    "Audio autoplay issue:",
                    error
                );

            }
        );


    /* ------------------------------------------
       Start slideshow
    ------------------------------------------ */

    startSlideshow();

}


/* ==========================================================
   8. SHOW PHOTO
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


    imageLoader.classList.remove(
        "hide"
    );


    albumImage.classList.add(
        "fade-out"
    );


    const newImage =
        new Image();


    newImage.onload =
        function () {

            /*
                Important:
                Change src only after
                the next image is fully loaded.
            */

            albumImage.src =
                imagePath;


            albumImage.alt =
                captions[index];


            photoCaption.textContent =
                captions[index];


            photoCounter.textContent =
                `${index + 1} / ${photos.length}`;


            imageLoader.classList.add(
                "hide"
            );


            /*
                Small delay so browser
                can render the new image.
            */

            requestAnimationFrame(
                function () {

                    albumImage.classList.remove(
                        "fade-out"
                    );

                }
            );

        };


    newImage.onerror =
        function () {

            console.error(
                "Unable to display:",
                imagePath
            );


            imageLoader.textContent =
                "Image not available 😔";

        };


    newImage.src =
        imagePath;

}


/* ==========================================================
   9. START SLIDESHOW
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
   10. NEXT PHOTO
========================================================== */

function nextPhoto() {

    currentIndex++;


    /*
       If all photos are finished
       show surprise popup.
    */

    if (
        currentIndex >=
        photos.length
    ) {

        finishAlbum();

        return;
    }


    showPhoto(
        currentIndex
    );


    startProgress();

}


/* ==========================================================
   11. STOP SLIDESHOW
========================================================== */

function stopSlideshow() {

    if (slideshowTimer !== null) {

        clearInterval(
            slideshowTimer
        );

        slideshowTimer = null;

    }


    if (progressTimer !== null) {

        clearInterval(
            progressTimer
        );

        progressTimer = null;

    }

}


/* ==========================================================
   12. PROGRESS BAR
========================================================== */

function startProgress() {

    if (progressTimer !== null) {

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
                        (elapsed /
                            PHOTO_DURATION) *
                            100,
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
   13. FINISH ALBUM
========================================================== */

function finishAlbum() {

    stopSlideshow();


    /*
       Hide album.
       Music is NOT stopped.
    */

    albumScreen.classList.add(
        "hidden"
    );


    /*
       Wait a little before popup.
    */

    setTimeout(
        function () {

            popup.classList.remove(
                "hidden"
            );

        },
        700
    );

}


/* ==========================================================
   14. OPEN FINAL SURPRISE
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
   15. FLOATING HEARTS
========================================================== */

function createHearts() {

    const heartList = [
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
            heartList[
                Math.floor(
                    Math.random() *
                    heartList.length
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


        heart.style.fontSize =
            (
                18 +
                Math.random() * 18
            ) +
            "px";


        heart.style.pointerEvents =
            "none";


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
   16. HEART ANIMATION
========================================================== */

const heartStyle =
    document.createElement(
        "style"
    );


heartStyle.textContent = `

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
    heartStyle
);


/* ==========================================================
   17. BUTTON EVENTS
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
   18. MUSIC LOOP
========================================================== */

music.addEventListener(
    "ended",
    function () {

        /*
           Restart song automatically.
        */

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
   19. INITIALIZE
========================================================== */

preloadImages();


console.log(
    "Brother & Sister Album loaded successfully ❤️"
);

