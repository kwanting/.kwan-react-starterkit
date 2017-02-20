import React from 'react'

const Player = ({ data, selected, onKey, replaceTitle }) => {
    let curVideo

    data.map((item) => {
        if (item.id === selected) {
            curVideo = item
        }
    })

    return (
        <video id="player" width="400" controls>
            <source src={curVideo.url} type="video/mp4" />
            Your browser does not support HTML5 video.
        </video>
    )
}

export default Player