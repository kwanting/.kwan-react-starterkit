import React from 'react'

class Header extends React.Component {
    constructor({ name }) {
        super()
        this.state = {
            title: name
        }
    }

    render() {
        return (
            <h1>
                {this.state.title}
            </h1>
        )
    }
}

export default Header