function GoodsItem(props) {
  const { mainId, displayName, displayDescription, price, displayAssets, addToBasket = Function.prototype} = props;
  let regPrice = price['regularPrice'];
  return (
    <div className="card card-item" >
      <div className="card-image">
        <img className="img-card" src={displayAssets[0]['full_background']} alt={displayName} />
        
      </div>

      <div className="card-content">
      <h6 className="">{displayName}</h6>
        <p>{displayDescription}</p>
        <div className=" buy-action">
          <button onClick={() => addToBasket({mainId, displayName, regPrice})} className="btn-small buy-btn cyan darken-4">Купить</button>
          <span className="right price">{`${price['regularPrice']}₽`}</span>
        </div>
      </div>
    </div>
  );
}

export { GoodsItem };
