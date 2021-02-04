import React, {useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox.js';
import MessageBox from '../components/MessageBox.js';
import { listOrder } from '../actions/orderActions.js';

export default function OrderHistoryScreen(props) {
    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders } = orderList;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    if (!userInfo) {
        props.history.push("/signin");
    }    
   
    const dispatch = useDispatch();
    useEffect(() => {            
        dispatch(listOrder());        
    }, [dispatch]);

    return (
        <div>
            <h1>Order History </h1>
            {loading ? <LoadingBox></LoadingBox> :
            error ? <MessageBox variant="danger">{error} </MessageBox>
            : orders.length === 0 ? <MessageBox variant="danger">No Orders Exist. </MessageBox> :
            <>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>{order.totalPrice.toFixed(2)}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0,10): 'No'}</td>
                                <td>
                                    {order.isDelivered ?
                                    order.deliveredAt.substring(0,10)
                                : 'No'}
                                </td>
                                <td>
                                    <button 
                                        type="button" 
                                        className="small"
                                        onClick={() => {
                                            props.history.push(`/order/${order._id}`);
                                        }}
                                    > Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
            }
        </div>
    );
}
