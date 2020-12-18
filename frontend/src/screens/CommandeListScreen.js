import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder,listOrders } from '../actions/commande';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { COMMANDE_DELETE_RESET } from '../constants/commande';

export default function CommandeListScreen(props) {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: COMMANDE_DELETE_RESET });
    dispatch(listOrders());
  }, [dispatch, successDelete]);

  const deleteHandler = (order) => {
    if (window.confirm('Êtes-vous sûr de la supprimer ?')) {
        dispatch(deleteOrder(order._id));
      }
  };
  return (
    <div>
    <div className='text-blanc-h'>
      Commandes</div>      
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
      <table className="table-history">          
      <thead>
            <tr>
              <th>Identifiant</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAYE</th>
              <th>LIVRE</th>
              <th>ACTIONS</th>
            </tr>
      </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrix}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'Oui'}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'Non'}
                </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(order)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}