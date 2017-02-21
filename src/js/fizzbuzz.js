import React from 'react'

const MAX_NUM = 100

const Iterator = ({array}) => {
    let tempVar = array.map(item => {
        let result

        // Solution A
        // if (item % 3 === 0 && item % 5 === 0) {
        //     result = "FizzBuzz"
        // } else if (item % 3 === 0) {
        //     result = "Fizz"
        // } else if (item % 5 === 0) {
        //     result = "Buzz"
        // }

        // Solution B
        // result = item % 3 === 0 ? "Fizz" : item
        // result = item % 5 === 0 && result !== item ? result + "Buzz" : result
        // result = item % 5 === 0 && item === result ? "Buzz" : result

        // Solution C
        // result = item % 3 === 0 ? "Fizz" : item
        // if (item % 5 === 0) {
        //     result = result !== item ? result + "Buzz" : "Buzz"
        // }

        // Solution Z
        let a = !(item%3), b = !(item%5)
        result = a ? (b ? "FizzBuzz" : "Fizz") : (b ? "Buzz" : item)

        return (<div key={item}>{result}<br /></div>)
    })

    return (
        <div>
            {tempVar}
        </div>
    )
}

class FizzBuzz extends React.Component {
    constructor() {
        super()
        let tempVar = []

        for (var i=1; i<=MAX_NUM; i++) {
            tempVar.push(i)
        }

        this.state = {
            testVar: tempVar
        }
    }

    render() {
        return (
            <div>
                <p>Write a program that prints the numbers from 1 to 100. But for multiples of three print "Fizz" instead of the number and for the multiples of five print "Buzz". For numbers which are multiples of both three and five print "FizzBuzz".</p>
                <Iterator array={this.state.testVar} />
            </div>
        )
    }
}

export default FizzBuzz