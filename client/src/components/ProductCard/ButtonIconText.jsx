import React, { useState } from 'react'
import '../../scss/components/ProductCard/_ButtonIconText.scss'
import DivText from './DivText.jsx'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { FormGroup } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { modifyCart, modifyFav } from '../../redux/iconReducer/iconActions';

function ButtonIconText(props){
    const iconState = useSelector(state => state.iconReducer)
    const [state, setState] = useState({
        [`Fav-${props.productId}`]: iconState.fav[`Fav-${props.productId}`],
        [`Cart-${props.productId}`]: iconState.cart[`Cart-${props.productId}`],
    })
    const dispatch = useDispatch();
    function handleHeart(event){
        event.preventDefault();
        let {name, checked} = event.target
        setState({ ...state, [name]: checked });
        if(name.includes('Fav')){
            dispatch(modifyFav({[name]: checked}))
        }else{
            dispatch(modifyCart({[name]: checked}))
        }
    }

    return (
        <div className='buttonIcon'>
            <div className='iconContainer'>
                <FormGroup>
                    {
                        props.icon === 'Heart' ? (<FormControlLabel
                        control={
                            <Checkbox 
                                icon={<FavoriteBorder />} 
                                checkedIcon={<Favorite />} 
                                checked={state[`Fav-${props.productId}`] || false}
                                name={`Fav-${props.productId}`} 
                                onChange={handleHeart}
                            />
                        }/>) : (<FormControlLabel
                                    control={
                                    <Checkbox 
                                        icon={<ShoppingCartOutlinedIcon />} 
                                        checkedIcon={<ShoppingCartIcon style={{color: "white"}}/>} 
                                        checked={state[`Cart-${props.productId}`] || false}
                                        name={`Cart-${props.productId}`} 
                                        onChange={handleHeart}
                                    />}
                                />)
                    }                    
                </FormGroup>       
            </div>
            <div className='textContainer'>
                <DivText className='textIcon' content={props.icon === 'Heart' ? 'Agregar a Favoritos':'Agregar a Carrito'}/>
            </div>
        </div> 
 
    )
}

export default ButtonIconText