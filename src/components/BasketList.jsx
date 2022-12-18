import {BasketItem} from './BasketItem';

function BasketList(props){
    const {order = [], 
        handleBasketShow = Function.prototype, 
        removeFromBasket = Function.prototype,
        increaseQuantity = Function.prototype,
        decreaseQuantity = Function.prototype
    } = props;

    const totalPrice = order.reduce((sum, elem) => { //вычисляем общую цену, для этого даже не нужно состояние
        return sum + elem.regPrice * elem.quantity
    }, 0);

    return <ul className="collection basket-list">
    <li className="collection-item active cyan darken-4">Корзина</li>
    {
        order.length ? order.map(item => (
            <BasketItem key={item.mainId} {...item} removeFromBasket={removeFromBasket} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity}/>
        )) : <li className="collection-item ">В корзине пусто!</li>
    }
    <li className="collection-item "><span className='total' >Общая стоимость: {totalPrice} ₽</span> <button className='order-btn btn-small btn  amber accent-4'>Оформить заказ</button></li>

    <i className='material-icons basket-close' onClick={handleBasketShow}>close</i> 
  </ul>
}

export {BasketList}