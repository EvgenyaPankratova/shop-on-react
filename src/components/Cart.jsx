
function Cart(props){
    const {quantity = 0, handleBasketShow = Function.prototype} = props;
     return <div className="cart amber darken-1 white-text" onClick = {handleBasketShow}>  {/*при клике на любое место с блоком корзины - вызываем фук-ю*/}
        <i className="material-icons">shopping_basket</i>
        {quantity ? <span className="cart-quantity">{quantity}</span> : null}  {/*проверяем количество - если не 0, выводим */}
    </div>
}

export{Cart}