import React, { Component } from 'react';
import './App.css';

const api = 'https://chroniclingamerica.loc.gov/suggest/titles/?q=brooklyn';

class App extends Component {
    state = {
        data: null
    }
    
    componentDidMount() {
        fetch(api)
        .then(response => response.json())
        .then(data => this.setState({ data }))
    }
    
    mapData = () => {
        if (this.state.data) {
            
            let allData = []
            const sns = this.state.data[2]
            const cleanSns = sns.map(sn => sn.replace('sn', ''))
            const links = this.state.data[3]
            const titles = this.state.data[1]

            cleanSns.map(sn => allData.push({ sn }))
            links.map((link, i) => allData[i].link = link)
            titles.map((title, i) => allData[i].title = title)

            const sortedData = allData.sort(function (a, b) {
                return a.sn - b.sn;
            });

            return sortedData.map(obj => {
                    return (
                        <tr key={obj.sn}>
                            <td>{obj.sn}</td>
                            <td><a href={obj.link}>{obj.title}</a></td>
                        </tr>
                    )
                }
            )

        } //end of if check to avoid null state
    } //end of mapData function
    
    render() {
        console.log(this.state.data)
        
        return (
            <table>
                <tbody>
                    <tr>
                        <th>SN Number</th>
                        <th>Link</th>
                    </tr>
                    {this.mapData()}
                </tbody>
            </table >
        );
    }
}

export default App;

