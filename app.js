var coursesApi = 'http://localhost:3000/SanPham';
var row= document.querySelector('.row-js');
var rowIndex = document.querySelector('.row-index');

function start(){
    getCourses(renderCoursesHome);
    getCourses(renderCoursesIndex);
    // hàm get nhận dl phản hồi từ api và goij tới hàm render để hiển thị dl ra giao diện
    // tham số của 2 hàm trên là 2 hàm render để then gọi tới 2 hàm render đó
    handleCreateForm();
    
};

// gọi hàm start
start();

// hàm lấy dữ liệu từ Api
function getCourses(calback){
    fetch(coursesApi)
    // fetch cũng là 1 promise nên nhận vào api then sẽ nhận phản hồi từ api đó và trả về nó với dữ liệu phản hồi json
    .then(function(response){
        return response.json();
    })
    .then(calback) ;
    // then sẽ nhận tham số là 1 hàm nên khi truyền calback thì no sẽ  hiểu đó là 1 hàm nên truyền chung tham số với hàm getCourses để then gọi tới hàm được truyền vào getCourses
    
}; 

// hàm tạo mới trong json
function createCourse(data, callback){
    // hàm này sẽ nhận tham số là formData được truyền và sẽ tạo 1 promise mới với dl json phản hồi từ api với opptions có method 'POST',
    // và body để chuyển  dữ liệu từ json sang chuỗi cho data sau đó data sẽ dược têm vào csdl
    // options là để thêm yêu cầu tới api
    // khi tạo thành công api sẽ thay đổi và load lại nên sẽ render lại và hiển thị dữ liệu được tạo 
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
        // khi click vào nút tạo thì dữ liệu trong các ô input được đưa vào object formData sau đó gọ tới hàm createCourse với tham số là objec formData đó
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
// hàm xóa
function deleteCourse(id, callback){
    var options = {
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // hàm này nhận vào tham số là id để biết được xóa dl có id bao nhiêu
    // và hàm cũng tạo 1 promise mới nhận dl phản hồi từ api sau đó thực hiện options xóa với id được ghi thêm vào sau chuỗi uru của api
    fetch(coursesApi + '/' + id, options)
        .then(function(response){
            return response.json();
        })
        .then(callback)      
    };


// hàm thêm dữ liệu muốn chỉnh sửa vào ô input
function addinput(id,name,img, OldPrice, Price, location, sale){
    // hàm này được gọi sau khi nhấn nút sửa và nhận vào các tham số được tuyền
    // các tham số đó được gán lên cho các ô ipnut để ng dùng có thể chỉnh sửa lại theo ý muốn
    // riêng id là k thể thay đổi nên chỉ hiện để ng dùng biết đang chỉnh sửa cho đối tượng nào
    document.querySelector('input[name="id"]').value = id;
    document.querySelector('input[name="name"]').value = name;
    document.querySelector('input[name="img"]').value = img;
    document.querySelector('input[name="OldPrice"]').value = OldPrice;
    document.querySelector('input[name="Price"]').value = Price;
    document.querySelector('input[name="location"]').value = location;
    document.querySelector('input[name="sale"]').value = sale;
    // ô id mặc định sẽ không được hiển thị để ng dùng hiểu là id là csld tự tạo chứ k cần thêm
    // khi nhấn nút sửa nó mới hiển thị ra để ng dùng xem 
    var inputfirst = document.querySelector('.inputfirst');
    inputfirst.style.display = 'block';
    
    // ẩn và hiện các nút btn
    // click vào  nút sửa thì ẩn nút create và hiển thị nút cancel và update(mặc định 2 nút này được ẩn đi)
    var btn1 = document.querySelector('.btns-1');
    var btn2 = document.querySelector('.btns-2');
    var btn = document.querySelector('.btns');
    btn.style.display = 'none';
    btn1.style.display = 'block';
    btn2.style.display = 'block';
    // ấn vào nút cancel thì ẩn đi 2 nút cancel và update và hiển thi nút create và sẽ xóa tất cả dữ liệu trong các ô input
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
    // ấn vào nút update thì sẽ lấy dữ liệu trong các ô input sau đó thêm vào 1 object là data cuối cùng gọi tới hàm cập nhật lại dữ liệu và truyền cho nó tham số là data(là dữ liệu cần cập nhật lại)
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
    // hàm này cugnx giống tạo và xóa nhưng với options là PATCH là cập  nhật
    // nó cugnx cần id phía sau url của api giống hàm xóa
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

// hàm đổ dữ liệu lên giao diện sau khi được thêm hoặc cập nhật
function renderCoursesHome(SanPham){
                // click vào nút xóa thì gọi hàm xóa và truyền cho nó 1 tham số là id
                // click vào nút sửa thì truyền cho nó những tham số là các giá trị trong object cần sửa
                // SanPham là 1 mảng trong dl json của api dùng map duyệt qua các phần tử trong mảng(là 1 object)
                // biến htmls nhận vào chuỗi html được return và chuyển thành chuỗi trước khi gán cho biến html
                // và cuối cùng gán đoạn html trong biến html cho innerText củ biến row

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

    // trường hợp có nhiều class và khi click vào class đó thì làm một công việc cho 1 class khác cùng chỉ số i thì không dùng for thường được
    // mà phải dùng forEach để truyền vào 1 index là key để nó hiểu khi lick vào phần tử class nào thì thực hiện công việc cho class khác cùng index
    for (let i = 0; i < fillhearts.length; i++){
        fillhearts[i].addEventListener('click',function(){
        likehearts[i].classList.remove('home-product-item__like--lided');
        })
    };
    for (let i = 0; i < emtyhearts.length; i++){
        emtyhearts[i].addEventListener('click',function(){
        likehearts[i].classList.add('home-product-item__like--lided');
        })
    }
    // fillhearts.forEach(function (fillheart, index) {
    //     fillheart.addEventListener('click', function () {
    //         likehearts[index].classList.remove('home-product-item__like--lided');
    //     });
    // });

    // emtyhearts.forEach(function (emtyheart, index) {
    //     emtyheart.addEventListener('click', function () {
    //         likehearts[index].classList.add('home-product-item__like--lided');
    //     });
    // });
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


    











