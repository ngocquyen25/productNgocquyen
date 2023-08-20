var userApi = 'http://localhost:3000/User';
var row= document.querySelector('.row-js');
var render = document.querySelector('.render');
var applog = document.querySelector('.btn-log');
var appdk = document.querySelector('.btn-dk');
function start(){
    getuser(handleloginuser)
    handleCreateuser();
    
    
};


start();


function getuser(calback){
    fetch(userApi)
        .then(function(response){
            return response.json();
        })
        .then(calback) ;
    
    
}; 


function createuser(data, callback){
    var options = {
        method:'POST',
        body:JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(userApi, options)
        .then(function(response){
            return response.json();
        })
        .then(callback)     
};


function handleCreateuser(){
    appdk.addEventListener('click', function(){
        var email = document.querySelector('input[name="email"]').value;
        var password = document.querySelector('input[name="password"]').value;
        var formData = {
            email: email,
            password:password
            
        };
        createuser(formData);    
    });
    
    
};
function handleloginuser(User){
    applog.addEventListener('click', function(){
        console.log(applog);
        var email1 = document.querySelector('input[name="email1"]').value;
        console.log(email1);
        console.log(User);
        var Users = User.filter(function(user) {
            return email1 === user.email;
        });
        
        if (Users.length > 0) {
            var htmlus = Users.map(function(user) {
                return `<span class="header__navbar-user-name">${user.name}</span>`;
            });
            model.classList.remove('model-open');
            var html = htmlus.join('');
            render.innerHTML = html;
        } else {
            // Xử lý khi không tìm thấy người dùng với email nhập vào
            render.innerHTML = "<span>User not found</span>";
        }
    });
}




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
    fetch(userApi + '/' + id, options)
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







// đổ dữ liệu lên giao diện index
// function renderuserIndex(User){
//     var htmls = User.map(function(user){
//         return  `<span class="header__navbar-user-name">${user.name}</span>
//                 `
//             });
//     var html = htmls.join('');
//     render.innerHTML = html;
// };


    











