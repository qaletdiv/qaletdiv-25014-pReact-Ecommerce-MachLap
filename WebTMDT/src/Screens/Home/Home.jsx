import React, { useEffect } from 'react'
import "./Home.css"
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductSale } from '../../redux/Slices/productSaleSlice';
import { fetchNews } from '../../redux/Slices/newsSlice';
import { fetchCategories } from './../../redux/Slices/categoriesSlice';
import { Link } from 'react-router-dom';
import { fetchProduct } from '../../redux/Slices/productsSlice';
import FadeInSection from '../../Components/EffectScroll/interObserver';
import FullPageLoader from '../../Components/SpinerLoading/Loading';
import FadeInLeft from '../../Components/EffectScroll/FadeInLeft';
import FadeInRight from '../../Components/EffectScroll/FadeInRight';
const Home = () => {

    const user = useSelector((state) => state.user.user);
    console.log("user", user);

    const productSale = useSelector((state) => state.productSale.productSale);
    const product = useSelector((state) => state.products.products);
    const loading = useSelector((state) => state.productSale.loading);
    const error = useSelector((state) => state.productSale.error);
    const news = useSelector((state) => state.news.news);
    const categories = useSelector((state) => state.categories.categories);
    const dispatch = useDispatch();
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };
    console.log(categories);

    const parseDDMMYYYY = (dateString) => {
        const [day, month, year] = dateString.split("/").map(Number);
        return new Date(year, month - 1, day); // month bắt đầu từ 0
    };

    const getProductsWithin7Days = (products) => {
        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);

        return products.filter((product) => {
            const createdDate = parseDDMMYYYY(product.createdAt);
            return createdDate >= sevenDaysAgo && createdDate <= today;
        });
    };

    const newProducts = getProductsWithin7Days(product);


    useEffect(() => {
        dispatch(fetchProductSale());
        dispatch(fetchProduct())
        dispatch(fetchNews());
        dispatch(fetchCategories())
    }, [dispatch])


    if (loading) {
        return <FullPageLoader />
    }

    if (error) {
        return <p>Error is loading...</p>
    }

    return (
        <div>
            <div>

                <FadeInSection>
                    <div className="banner">
                        <img src="/img/banner.jpg" alt="" className="anhBanner" />
                        <div className="container text-center bg_chinhSach">
                            <div className="row">
                                <div className="col-md-3 col-12">
                                    <section className="chinhSachCuaHang">
                                        <div className="chiTietChinhSach ">
                                            <i className="fa-solid fa-truck" />
                                            <h4>Giao Hàng Toàn Quốc</h4>
                                            <p>Miễn phí vận chuyển với các đơn hàng trị giá trên 2.000.000Đ</p>
                                        </div>
                                    </section>
                                </div>
                                <div className="col-md-3 col-12">
                                    <section className="chinhSachCuaHang">
                                        <div className="chiTietChinhSach ">
                                            <i className="fa-solid fa-phone-volume" />
                                            <h4>Hỗ Trợ Online 24/24</h4>
                                            <p>Luôn hỗ trợ khách hàng 24/24 tất cả các ngày trong tuần</p>
                                        </div>
                                    </section>
                                </div>
                                <div className="col-md-3 col-12">
                                    <section className="chinhSachCuaHang">
                                        <div className="chiTietChinhSach ">
                                            <i className="fa-solid fa-rotate" />
                                            <h4>Đổi Hàng Dễ Dàng</h4>
                                            <p>Miễn phí đổi trả trong vòng 30 ngày đầu tiên cho tất cả các mặt hàng</p>
                                        </div>
                                    </section>
                                </div>
                                <div className="col-md-3 col-12">
                                    <section className="chinhSachCuaHang">
                                        <div className="chiTietChinhSach ">
                                            <i className="fa-solid fa-gift" />
                                            <h4>Quà Tặng Hấp Dẫn</h4>
                                            <p>Chương trình khuyễn mãi cực lớn và hấp dẫn hàng tháng</p>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeInSection>
                <section className="section container mr_top">
                    <div className="text-center">
                        <div className="tieuDe">
                            <h1>Danh mục</h1>
                        </div>
                    </div>
                    <div className='row'>
                        {categories.map(item => (
                            <div key={item.id} className='col-lg-1 categories'>
                                <FadeInSection>
                                    <Link to={`/categories/${item.id}`}>
                                        <div className="img">
                                            <img src={item.img} alt="" />
                                        </div>
                                        <div className="nameCategories">
                                            <p>{item.name}</p>
                                        </div>
                                    </Link>
                                </FadeInSection>
                            </div>
                        ))}

                    </div>

                </section>
                <section className="section-1 container mr_top">
                    <div className="text-center">
                        <div className="tieuDe">
                            <h1>Sản Phẩm Mới</h1>
                            <p>Các sản phẩm mới có tại cửa hàng</p>
                        </div>
                    </div>
                    <div className="row">
                        {newProducts.map(item => (
                            <div key={item.id} className="col-lg-3 col-md-4 col-sm-4 col-12">
                                <FadeInSection>
                                    <div className="sanPhamMoi">
                                        <div className="overlay" />
                                        <div className="iconMuaHang">
                                            <i className="fa-regular fa-eye" />
                                        </div>
                                        <img src={item.img} alt="" />
                                        <h5>{item.name}</h5>
                                        <h6>NIKE</h6>
                                        <p>{formatPrice(item.price)}₫</p>
                                    </div>
                                </FadeInSection>
                            </div>
                        ))}

                    </div>

                    <div className="text-center">
                        <button>Xem tất cả</button>
                    </div>
                </section>
                <section className="section-2 container" style={{ marginTop: '4%' }}>
                    <div className="text-center">
                        <div className="tieuDe">
                            <h1>Sản Phẩm Khuyến Mãi</h1>
                            <p>Các sản phẩm đang khuyến mãi tại cửa hàng</p>
                        </div>
                    </div>
                    <img src="/img/banner3.jpg" alt="" className="hinhBanner" />
                    <div className="row">
                        {productSale.map(item => (
                            <div key={item.id} className="col-lg-3 col-md-4 col-sm-4 col-12">
                                <FadeInSection>
                                    <div className="sanPhamMoi">
                                        <div className="overlay"></div>
                                        <div className="iconMuaHang">
                                            <i className="fa-regular fa-eye"></i>
                                        </div>
                                        <img src={item.img} alt="" />
                                        <h5>{item.name}</h5>
                                        <h6>{item.brand}</h6>
                                        <div className="d-flex justify-content-between">
                                            <h4 className="text-danger">{formatPrice(item.priceSale)}₫</h4>
                                            <p className="text-black-50 text-decoration-line-through">{formatPrice(item.price)}₫</p>

                                        </div>
                                    </div>
                                </FadeInSection>
                            </div>
                        ))}

                    </div>

                    <div className="text-center">
                        <button>Xem tất cả</button>
                    </div>
                </section>
                <section className="section-3 container" style={{ marginTop: '4%', marginBottom: '4%' }}>
                    <div className="text-center">
                        <div className="tieuDe">
                            <h1>Phụ Kiện</h1>
                            <p>Tất cả phụ kiện tại cửa hàng</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <FadeInLeft>
                                <div className="phuKienTrai">
                                    <a className="image" href="#">
                                        <img src="/img/phuKien1.jpg" alt="" className="image" />
                                    </a>
                                    <div className="noiDungPhuKien">
                                        <h2>Khóa giày</h2>
                                        <p>
                                            Xem thêm
                                            <i className="fa-solid fa-right-long" />
                                        </p>
                                    </div>
                                </div>
                            </FadeInLeft>
                        </div>
                        <div className="col-md-6 col-12">
                            <FadeInRight>
                                <div className="phuKienPhai">
                                    <a className="image" href="#">
                                        <img src="/img/phuKien2.jpg" alt="" />
                                    </a>
                                    <div className="noiDungPhuKien">
                                        <h2>Tất giày</h2>
                                        <p>
                                            Xem thêm
                                            <i className="fa-solid fa-right-long" />
                                        </p>
                                    </div>
                                </div>
                                <div className="phuKienPhai">
                                    <a className="image" href="#">
                                        <img src="/img/phuKien3.jpg" alt="" />
                                    </a>
                                    <div className="noiDungPhuKien">
                                        <h2>Dây giày</h2>
                                        <p>
                                            Xem thêm
                                            <i className="fa-solid fa-right-long" />
                                        </p>
                                    </div>
                                </div>
                            </FadeInRight>
                        </div>
                    </div>
                </section>
                {/* <section className="section-4 container-fluid">
                    <div className="overlay2" />
                    <div className="text-center">
                        <div className="tieuDe">
                            <h1 className="text-white pdtop">FEEDBACK</h1>
                            <p className="text-white">Album của khách hàng phản hồi về sản phẩm</p>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                                <div className="feedBack">
                                    <img src="img/feedback1.jpg" alt="" />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                                <div className="feedBack">
                                    <img src="img/feedback2.jpg" alt="" />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                                <div className="feedBack">
                                    <img src="img/feedback3.jpg" alt="" />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                                <div className="feedBack">
                                    <img src="img/feedback4.jpg" alt="" />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                                <div className="feedBack">
                                    <img src="img/feedback5.jpg" alt="" />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                                <div className="feedBack">
                                    <img src="img/feedback6.jpg" alt="" />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-4 col-6 display_none">
                                <div className="feedBack">
                                    <img src="img/feedback7.jpg" alt="" />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-4 col-6 display_none">
                                <div className="feedBack">
                                    <img src="img/feedback8.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}
                <section className="section-5 container p-0">
                    <div className="text-center">
                        <div className="tieuDe pdtop">
                            <h1>Tin Tức</h1>
                            <p>Tổng hợp tin tức và mẹo vặt cho bạn</p>
                        </div>
                    </div>
                    <div className="row">
                        {news.map(item => (
                            <div key={item.id} className="col-md-4 col-12">
                                <div className="tinTuc">
                                    <img src={item.img} alt="" />
                                    <h1>{item.title}</h1>
                                    <div className="thongTinChiTiet">
                                        <div className="thongTinChiTiet_benTrai">
                                            <i className="fa-solid fa-user" />
                                            <h2>{item.author}</h2>
                                        </div>
                                        <div className="thongTinChiTiet_benPhai">
                                            <i className="fa-regular fa-clock" />
                                            <h2>Ngày {item.created}</h2>
                                        </div>
                                    </div>
                                    <p>{item.content}</p>
                                    <span>
                                        Xem thêm
                                        <i className="fa-solid fa-right-long iconTinTuc" />
                                    </span>
                                </div>
                            </div>
                        ))}

                    </div>
                </section>

            </div>

        </div>
    )
}

export default Home
