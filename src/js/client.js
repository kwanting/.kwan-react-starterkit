import React from 'react'
import ReactDom from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import Header from './header'
import Carousel from './components/carousel'
import Player from './components/player'
import testData from './testData/testData'
import FizzBuzz from './fizzbuzz'

const API_URL = "http://172.18.0.137/xdk2/data.php",
    TITLE = "React Test",
    HOME_PAGE = "HOME_PAGE_VARIABLE",
    PLAYER_PAGE = "PLAYER_PAGE_VARIABLE"

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            title: TITLE,
            page: HOME_PAGE, // The view.
            data: testData(),
            selectedId: 0,
            startIndex: 0,
            totalData: 0
        }
    }

    componentWillMount() {
        console.info("mounting")

        this.callApi({
            startIndex: 0,
            pageSize: 5
        })

        document.addEventListener("keydown", this.keyHandler, false)
    }

    componentDidMount() {
        console.info("mounted")
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.keyHandler, false)
    }

    callApi = opts => {
        let url = API_URL

        const appendUrl = (append => {
            url += (url.indexOf("?") === -1 ? "?" : "") + append
        }).bind(this)

        for (var key in opts) {
            appendUrl(key + "=" + opts[key])
        }

        fetch(url).then((request) => {
            return request.json()
        }).then((response => {
            let data = response.data,
                returnArray = []

            data.map(item => {
                item.id = Math.abs(item.id)
                returnArray.push(item)
            })

            this.setState({
                startIndex: response.startIndex,
                totalData: response.total,
                data: returnArray
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
        if (!this.state.data) {
            return
        }

        let currId = this.state.selectedId,
            tarId = currId + direction,
            minLength = this.state.startIndex,
            maxLength = this.state.startIndex + 4,
            total = this.state.totalData-1,
            conflict = tarId < 0 || tarId > total

        console.error("currId:" + currId + " tarId:" + tarId + " min:" + minLength + " max:" + maxLength + " total:" + total)

        if (!conflict) {
            if (tarId > maxLength || tarId < minLength) {
                this.callApi({
                    startIndex: tarId,
                    pageSize: 5
                })
            }
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

        let component = React.cloneElement(this.props.children, {
            data: this.state && this.state.data,
            selected: this.state && this.state.selectedId,
            onKey: this.clickEvt
        })

        // this.state.page === HOME_PAGE ? carouselComponent : playerComponent

        return (
            <div>
                <Header name={this.state && this.state.title} />
                {component}
            </div>
        )
    }
}

ReactDom.render(
    <Router history={hashHistory}>
        <Route path="/" component={FizzBuzz}></Route>
            <Route path="/" component={App}>
                <IndexRoute component={Carousel}></IndexRoute>
                <Route path="/video/(:id)" component={Player}></Route>
            </Route>
    </Router>,
    document.getElementById("app")
)