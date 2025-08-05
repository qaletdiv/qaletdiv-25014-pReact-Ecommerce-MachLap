import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import "./header.css"
import { fetchUserNow } from '../../redux/Slices/userSlice';
import { fetchProduct } from '../../redux/Slices/productsSlice';
import { fetchCart } from '../../redux/Slices/cartSLice';
import LogoutButton from '../LogoutButton/LogoutButton';

const Header = () => {

    const categories = useSelector((state) => state.categories.categories);
    const accessToken = localStorage.getItem("accessToken");
    const currentUser = localStorage.getItem("currentUser");
    const wrapperRef = useRef(null);
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();

    const handleToProduct = (id) => {
        navigate(`/products/${id}`);
    }


    const user = useSelector((state) => state.user.user);
    const carts = useSelector((state) => state.cart.cart);
    const products = useSelector((state) => state.products.products)


    const dispatch = useDispatch();


    useEffect(() => {
        if (currentUser) {
            dispatch(fetchCart());
            dispatch(fetchProduct());
        }
    }, [currentUser])

    useEffect(() => {
        const handleClickOutSide = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSearch(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutSide);
        return () => {
            document.removeEventListener("mousedown", handleClickOutSide);
        }
    }, [])




    const [searchItem, setSearchItem] = useState("");

    // Lọc sản phẩm 
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchItem.toLowerCase())
    );

    return (


        // <header>
        //     <div className="container p-0 headerCha">
        //         <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg_dark padding_tablet">
        //             <a className="navbar-brand" href="#">
        //                 <img src="/img/logo.png" alt="" />
        //             </a>
        //             <button className="navbar-toggler margin" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        //                 <span className="navbar-toggler-icon" />
        //             </button>
        //             <div className="collapse navbar-collapse block-menu" id="navbarSupportedContent">
        //                 {/* <div class="mr-auto"></div> */}
        //                 <ul className="navbar-nav">
        //                     <li className="nav-item">
        //                         <a className="nav-link  text-reset redColor" href="WebGiay.html">Trang Chủ</a>
        //                     </li>
        //                     <li className="nav-item">
        //                         <a className="nav-link text-reset" href="#">Giới Thiệu</a>
        //                     </li>
        //                     <li className="nav-item dropdown hoverMenu">
        //                         <a className="nav-link text-reset" href="sanPham.html" role="button" data-toggle="dropdown" aria-expanded="false">
        //                             Sản Phẩm
        //                             <i className="fa-solid fa-chevron-down" />
        //                         </a>
        //                         <div className="dropdown-menu bg_dark menuCon">
        //                             <Link className="dropdown-item " to="/products">Adidas</Link>
        //                             <a className="dropdown-item" href="sanPham.html">Nike</a>
        //                             <a className="dropdown-item" href="sanPham.html">Converse</a>
        //                             <a className="dropdown-item" href="sanPham.html">Puma</a>
        //                             <a className="dropdown-item" href="sanPham.html">MLB</a>
        //                         </div>
        //                     </li>
        //                     <li className="nav-item ">
        //                         <a className="nav-link text-reset" href="#">Tin Tức</a>
        //                     </li>
        //                     <li className="nav-item">
        //                         <a className="nav-link text-reset" href="#">Liên Hệ</a>
        //                     </li>
        //                 </ul>
        //             </div>
        //             <div className="d-flex header-right marginLeft">
        //                 <div className="timKiem">
        //                     <i className="fa-solid fa-magnifying-glass" />
        //                     <div className="timKiemChiTiet">
        //                         <input type="text" placeholder="Tìm kiếm sản phẩm" />
        //                         <i className="fa-solid fa-magnifying-glass" />
        //                     </div>
        //                 </div>
        //                 <div className="taiKhoan">
        //                     <Link to = "/login">
        //                         <i className="fa-solid fa-user" />
        //                     </Link>
        //                 </div>
        //                 <div className="gioHang">
        //                     <i className="fa-solid fa-cart-shopping">
        //                         <div className="ThongBaoGioHang">
        //                             <div className="headerOf_Notify2">
        //                                 <h3>Sản phẩm mới thêm</h3>
        //                             </div>
        //                             <div className="sanPhamThongBao2">
        //                                 <div className="hinh2">
        //                                     <img src="img/giaymoi2.jpg" alt="" />
        //                                 </div>
        //                                 <div className="text2">
        //                                     <h4 className="tieuDe2">Giày sneaker cổ cao</h4>
        //                                 </div>
        //                                 <div className="gia">
        //                                     <p>135.000 VNĐ</p>
        //                                 </div>
        //                             </div>
        //                             <div className="sanPhamThongBao2">
        //                                 <div className="hinh2">
        //                                     <img src="img/giaymoi5.jpg" alt="" />
        //                                 </div>
        //                                 <div className="text2">
        //                                     <h4 className="tieuDe2">Giày adidas thể thao</h4>
        //                                 </div>
        //                                 <div className="gia">
        //                                     <p>125.000 VNĐ</p>
        //                                 </div>
        //                             </div>
        //                             <div className="sanPhamThongBao2">
        //                                 <div className="hinh2">
        //                                     <img src="img/giaymoi8.jpg" alt="" />
        //                                 </div>
        //                                 <div className="text2">
        //                                     <h4 className="tieuDe2">Dép puma cổ điển</h4>
        //                                 </div>
        //                                 <div className="gia">
        //                                     <p>350.000 VNĐ</p>
        //                                 </div>
        //                             </div>
        //                             <div className="sanPhamThongBao2">
        //                                 <div className="hinh2">
        //                                     <img src="img/giaymoi7.jpg" alt="" />
        //                                 </div>
        //                                 <div className="text2">
        //                                     <h4 className="tieuDe2">Giày nike cổ cao</h4>
        //                                 </div>
        //                                 <div className="gia">
        //                                     <p>450.000 VNĐ</p>
        //                                 </div>
        //                             </div>
        //                             <div className="buttonXemALL2">
        //                                 <a href="ThanhToan.html" className="btnXemHet2">Xem Giỏ Hàng</a>
        //                             </div>
        //                         </div>
        //                     </i>
        //                 </div>
        //             </div>
        //         </nav>
        //     </div>
        // </header>

        <>
            <div className="phanThayChoMenu">
                <header className="header">
                    <div className="grid">
                        <nav className="header-navbar">
                            <ul className="navbar-list">
                                <li className="navbar-list__item navbar-list__item-hover ">Tải ứng dụng Chicken Cook
                                    <div className="QRCode">
                                        <img src="/img/MyQRCode.png" alt="" className="imgQRCode" />
                                        <div className="apps">
                                            <img src="/img/CHPlay.png" alt="" className="chplay" />
                                            <img src="/img/appstore.png" alt="" className="appstore" />
                                            <img src="assets/img/app.png" alt="" className="appOther" />
                                        </div>
                                    </div>
                                </li>
                                <li className="navbar-list__item" style={{ color: 'white', cursor: 'default' }}>Kết nối</li>
                                <a href="https://www.facebook.com/profile.php?id=100004889149245" style={{ textDecoration: 'none' }}>
                                    <i className="fa-brands fa-facebook-f" />
                                </a>
                                <i className="fa-brands fa-instagram" style={{ fontSize: '14px', padding: '4.5px 6px' }} />
                            </ul>
                            <ul className="navbar-list mucAn">
                                <li className="navbar-list__item">
                                    <i className="fa-solid fa-house" style={{ backgroundColor: 'transparent', color: 'white', fontSize: '12px', lineHeight: '5px' }} />
                                    <Link to="/home" className="item-link">Trang Chủ</Link>
                                </li>
                                <li className="navbar-list__item">
                                    <i className="fa-regular fa-newspaper" style={{ backgroundColor: 'transparent', color: 'white', fontSize: '12px', lineHeight: '5px' }} />
                                    <Link to="/categories/1" className="item-link">Sản Phẩm</Link>
                                </li>
                                <li className="navbar-list__item">
                                    <i className="fa-regular fa-id-badge" style={{ backgroundColor: 'transparent', color: 'white', fontSize: '12px', lineHeight: '5px' }} />
                                    <a href="GioiThieu.html" className="item-link">Giới Thiệu</a>
                                </li>
                                {(!accessToken) &&
                                    <>
                                        <li className="navbar-list__item">
                                            <i className="fa-solid fa-user" style={{ backgroundColor: 'transparent', color: 'white', fontSize: '12px', lineHeight: '5px' }} />
                                            <Link to="/register" className="item-link">Đăng Kí</Link>
                                        </li>
                                        <li className="navbar-list__item" style={{ borderLeft: '1px solid white' }}>
                                            <Link to="/login" className="item-link">Đăng Nhập</Link>
                                        </li>
                                    </>
                                }
                                {(accessToken) &&
                                    <>
                                        <li className="navbar-list__item">
                                            Xin Chào {currentUser}
                                        </li>
                                        <li className="navbar-list__item logoutBtn" style={{ borderLeft: "none" }}>
                                            <LogoutButton />
                                        </li>
                                    </>
                                }
                            </ul>
                        </nav>
                    </div>
                    <div className="PhanTimKiem">
                        <div className="logo">
                            <a href="index.html">
                                <img src="/img/logo7.png" alt="" />
                            </a>
                        </div>
                        <div className="timKiem" ref={wrapperRef}>
                            <div className="divTimKiem">
                                <input type="text" className="divTimKiemHang" onChange={(e) => { setSearchItem(e.target.value), setShowSearch(true) }} placeholder="Hãy tìm sản phẩm mà bạn thích" style={{ opacity: '0.6' }} />
                                <div className="lichSuTimKiem">
                                    {
                                        showSearch && (
                                            <div className="tieude">
                                                <h4>Kết quả tìm kiếm</h4>
                                            </div>
                                        )

                                    }

                                    {showSearch && filteredProducts.length > 0 && filteredProducts.map(item => (
                                        // <Link key={item.id} style={{ textDecoration: "none" }} to={`/products/${item.id}`}>
                                        <div onClick={() => { handleToProduct(item.id), setShowSearch(false) }} key={item.id} className="noiDungTimKiem">
                                            <img src={item.img} alt="" />
                                            <p>{item.name}</p>
                                        </div>
                                        // </Link>
                                    ))}

                                    {/* <div className="noiDungTimKiem">
                                    <p>Hamburger</p>
                                </div> */}
                                </div>

                            </div>
                            <button>
                                <i className="fa-solid fa-magnifying-glass" />
                            </button>
                        </div>
                        <div className="gioHang">
                            <i className="fa-solid fa-cart-shopping">
                                <span className="thongBaoSoLuong">{carts?.length}</span>
                                <div className="ThongBaoGioHang">
                                    <div className="headerOf_Notify2">
                                        <h3>Sản phẩm mới thêm</h3>
                                    </div>
                                    {Array.isArray(carts) && carts.map(item => (
                                        <div key={item.id} className="sanPhamThongBao2">
                                            <div className="hinh2">
                                                <img src={item.img} alt="" />
                                            </div>
                                            <div className="text2">
                                                <h4 className="tieuDe2">{item.name}</h4>
                                            </div>
                                            <div className="gia">
                                                <p>{item.price} VNĐ</p>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="buttonXemALL2">
                                        <Link to={"/payment"} className="btnXemHet2">Xem Giỏ Hàng</Link>
                                    </div>
                                </div>
                            </i>
                        </div>
                    </div>
                </header>
            </div>

            <div className="menuMobile">
                <nav className="navbar navbar-expand-sm navbar-dark " style={{ display: "block", backgroundColor: 'black', padding: '15px 0px' }}>
                    <div className="ketNoi" style={{ color: 'white', marginLeft: '11px', paddingBottom: '18px', fontSize: '14px' }}>
                        <div>
                            Kết nối
                            <Link href="https://www.facebook.com/profile.php?id=100004889149245" style={{ color: 'white', textDecoration: 'none', marginLeft: '4px' }}>
                                <i className="fa-brands fa-facebook" style={{ borderLeft: '2px solid', paddingLeft: '10px', fontSize: '16px' }} />
                                <i className="fa-brands fa-instagram" style={{ fontSize: '17px', paddingTop: '0px', marginLeft: '5px' }} />
                            </Link>
                        </div>
                        <div class="user-cart">
                            <Link to={"/login"} style={{ textDecoration: 'none', color: 'white' }}>
                                <i className="fa-solid fa-user" style={{ fontSize: '16px' }} />
                            </Link>
                            <Link to={"/payment"}>
                                <i className="fa-solid fa-cart-shopping" style={{ color: 'white', right: 0, marginLeft: '10px', fontSize: '16px' }} />
                            </Link>
                        </div>
                    </div>
                    <div className="container-fluid" style={{ backgroundColor: 'black' }}>
                        <a className="navbar-brand" href="#">
                            <img className='logoMobile' src="/img/logo7.png" style={{ height: '35px' }} alt="" />
                        </a>
                        <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar" aria-expanded="false">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="menu_tablet navbar-collapse collapse" id="collapsibleNavbar" style={{}}>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/home"}>Trang Chủ</Link>
                                </li>
                                {/* <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to={"/menu"} role="button" data-bs-toggle="dropdown">Menu</Link>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="SanPham.html">Gà Rán</a></li>
                                        <li><a className="dropdown-item" href="SanPham.html">Gà Quay</a></li>
                                        <li><a className="dropdown-item" href="SanPham.html">Hamburger</a></li>
                                        <li><a className="dropdown-item" href="SanPham.html">Pizza</a></li>
                                        <li><a className="dropdown-item" href="SanPham.html">Thức Ăn Nhẹ</a></li>
                                        <li><a className="dropdown-item" href="SanPham.html">Nước Uống </a></li>
                                    </ul>
                                </li> */}
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/categories/1"}>Sản phẩm</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/"}>Giới Thiệu</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

        </>


    )
}

export default Header
