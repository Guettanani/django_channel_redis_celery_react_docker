// App.js
/*
import React from 'react';
import MyChart from './components/MyChart';
import WebSocketComponent from './components/WebSocketComponent';

function App() {
    const onDataReceived = (data) => {
        console.log('Data received:', data);
        // Traitement des données reçues
    };

    return (
        <div className="App">
            <MyChart />
            <WebSocketComponent url={'ws://localhost:8888/ws/sms/notification/'} onDataReceived={onDataReceived} />
        </div>
    );
}

export default App;
//*/

// App.js
/*
import React, { useState } from 'react';
import MyChart from './components/MyChart';
import WebSocketComponent from './components/WebSocketComponent';

function App() {
    const [chartData, setChartData] = useState([]);

    const onDataReceived = (data) => {
        console.log('Data received:', data);
        // Mettre à jour l'état avec les données reçues
        setChartData(prevData => [...prevData, data]);
    };

    return (
        <div className="App">
            <MyChart data={chartData} />
            <WebSocketComponent url={'ws://localhost:8888/ws/sms/notification/'} onDataReceived={onDataReceived} />
        </div>
    );
}

export default App;

//*/
import React from 'react';
import MyChart from './components/MyChart';

function App() {
    return (
        <div className="App">
            <MyChart />
        </div>
    );
}

export default App;
