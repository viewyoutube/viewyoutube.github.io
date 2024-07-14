let players = [];
let isMuted = false;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('play-button').addEventListener('click', handlePlayButton);
    document.getElementById('mute-button').addEventListener('click', handleMuteButton);
});

function onYouTubeIframeAPIReady() {
    // No changes needed here
}

document.addEventListener('DOMContentLoaded', () => {
    // Set default grid number to 10
    document.getElementById('grid-number').value = 10;

    document.getElementById('play-button').addEventListener('click', handlePlayButton);
    document.getElementById('mute-button').addEventListener('click', handleMuteButton);
});

function handlePlayButton() {
    const youtubeUrl = document.getElementById('youtube-url').value;
    const gridNumber = parseInt(document.getElementById('grid-number').value, 10);
    const videoId = getYouTubeVideoId(youtubeUrl);

    if (videoId && gridNumber > 0) {
        createVideoGrid(videoId, gridNumber);
        document.getElementById('mute-button').disabled = false;
    } else {
        alert('Please enter a valid YouTube URL and a valid number of grids.');
    }
}

function handleMuteButton() {
    isMuted = !isMuted;
    players.forEach(player => {
        if (isMuted) {
            player.mute();
        } else {
            player.unMute();
        }
    });
    document.getElementById('mute-button').innerText = isMuted ? 'Unmute All' : 'Mute All';
}

function getYouTubeVideoId(url) {
    const regex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regex);
    return (match && match[7].length === 11) ? match[7] : null;
}

function createVideoGrid(videoId, gridNumber) {
    document.getElementById('video-grid').innerHTML = ''; // Clear previous videos
    players = []; // Clear previous player instances

    for (let i = 0; i < gridNumber; i++) {
        const div = document.createElement('div');
        div.id = `player${i}`;
        document.getElementById('video-grid').appendChild(div);

        const player = new YT.Player(`player${i}`, {
            height: '100%',
            width: '100%',
            videoId: videoId,
            playerVars: {
                autoplay: 1,
                loop: 1,
                playlist: videoId
            },
            events: {
                onReady: onPlayerReady,
                onError: onPlayerError
            }
        });

        players.push(player);
    }
}

function onPlayerReady(event) {
    event.target.setVolume(50); // Set initial volume to 50%
}

function onPlayerError(event) {
    console.error('Error occurred in player:', event);
    alert('An error occurred while playing the video. Please try again with a different video.');
}
