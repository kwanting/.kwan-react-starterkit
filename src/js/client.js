import React from 'react'
import ReactDom from 'react-dom'
import Header from './header'
import Carousel from './components/carousel'
import Player from './components/player'

const API_URL = "http://172.18.0.137/xdk2/data.php",
    TITLE = "React Test",
    HOME_PAGE = "HOME_PAGE_VARIABLE",
    PLAYER_PAGE = "PLAYER_PAGE_VARIABLE"

const getFilmData = () => {
    return {
        data: [{
            id: 0,
            title: "Avatar",
            img: "http://i.imgur.com/gjUfHJk.jpg",
            url: "http://html5demos.com/assets/dizzy.mp4"
        }, {
            id: 1,
            title: "Cloudy With a Chance of Meatballs",
            img: "http://i.imgur.com/dinL3sk.jpg",
            url: "https://www.w3schools.com/html/mov_bbb.mp4"
        }, {
            id: 2,
            title: "Ex Machina",
            img: "http://i.imgur.com/Zw8NFc6.jpg",
            url: "http://techslides.com/demos/sample-videos/small.mp4"
        }, {
            id: 3,
            title: "Star Wars: The Last Jedi",
            img: "http://i.imgur.com/MWWaKUP.jpg"
        }, {
            id: 4,
            title: "Transformers",
            img: "http://i.imgur.com/029a4jS.jpg"
        }, {
            id: 5,
            title: "Inception",
            img: "http://i.imgur.com/hskItlg.jpg"
        }]
    }
}

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            title: TITLE,
            page: HOME_PAGE, // The view.
            data: getFilmData(),
            selectedId: 0
        }
    }

    componentWillMount() {
        console.info("mounting")

        // this.callApi({
        // 	startIndex: 0,
        // 	pageSize: 5
        // })

        document.addEventListener("keydown", this.keyHandler, false)
    }

    componentDidMount() {
        console.info("mounted")
        this.formatData()
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.keyHandler, false)
    }

    // Lets us define how to format the master data
    // Can add more logic here to remove responsibility from components
    formatData = () => {
        let data = this.state.data.data,
            dataArray = []

        data.map(item => {
            dataArray.push(item)
        })

        this.setState({
            data: dataArray
        })
    }

    callApi = opts => {
        let url = API_URL

        const appendUrl = (append => {
            url += (url.indexOf("?") === -1 ? "?" : "") + append
        }).bind(this)

        for (var key in opts) {
            appendUrl(key + "=" + opts[key])
        }

        fetch(API_URL).then((request) => {
            console.error("request", request.json())
            return request.json()
        }).then((response => {
            console.error("response", response)
            this.setState({
                data: response
            })
        }).bind(this))
    }

    keyHandler = evt => {
        switch (evt.code) {
            case "ArrowLeft":
                this.focusHandler(-1)
                break
            case "ArrowRight":
                this.focusHandler(1)
                break
            case "Space":
            case "Enter":
            case "Escape":
                this.clickEvt(evt.code)
                break
            default:
                break
        }
        return false
    }

    focusHandler = direction => {
        let currId = this.state.selectedId,
            tarId = currId + direction,
            maxLength = this.state.data.data.length

        // console.error("currId: " + currId + " tarId: " + tarId + " maxLength: " + maxLength)

        if (tarId >= 0 && tarId < maxLength) {
            this.setState({ selectedId: tarId })
        }
    }

    clickEvt = evt => {
        let curPage = this.state.page

        if (evt === "Escape") {
            this.setState({ page: curPage === HOME_PAGE ? PLAYER_PAGE : HOME_PAGE })
            return
        }

        if (curPage === PLAYER_PAGE &&
            (evt === "Space" || evt === "Enter")) {
            let player = document.getElementById("player")

            if (player.paused) {
                player.play()
            } else {
                player.pause()
            }

            return
        }

        this.setState({ page: PLAYER_PAGE })
    }

    replaceTitle = title => { this.setState({ title: title }) }

    render() {
        let carouselComponent = <Carousel
            data={this.state && this.state.data}
            selected={this.state && this.state.selectedId}
            onKey={this.clickEvt}
            />
        let playerComponent = <Player
            data={this.state && this.state.data}
            selected={this.state && this.state.selectedId}
            onKey={this.clickEvt}
            />

        let component = this.state.page === HOME_PAGE ? carouselComponent : playerComponent

        return (
            <div>
                <Header name={this.state && this.state.title} />
                {component}
            </div>
        )
    }
}

ReactDom.render(
    <div>
        <App />
    </div>,
    document.getElementById("app")
)