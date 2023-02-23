function handlerData (menuData, val) {
    for(const item of menuData) {
        // console.log(item);
        if (item.children != null) {
            return handlerData(item.children, val)
        }else if (item.name === val) {
            // console.log(item);
            return item
        }
    }
}

export  {
    handlerData
}