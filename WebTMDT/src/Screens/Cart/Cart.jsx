import React, { useEffect, useRef, useState } from 'react'
import "../Payment/Payment.css"
import { useDispatch, useSelector } from 'react-redux';
import { addBill, addConfirmCart, decreaseQuantity, deleteCart, fetchCart, increaseQuantity, toggleChecked, updateCartQuantity } from '../../redux/Slices/cartSLice';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const SHIPPING_FEE = 5000;




    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    const cart = useSelector((state) => state.cart.cart);

    console.log("cart", cart);




    const handleUpdate = (item, quantity) => {

        if (quantity <= 0) {
            const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?');
            if (confirmDelete) {
                dispatch(deleteCart(item.id));
            }
        } else {
            dispatch(updateCart({ id: item.id, quantity: Number(quantity) || 0 }))
        }
    }

    const handleDeleteCart = (id) => {
        const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?');
        if (confirmDelete) {
            dispatch(deleteCart(id));
        }

    }

    const handleNavigateToPayment = () => {
        // const confirmCart = cart.filter((item) => item.checked)
        // dispatch(addConfirmCart({ cart: confirmCart, totalPrice: total }))
        navigate("/payment");
        // if (confirmCart) {
        //     dispatch(addBill(confirmCart));
        // }
        // dispatch(addBill({ name: data.name, phone: data.phone, address: data.address, note: data.note, cart: cart, totalPrice: payByWhat ? provisionalAmount + SHIPPING_FEE : 0 }))
    }

    const allChecked = cart.length > 0 && cart.every(item => item.checked);



    // Toggle tất cả
    const handleToggleAll = () => {
        dispatch(toggleChecked({ id: null, checked: !allChecked }));
    };

    // Toggle từng sản phẩm
    const handleToggleItem = (id, checked) => {
        dispatch(toggleChecked({ id, checked }));
    }

    const handleIncrease = (id, currentQuantity) => {
        dispatch(updateCartQuantity({ id, quantity: currentQuantity + 1 }));
    };

    const handleDecrease = (id, currentQuantity) => {
        if (currentQuantity > 1) {
            dispatch(updateCartQuantity({ id, quantity: currentQuantity - 1 }));
        }
    };

    const handleUpdateQuantity = (id, currentQuantity) => {
        dispatch(updateCartQuantity({ id, quantity: currentQuantity }));
    }

    const total = cart
        .filter((item) => item.checked)
        .reduce((sum, item) => sum + item.price * item.quantity, 0);






    return (
        <div>
            <div className='divRelative'>
                <div className="container-fluid bg-dark bg-img p-5">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h1 className="namePayment text-uppercase text-white">Trang Giỏ Hàng </h1>
                        </div>
                    </div>
                </div>
                {/* Page Header End */}
                {/* Products Start */}
                <div className="container-fluid about py-5">
                    <div className="container">
                        <form >
                            <div className="row">
                                <div className="col-lg-8 col-md-6">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th colSpan={"5"}>Đơn Hàng</th>
                                                {/* <th />
                                                <th /> */}
                                            </tr>
                                        </thead>

                                        <tbody id="parentThanhToan">
                                            <tr>
                                                <td colSpan={"2"}>
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            checked={allChecked}
                                                            onChange={handleToggleAll}
                                                            style={{ marginRight: "5px" }}
                                                        />  Chọn tất cả
                                                    </label>
                                                </td>
                                            </tr>
                                            {
                                                Array.isArray(cart) && cart.map(item => (
                                                    <tr key={item.id} className="chiTietThanhToan">
                                                        <td style={{ width: "100px" }}><input style={{ width: "50px", height: "18px" }} checked={item.checked} type="checkbox" name="" id="" onChange={() => handleToggleItem(item.id, !item.checked)} /></td>
                                                        <td><img src={item.img} alt="" /></td>
                                                        <td><div>
                                                            <span className="mrLeft small-heading">{item.name}</span>
                                                            <div className="d-flex mt-2">
                                                                <button onClick={(e) => {
                                                                    e.preventDefault();
                                                                    // handleUpdate(item, item.quantity - 1)
                                                                    handleDecrease(item.id, item.quantity);
                                                                }} className="btnTangGiamSL">-</button>
                                                                <span style={{ width: '50px', border: '1px solid #00000024', textAlign: 'center', height: '22px' }}>{item.quantity}</span>
                                                                <button onClick={(e) => {
                                                                    e.preventDefault();
                                                                    // handleUpdate(item, item.quantity + 1)
                                                                    handleIncrease(item.id, item.quantity)
                                                                }} className="btnTangGiamSL">+</button>
                                                            </div>
                                                        </div></td>
                                                        <td><span>{item.price}VNĐ</span></td>
                                                        <td> <i onClick={() => handleDeleteCart(item.id)} className="fa-solid fa-circle-xmark"></i></td>
                                                    </tr>
                                                ))
                                            }

                                        </tbody>
                                    </table>
                                </div>

                                <div className="col-lg-4 col-md-12">
                                    <div className="thanhToan">
                                        <div className="chiTietThanhToan1" style={{ marginLeft: '20px' }}>
                                            <p>Tạm tính</p>
                                            <p id="giaTamTinh">{total.toLocaleString()} VNĐ</p>
                                        </div>
                                        <div className="chiTietThanhToan1" style={{ marginLeft: '20px' }}>
                                            <p>Phí vận chuyển</p>
                                            <p>{SHIPPING_FEE.toLocaleString()} VNĐ</p>
                                        </div>
                                        <hr />
                                        <div className="chiTietThanhToan1" style={{ marginLeft: '20px' }}>
                                            <h4>Tổng cộng:</h4>
                                            <p id="giaTong">{(total + SHIPPING_FEE).toLocaleString()} VNĐ</p>
                                        </div>
                                        <div className="chiTietThanhToan1">
                                            <Link to={"/home"} style={{ cursor: 'pointer' }} className="mt-3 mx-3 anchor"><i className="fa-solid fa-chevron-left" />Quay lại trang chủ</Link>
                                            <button onClick={handleNavigateToPayment} className="btn btn-primary mt-3">ĐẶT HÀNG</button>
                                        </div>



                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Cart
