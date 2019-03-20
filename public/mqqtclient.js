var client = mqtt.connect('ws://10.144.33.115:3333');

console.log('Connecting ...')

client.on('connect', () => console.log("connected"))

client.subscribe('layerIconChange');
client.subscribe('panelChange');

client.on('message', function(topic, message) {
    var event = message.toString().split('/')
    console.log(event)
    switch(topic) {
        case 'layerIconChange':
            getSource(event[0]).data.features = getSource(event[0]).data.features.map(ft => {
                                                                                                ft.properties.icon = event[0]+event[1]; 
                                                                                                return ft
                                                                                            })
                                                                                                  
            map.getSource(event[0]).setData(getSource(event[0]).data)                                                                            
          break;
          case 'panelChange':
            getSource(event[0]).data.features = getSource(event[0]).data.features.map(ft => {   if(ft.properties.id == event[1]){
                                                                                                    ft.properties.icon = event[0]+event[2] 
                                                                                                    return ft  
                                                                                                } 
                                                                                                    return ft
                                                                                            })
                                                                                                  
            map.getSource(event[0]).setData(getSource(event[0]).data)                                                                            
          break;
      }

    console.log(message.toString())
});
