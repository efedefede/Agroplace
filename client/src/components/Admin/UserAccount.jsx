import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import OrderDetail from './OrderDetail'
// import { sortByName, sortByQuantity, sortByPrice, sortByCost } from './FilterOrderDetail'
import DivText from "../ProductCard/DivText";
import "../../scss/components/OrderHistory/_OrderHistory.scss";
import "../../scss/components/OrderHistory/_FilterOrderDetail.scss";
import { Select, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { ModPass } from "../../redux/AdminReducer/AdminActions";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  iconControl: {
    margin: theme.spacing(3),
  },
}));

const UserAccount = ({ user }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [state, setState] = useState(false);
  const [type, setType] = useState({ id: user.id, name: user.type });

  const [sort, setSort] = useState({
    name: false,
    quantity: false,
    price: false,
    cost: false,
  });

  let activeToggle = state ? "active" : "inactive";

  function toggle() {
    setState(!state);
    activeToggle = state ? "active" : "inactive";
  }

  const handleTypes = (e) => {
    setType({...type, name: e.target.value})
  };

  const handleChange = (e) => {
    
  }

  const typeSubmit = (e) => {
    e.preventDefault()
    dispatch(ModPass(type))
  }
  // function sortName(){
  //     let [newOrdersDetails, newSort] = sortByName(ordersDetails, sort)
  //     setSort(newSort)
  //     setOrdersDetails(newOrdersDetails)
  // }

  // function sortQuantity(){
  //     let [newOrdersDetails, newSort] = sortByQuantity(ordersDetails, sort)
  //     setSort(newSort)
  //     setOrdersDetails(newOrdersDetails)
  // }

  // function sortPrice(){
  //     let [newOrdersDetails, newSort] = sortByPrice(ordersDetails, sort)
  //     setSort(newSort)
  //     setOrdersDetails(newOrdersDetails)
  // }

  // function sortCost(){
  //     let [newOrdersDetails, newSort] = sortByCost(ordersDetails, sort)
  //     setSort(newSort)
  //     setOrdersDetails(newOrdersDetails)
  // }
  if (!!user) {
    return (
      <div className="containerOrder">
        <div className={activeToggle}>
          <div className="order" onClick={toggle}>
            <div className="orderId">
              <DivText content={user.id} />
            </div>
            <div className="orderStatus">
              <DivText content={user.firstName} />
            </div>
            <div className="orderCreatedAt">
              <DivText content={user.lastName} />
            </div>
            <div className="orderUpdatedAt">
              <DivText content={user.email} />
            </div>
            <div className="orderPayment">
              <DivText content={user.type} />
            </div>
            <div className="orderTotal">
              <DivText content={user.status} />
            </div>
          </div>
          {/* <div className="folding-pannel filter">
                        <div className='containerFilterOrderDetail'>
                            <div className='orderFilterDetailName' onClick={sortName}><DivText content='Producto'/></div>
                            <div className='orderFilterDetailQuantity' onClick={sortQuantity}><DivText content='Cantidad'/></div>
                            <div className='orderFilterDetailPrice' onClick={sortPrice}><DivText content='Precio Unidad'/></div>
                            <div className='orderFilterDetailCost' onClick={sortCost}><DivText content='Costo por Item'/></div>
                        </div>  
                    </div> */}
          {/* {
                        ordersDetails?.map(orderDetail => {
                            return <div className="folding-pannel answer" key={`OrderDetail-${orderDetail.id}-${order.id}`}>
                                        <OrderDetail product={orderDetail}/>
                                    </div>
                        })
                    }    */}
          <div className="order" onClick={toggle}>
            <div className="buttons">
              <div className="buttons">
                <Button
                  variant="contained"
                  cursor="pointer"
                  onClick={() => dispatch(ModPass(type))}
                >
                  Modificar contraseña
                </Button>
              </div>
              <FormControl className={classes.formControl} onSubmit={typeSubmit}>
                <InputLabel id="demo-simple-select-label">
                  Tipo de usuario
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type.name}
                  // () => {if(type.name.includes('admin')){return 'admin'}else{return 'user'}}
                  onChange={handleTypes}
                  inputProps={{
                    name: "ModType",
                  }}
                >
                  <MenuItem name="type" value={"admin"}>
                    Admin
                  </MenuItem>
                  <MenuItem name="type" value={"user"}>
                    Usuario
                  </MenuItem>
                </Select>
                <CheckCircleIcon
                type="submit"
                className={classes.iconControl}                
              ></CheckCircleIcon>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={user.status}
                  onChange={handleChange}
                >
                  <MenuItem value={"active"}>Activo</MenuItem>
                  <MenuItem value={"disabled"}>Desactivado</MenuItem>
                  <MenuItem value={"banned"}>Suspendido</MenuItem>
                </Select>
              </FormControl>
              {/* <CheckCircleIcon
                className={classes.iconControl}
                onSubmit={console.log("asd")}
              ></CheckCircleIcon> */}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return () => {};
  }
};

export default UserAccount;