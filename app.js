var coursesApi = 'http://localhost:3000/SanPham';
var row= document.querySelector('.row-js');
var rowIndex = document.querySelector('.row-index');

function start(){
    getCourses(renderCoursesHome);
    getCourses(renderCoursesIndex);
    handleCreateForm();
    
};

// gọi hàm start
start();
heart();
// hàm lấy dữ liệu từ Api
function getCourses(calback){
    fetch(coursesApi)
    .then(function(response){
        return response.json()
    })
    .then(calback) 
    
}; 

// hàm tạo mới
function createCourse(data, callback){
    var options = {
        method:'POST',
        body:JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(coursesApi, options)
        .then(function(response){
            return response.json();
        })
        .then(callback)     
};

// hàm xóa
function deleteCourse(id, callback){
    var options = {
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(coursesApi + '/' + id, options)
        .then(function(response){
            return response.json();
        })
        .then(callback)      
    };


// hàm thêm dữ liệu muốn chỉnh sửa vào ô input
function addinput(id,name,img, OldPrice, Price, location, sale){
    document.querySelector('input[name="id"]').value = id;
    document.querySelector('input[name="name"]').value = name;
    document.querySelector('input[name="img"]').value = img;
    document.querySelector('input[name="OldPrice"]').value = OldPrice;
    document.querySelector('input[name="Price"]').value = Price;
    document.querySelector('input[name="location"]').value = location;
    document.querySelector('input[name="sale"]').value = sale;
    var inputfirst = document.querySelector('.inputfirst');
    inputfirst.style.display = 'block';
    
    // ẩn và hiện các nút btn
    var btn1 = document.querySelector('.btns-1');
    var btn2 = document.querySelector('.btns-2');
    var btn = document.querySelector('.btns');
    btn.style.display = 'none';
    btn1.style.display = 'block';
    btn2.style.display = 'block';
    btn2.addEventListener('click', function(){
        btn.style.display = 'block';
        btn1.style.display = 'none';
        btn2.style.display = 'none';
        inputfirst.style.display = 'none';
        document.querySelector('input[name="id"]').value = null;
        document.querySelector('input[name="name"]').value = null;
        document.querySelector('input[name="img"]').value = null;
        document.querySelector('input[name="OldPrice"]').value = null;
        document.querySelector('input[name="Price"]').value = null;
        document.querySelector('input[name="location"]').value = null;
        document.querySelector('input[name="sale"]').value = null;
    });

    // click vào nút update thì gọi hàm handleUpdate
    btn1.addEventListener('click', function(){
        var name = document.querySelector('input[name="name"]').value;
        var img = document.querySelector('input[name="img"]').value;
        var OldPrice = document.querySelector('input[name="OldPrice"]').value;
        var Price = document.querySelector('input[name="Price"]').value;
        var location = document.querySelector('input[name="location"]').value;
        var sale = document.querySelector('input[name="sale"]').value;
        var data = {
            name:name,
            img: img,
            OldPrice:OldPrice,
            Price:Price,
            location:location,
            sale:sale
        };
        handleUpdate(data, id);
    });
}

// hàm đổ dữ liệu lên giao diện sau khi được thêm hoặc cập nhật
function renderCoursesHome(SanPham){
        var htmls = SanPham.map(function(course){
            return  `<div class="col l-2-4 m-4 c-6">
            <div class="home-product-item" href="#">
                <div class="home-product-item__img" style="background-image: url(${course.img});"></div>
                <h4 class="home-product-item__name">${course.name}</h4>
                <div class="home-product-item__price">
                    <span class="home-product-item__price-old">${course.OldPrice}đ</span>
                    <span class="home-product-item__price-current">${course.Price}đ</span>
                </div>
                <div class="home-product-item__action">
                    <span class="home-product-item__like home-product-item__like--lided">
                        <i class="home-product-item__like-icon-emty fa-regular fa-heart"></i>
                        <i class="home-product-item__like-icon-fill fa-solid fa-heart"></i>
                    </span>
                    <div class="home-product-item__rating">
                        <i class="home-product-item__star--gold fa-solid fa-star"></i>
                        <i class="home-product-item__star--gold fa-solid fa-star"></i>
                        <i class="home-product-item__star--gold fa-solid fa-star"></i>
                        <i class="home-product-item__star--gold fa-solid fa-star"></i>
                        <i class="home-product-item__star--gold fa-solid fa-star"></i>
                    </div>
                    <span class="home-product-item__sold">9.2k đã bán</span>
                </div>
                <div class="home-product-item__origin">
                    <span class="home-product-item__brand">Shop</span>
                    <span class="home-product-item__origin-name">${course.location}</span> 
                </div>
                <div class="home-product-item__favourite">
                    <i class="fa-solid fa-check"></i>
                    <span>Yêu thích</span>
                </div>
                <div class="home-product-item__sale-off">
                    <span class="home-product-item__sale-off-percent">${course.sale}%</span>
                    <span class="home-product-item__sale-off-label">GIẢM</span>
                </div>
                <div class="button"> 
                <button class = " btn-ap" onclick = "deleteCourse(${course.id})">Xóa</button>
                <button class = " btn-ap" onclick = "addinput(${course.id}, '${course.name}', '${course.img}', '${course.OldPrice}', '${course.Price}', '${course.location}', ${course.sale})">sửa</button>
                </div>
            </div>
        </div>
        `
        });
        var html = htmls.join('');
        row.innerHTML = html;
        heartHome();
};

function heartHome() {
    var fillhearts = row.querySelectorAll('.home-product-item__like-icon-fill');
    var emtyhearts = row.querySelectorAll('.home-product-item__like-icon-emty');
    var likehearts = row.querySelectorAll('.home-product-item__like');

    fillhearts.forEach(function (fillheart, index) {
        fillheart.addEventListener('click', function () {
            likehearts[index].classList.remove('home-product-item__like--lided');
        });
    });

    emtyhearts.forEach(function (emtyheart, index) {
        emtyheart.addEventListener('click', function () {
            likehearts[index].classList.add('home-product-item__like--lided');
        });
    });
};

function heartIndex() {
    var fillhearts = rowIndex.querySelectorAll('.home-product-item__like-icon-fill');
    var emtyhearts = rowIndex.querySelectorAll('.home-product-item__like-icon-emty');
    var likehearts = rowIndex.querySelectorAll('.home-product-item__like');

    fillhearts.forEach(function (fillheart, index) {
        fillheart.addEventListener('click', function () {
            likehearts[index].classList.remove('home-product-item__like--lided');
        });
    });

    emtyhearts.forEach(function (emtyheart, index) {
        emtyheart.addEventListener('click', function () {
            likehearts[index].classList.add('home-product-item__like--lided');
        });
    });
}


// đổ dữ liệu lên giao diện index
function renderCoursesIndex(SanPham){
    var htmls = SanPham.map(function(course){
        return  `<div class="col l-2-4 m-4 c-6">
                    <a class="home-product-item" >
                        <div class="home-product-item__img" style="background-image: url(${course.img});"></div>
                        <h4 class="home-product-item__name">${course.name}</h4>
                        <div class="home-product-item__price">
                            <span class="home-product-item__price-old">${course.OldPrice}đ</span>
                            <span class="home-product-item__price-current">${course.Price}đ</span>
                        </div>
                        <div class="home-product-item__action">
                            <span class="home-product-item__like home-product-item__like--lided">
                                <i class="home-product-item__like-icon-emty fa-regular fa-heart"></i>
                                <i class="home-product-item__like-icon-fill fa-solid fa-heart"></i>
                            </span>
                            <div class="home-product-item__rating">
                                <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                <i class="home-product-item__star--gold fa-solid fa-star"></i>
                                <i class="home-product-item__star--gold fa-solid fa-star"></i>
                            </div>
                            <span class="home-product-item__sold">9.2k đã bán</span>
                        </div>
                        <div class="home-product-item__origin">
                            <span class="home-product-item__brand">Shop</span>
                            <span class="home-product-item__origin-name">${course.location}</span> 
                        </div>
                        <div class="home-product-item__favourite">
                            <i class="fa-solid fa-check"></i>
                            <span>Yêu thích</span>
                        </div>
                        <div class="home-product-item__sale-off">
                            <span class="home-product-item__sale-off-percent">${course.sale}%</span>
                            <span class="home-product-item__sale-off-label">GIẢM</span>
                        </div>
                    </a>
                </div>
                `
            });
    var html = htmls.join('');
    rowIndex.innerHTML = html;
    heartIndex();
};


    


// hàm cập nhật dữ liệu
function handleUpdate(data, id) {
    console.log(data);
    var options = {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch(coursesApi + '/' + id, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (updatedData) {
            console.log(updatedData);
        })
        .catch(function (error) {
            console.error('Error:', error);
        });
}

// hàm lấy dữ liệu trong form được điền và gửi đến hàm tạo
function handleCreateForm(){
    var btn = document.querySelector('.btns');
    btn.addEventListener('click', function(){
        var name = document.querySelector('input[name="name"]').value;
        var img = document.querySelector('input[name="img"]').value;
        var OldPrice = document.querySelector('input[name="OldPrice"]').value;
        var Price = document.querySelector('input[name="Price"]').value;
        var location = document.querySelector('input[name="location"]').value;
        var sale = document.querySelector('input[name="sale"]').value;
        var formData = {
            name:name,
            img: img,
            OldPrice:OldPrice,
            Price:Price,
            location:location,
            sale:sale
        };
        createCourse(formData);    
    });
    
    
}





