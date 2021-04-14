import React,{useState} from 'react'
import '../../scss/components/Cart/_ProductCart.scss'
import DivText from "../ProductCard/DivText"
import ScoreIcon from "../ProductCard/ScoreIcon"
import DeleteButton from "@material-ui/icons/Delete"
import { Button, Input } from '@material-ui/core'
import {useDispatch}  from "react-redux"
import {deleteProduct} from "../../redux/cartReducer/cartActions"
import {totalPrice} from "../../redux/cartReducer/cartActions"

function ProductCard({product}){
   const [quantity, setQuantity] = useState(1)
   const [stock, setStock] = useState(true)

    const dispatch = useDispatch()
    const handleChange = (e,unitsOnStock) => {
      setQuantity(e.target.value)
        if(e.target.value > unitsOnStock) {
            setStock(false)
         return setQuantity(1)
        }
        setStock(true)
        dispatch({type:"INCREMENTQ", payload:{product:product, value: e.target.value}})
        dispatch(totalPrice())
    }
    
    return (
        <div className='productCart'>
                <div className='cardPicture'>
                    <img src={product.picture} alt='product'></img>
                </div>
                <div className='cartContent'>

                    <div className='cardData'>
                        <div className='cardScore'>
                            <div className='starIcon'>
                                <ScoreIcon score={product.score}/>
                            </div>                        
                        </div>
                        <div className='cardPrice'>
                            <DivText content={`USD$${product.unitPrice}`}/>
                        </div>
                    </div>
                        {/* <p id='nameCard'><b>{product.name}</b></p> */}
                        {/* <p id='descriptionCard'>{product.description}</p> */}
                        <h3>{product.name}</h3>
                        <div className="delete">
                      <Input type="number" defaultValue={quantity} onChange={(e) => handleChange(e, product.unitsOnStock)}  placeholder={quantity}></Input>
                      <Button onClick={() => dispatch(deleteProduct(product))}> <DeleteButton/></Button>
                      <p className="stockUp">Disponibles:{product.unitsOnStock}</p>
                      {stock ? "" : <p className="stock">No hay stock disponible</p>}
                        </div>
                  
                </div>
          
    
        </div>
    )
}

export default ProductCard