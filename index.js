let video = document.getElementById('myvideo');
let trackButton = document.getElementById("trackbutton");
let isVideo = false;
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

function startVideo() {
    handTrack.startVideo(video).then(function (status) {
        console.log("video started", status);
        if (status) {
            isVideo = true

            runDetection()
        } else {
            console.log("Please enable video")
        }
    });
}
trackButton.addEventListener("click", function () {
    toggleVideo();
});

const modelParams = {
    flipHorizontal: true, // flip e.g for video  
    maxNumBoxes: 20, // maximum number of boxes to detect
    iouThreshold: 0.5, // ioU threshold for non-max suppression
    scoreThreshold: 0.6, // confidence threshold for predictions.
}

function toggleVideo() {
    if (!isVideo) {
        startVideo();
    } else {
        handTrack.stopVideo(video)
        isVideo = false;
    }
}

function runDetection() {
    console.log('runDetection')
    model.detect(video).then(predictions => {
        console.log("Predictions: ", predictions);
        model.renderPredictions(predictions, canvas, context, video);
        if (isVideo) {
            requestAnimationFrame(runDetection);
        }
    });
}


handTrack.load(modelParams).then(lmodel => {
    // detect objects in the image.
    model = lmodel
    // updateNote.innerText = "Loaded Model!"
});