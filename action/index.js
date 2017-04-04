var action = {};
action.loadMapApi = () => {
    return new Promise((resolve,reject) => {
        fetch('http://172.24.1.57:8000/map/load?load=all&_=1491227786207', {  
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json', 
            }
        }).then((response) => response.json()).then((data) => resolve(data)).catch((data) => reject(data))  
    });      
}
export default action;