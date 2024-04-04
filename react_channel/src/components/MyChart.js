/*
import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function WebSocketComponent({ url, onDataReceived }) {
    useEffect(() => {
        const ws = new WebSocket(url);
        
        ws.onopen = () => {
            console.log('WebSocket connected');
        };

        ws.onmessage = (event) => {
            console.log('Message received:', event.data);
            onDataReceived(event.data);
        };

        ws.onclose = () => {
            console.log('WebSocket disconnected');
        };

        return () => {
            ws.close();
        };
    }, [url, onDataReceived]);

    return null;
}

function MyChart() {
    const [unreadCount, setUnreadCount] = useState(0);
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current !== null) {
            // Détruire le graphique existant s'il existe
            chartRef.current.destroy();
        }

        // Initialiser le graphique avec des données statiques
        const ctx = document.getElementById('myChart');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['1', '2', '3', '4', '5'],
                datasets: [{
                    label: 'Unread Count',
                    data: [5, 10, 15, 20, 25],
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Stocker la référence du graphique pour pouvoir le détruire plus tard
        chartRef.current = myChart;

    }, []); // exécute une seule fois lors du montage

    const onDataReceived = (data) => {
        const newData = Math.floor(Math.random() * 30) + 1;
        setUnreadCount(prevCount => prevCount + newData);
        updateChart(unreadCount + newData);
    };

    // Fonction pour mettre à jour le graphique avec les nouvelles données
    function updateChart(newData) {
        // Mettre à jour les étiquettes du graphique
        chartRef.current.data.labels.push((chartRef.current.data.labels.length + 1).toString());

        // Mettre à jour les données du graphique
        chartRef.current.data.datasets[0].data.push(newData);

        // Limiter le nombre de données affichées à 10 pour une meilleure visualisation
        if (chartRef.current.data.labels.length > 10) {
            chartRef.current.data.labels.shift();
            chartRef.current.data.datasets[0].data.shift();
        }

        // Mettre à jour le graphique
        chartRef.current.update();
    }

    return (
        <div className="container" style={{ marginTop: '50px', marginLeft: '50px' }}>
            <canvas id="myChart" width="400" height="400"></canvas>
            <WebSocketComponent
                url={'ws://localhost:8888/ws/sms/notification/'}
                onDataReceived={onDataReceived}
            />
        </div>
    );
}

export default MyChart;
//*/

// MyChart.js
/*
import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

function MyChart({ data }) {
    useEffect(() => {
        // Créer ou mettre à jour votre graphique avec les données reçues
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(item => item.label),
                datasets: [{
                    label: 'Unread Count',
                    data: data.map(item => item.value),
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Nettoyer lors du démontage
        return () => {
            myChart.destroy();
        };
    }, [data]);

    return (
        <div className="container" style={{ marginTop: 50, marginLeft: 50 }}>
            <canvas id="myChart" width="400" height="400"></canvas>
        </div>
    );
}

export default MyChart;
//*/
/*
import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

function MyChart() {
    const [chartData, setChartData] = useState([]);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8888/ws/sms/notification/');

        ws.onopen = () => {
            console.log('WebSocket connected');
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Data received:', data);
            setChartData(prevData => [...prevData, data]);
            setCounter(prevCounter => prevCounter + 1); // Incrémenter le compteur à chaque réception de données
        };

        ws.onclose = () => {
            console.log('WebSocket disconnected');
        };

        return () => {
            ws.close();
        };
    }, []);

    useEffect(() => {
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: chartData.map(item => item.label),
              datasets: [
                  {
                      label: 'Unread Count',
                      data: chartData.map(item => item.value),
                      borderColor: 'rgba(255, 99, 132, 1)',
                      borderWidth: 1
                  },
                  {
                    label: 'Counter',
                    data: chartData.map(() => counter),
                    borderColor: 'rgba(255, 0, 0, 1)', // Rouge
                    borderWidth: 3, // Épaisseur de la ligne
                    borderDash: [5, 5] // Style de ligne pointillée
                }
              ]
          },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        return () => {
            myChart.destroy();
        };
    }, [chartData]);

    return (
        <div className="container" style={{ marginTop: 50, marginLeft: 50 }}>
            <h2>Nombre de données reçues: {counter}</h2>
            <canvas id="myChart" width="100" height="100"></canvas>
        </div>
    );
}

export default MyChart;
//*/
/*
import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

function MyChart() {
    const [unreadCount, setUnreadCount] = useState(0);
    const [myChart, setMyChart] = useState(null);

    useEffect(() => {
        // Initialiser le graphique avec des données statiques
        const ctx = document.getElementById('myChart');
        if (myChart) {
            myChart.destroy(); // Destroy the existing chart if it exists
        }
        const newChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['1', '2', '3', '4', '5'],
                datasets: [{
                    label: 'Unread Count',
                    data: [5, 10, 15, 20, 25],
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        setMyChart(newChart); // Set the new chart instance

        // Fonction pour mettre à jour le graphique avec les nouvelles données
        function updateChart(newData) {
            // Mettre à jour les étiquettes du graphique
            newChart.data.labels.push((newChart.data.labels.length + 1).toString());

            // Mettre à jour les données du graphique
            newChart.data.datasets[0].data.push(newData);

            // Limiter le nombre de données affichées à 10 pour une meilleure visualisation
            if (newChart.data.labels.length > 10) {
                newChart.data.labels.shift();
                newChart.data.datasets[0].data.shift();
            }

            // Mettre à jour le graphique
            newChart.update();
        }

        // Mettre à jour le graphique lors de la réception de nouvelles données
        const notifySocket = new WebSocket(
            //'ws://' + window.location.host + '/ws/sms/notification/'
            'ws://localhost:8888/ws/sms/notification/'
        );

        notifySocket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            console.log(data);

            const newData = Math.floor(Math.random() * 30) + 1;
            setUnreadCount(prevCount => prevCount + newData);
            updateChart(unreadCount + newData);
        };

        notifySocket.onclose = function(e) {
            console.log('Web socket is closed.');
        };

        return () => {
            notifySocket.close();
            if (newChart) {
                newChart.destroy(); // Destroy the chart instance when component unmounts
            }
        };
    }, []); // exécute une seule fois lors du montage

    return (
        <div className="container" style={{ marginTop: '50px', marginLeft: '50px' }}>
            <canvas id="myChart" width="400" height="400"></canvas>
            <p id="unread-count" style={{ display: 'none' }}>{unreadCount}</p>
        </div>
    );
}

export default MyChart;
//*/
/*
import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

function MyChart() {
    const [unreadCount, setUnreadCount] = useState(0);
    const [myChart, setMyChart] = useState(null);

    useEffect(() => {
        // Initialiser le graphique avec des données statiques
        const ctx = document.getElementById('myChart');
        if (myChart) {
            myChart.destroy(); // Destroy the existing chart if it exists
        }
        const newChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['1', '2', '3', '4', '5'],
                datasets: [{
                    label: 'Unread Count',
                    data: [5, 10, 15, 20, 25],
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        setMyChart(newChart); // Set the new chart instance

        // Fonction pour mettre à jour le graphique avec les nouvelles données
        function updateChart(newData) {
            // Mettre à jour les étiquettes du graphique
            newChart.data.labels.push((newChart.data.labels.length + 1).toString());

            // Mettre à jour les données du graphique
            newChart.data.datasets[0].data.push(newData);

            // Limiter le nombre de données affichées à 10 pour une meilleure visualisation
            if (newChart.data.labels.length > 10) {
                newChart.data.labels.shift();
                newChart.data.datasets[0].data.shift();
            }

            // Mettre à jour le graphique
            newChart.update();
        }

        // Mettre à jour le graphique lors de la réception de nouvelles données
        const notifySocket = new WebSocket(
            //'ws://' + window.location.host + '/ws/sms/notification/'
            'ws://localhost:8888/ws/sms/notification/'
        );

        notifySocket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            console.log(data);

            const newData = Math.floor(Math.random() * 30) + 1;
            setUnreadCount(prevCount => prevCount + newData);
            updateChart(unreadCount + newData);
        };

        notifySocket.onclose = function(e) {
            console.log('Web socket is closed.');
        };

        return () => {
            notifySocket.close();
            if (newChart) {
                newChart.destroy(); // Destroy the chart instance when component unmounts
            }
        };
    }, []); // exécute une seule fois lors du montage

    return (
        <div className="chart-container" style={{ position: 'absolute', top: '20px', right: '20px' }}>
            <canvas id="myChart" width="400" height="400"></canvas>
            <p id="unread-count" style={{ display: 'none' }}>{unreadCount}</p>
        </div>
    );
}

export default MyChart;
//*/
/*
import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import WebSocketComponent from './WebSocketComponent';

function MyChart() {
    const [unreadCount, setUnreadCount] = useState(0);
    const [myChart, setMyChart] = useState(null);

    useEffect(() => {
        const ctx = document.getElementById('myChart');
        if (myChart) {
            myChart.destroy(); 
        }
        const newChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['1', '2', '3', '4', '5'],
                datasets: [{
                    label: 'Unread Count',
                    data: [5, 10, 15, 20, 25],
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        setMyChart(newChart); 

        return () => {
            if (newChart) {
                newChart.destroy(); 
            }
        };
    }, []); 

    const updateChart = (newData) => {
        myChart.data.labels.push((myChart.data.labels.length + 1).toString());
        myChart.data.datasets[0].data.push(newData);

        if (myChart.data.labels.length > 10) {
            myChart.data.labels.shift();
            myChart.data.datasets[0].data.shift();
        }

        myChart.update();
    };

    const onDataReceived = (data) => {
        const newData = Math.floor(Math.random() * 30) + 1;
        setUnreadCount(prevCount => prevCount + newData);
        updateChart(unreadCount + newData); // Here you're using the updateChart function
    };

    return (
        <div className="chart-container" style={{ position: 'absolute', top: '20px', right: '20px' }}>
            <canvas id="myChart" width="400" height="400"></canvas>
            <p id="unread-count" style={{ display: 'none' }}>{unreadCount}</p>
            <WebSocketComponent
                url={'ws://localhost:8888/ws/sms/notification/'}
                onDataReceived={onDataReceived}
            />
        </div>
    );
}

export default MyChart;

//*/
/*
import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import WebSocketComponent from './WebSocketComponent';

function MyChart() {
    const [unreadCount, setUnreadCount] = useState(0);
    const [myChart, setMyChart] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const ctx = document.getElementById('myChart');
        if (myChart) {
            myChart.destroy(); 
        }
        const newChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['1', '2', '3', '4', '5'],
                datasets: [{
                    label: 'Unread Count',
                    data: [5, 10, 15, 20, 25],
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        setMyChart(newChart); 

        return () => {
            if (newChart) {
                newChart.destroy(); 
            }
        };
    }, []); 

    const updateChart = (newData) => {
        myChart.data.labels.push((myChart.data.labels.length + 1).toString());
        myChart.data.datasets[0].data.push(newData);

        if (myChart.data.labels.length > 10) {
            myChart.data.labels.shift();
            myChart.data.datasets[0].data.shift();
        }

        myChart.update();
    };

    const onDataReceived = (data) => {
        const newData = Math.floor(Math.random() * 30) + 1;
        setUnreadCount(prevCount => prevCount + newData);
        updateChart(unreadCount + newData); // Here you're using the updateChart function
    };

    const toggleConnection = () => {
        setIsConnected(prevState => !prevState);
    };

    return (
        <div className="chart-container" style={{ position: 'absolute', top: '20px', right: '20px' }}>
            <canvas id="myChart" width="400" height="400"></canvas>
            <p id="unread-count" style={{ display: 'none' }}>{unreadCount}</p>
            <WebSocketComponent
                url={'ws://localhost:8888/ws/sms/notification/'}
                onDataReceived={onDataReceived}
                isConnected={isConnected}
            />
            <button onClick={toggleConnection}>
                {isConnected ? 'Disconnect' : 'Connect'}
            </button>
        </div>
    );
}

export default MyChart;
//*/
/*/
import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import WebSocketComponent from './WebSocketComponent';

function MyChart() {
    const [unreadCount, setUnreadCount] = useState(0);
    const [myLineChart, setMyLineChart] = useState(null);
    const [myBarChart, setMyBarChart] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const lineCtx = document.getElementById('lineChart');
        const barCtx = document.getElementById('barChart');

        if (myLineChart) {
            myLineChart.destroy(); 
        }
        if (myBarChart) {
            myBarChart.destroy(); 
        }

        const newLineChart = new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: ['1', '2', '3', '4', '5'],
                datasets: [{
                    label: 'Unread Count',
                    data: [5, 10, 15, 20, 25],
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        setMyLineChart(newLineChart); 

        const newBarChart = new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['1', '2', '3', '4', '5'],
                datasets: [{
                    label: 'Unread Count',
                    data: [5, 10, 15, 20, 25],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        setMyBarChart(newBarChart); 

        return () => {
            if (newLineChart) {
                newLineChart.destroy(); 
            }
            if (newBarChart) {
                newBarChart.destroy(); 
            }
        };
    }, []); 

    const updateCharts = (newData) => {
        myLineChart.data.labels.push((myLineChart.data.labels.length + 1).toString());
        myLineChart.data.datasets[0].data.push(newData);
        myBarChart.data.labels.push((myBarChart.data.labels.length + 1).toString());
        myBarChart.data.datasets[0].data.push(newData);

        if (myLineChart.data.labels.length > 10) {
            myLineChart.data.labels.shift();
            myLineChart.data.datasets[0].data.shift();
        }
        if (myBarChart.data.labels.length > 10) {
            myBarChart.data.labels.shift();
            myBarChart.data.datasets[0].data.shift();
        }

        myLineChart.update();
        myBarChart.update();
    };

    const onDataReceived = (data) => {
        const newData = Math.floor(Math.random() * 30) + 1;
        setUnreadCount(prevCount => prevCount + newData);
        updateCharts(unreadCount + newData); // Here you're using the updateCharts function
    };

    const toggleConnection = () => {
        setIsConnected(prevState => !prevState);
    };

    return (
        <div className="chart-container" style={{ position: 'absolute', top: '20px', right: '20px' }}>
            <canvas id="lineChart" width="400" height="400"></canvas>
            <canvas id="barChart" width="400" height="400"></canvas>
            <p id="unread-count" style={{ display: 'none' }}>{unreadCount}</p>
            <WebSocketComponent
                url={'ws://localhost:8888/ws/sms/notification/'}
                onDataReceived={onDataReceived}
                isConnected={isConnected}
            />
            <button onClick={toggleConnection}>
                {isConnected ? 'Disconnect' : 'Connect'}
            </button>
        </div>
    );
}

export default MyChart;
//*/
//*
import React, { useState, useEffect } from 'react'; // Import des modules React nécessaires
import Chart from 'chart.js/auto'; // Import de la bibliothèque Chart.js
import WebSocketComponent from './WebSocketComponent'; // Import du composant WebSocketComponent

function MyChart() {
    const [unreadCount, setUnreadCount] = useState(0); // Déclaration de l'état unreadCount initialisé à 0
    const [myLineChart, setMyLineChart] = useState(null); // Déclaration de l'état myLineChart initialisé à null pour le graphique en ligne
    const [myBarChart, setMyBarChart] = useState(null); // Déclaration de l'état myBarChart initialisé à null pour le graphique en barre
    const [isConnected, setIsConnected] = useState(false); // Déclaration de l'état isConnected initialisé à false pour la connexion WebSocket
    
    useEffect(() => { // Utilisation de useEffect pour exécuter du code au montage et au démontage du composant
        const lineCtx = document.getElementById('lineChart'); // Récupération du contexte du canvas pour le graphique en ligne
        const barCtx = document.getElementById('barChart'); // Récupération du contexte du canvas pour le graphique en barre

        if (myLineChart) { // Vérification si myLineChart existe déjà
            myLineChart.destroy(); // Destruction du graphique en ligne existant
        }
        if (myBarChart) { // Vérification si myBarChart existe déjà
            myBarChart.destroy(); // Destruction du graphique en barre existant
        }

        const newLineChart = new Chart(lineCtx, { // Création d'un nouveau graphique en ligne avec Chart.js
            type: 'line', // Type de graphique
            data: { // Données du graphique
                labels: ['1', '2', '3', '4', '5'], // Labels pour l'axe x
                datasets: [{ // Définition des ensembles de données
                    label: 'Unread Count', // Label de l'ensemble de données
                    data: [5, 10, 15, 20, 25], // Données pour l'ensemble de données
                    borderColor: 'rgba(255, 99, 132, 1)', // Couleur de la bordure
                    borderWidth: 1 // Largeur de la bordure
                }]
            },
            options: { // Options du graphique
                scales: { // Configuration des échelles
                    y: { // Configuration de l'axe y
                        beginAtZero: true // Commencer à 0
                    }
                }
            }
        });
        setMyLineChart(newLineChart); // Mise à jour de l'état myLineChart avec le nouveau graphique en ligne créé

        const newBarChart = new Chart(barCtx, { // Création d'un nouveau graphique en barre avec Chart.js
            type: 'bar', // Type de graphique
            data: { // Données du graphique
                labels: ['1', '2', '3', '4', '5'], // Labels pour l'axe x
                datasets: [{ // Définition des ensembles de données
                    label: 'Unread Count', // Label de l'ensemble de données
                    data: [5, 10, 15, 20, 25], // Données pour l'ensemble de données
                    backgroundColor: 'rgba(54, 162, 235, 0.2)', // Couleur de fond
                    borderColor: 'rgba(54, 162, 235, 1)', // Couleur de la bordure
                    borderWidth: 1 // Largeur de la bordure
                }]
            },
            options: { // Options du graphique
                scales: { // Configuration des échelles
                    y: { // Configuration de l'axe y
                        beginAtZero: true // Commencer à 0
                    }
                }
            }
        });
        setMyBarChart(newBarChart); // Mise à jour de l'état myBarChart avec le nouveau graphique en barre créé

        return () => { // Fonction de nettoyage exécutée au démontage du composant
            if (newLineChart) { // Vérification si newLineChart existe
                newLineChart.destroy(); // Destruction du graphique en ligne
            }
            if (newBarChart) { // Vérification si newBarChart existe
                newBarChart.destroy(); // Destruction du graphique en barre
            }
        };
    }, []); // Déclenchement de useEffect uniquement au montage du composant

    const updateCharts = (newData) => { // Fonction pour mettre à jour les graphiques avec de nouvelles données
        myLineChart.data.labels.push((myLineChart.data.labels.length + 1).toString()); // Ajout d'un nouveau label pour le graphique en ligne
        myLineChart.data.datasets[0].data.push(newData); // Ajout de nouvelles données pour le graphique en ligne
        myBarChart.data.labels.push((myBarChart.data.labels.length + 1).toString()); // Ajout d'un nouveau label pour le graphique en barre
        myBarChart.data.datasets[0].data.push(newData); // Ajout de nouvelles données pour le graphique en barre

        if (myLineChart.data.labels.length > 10) { // Vérification si le nombre de labels dépasse 10
            myLineChart.data.labels.shift(); // Suppression du premier label du graphique en ligne
            myLineChart.data.datasets[0].data.shift(); // Suppression de la première donnée du graphique en ligne
        }
        if (myBarChart.data.labels.length > 10) { // Vérification si le nombre de labels dépasse 10
            myBarChart.data.labels.shift(); // Suppression du premier label du graphique en barre
            myBarChart.data.datasets[0].data.shift(); // Suppression de la première donnée du graphique en barre
        }

        myLineChart.update(); // Mise à jour du graphique en ligne
        myBarChart.update(); // Mise à jour du graphique en barre
    };

    const onDataReceived = (data) => { // Fonction appelée lors de la réception de nouvelles données via WebSocket
        const newData = Math.floor(Math.random() * 30) + 1; // Génération de nouvelles données aléatoires
        setUnreadCount(prevCount => prevCount + newData); // Mise à jour de unreadCount
        updateCharts(unreadCount + newData); // Mise à jour des graphiques avec les nouvelles données
    };

    const toggleConnection = () => { // Fonction pour basculer la connexion WebSocket
        setIsConnected(prevState => !prevState); // Inversion de la valeur de isConnected
    };

    return (
      // Début du rendu du composant dans une div avec une classe "chart-container"
      <div className="chart-container" style={{ position: 'absolute', top: '20px', right: '20px' }}>
          {/* Canvas pour le graphique en ligne avec l'ID "lineChart" et des dimensions de 400x400 pixels */}
          <canvas id="lineChart" width="200" height="200"></canvas>
          {/* Canvas pour le graphique en barre avec l'ID "barChart" et des dimensions de 400x400 pixels */}
          <canvas id="barChart" width="200" height="200"></canvas>
          {/* Paragraphe caché pour afficher le nombre de messages non lus avec l'ID "unread-count" */}
          <p id="unread-count" style={{ display: 'none' }}>{unreadCount}</p>
          {/* Composant WebSocketComponent pour la communication en temps réel */}
          <WebSocketComponent
              // URL du WebSocket à connecter
              url={'ws://localhost:8880/ws/sms/notification/'}
              // Fonction de rappel pour traiter les données reçues du WebSocket
              onDataReceived={onDataReceived}
              // État de connexion du WebSocket (connecté ou déconnecté)
              isConnected={isConnected}
          />
          {/* Bouton pour connecter ou déconnecter le WebSocket */}
          <button onClick={toggleConnection}>
              {/* Texte du bouton basé sur l'état de connexion du WebSocket */}
              {isConnected ? 'Disconnect' : 'Connect'}
          </button>
      </div>
  );
  
}

export default MyChart;

//*/