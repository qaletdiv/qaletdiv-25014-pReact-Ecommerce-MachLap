import React, { useEffect, useRef, useState } from 'react'
import "./Payment.css"
import { useDispatch, useSelector } from 'react-redux';
import { addBill, deleteCart, fetchCart, fetchConfirmCart } from '../../redux/Slices/cartSLice';
import { Link, useNavigate } from 'react-router-dom';


const Payment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const SHIPPING_FEE = 5000;
    const [count, setCount] = useState(1);
    const [shipCost, setShipCost] = useState(false);
    const [payByWhat, setPayByWhat] = useState(false);
    let [data, setData] = useState({ name: '', phone: '', address: '', note: '' });

    const validate = () => {
        const newErrors = {};

        if (!data.name.trim()) {
            newErrors.name = 'Họ tên không được để trống';
        }

        if (!data.phone.trim()) {
            newErrors.phone = 'Số điện thoại không được để trống';
        }

        if (!data.address.trim()) {
            newErrors.address = 'Địa chỉ không được để trống';
        }


        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        let { name, value } = e.target;

        setData(pref => ({
            ...pref,
            [name]: value
        }))
    }

    useEffect(() => {
        dispatch(fetchCart());
        dispatch(fetchConfirmCart())
    }, [dispatch]);

    // const cart = useSelector((state) => state.cart.cart);
    const cart = useSelector((state) => state.cart.cart);
    const confirmCart = useSelector((state) => state.cart.confirmCart);
    console.log("cart", cart);


    const total = cart
        .filter((item) => item.checked)
        .reduce((sum, item) => sum + item.price * item.quantity, 0);


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
        dispatch(deleteCart(id));
    }

    const handlePayment = (e) => {
        e.preventDefault();
        // if (data.name == "" || data.phone == "" || data.address == "") {
        //     alert("Vui lòng điền đầy đủ thông tin !!!")
        //     return;
        // }
        if (validate()) {
            dispatch(addBill({ name: data.name, phone: data.phone, address: data.address, note: data.note, cart: filterCart, totalPrice: payByWhat ? total + SHIPPING_FEE : 0 }))
            navigate("/orders");
        }
    }

    const filterCart = cart.filter(item => item.checked === true);

    return (
        <div>
            <div className='divRelative'>
                <div className="container-fluid bg-dark bg-img p-5">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h1 className="namePayment text-uppercase text-white">Trang Thanh Toán</h1>
                        </div>
                    </div>
                </div>
                {/* Page Header End */}
                {/* Products Start */}
                <div className="container-fluid about py-5">
                    <div className="container">
                        <form >
                            <div className="row">
                                <div className="col-lg-4 col-md-6">

                                    {/* <div className="mb-3 mt-3">
                                        <label htmlFor="email" className="form-label">Email:</label>
                                        <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" />
                                    </div> */}
                                    <div className="mb-3">
                                        <label htmlFor="pwd" className="form-label">Họ Tên:</label>
                                        <input type="text" value={data.name} onChange={handleChange} className="form-control" id="name" placeholder="Enter name" name="name" />
                                        <div className="valid-feedback" />
                                        <p style={{ color: 'red' }}>{errors.name}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="pwd" className="form-label">Số điện thoại:</label>
                                        <input type="number" value={data.phone} onChange={handleChange} className="form-control" id="phone" placeholder="Enter phone number" name="phone" />
                                        <p style={{ color: 'red' }}>{errors.phone}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="pwd" className="form-label">Địa chỉ:</label>
                                        <input type="text" value={data.address} onChange={handleChange} className="form-control" id="address" placeholder="Enter address" name="address" />
                                        <p style={{ color: 'red' }}>{errors.address}</p>
                                    </div>
                                    <label htmlFor="comment">Ghi chú:</label>
                                    <textarea onChange={handleChange} value={data.note} className="form-control" rows={5} id="comment" name="note" defaultValue={""} />



                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <label htmlFor="comment" className="mt-3">Vận chuyển:</label>
                                    <div className="font_12 form-check mt-2 divBorder">
                                        <input onChange={(e) => { setShipCost(e.target.checked) }} type="radio" className="form-check-input" id="radio1" name="optradio1" defaultValue="option" />Giao hàng tận nơi
                                        <label className="form-check-label" htmlFor="radio1" />
                                        <span id="giaVanChuyen">{SHIPPING_FEE} VND</span>
                                    </div>
                                    <label htmlFor="comment" className="mt-4">Thanh Toán:</label>
                                    <div className="form-check mt-2 divBorder">
                                        <input onChange={(e) => { setPayByWhat(e.target.checked) }} type="checkbox" className="form-check-input " id="phuongThucThanhToan" name="optradio" defaultValue="option1" />Thanh toán khi nhận hàng
                                        <label className="form-check-label" htmlFor="radio" />
                                        <i className="fa-regular fa-money-bill-1" style={{ color: '#0b92f9', marginLeft: '55px' }} />
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-12">
                                    <div className="thanhToan">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Đơn Hàng</th>
                                                    <th />
                                                    <th />
                                                </tr>
                                            </thead>
                                            <tbody id="parentThanhToan">
                                                {
                                                    Array.isArray(filterCart) && filterCart.map(item => (
                                                        <tr key={item.id} className="chiTietThanhToan">
                                                            <td><img src={item.img} alt="" /></td>
                                                            <td><div>
                                                                <span className="mrLeft small-heading">{item.name}</span>
                                                                <div className="d-flex mt-2">
                                                                    <span style={{ padding: '2px 10px', border: '1px solid #00000024', textAlign: 'center', height: '26px' }} >Số Lượng: {item.quantity}</span>
                                                                </div>
                                                            </div></td>
                                                            <td><span>{item.price.toLocaleString()}VNĐ</span></td>

                                                        </tr>
                                                    ))
                                                }


                                            </tbody>
                                        </table>
                                        <hr />
                                        <div className="chiTietThanhToan1" style={{ marginLeft: '20px' }}>
                                            <p>Tạm tính</p>
                                            <p id="giaTamTinh">{payByWhat ? total.toLocaleString() : "0"} VNĐ</p>
                                        </div>
                                        <div className="chiTietThanhToan1" style={{ marginLeft: '20px' }}>
                                            <p>Phí vận chuyển</p>
                                            <p>{payByWhat ? SHIPPING_FEE.toLocaleString() : 0} VNĐ</p>
                                        </div>
                                        <hr />
                                        <div className="chiTietThanhToan1" style={{ marginLeft: '20px' }}>
                                            <h4>Tổng cộng:</h4>
                                            <p id="giaTong">{payByWhat ? (total + SHIPPING_FEE).toLocaleString() : 0} VNĐ</p>
                                        </div>
                                        <div className="chiTietThanhToan1">
                                            <Link to={"/home"} style={{ cursor: 'pointer' }} className="mt-3 mx-3 anchor"><i className="fa-solid fa-chevron-left" />Quay lại trang chủ</Link>
                                            <button onClick={(e) => { e.preventDefault() }} id="btnDatHang" className="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#myModal">ĐẶT HÀNG</button>
                                        </div>

                                        <div className="modal fade" id="myModal">
                                            <div className="modal-dialog modal-lg">
                                                <div className="modal-content">
                                                    {/* Modal Header */}
                                                    <div className="modal-header">
                                                        <h4 className="modal-title">Xác nhận thanh toán</h4>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" />
                                                    </div>
                                                    {/* Modal body */}
                                                    <div className="modal-body">
                                                        <h6>Họ tên: {data.name}</h6>
                                                        <h6>Số điện thoại: {data.phone}</h6>
                                                        <h6>Địa chỉ: {data.address}</h6>
                                                        <h6>Ghi chú: {data.note}</h6>
                                                        <h6>Phương thức thanh toán: {payByWhat ? "Thanh toán khi nhận hàng" : "Đã thanh toán"}</h6>

                                                        <table className="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>Ảnh sản phẩm</th>
                                                                    <th>Tên sản phẩm</th>
                                                                    <th>Số Lượng</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    Array.isArray(filterCart) && filterCart.map(item => (
                                                                        <tr className='chiTietThanhToan'>
                                                                            <td><img src={item.img} alt="" /></td>
                                                                            <td>{item.name}</td>
                                                                            <td>x{item.quantity}</td>
                                                                        </tr>
                                                                    ))
                                                                }
                                                            </tbody>
                                                        </table>
                                                        <div className="paymentConfirm mt-5">
                                                            <div>
                                                                <h5>Giá tính tạm: <b className='text-danger'>{payByWhat ? total.toLocaleString() : "0"} VNĐ</b> </h5>
                                                                <h5>Phí vận chuyển: <b className='text-danger'>{payByWhat ? SHIPPING_FEE.toLocaleString() : "0"} VNĐ</b> </h5>
                                                                <h5>Tổng tiền cần thanh toán:  <b className='text-danger'>{payByWhat ? (total + SHIPPING_FEE).toLocaleString() : "0"} VNĐ</b>  </h5>
                                                            </div>
                                                            <div className='mt-4'>
                                                                <button id="btnDatHang" onClick={handlePayment} data-bs-dismiss="modal" className="btn btn-primary mt-3">XÁC NHẬN THANH TOÁN</button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
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

export default Payment
