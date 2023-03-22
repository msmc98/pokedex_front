
export const statsColors =  {
    red: '#eb0404',
    green: '#2cff00',
    yellow: '#fbff00',
    orange: '#ff8900',
    blue: '#1671e5',
    purple: '#6600ff',
}

export const manageColor = (value) => {
    if(value < 60){
        return statsColors.red;
    }
    if(value < 80){
        return statsColors.orange;
    }
    if(value < 100){
        return statsColors.yellow;
    }
    if(value < 200){
        return statsColors.green;
    }
}
