var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var formidable = require('formidable');
var fs = require('fs');

var io = require('socket.io')


var app = express();

// 静态文件,访问到地址是http://localhost:3000/image/porridge.jpeg，没有public
app.use(express.static(path.join(__dirname, 'public')));
// 中间件
// app.use(express.bodyParser());
app.use(bodyParser.urlencoded({ extended: true }))
    //暴露文件
    // app.use(express.static(path.join(__dirname, 'public')))

//连接数据库
var url = "mongodb://localhost:27017/HOTELRESERVATION";
mongoose.connect(url, function() {
    console.log("hotel订餐数据库连接success");
});

app.get('/', function(req, res) {
    res.json({ "libi": 233, "dsdf": "dfadsf" });
})

app.listen(9000, function() {
    console.log("success");
});

// model
var User = require('./models/user');
var Category = require('./models/category');
var Evaluate = require('./models/evaluate');
var Foods = require('./models/foods');
var Order = require('./models/order');
var Hotel = require('./models/hotel');
var AdminUser = require('./models/adminUser');


// 管理员登录
app.post('/adminlogin', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var admininfo = '';
    var obj = '';
    var userName = new String();
    var password = '';
    req.on('data', function(chunk) {
        admininfo += chunk;
        obj = JSON.parse(admininfo)
        userName = obj.userName;
        password = obj.password;
        AdminUser.findOne({ "userName": userName }, function(err, docus) {
            if (err) {
                console.log(err);
            } else if (docus) {
                if (docus != '' && docus.userName == userName && docus.password != password) {
                    // 密码错误
                    res.send({ "code": 1 })
                } else if (docus != '' && docus.userName == userName && docus.password == password) {
                    //  success
                    res.send({ "code": 2, "currentUser": obj })
                }
            } else {
                res.send({ "code": 0 })
            }
        })
    })


})

// 用户登录
app.post('/userlogin', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var userinfo = '';
    var obj = '';
    var userName = new String();
    var password = '';
    req.on('data', function(chunk) {
        userinfo += chunk;
        obj = JSON.parse(userinfo);
        userName = obj.userName;
        password = obj.password;
        // console.log(obj)
        User.findOne({ "userName": userName }, function(err, docus) {
            if (err) {
                console.log(err);
            } else if (docus) {
                if (docus != '' && docus.userName == userName && docus.password != password) {
                    // 密码错误
                    res.send({ "code": 1 })
                } else if (docus != '' && docus.userName == userName && docus.password == password) {
                    //  success
                    res.send({ "code": 2, "currentUser": obj })
                }
            } else {
                res.send({ "code": 0 })
            }
        })
    })
});

// 用户注册
app.post('/userregister', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var reg = ''
    req.on('data', function(chunk) {
        reg += chunk;
        console.log(reg);
        var obj = JSON.parse(reg);
        var name = obj.userName;
        User.find({ "userName": name }, function(err, docus) {
            if (err) {
                console.log(err)
            } else if (docus != '') {
                console.log(docus);
                res.send({ "code": 0 })
            } else {
                User.create(obj, function(err, dos) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send({ "code": 1 })
                    }

                })

            }
        })
    })

})


// 查找，发送菜单
app.get('/sendfoods', function(req, res) {
    var goods = [];
    Foods.find({ "typeName.categoryName": "厨师推荐" }, function(err, result1) {
        if (err) {
            console.log(err);
        } else {
            goods.push({ "typeName": "厨师推荐", "foods": result1 });
            Foods.find({ "typeName.categoryName": "单人套餐" }, function(err, result2) {
                if (err) {
                    console.log(err);
                } else {
                    goods.push({ "typeName": "单人套餐", "foods": result2 });
                    Foods.find({ "typeName.categoryName": "双人套餐" }, function(err, result3) {
                        if (err) {
                            console.log(err);
                        } else {
                            goods.push({ "typeName": "双人套餐", "foods": result3 });
                            Foods.find({ "typeName.categoryName": "单点配菜" }, function(err, result4) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    goods.push({ "typeName": "单点配菜", "foods": result4 });
                                    res.header("Access-Control-Allow-Origin", "*");
                                    res.send(goods);
                                }
                            });
                        }
                    });
                }
            })
        }
    });
});

// 删除商品
app.post('/deletefood', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var id = '';
    req.on('data', function(chunk) {
        id += chunk;
        console.log(id)
        Foods.findByIdAndRemove({ _id: id }, function(err, doucs) {
            if (err) {
                console.log(err)
            } else {
                res.send({ "code": 1 })
            }
        })
    })

})

// 增加商品
app.post('/upload', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var body = ''
    req.on('data', function(chunk) {
        body += chunk; //读取参数流转化为字符串
        var obj = JSON.parse(body);
        console.log(obj)
        var image = obj.image;
        Foods.create({
            "name": obj.name,
            "price": obj.price,
            "info": obj.info,
            "image": obj.image,
            "typeName": [{ "categoryName": obj.typeName }],
        }, function(err) {
            if (err) {
                console.log(err)
            } else {
                console.log("success")
                res.send({ "code": 1 });
            }
        })

    });
})


// 更新商品
app.post('/update', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var model = '';
    req.on('data', function(chunk) {
        model += chunk;
        // console.log(obj)
        var obj = JSON.parse(model);
        console.log(model);
        Foods.findByIdAndUpdate({ _id: obj._id }, {
            $set: {
                "name": obj.name,
                "price": obj.price,
                "info": obj.info,
                "image": obj.image,
                "typeName": [{ "categoryName": obj.typeName }],
            }
        }, function(err, docus) {
            if (err) {
                console.log(err)
            } else {
                console.log("success" + docus)
                res.send({ "code": 1 })
            }
        })
    })

})

// 增加订单
app.post('/postorder', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var body = ''
    req.on('data', function(chunk) {
        body += chunk; //读取参数流转化为字符串
        var obj = JSON.parse(body);
        console.log(obj)
        Order.create({
            "userName": obj.userName,
            "place": obj.place,
            "totalPrice": obj.totalprice,
            "status": obj.status,
            "ordertime": obj.time,
            "goods": obj.goods,
            "createtime": new Date()
        }, function(err) {
            if (err) {
                console.log(err)
            } else {
                console.log("success")
                res.send({ "code": 1 });
            }
        })

    });
})

// 发送所有订单
app.get('/getorder', function(req, res) {
    Order.find({}, function(err, result) {
        if (err) {
            console.log(err)
        } else {
            res.header("Access-Control-Allow-Origin", "*");
            res.send(result);
        }
    }).sort({ "_id": -1 })

});

// 根据名字获取订单
app.post('/postordername', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var userName = '';
    req.on('data', function(chunk) {
        userName += chunk;
        Order.findOne({ "userName": userName }, function(err, docus) {
            if (err) {
                console.log(err);
            } else {
                if (docus)
                    res.send(docus)
            }
        }).sort({ '_id': -1 })
    })

})


// 商家修改订单状态
app.post('/modifystatus', function(req, res) {
    var id = '';
    req.on('data', function(chunk) {
        id += chunk;
        console.log(id);
        Order.update({ "_id": id }, { status: 1 }, function(err, docus) {
            if (err) {
                console.log(err)
            } else {
                console.log("success")
                res.header("Access-Control-Allow-Origin", "*");
                res.send({ "code": 1 });

            }
        })
    })
})


// 发送订单状态
app.post('/conststatus', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var obj = ''
    req.on('data', function(chunk) {
        obj += chunk;
        Order.findOne({ "_id": obj }, function(err, docus) {
            if (err) {
                console.log(err)
            } else {
                if (docus.status == 1) {
                    res.send({ "code": 1 });
                } else {
                    res.send({ "code": 0 });
                }
            }
        })
    })
})

// 添加评论
app.post('/addev', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var body = ''
    req.on('data', function(chunk) {
        body += chunk; //读取参数流转化为字符串
        var obj = JSON.parse(body);
        console.log(obj)
        Evaluate.create({
            Username: obj.userName,
            content: obj.content,
            foodreviews: obj.foodreviews,
            servicereviews: obj.servicereviews,
            status: obj.status,
            orderId: obj.orderId,
            time: Date.now()
        }, function(err) {
            if (err) {
                console.log(err)
            } else {
                console.log("success")
                res.send({ "code": 1 });
            }
        })

    });
})


// 发送评论
app.get('/getev', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    Evaluate.find({}).populate('orderId').exec(function(err, docus) {
        res.send(docus);
    })

})


// 发送商品类型
app.get('/sendcategory', function(req, res) {
    Category.find({}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            res.header("Access-Control-Allow-Origin", "*");
            res.send(result);
        }
    })
})


// 酒店信息
app.get('/sendhotel', function(req, res) {
    Hotel.find({}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            res.header("Access-Control-Allow-Origin", "*");
            res.send(result);
        }
    })
})



// 发送订单数据，统计信息
app.get('/orderinfo', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");

    var arr = [];
    var dataStr = '';
    var now = new Date();
    var year = now.getFullYear();
    dataStr += year + '-'
    var mon = now.getMonth() + 1;
    dataStr += mon + '-';
    var day = now.getDate();
    dataStr += day;
    var oneDay = 24 * 60 * 60 * 1000;
    //七天
    var sevenDay = new Date(dataStr).getTime() - 7 * oneDay;
    // 输出七天
    for (var i = 0; i < 7; i++) {
        var _mon = new Date(sevenDay + oneDay * i).getMonth() + 1;
        var _day = new Date(sevenDay + oneDay * i).getDate();
        var _str = year + '-' + _mon + '-' + _day;
        arr.push(_str);
    }
    arr.push(dataStr);
    var total = 0;
    var countarr = [];
    // for (var j = 0; j < arr.length; j++) {
    //     var countarr = [];
    //     Order.find({ "createtime": { "$gte": new Date(arr[j]), "$lt": new Date(arr[j + 1]) } }, function(err, docus) {
    //         if (docus.length > 0) {
    //             var total = 0;
    //             for (var i = 0; i < docus.length; i++) {
    //                 total += parseInt(docus[i].totalPrice)
    //             }
    //             countarr.push(total);
    //         } else {
    //             countarr.push(0);
    //         }
    //     })
    // }
    // res.send(countarr);

    Order.find({ "createtime": { "$gte": new Date(arr[0]), "$lt": new Date(arr[1]) } }, function(err, docus) {
        var total = 0;
        for (var i = 0; i < docus.length; i++) {
            total += parseInt(docus[i].totalPrice)
        }
        countarr.push(total)
        Order.find({ "createtime": { "$gte": new Date(arr[1]), "$lt": new Date(arr[2]) } }, function(err, docus) {
            var total = 0;
            for (var i = 0; i < docus.length; i++) {
                total += parseInt(docus[i].totalPrice)
            }
            countarr.push(total)
            Order.find({ "createtime": { "$gte": new Date(arr[2]), "$lt": new Date(arr[3]) } }, function(err, docus) {
                var total = 0;
                for (var i = 0; i < docus.length; i++) {
                    total += parseInt(docus[i].totalPrice)
                }
                countarr.push(total)
                Order.find({ "createtime": { "$gte": new Date(arr[3]), "$lt": new Date(arr[4]) } }, function(err, docus) {
                    var total = 0;
                    for (var i = 0; i < docus.length; i++) {
                        total += parseInt(docus[i].totalPrice)
                    }
                    countarr.push(total)
                    Order.find({ "createtime": { "$gte": new Date(arr[4]), "$lt": new Date(arr[5]) } }, function(err, docus) {
                        var total = 0;
                        for (var i = 0; i < docus.length; i++) {
                            total += parseInt(docus[i].totalPrice)
                        }
                        countarr.push(total)
                        Order.find({ "createtime": { "$gte": new Date(arr[5]), "$lt": new Date(arr[6]) } }, function(err, docus) {
                            var total = 0;
                            for (var i = 0; i < docus.length; i++) {
                                total += parseInt(docus[i].totalPrice)
                            }
                            countarr.push(total)
                            Order.find({ "createtime": { "$gte": new Date(arr[6]), "$lt": new Date(arr[7]) } }, function(err, docus) {
                                var total = 0;
                                for (var i = 0; i < docus.length; i++) {
                                    total += parseInt(docus[i].totalPrice)
                                }
                                countarr.push(total)
                                res.send(countarr)
                            })
                        })

                    })

                })

            })

        })

    })


})


// 发送评价信息

app.get('/evinfo', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");

    var arr = [];
    var dataStr = '';
    var now = new Date();
    var year = now.getFullYear();
    dataStr += year + '-'
    var mon = now.getMonth() + 1;
    dataStr += mon + '-';
    var day = now.getDate();
    dataStr += day;
    var oneDay = 24 * 60 * 60 * 1000;
    //七天
    var sevenDay = new Date(dataStr).getTime() - 7 * oneDay;
    // 输出七天
    for (var i = 0; i < 7; i++) {
        var _mon = new Date(sevenDay + oneDay * i).getMonth() + 1;
        var _day = new Date(sevenDay + oneDay * i).getDate();
        var _str = year + '-' + _mon + '-' + _day;
        arr.push(_str);
    }
    arr.push(dataStr);
    var total = 0;
    var countarr = [];
    var servicecount = [];

    Evaluate.find({ "time": { "$gte": new Date(arr[0]), "$lt": new Date(arr[1]) } }, function(err, docus) {
        var total = 0;
        var servicetotal = 0;
        for (var i = 0; i < docus.length; i++) {
            total += parseInt(docus[i].foodreviews);
            servicetotal += parseInt(docus[i].servicereviews);
        }
        countarr.push(total);
        servicecount.push(servicetotal)
        Evaluate.find({ "time": { "$gte": new Date(arr[1]), "$lt": new Date(arr[2]) } }, function(err, docus) {
            var total = 0;
            var servicetotal = 0;
            for (var i = 0; i < docus.length; i++) {
                total += parseInt(docus[i].foodreviews);
                servicetotal += parseInt(docus[i].servicereviews);
            }
            countarr.push(total)
            servicecount.push(servicetotal)

            Evaluate.find({ "time": { "$gte": new Date(arr[2]), "$lt": new Date(arr[3]) } }, function(err, docus) {
                var total = 0;
                var servicetotal = 0;
                for (var i = 0; i < docus.length; i++) {
                    total += parseInt(docus[i].foodreviews)
                    servicetotal += parseInt(docus[i].servicereviews);
                }
                countarr.push(total)
                servicecount.push(servicetotal)

                Evaluate.find({ "time": { "$gte": new Date(arr[3]), "$lt": new Date(arr[4]) } }, function(err, docus) {
                    var total = 0;
                    var servicetotal = 0;
                    for (var i = 0; i < docus.length; i++) {
                        total += parseInt(docus[i].foodreviews)
                        servicetotal += parseInt(docus[i].servicereviews);
                    }
                    countarr.push(total)
                    servicecount.push(servicetotal)

                    Evaluate.find({ "time": { "$gte": new Date(arr[4]), "$lt": new Date(arr[5]) } }, function(err, docus) {
                        var total = 0;
                        var servicetotal = 0;
                        for (var i = 0; i < docus.length; i++) {
                            total += parseInt(docus[i].foodreviews)
                            servicetotal += parseInt(docus[i].servicereviews);
                        }
                        countarr.push(total)
                        servicecount.push(servicetotal)

                        Evaluate.find({ "time": { "$gte": new Date(arr[5]), "$lt": new Date(arr[6]) } }, function(err, docus) {
                            var total = 0;
                            var servicetotal = 0;
                            for (var i = 0; i < docus.length; i++) {
                                total += parseInt(docus[i].foodreviews)
                                servicetotal += parseInt(docus[i].servicereviews);
                            }
                            countarr.push(total)
                            servicecount.push(servicetotal)

                            Evaluate.find({ "time": { "$gte": new Date(arr[6]), "$lt": new Date(arr[7]) } }, function(err, docus) {
                                var total = 0;
                                var servicetotal = 0;
                                for (var i = 0; i < docus.length; i++) {
                                    total += parseInt(docus[i].foodreviews)
                                    servicetotal += parseInt(docus[i].servicereviews);
                                }
                                countarr.push(total)
                                servicecount.push(servicetotal)
                                res.send({ "foodreviews": countarr, "servicereviews": servicecount })
                            })
                        })

                    })

                })

            })

        })

    })

})