const CardList = (state = [], action) => {
    switch(action.type) {
        case 'SET_CARDLIST':
            return action.payload
        default: 
            return [];
    }
}

export default CardList;