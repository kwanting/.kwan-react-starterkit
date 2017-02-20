import React from 'react'
import CarouselItem from './carouselItem'

const MAX_SHOWN = 5

const Carousel = ({ items, selected, clickEvt, onKey }) => {
    let data = items.data,
        focusId = selected ? selected : 0,
        carousel

    if (data) {
        carousel = data.map(item => {
            let id = Math.abs(item.id)

            if (id < MAX_SHOWN) {
                return <CarouselItem
                    key={id}
                    selected={id === focusId}
                    name={item.title}
                    image={item.img}
                    url={item.url}
                    desc={item.desc}
                    onKey={onKey ? onKey : null}
                    clickEvt={clickEvt ? clickEvt.bind(this, id) : null}
                    />
            }
        })
    }

    return (
        <div>
            {carousel}
        </div>
    )
}

export default Carousel