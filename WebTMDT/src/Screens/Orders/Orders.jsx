import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import "./Orders.css"
import { fetchBill } from '../../redux/Slices/cartSLice'
const Orders = () => {
    const bill = useSelector((state) => state.cart.bill);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchBill());
    }, [dispatch]);

    return (
        <div>
            <div className='divRelative'>
                <div className="container-fluid bg-dark bg-img p-5 mb-5">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h1 className="display-4 text-uppercase text-white">Đơn Hàng Của Tôi</h1>
                        </div>
                    </div>
                </div>
                {/* Page Header End */}
                {/* Products Start */}
                <div className="container-fluid about py-5">
                    <div className="container">
                        <div className="row">
                            <div>
                                {/* Nav tabs */}
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link text-dark active" data-bs-toggle="tab" href="#home">Tất cả</a>
                                    </li>
                                    {/* <li className="nav-item">
                                        <a className="nav-link text-dark" data-bs-toggle="tab" href="#menu1">Đang vận chuyển</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-dark" data-bs-toggle="tab" href="#menu2">Đã Giao</a>
                                    </li> */}
                                </ul>
                                {/* Tab panes */}
                                <div className="tableResponsive tab-content">
                                    <div id="home" className="container tab-pane active"><br />
                                        <table className="table text-center">
                                            <thead>
                                                <tr>
                                                    <th>Mã Đơn Hàng</th>
                                                    <th>Sản phẩm</th>
                                                    <th>Ngày mua</th>
                                                    <th>Giá</th>
                                                    <th>Trạng thái</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    Array.isArray(bill) && bill.map(item => (
                                                        <tr className='chiTietThanhToan' style={{ lineHeight: "55px" }}>
                                                            <td>#{item.id}</td>
                                                            <td>{Array.isArray(item?.cart) && item?.cart.map(sp => (
                                                                <img src={sp.img} alt="" />
                                                            ))}</td>
                                                            <td>{item.createdAt}</td>
                                                            <td>{(item.totalPrice).toLocaleString()}đ</td>
                                                            <td><span className='status'>Đang vận chuyển</span></td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div id="menu1" className="container tab-pane fade"><br />
                                        <h1>aaaa</h1>
                                    </div>
                                    <div id="menu2" className="container tab-pane fade"><br />
                                        <h3>Menu 2</h3>
                                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
                                    </div>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Orders
