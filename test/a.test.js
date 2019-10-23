const axios = require("axios")

// 为给定 ID 的 user 创建请求
axios.post('http://localhost:7001/api/login', {
    name: "ji431u2",
    password: "199922"
  })
    .then(function (response) {
        axios.get('http://localhost:7001/api/project/create')
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

    })
    .catch(function (error) {
        console.log(error);
    });
