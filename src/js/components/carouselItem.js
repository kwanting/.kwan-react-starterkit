import React, { PropTypes as T } from 'react'

/*class CarouselItem extends React.Component {
    constructor(data) {
        super()
        this.state = {
            data: data
        }
    }

    onClick() {
        console.warn("click")
    }

    render() {
        return (
            <div onClick={this.onClick}>
                {this.state.data.name}
            </div>
        )
    }
}*/

const CarouselItem = ({ selected = false, name, image, url, desc, clickEvt }) => {
    return (
        <div className={`carouselItem ${selected ? 'focused' : ''}`} onClick={clickEvt}>
            <img className="carouselImg" src={image.replace('192.168.200.137', '172.18.0.137')} />
            <p className="carouselTitle">{name}</p>
        </div>
    )
}

CarouselItem.propTypes = {
    name: T.string,
    image: T.string,
    url: T.string,
    desc: T.string,
    clickEvt: T.func
}

export default CarouselItem