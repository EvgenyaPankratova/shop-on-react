import {GoodsItem} from './GoodsItem'


function GoodsList(props) {
    const {goods = [], addToBasket = Function.prototype} = props; //получаем через пропсы от Shop массив фильмов, по умолчанию ставим пустой массив

        if(!goods.length){
            return <h3>Nothing is here</h3>
        }
        
    return <div className="goods">
        {goods.map(item => (
            <GoodsItem key={item.mainId} {...item} addToBasket={addToBasket}/> //передаём всё через пропс и добавляем ключ
        ))}
    </div>
}

export {GoodsList}