const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const JWT_SECRET = 'product_MANAGER_SECRET';
const port = 5100;
app.use(cors());
app.use(express.json());

//format day 
const formatDay = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
}

let categories = [
    {
        id: "1", name: "Đồng hồ", img: "https://camerasieunho9x.com/wp-content/uploads/2016/06/dong-ho-camera-w5000.jpg"
    },
    {
        id: "2", name: "Điện thoại", img: "https://cdn.nguyenkimmall.com/images/product/829/dien-thoai-iphone-14-pro-max-1tb-tim-1.jpg"
    },
    {
        id: "3", name: "Đồ dùng tiện ích", img: "https://linhanhmart.com/wp-content/uploads/2019/01/COMBO-5.jpg"
    },
    {
        id: "4", name: "Đồ trẻ em", img: "https://m.yodycdn.com/blog/quan-ao-tre-em-10-tuoi-yodyvn6.jpg"
    },
    {
        id: "5", name: "Thời trang nam", img: "https://dongphuchaianh.vn/wp-content/uploads/2021/07/thoi-trang-nam-mua-he-1-1.jpg"
    },
    {
        id: "6", name: "Thời trang nữ", img: "https://sakurafashion.vn/upload/a/3808-nem-fashion-1870.webp"
    },
    {
        id: "7", name: "Nước hoa", img: "https://www.elle.vn/app/uploads/2019/03/29/nuoc-hoa-mua-he-01.jpg"
    },
    {
        id: "8", name: "Đồ ăn vặt", img: "https://bloganchoi.com/wp-content/uploads/2020/05/an-vat.jpg"
    },
    {
        id: "9", name: "Máy ảnh", img: "https://zshop.vn/blogs/wp-content/uploads/2019/04/4.png"
    },
    {
        id: "10", name: "Dụng cụ thể thao", img: "https://png.pngtree.com/png-clipart/20230309/original/pngtree-three-dimensional-simulation-volleyball-ball-png-image_8979475.png"
    },
    {
        id: "11", name: "Máy tính & Laptop", img: "https://chanchinh.vn/vnt_upload/product/04_2023/2_17.png"
    },
    {
        id: "12", name: "Sách", img: "https://thuthuatnhanh.com/wp-content/uploads/2021/11/Hinh-anh-cuon-sach-mo-ra-dep-nhat.jpg"
    },
]

let news = [
    {
        id: "1", title: "King James mang đôi OFF-WHITE x Nike Air Force 1 University Yellow của Virgil Abloh có gì đặc biệt?", author: "Nguyễn Anh Dũng", content: "OFF-WHITE x Nike Air Force 1 University Yellow là đôi sneakers được hé lộ trong website public—domain.com, một websit...", created: formatDay(), img: "https://tse4.mm.bing.net/th?id=OIP.sTmhOfGi-ZOIk9ILwqrvdwHaEK&pid=Api&P=0&h=180"
    },
    {
        id: "2", title: "Hàng loạt các phối màu của adidas Stan Smith được tung ra dành cho tín đồ mê sneakers", author: "Nguyễn Xuân Tiền", content: "Adidas Stan Smith đã không còn xa lạ với bất cứ ai yêu mến sneakers trên toàn cầu nói chung và tại Việt Nam nói riêng...", created: formatDay(), img: "https://vnreport.vn/wp-content/uploads/2021/08/2-adidas-1024x768.jpg"
    },
    {
        id: "3", title: "Nike AIR FORCE 1 Love Women – Phối màu dành riêng cho một nửa thế giới của chúng ta", author: "Trương Văn Nam", content: "TeeLab lại tiếp tục tung ra một phối màu sử dụng tông màu trắng chủ đạo bằng chất liệu canvas kết hợp denim trên đôi sn...", created: formatDay(), img: "https://cf.shopee.vn/file/abfbd102e71280e99a83575ad6a51626"
    },
]

// Dữ liệu mẫu
let productSale = [
    {
        id: "1", name: "Sữa pediaSure", quantity: 1, price: 2000, img: "https://img.lazcdn.com/g/p/a2dcad6919e4f0eb7de7c817d2b6a267.jpg_400x400q80.jpg_.avif", description: "Gồm có 1 miếng gà được chế biến sẵn ăn liền không cần chế biến lại", priceSale: 1500, brand: "Abboutt", createdAt: formatDay()
    },
    {
        id: "2", name: "Chuột bàn phím có dây Logitech", quantity: 1, price: 400, img: "https://img.lazcdn.com/g/p/efab4fe753590b8b6070ab08100b4b94.jpg_400x400q80.jpg_.avif", description: "Gồm có 1 miếng gà được chế biến sẵn ăn liền không cần chế biến lại", priceSale: 200, brand: "Logitech", createdAt: formatDay()
    },
    {
        id: "3", name: "Tai nghe Airpod 4", quantity: 1, price: 400, img: "https://img.lazcdn.com/g/p/af6bcc0993400513ad3dab38c79fca6e.png_400x400q80.png_.avif", description: "Gồm có 1 miếng gà được chế biến sẵn ăn liền không cần chế biến lại", priceSale: 200, brand: "Apple", createdAt: formatDay()
    },
    {
        id: "4", name: "Áo sơ mi thời trang cho nam", quantity: 1, price: 400, img: "https://img.lazcdn.com/g/p/4988ec81180f7cf588661c4f2e0a9f2d.jpg_400x400q80.jpg_.avif", description: "Gồm có 1 miếng gà được chế biến sẵn ăn liền không cần chế biến lại", priceSale: 200, brand: "Fashion", createdAt: formatDay()
    },
]

let users = [
    {
        email: "lapmach77@gmail.com", password: "123", id: "1", cart: [], bill: []
    },
    { email: "user2@example.com", password: "password456", id: "2", cart: [], bill: [] },
];
let products = [
    {
        id: "1", name: "Pin sạc dự phòng 30000mAh", price: 2000, img: "https://img.lazcdn.com/g/p/4c0d2aa0256029c99f2674e4a794b370.jpg_400x400q80.jpg_.avif", description: "Gồm có 1 miếng gà được chế biến sẵn ăn liền không cần chế biến lại", createdAt: "01/08/2022", categoriesId: "3", brand: "Logitech", checked: false
        , listImg: [
            "https://img.lazcdn.com/g/p/03e761230d42b5e07da524ed704c46e6.jpg_720x720q80.jpg_.webp",
            "https://img.lazcdn.com/g/p/047f364c149c86c7ae7cd81fd2d82ccb.jpg_120x120q80.jpg_.webp",
            "https://img.lazcdn.com/g/p/97692f19429846ccdc3b77d8f79b717e.jpg_120x120q80.jpg_.webp",
            "https://img.lazcdn.com/g/p/6011e69b9b75d2062ae0457d56575566.jpg_120x120q80.jpg_.webp",
        ]
    },
    {
        id: "2", name: "Kệ quần áo thời trang", price: 5000, img: "https://img.lazcdn.com/g/p/7567559cd01a79c848cc3f196ac85132.jpg_400x400q80.jpg_.avif", description: "Gồm có 2 miếng gà được chế biến sẵn ăn liền không cần chế biến lại", createdAt: "05/06/2025", categoriesId: "3", brand: "Louis Vuiton", checked: false
        , listImg: [
            "https://img.lazcdn.com/g/p/03e761230d42b5e07da524ed704c46e6.jpg_720x720q80.jpg_.webp",
            "https://img.lazcdn.com/g/p/047f364c149c86c7ae7cd81fd2d82ccb.jpg_120x120q80.jpg_.webp",
            "https://img.lazcdn.com/g/p/97692f19429846ccdc3b77d8f79b717e.jpg_120x120q80.jpg_.webp",
            "https://img.lazcdn.com/g/p/6011e69b9b75d2062ae0457d56575566.jpg_120x120q80.jpg_.webp",
        ]
    },
    {
        id: "3", name: "Nước hoa lưu hương thơm mát", price: 400, img: "https://img.lazcdn.com/g/p/d92a0bcb6deb64fcf8cd98049576a5d0.jpg_400x400q80.jpg_.avif", description: "Gồm có 2 miếng gà được chế biến sẵn ăn liền không cần chế biến lại", createdAt: "06/06/2025", categoriesId: "7", brand: "Channel", checked: false
        , listImg: [
            "https://img.lazcdn.com/g/p/03e761230d42b5e07da524ed704c46e6.jpg_720x720q80.jpg_.webp",
            "https://img.lazcdn.com/g/p/047f364c149c86c7ae7cd81fd2d82ccb.jpg_120x120q80.jpg_.webp",
            "https://img.lazcdn.com/g/p/97692f19429846ccdc3b77d8f79b717e.jpg_120x120q80.jpg_.webp",
            "https://img.lazcdn.com/g/p/6011e69b9b75d2062ae0457d56575566.jpg_120x120q80.jpg_.webp",
        ]
    },
    {
        id: "4", name: "Vòng tay nữ lọng lẫy kiêu sa", price: 6000, img: "https://img.lazcdn.com/g/p/fdd739b7701fb3161990323dc343d300.png_400x400q80.png_.avif", description: "Gồm có 2 miếng gà được chế biến sẵn ăn liền không cần chế biến lại", createdAt: "01/06/2025", categoriesId: "6", brand: "Channel", checked: false,
        listImg: [
            "https://img.lazcdn.com/g/p/03e761230d42b5e07da524ed704c46e6.jpg_720x720q80.jpg_.webp",
            "https://img.lazcdn.com/g/p/047f364c149c86c7ae7cd81fd2d82ccb.jpg_120x120q80.jpg_.webp",
            "https://img.lazcdn.com/g/p/97692f19429846ccdc3b77d8f79b717e.jpg_120x120q80.jpg_.webp",
            "https://img.lazcdn.com/g/p/6011e69b9b75d2062ae0457d56575566.jpg_120x120q80.jpg_.webp",
        ],
        listSize: [30, 31, 32, 33, 34]
    },
    {
        id: "5", name: "Thùng sữa Vinamilk 48 hộp", price: 1500, img: "https://img.lazcdn.com/g/p/6b85bd8958903f2d9c035d032175d23b.jpg_400x400q80.jpg_.avif", description: "Gồm có 2 miếng gà được chế biến sẵn ăn liền không cần chế biến lại", createdAt: "07/06/2025", categoriesId: "8", brand: "Vinamilk", checked: false
        , listImg: [
            "https://img.lazcdn.com/g/p/03e761230d42b5e07da524ed704c46e6.jpg_720x720q80.jpg_.webp",
            "https://img.lazcdn.com/g/p/047f364c149c86c7ae7cd81fd2d82ccb.jpg_120x120q80.jpg_.webp",
            "https://img.lazcdn.com/g/p/97692f19429846ccdc3b77d8f79b717e.jpg_120x120q80.jpg_.webp",
            "https://img.lazcdn.com/g/p/6011e69b9b75d2062ae0457d56575566.jpg_120x120q80.jpg_.webp",
        ]
    },
    {
        id: "6", name: "Giày thể thao nam thoải mái sang trọng", price: 4000000, img: "https://img.lazcdn.com/g/p/95a203d1ff6f3b1b42e994ebc9e1f34d.jpg_400x400q80.jpg_.avif", description: "Gồm có 2 miếng gà được chế biến sẵn ăn liền không cần chế biến lại", createdAt: formatDay(), categoriesId: "5", brand: "Adidas", checked: false
        , listImg: [
            "https://img.lazcdn.com/g/p/03e761230d42b5e07da524ed704c46e6.jpg_720x720q80.jpg_.webp",
            "https://img.lazcdn.com/g/p/047f364c149c86c7ae7cd81fd2d82ccb.jpg_120x120q80.jpg_.webp",
            "https://img.lazcdn.com/g/p/97692f19429846ccdc3b77d8f79b717e.jpg_120x120q80.jpg_.webp",
            "https://img.lazcdn.com/g/p/6011e69b9b75d2062ae0457d56575566.jpg_120x120q80.jpg_.webp",
        ],
        listSize: [30, 31, 32, 33, 34, 35, 36]
    },
    {
        id: "7", name: "Thùng sữa Vinamilk 48 hộp", price: 1500000, img: "https://img.lazcdn.com/g/p/6b85bd8958903f2d9c035d032175d23b.jpg_400x400q80.jpg_.avif", description: "Gồm có 2 miếng gà được chế biến sẵn ăn liền không cần chế biến lại", createdAt: "07/06/2025", categoriesId: "8", brand: "Vinamilk", checked: false
        , listImg: [
            "https://img.lazcdn.com/g/p/03e761230d42b5e07da524ed704c46e6.jpg_720x720q80.jpg_.webp",
            "https://img.lazcdn.com/g/p/047f364c149c86c7ae7cd81fd2d82ccb.jpg_120x120q80.jpg_.webp",
            "https://img.lazcdn.com/g/p/97692f19429846ccdc3b77d8f79b717e.jpg_120x120q80.jpg_.webp",
            "https://img.lazcdn.com/g/p/6011e69b9b75d2062ae0457d56575566.jpg_120x120q80.jpg_.webp",
        ]
    },
    {
        id: "8", name: "Giày thể thao nữ thoải mái sang trọng", price: 4000, img: "https://img.lazcdn.com/g/p/95a203d1ff6f3b1b42e994ebc9e1f34d.jpg_400x400q80.jpg_.avif", description: "Gồm có 2 miếng gà được chế biến sẵn ăn liền không cần chế biến lại", createdAt: formatDay(), categoriesId: "5", brand: "Adidas", checked: false
        , listImg: [
            "https://img.lazcdn.com/g/p/03e761230d42b5e07da524ed704c46e6.jpg_720x720q80.jpg_.webp",
            "https://img.lazcdn.com/g/p/047f364c149c86c7ae7cd81fd2d82ccb.jpg_120x120q80.jpg_.webp",
            "https://img.lazcdn.com/g/p/97692f19429846ccdc3b77d8f79b717e.jpg_120x120q80.jpg_.webp",
            "https://img.lazcdn.com/g/p/6011e69b9b75d2062ae0457d56575566.jpg_120x120q80.jpg_.webp",
        ],
        listSize: [30, 31, 32, 33, 34, 35, 36]
    },
];

let tasks = [
    { id: "1", name: "Thiết kế UI", productId: "1", status: "pending", assignedTo: null, createdAt: formatDay() },
];
let notes = [
    { id: "1", name: "Ghi chú dự án", content: "Cần hoàn thành UI trước Q2", productId: "1", taskId: null, userEmail: "user1@example.com", createdAt: formatDay() },
];
// Middleware xác thực JWT
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Không có token' });
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token không hợp lệ' });
        req.user = user;
        next();
    });
};
// API Xác thực
app.post('/api/signup', (req, res) => {
    const { email, password, fullName } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email và password là bắt buộc' });
    }
    if (users.find((u) => u.email === email)) {
        return res.status(409).json({ message: 'Email đã tồn tại' });
    }
    const newUser = {
        email,
        password,
        fullName,
        id: Date.now().toString(),
        cart: [],
        confirmCart: [],
        bill: []
    };
    users.push(newUser);
    res.status(201).json({ message: 'Đăng ký thành công' });
});
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email và password là bắt buộc' });
    }
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) return res.status(401).json({ message: 'Thông tin đăng nhập sai' });
    const token = jwt.sign({ email: user.email, id: user.id }, JWT_SECRET, { expiresIn: '3h' });
    res.json({ accessToken: token, user: { id: user.id, email: user.email } });
});
// API Lấy danh sách users (dùng cho dropdown price/assignedTo)
app.get('/api/users', authenticateJWT, (req, res) => {
    const userList = users.map(({ id, email }) => ({ id, email }));
    res.json(userList);
});

app.get("/api/me", authenticateJWT, (req, res) => {
    const user = users.find((u) => u.email === req.user.email);
    if (!user) {
        return res.status(404).json({ message: "Không tìm thấy User" });
    }

    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
});




// API categories
app.get('/api/categories', (req, res) => {
    const result = categories.map(item => {
        item.productList = products.filter(p => p.categoriesId === item.id)
        return item;
    })
    res.json(categories = result);
});
app.get('/api/categories/:id', (req, res) => {
    const category = categories.find((item) => item.id === req.params.id);
    if (category) res.json(category);
    else res.status(404).json({ message: 'Không tìm thấy danh mục' });
});

// API News
app.get('/api/news', authenticateJWT, (req, res) => res.json(news));

// API Products
app.get('/api/products', (req, res) => res.json(products));
app.get('/api/products/:id', (req, res) => {
    const product = products.find((p) => p.id === req.params.id);
    if (product) res.json(product);
    else res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
});
app.post('/api/products', authenticateJWT, (req, res) => {
    const { name, img, listImg, categoriesId, description, price, brand } = req.body;
    if (!name) return res.status(400).json({ message: 'Tên sản phẩm là bắt buộc' });
    const newproduct = {
        id: Date.now().toString(),
        img,
        listImg,
        name,
        price,
        categoriesId,
        description,
        brand,
        checked: false,
        createdAt: formatDay(),
    };
    products.push(newproduct);
    res.status(201).json(newproduct);
});
app.patch('/api/products/:id', authenticateJWT, (req, res) => {
    const id = req.params.id;
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex > -1) {
        products[productIndex] = { ...products[productIndex], ...req.body };
        res.json(products[productIndex]);
    } else {
        res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
});
app.delete('/api/products/:id', authenticateJWT, (req, res) => {
    const id = req.params.id;
    // if (tasks.some((task) => task.productId === id)) {
    //     return res.status(400).json({ message: 'Không thể xóa dự án có nhiệm vụ' });
    // }
    products = products.filter((product) => product.id !== id);
    res.status(204).send();
});

// API Sản phẩm khuyến mãi

app.get('/api/productsale', (req, res) => res.json(productSale));
app.get('/api/productsale/:id', authenticateJWT, (req, res) => {
    const productSale = productSale.find((p) => p.id === req.params.id);
    if (productSale) res.json(productSale);
    else res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
});

// API Cart
app.get('/api/cart', authenticateJWT, (req, res) => {
    const user = users.find((u) => u.email === req.user.email);
    if (!user) {
        return res.status(404).json({ message: "Không tìm thấy cart" });
    }

    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword.cart);
});

// app.post('/api/cart', authenticateJWT, (req, res) => {
//     const  userID  = req.user.id;
//     const { idProduct , quantity} = req.body;
//     users.forEach(user => {
//         if (Number(user.id) === Number(userID)) {
//             let checkInCart = user.cart.some(item => Number(item.id) === Number(idProduct));
//             if (!checkInCart) {
//                 let product = products.find(value => Number(value.id) === Number(idProduct));
//                 user.cart.unshift({
//                     ...product,
//                     quantity: quantity,
//                 })
//             }else{
//                 let product = user.cart.find(value => Number(value.id) === Number(idProduct));
//                 product.quantity += quantity;

//             }
//         }
//     });
//     res.status(201).json( {message: 'add success' });
// });

app.post('/api/cart', authenticateJWT, (req, res) => {
    const { idProduct, quantity } = req.body;

    if (!Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({ message: 'Invalid quantity' });
    }

    const user = users.find((u) => u.email === req.user.email);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const productData = products.find(p => Number(p.id) === Number(idProduct));
    if (!productData) {
        return res.status(404).json({ message: 'Product not found' });
    }

    const cartItem = user.cart.find(item => Number(item.id) === Number(idProduct));

    if (!cartItem) {
        user.cart.unshift({
            ...productData,
            quantity: quantity
        });
    } else {
        cartItem.quantity += quantity;
    }

    return res.status(201).json({ message: 'Add success' });
});

// delete cart
app.delete("/api/cart/:id", authenticateJWT, (req, res) => {
    const user = users.find((u) => u.email === req.user.email);
    const id = req.params.id;
    if (!user) {
        return res.status(404).json({ message: "Không tìm thấy User" });
    }

    user.cart = user.cart.filter((item) => item.id !== id);
    res.status(204).send();
});

app.patch('/api/updateCartQuantity', authenticateJWT, (req, res) => {
    const { id, quantity } = req.body;

    if (!Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({ message: 'Invalid quantity' });
    }

    const user = users.find((u) => u.email === req.user.email);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    user.cart = user.cart.map(item =>
        item.id == id ? { ...item, quantity } : item
    );

    res.json(user.cart);
});
// chon 1 hoặc nhiều sp cùng lúc
app.patch('/api/toggleCart', authenticateJWT, (req, res) => {
    const { id, checked } = req.body; // id có thể null/undefined
    const user = users.find(u => u.email === req.user.email);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (id) {
        // Toggle 1 sản phẩm
        user.cart = user.cart.map(item =>
            item.id == id ? { ...item, checked } : item
        );
    } else {
        // Toggle tất cả sản phẩm
        user.cart = user.cart.map(item => ({ ...item, checked }));
    }

    res.json(user.cart);
});



// API Đơn hàng
app.get('/api/payment', authenticateJWT, (req, res) => {
    const user = users.find((u) => u.email === req.user.email);
    if (!user) {
        return res.status(404).json({ message: "Không tìm thấy cart" });
    }

    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword.bill);
});

app.post('/api/payment', authenticateJWT, (req, res) => {
    const { name, phone, address, note, cart, totalPrice } = req.body;


    const user = users.find((u) => u.email === req.user.email);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    let newBill = {
        id: Date.now().toString(),
        name,
        phone,
        address,
        note,
        status: "dangVanChuyen",
        cart,
        totalPrice,
        createdAt: formatDay()
    }
    user.bill.unshift(newBill);
    user.cart = user.cart.filter(item => item.checked === false);

    return res.status(201).json(newBill);
});




// API Nhiệm vụ
app.get('/api/tasks', authenticateJWT, (req, res) => {
    const productId = req.query.productId;
    const filteredTasks = productId ? tasks.filter((t) => t.productId === productId) : tasks;
    res.json(filteredTasks);
});
app.post('/api/tasks', authenticateJWT, (req, res) => {
    const { name, productId } = req.body;
    if (!name || !productId) {
        return res.status(400).json({ message: 'Tiêu đề và productId là bắt buộc' });
    }
    if (!products.find((p) => p.id === productId)) {
        return res.status(404).json({ message: 'Không tìm thấy dự án' });
    }
    const newTask = {
        id: Date.now().toString(),
        name,
        productId,
        status: 'pending',
        assignedTo: null,
        createdAt: formatDay(),
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});
app.patch('/api/tasks/:id', authenticateJWT, (req, res) => {
    const id = req.params.id;
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex > -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
        res.json(tasks[taskIndex]);
    } else {
        res.status(404).json({ message: 'Không tìm thấy nhiệm vụ' });
    }
});
app.delete('/api/tasks/:id', authenticateJWT, (req, res) => {
    tasks = tasks.filter((task) => task.id !== req.params.id);
    res.status(204).send();
});
// API Ghi chú
app.get('/api/notes', authenticateJWT, (req, res) => {
    const userNotes = notes.filter((note) => note.userEmail === req.user.email);
    res.json(userNotes);
});
app.post('/api/notes', authenticateJWT, (req, res) => {
    const { name, content, productId, taskId } = req.body;
    if (!name || !content) {
        return res.status(400).json({ message: 'Tiêu đề và nội dung là bắt buộc' });
    }
    if (productId && !products.find((p) => p.id === productId)) {
        return res.status(404).json({ message: 'Không tìm thấy dự án' });
    }
    if (taskId && !tasks.find((t) => t.id === taskId)) {
        return res.status(404).json({ message: 'Không tìm thấy nhiệm vụ' });
    }
    const newNote = {
        id: Date.now().toString(),
        name,
        content,
        productId: productId || null,
        taskId: taskId || null,
        userEmail: req.user.email,
        createdAt: formatDay(),
    };
    notes.push(newNote);
    res.status(201).json(newNote);
});
app.patch('/api/notes/:id', authenticateJWT, (req, res) => {
    const { id } = req.params;
    const { name, content } = req.body;
    const noteIndex = notes.findIndex(
        (note) => note.id === id && note.userEmail === req.user.email
    );
    if (noteIndex === -1) return res.status(404).json({ message: 'Không tìm thấy ghi chú' });
    notes[noteIndex] = { ...notes[noteIndex], name, content };
    res.json(notes[noteIndex]);
});
app.delete('/api/notes/:id', authenticateJWT, (req, res) => {
    const { id } = req.params;
    const noteIndex = notes.findIndex(
        (note) => note.id === id && note.userEmail === req.user.email
    );
    if (noteIndex === -1) return res.status(404).json({ message: 'Không tìm thấy ghi chú' });
    notes.splice(noteIndex, 1);
    res.status(204).send();
});
app.listen(port, () => console.log(`Server chạy tại http://localhost:${port}`));