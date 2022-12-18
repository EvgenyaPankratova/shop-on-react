
function BasketItem(props){
    const {
        mainId, 
        displayName,
        regPrice, //regPrice создали в GoodsItem, т.к. там приходит из API price -массив с 2 объектами, из него нам нужно только regPrice
        quantity,
        removeFromBasket = Function.prototype,
        increaseQuantity = Function.prototype,
        decreaseQuantity = Function.prototype

    } = props;

    return <ul className="basket-item"> 
        <li className="collection-item ">
        {displayName}  <i className="material-icons basket-quantity" onClick={() => {decreaseQuantity(mainId)}}>remove</i>x {quantity} <i onClick={() => {increaseQuantity(mainId)}} className="material-icons basket-quantity">add</i>= {regPrice * quantity} ₽ 
        <span class="secondary-content" onClick={() => removeFromBasket(mainId)}><i class="material-icons order-delete">cancel</i></span>
        </li>
    </ul>
}

export{BasketItem}