import { useState, useEffect } from "react";
import { API_URL } from "../config";
import { API_KEY } from "../config";
import {Preloader} from './Preloader';
import {GoodsList} from './GoodsList';
import {Cart} from './Cart';
import {BasketList} from './BasketList';
import {Alert} from './Alert';

function Shop() {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [isBasketShow, setBasketShow] = useState(false); 
  const [alertName, setAlertName] = useState('');

  const addToBasket = (item) => { //передаём item(mainId, displayName, regPrice), вызывая функцию в GoodsItem
    const itemIndex = order.findIndex((orderItem) => orderItem.mainId === item.mainId); //получаем индекс элемента по айди. проверяем, был ли добавлен такой item
    
    if(itemIndex < 0){ //если совпадений нет, findIndex вернёт -1. item ещё не был добавлен, добавляем
      const newItem = {
        ...item,
        quantity: 1,
      };

      setOrder([...order, newItem]); //массив объектов-заказов + нов.элемент
    }else{
      const newOrder = order.map((orderItem, index) => { //item уже был добавлен, увеличиваем кол-во на 1
        if(index === itemIndex){
          return {
            ...orderItem,
            quantity: orderItem.quantity + 1
          }
        }else{
          return orderItem;
        }
      })
      setOrder(newOrder);
    }
    setAlertName(item.displayName); //меняем состояние: устанавливаем название товара в подсказку
  };

  const removeFromBasket = (itemId) => { //нам нужен только mainId
    const newOrder = order.filter(elem => elem.mainId !== itemId)
    setOrder(newOrder);
  };

  const increaseQuantity = (itemId) => {
    const newOrder = order.map(elem => {
      if(elem.mainId === itemId){
        const newQuantity = elem.quantity + 1;
        return { //возвр. все ключи элемента , а ключ quantity меняем на newQuantity
          ...elem, 
          quantity: newQuantity, 
        }
      }else{
        return elem;
      }
    });
    setOrder(newOrder);
  }

  const decreaseQuantity = (itemId) => {
    const newOrder = order.map(elem => {
      if(elem.mainId === itemId){
        const newQuantity = elem.quantity - 1;
        return { //возвр. все ключи элемента , а ключ quantity меняем на newQuantity
          ...elem, 
          quantity: newQuantity >= 0 ? newQuantity : 0,  //проверка чтобы не уходило в минус
        }
      }else{
        return elem;
      }
    });
    setOrder(newOrder);
  }

  const handleBasketShow = () => {
    setBasketShow(!isBasketShow);
  };

  const closeAlert = () => {
    setAlertName('');
  }

  useEffect(function getGoods() {
    fetch(API_URL, {
      headers: {
        Authorization: API_KEY, //от нас требуется заголовок: авторизация и ключ
      },
    })
      .then((response) => response.json())
      .then((result) => {
        result.shop && setGoods(result.shop); //оператором && проверяем, пришёл ли ответ от объекта shop(главн.объект)
        setLoading(false);
      });
  }, []);

  return <main className="container content">
          <Cart quantity={order.length} handleBasketShow={handleBasketShow}/>
         {loading ? <Preloader/> : <GoodsList goods={goods} addToBasket={addToBasket}/> } {/*в зависимости от статуса загрузки показываем либо загрузку, либо список товаров */}
    {
      isBasketShow && <BasketList order={order} handleBasketShow={handleBasketShow} removeFromBasket={removeFromBasket} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity}/>
    }
    {alertName && <Alert displayName={alertName} closeAlert={closeAlert}/>}
  </main>
}

export { Shop };
