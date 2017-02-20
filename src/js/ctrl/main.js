import React from 'react'
import ReactDom from 'react-dom'

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			page: null // The view.
		}
	}

	componentWillMount() {
		console.error("mounting")

		this.callApi({
			startIndex: 0,
			pageSize: 5
		})

		document.addEventListener("keydown", this.keyHandler, false)
	}

	componentDidMount() {
		console.error("mounted")
		this.setState({
			page: "home",
			selectedId: 0
		})
	}

	componentWillUnmount() {
		console.error("unmount")
		document.removeEventListener("keydown", this.keyHandler, false)
	}

	callApi = opts => {
		let url = "http://172.18.0.137/xdk2/data.php"
		let url = "http://172.18.0.137/xdk2/data.php"

		const appendUrl = (append => {
 		}).bind(this)

		for (var key in opts) {
			appendUrl(key + "=" + opts[key])
		}

		fetch(url).then((request) => {
			return request.json()
		}).then((response => {
			this.setState({
				data: response
			})
		}).bind(this))
	}

	keyHandler = evt => {
		switch (evt.key) {
			case "ArrowLeft":
				this.focusHandler(-1)
				break
			case "ArrowRight":
				this.focusHandler(1)
				break
			case "Enter":
				break
			default:
				break
		}
		return false
	}

	focusHandler = direction => {
		let currId = this.state.selectedId,
			tarId = currId + direction

		if (tarId >= 0) {
			this.setState({ selectedId: tarId})
		}
	}

	clickEvt = evt => {

	}

	render() {
		let generic = <h1>Hello World! from a class component</h1>,
			id = this.state && this.state.selectedId || 0,
			data = this.state && this.state.data

		if (data) {
			generic = <Carousel
				items={data}
				selected={id}
				clickEvt={this.clickEvt}
			/>
		}

		return generic
	}
}

ReactDom.render(
	<div>
		<Header />
		<App link="" />
	</div>,
	document.getElementById("app")
)