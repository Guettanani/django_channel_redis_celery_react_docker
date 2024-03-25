// WebSocketComponent.js

//import React, { useEffect } from 'react';
//import WebSocketClient from 'websocket';

//import { w3cwebsocket as WebSocketClient } from 'websocket';
/*
function WebSocketComponent({ url, onDataReceived }) {
    useEffect(() => {
        const ws = new WebSocketClient(url);
        
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

export default WebSocketComponent;
*/
/*
import React, { useEffect } from 'react';
import { w3cwebsocket as WebSocketClient } from 'websocket';

function WebSocketComponent({ url, onDataReceived }) {
    useEffect(() => {
        const ws = new WebSocketClient(url);
        
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

export default WebSocketComponent;
//*/
import React, { useEffect, useState } from 'react';
import { w3cwebsocket as WebSocketClient } from 'websocket';

function WebSocketComponent({ url, onDataReceived, isConnected }) {
    const [ws, setWs] = useState(null);

    useEffect(() => {
        if (isConnected) {
            const newWs = new WebSocketClient(url);
            setWs(newWs);

            newWs.onopen = () => {
                console.log('WebSocket connected');
            };

            newWs.onmessage = (event) => {
                console.log('Message received:', event.data);
                onDataReceived(event.data);
            };

            newWs.onclose = () => {
                console.log('WebSocket disconnected');
            };

            return () => {
                newWs.close();
            };
        }
    }, [url, onDataReceived, isConnected]);

    return null;
}

export default WebSocketComponent;
