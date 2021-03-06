import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Alert from '@material-ui/lab/Alert';
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { submitCommentary } from '../../redux/reviewsReducer/actionsReviews';
import { useDispatch } from 'react-redux';
import swal from "sweetalert";
import "../../scss/components/Reviews/_Reviews.scss";

const verdePrincipal="#378A19";
const grisPrincipal= "#EFEFEF";
const verdeClaro="#85DA6C";


const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
      color: grisPrincipal,
      backgroundColor: verdePrincipal,
      '&:hover': {
        backgroundColor: verdeClaro,
        }
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
      
    },
}));


function Reviews({id, userId}) {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    rate: "",
    text:""
  });
  const classes = useStyles();
  const token = localStorage.getItem("token");
  

  function handleInput(e){
    e.preventDefault();
    setInput({
        ...input,
        [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e, token){
    e.preventDefault(e);
    if(!input.text) {
      return swal("Aviso!","No has ingresado un comentario", "warning")
    }
    if(!input.rate) {
      return e.preventDefault(e); 
    }
    dispatch(submitCommentary(input.text, input.rate, id, userId, token))
    .then(e => {
      swal("Éxito!","Su comentario ha sido registrado", "success")
      .then(e => {
        return window.location.reload();
      })
    })
    
  }

  return (
    <div className="Reviews">
      <h2>Deja un comentario</h2>
      <form className="input-container">
        <TextField
          id="outlined-multiline-static"
          label="Review"
          name="text"
          value={input.text}
          onChange= {(e)=>{handleInput(e)}}
          multiline
          rows={4}
          placeholder="Comenta que te parece el producto"
          variant="outlined"
        />
        <Box component="fieldset" mb={3} borderColor="transparent" className="rate-send">
          <Typography component="legend">Valora este producto</Typography>
          <div className="stars">
            <Rating
              name="rate"
              value={input.rate}
              onChange={(e)=>{handleInput(e)}}
            />
            {(input.text&&!input.rate) && <Alert severity="warning">Ingresa la cantidad de estrillitas</Alert>}
          </div>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={`${classes.margin} button-send`}
            type="submit"
            onClick = {(e)=> handleSubmit(e, token)}
          >
            Enviar
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default Reviews;
