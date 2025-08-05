import React, { useEffect, useState } from 'react';
import "./ProductDetail.css"
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, fetchProductById } from '../../redux/Slices/productsSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addCart, fetchCart } from '../../redux/Slices/cartSLice';
import { toast } from 'react-toastify';

const ProductDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };


    const [count, setCount] = useState(1);
    const currentUser = localStorage.getItem("currentUser");

    useEffect(() => {
        dispatch(fetchProductById(id));
        dispatch(fetchProduct());
        dispatch(fetchCart());
    }, [dispatch, id]);

    const product = useSelector((state) => state.products.currentProduct)
    const products = useSelector((state) => state.products.products)
    const productSuggest = products.filter(item => item.id !== id);
    // const currentUser = useSelector((state) => state.users.currentUser);
    const cart = useSelector((state) => state.cart.cart);


    // const [selectedImage, setSelectedImage] = useState(product?.img);

    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        if (product?.img) {
            setSelectedImage(product.img)
        }
    }, [product])





    const handleAddToCart = () => {
        if (currentUser) {
            dispatch(addCart({ idProduct: id, quantity: count }))
                .then(() => dispatch(fetchCart()));
            toast.success('Đã thêm vào giỏ hàng thành công!', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                theme: 'light',
            });
        } else {
            navigate("/login");
        }
        //    navigate("/payment");
    }




    if (!product) {
        return (
            <div>
                This product not found
                <Link to={"/home"}> back home</Link>
            </div>

        )
    }

    return (
        <div>
            <div className="container-fluid">
                <div className="container-md chiTietSP">
                    <div className='row'>
                        <div className="col-lg-5 col-md-6 col-sm-12 col-12">
                            <div className="hinh img-thumbnail">
                                <img src={selectedImage} className="img-thumbnail" alt="" />
                            </div>
                            <div className="thumbnail-list">
                                {(product.listImg || []).map((img, idx) => (
                                    <div
                                        key={idx}
                                        className={`thumbnail ${selectedImage === img ? 'active' : ''}`}
                                        onClick={() => setSelectedImage(img)}
                                    >
                                        <img src={img} alt={`Thumbnail ${idx}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col=lg-3 col-md-4 col-sm-12 col-12">
                            <div className="text">
                                <h2>{product.name}</h2>
                                <div className="gia">
                                    <h5>Giá: </h5>
                                    <h6>{formatPrice(product.price)} VNĐ</h6>
                                </div>
                                <p>{product.description}</p>
                                <div className="d-flex btnTangGiam">
                                    <button className="btnTangGiamSL" onClick={() => { (count <= 1) ? setCount((count) => count = 1) : setCount((count) => count - 1) }}>-</button>
                                    <input type="text" onChange={(e) => { setCount(e.target.value) }} value={count} style={{ width: '50px', border: '1px solid #00000024', textAlign: 'center', height: '30px' }} role="spinbutton" />
                                    <button className="btnTangGiamSL" onClick={() => { setCount(count + 1) }}>+</button>
                                </div>
                                <div className="nut" style={{ paddingTop: '10px' }}>

                                    <button onClick={handleAddToCart}>ĐẶT HÀNG</button>

                                </div>
                                <div className="chiaSe">
                                    <span className="tieuDe">Chia Sẻ: </span>
                                    <a >
                                        <div className="iconMXH" style={{ padding: '8px 13px' }}>
                                            <i className="fa-brands fa-facebook-f" style={{ color: '#3C5997' }} />
                                        </div>
                                    </a>
                                    <a >
                                        <div className="iconMXH">
                                            <img src="/img/iconZalo.png" alt="" />
                                        </div>
                                    </a>
                                    <a >
                                        <div className="iconMXH">
                                            <i className="fa-brands fa-twitter" style={{ color: '#1EA1F1' }} />
                                        </div>
                                    </a>
                                    <a >
                                        <div className="iconMXH">
                                            <img src="/img/iconInstagram.png" alt="" style={{ height: '20px' }} />
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col=lg-4 col-md-3">
                            <div className="goiYMon">
                                <div className="tieuDeGoiY">
                                    <h3>CÓ THỂ BẠN THÍCH</h3>
                                </div>
                                <div className="srollMenuSuggest">
                                    {productSuggest.map(item => (
                                        <div key={item.id} className="sanPhamGoiY">
                                            <div className="hinhAnh">
                                                <img src={item.img} alt="" />
                                            </div>
                                            <div className="moTaSP">
                                                <h4>{item.name}</h4>
                                                <h5>{item.price}VNĐ</h5>
                                                <button onClick={() => { navigate(`/products/${item.id}`) }}>Xem ngay</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* <div className="sanPhamGoiY">
                                <div className="hinhAnh">
                                    <img src="assets/img/MyYBo.jpg" alt="" />
                                </div>
                                <div className="moTaSP">
                                    <h4>Mì Ý Bò</h4>
                                    <h5>45.000VNĐ</h5>
                                    <button>Đặt Món</button>
                                </div>
                            </div>
                            <div className="sanPhamGoiY">
                                <div className="hinhAnh">
                                    <img src="assets/img/DuiGa.jpg" alt="" />
                                </div>
                                <div className="moTaSP">
                                    <h4>Đùi Gà Quay</h4>
                                    <h5>45.000VNĐ</h5>
                                    <button>Đặt Món</button>
                                </div>
                            </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-md">
                    <div className="col-12">
                        <div className="danhGia">
                            <h3>Đánh Giá Của Khách Hàng</h3>
                        </div>
                        <div className="feedback" style={{ marginTop: '25px' }}>
                            <div className="feed">
                                <div className="avt">
                                    <img src="/img/LyLe.png" alt="" />
                                </div>
                                <div className="binhluan">
                                    <h6>Lý Lệ</h6>
                                    <h7>⭐⭐⭐⭐⭐</h7>
                                    <p>Món ăn ngon nhất định mình sẽ quay lại lần nữa</p>
                                </div>
                            </div>
                            <div className="feed">
                                <div className="avt">
                                    <img style={{ height: '58px', width: '62px' }} src="/img/ThanhLuan.png" alt="" />
                                </div>
                                <div className="binhluan">
                                    <h6>Thành Luân</h6>
                                    <h7>⭐⭐⭐⭐⭐</h7>
                                    <p>Món ăn ngon phục phụ tuyệt vời cho 5*</p>
                                </div>
                            </div>
                            <div className="feed">
                                <div className="avt">
                                    <img style={{ height: '49px', width: '63px' }} src="/img/ThanhTra.png" alt="" />
                                </div>
                                <div className="binhluan">
                                    <h6>Thanh Trà</h6>
                                    <h7>⭐⭐⭐⭐⭐</h7>
                                    <p>Chăm sóc khách hàng tuyệt vời món ăn ngon vừa miệng</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductDetail
