import { useEffect} from 'react'

function Alert (props) {
    const {displayName = '', closeAlert = Function.prototype} = props;


    useEffect(() => {
        const timerId = setTimeout(closeAlert, 3000); //убираем подсказку через 3 сек
        
        return () => {
            clearTimeout(timerId);
        }
    }, [displayName]);

    return <div id="toast-container" >
         <div className="toast">Товар {displayName} добавлен в корзину</div>  {/*стили подсказок вытащены из materialize-css */}
    </div>
}

export {Alert}