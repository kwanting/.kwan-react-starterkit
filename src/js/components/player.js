import React from 'react'

const Player = ({ items, selected, onKey, replaceTitle }) => {
    let data = items.data,
        curVideo

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