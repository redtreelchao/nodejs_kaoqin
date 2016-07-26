var express = require('express');
var router = express.Router();
var Promise = this.Promise || require('promise');
var agent = require('superagent-promise')(require('superagent'), Promise);
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('kaoqin');
});
router.get('/checkin', function(req, result, next) {
  var d = new Date();
  // avoid something
  if( (d.getHours() == 8 && d.getMinutes() > 50)
      || (d.getHours() == 9 && d.getMinutes() < 40)
    )
  scrapy(url,result,function(result,res){
  	var tmp=JSON.parse(res.text)
            // result.send({success:true,data:res.text}) 
            var urlin='https://www.zhisiyun.com/wxapp/001/do_clockInOut'; 
            urlin += '?op=' + 'in';
            urlin += '&address_name=' + tmp[0].position;
            urlin += '&longitude=' + tmp[0].longitude;
            urlin += '&latitude=' + tmp[0].latitude;
            urlin += '&distance=' + (Math.random()*150+40).toFixed(2);   
            scrapy(urlin,result,function(result,res){
            	var res=JSON.stringify({"code":0,"success":true,"data":res.text})
            	result.send('success_jsonpCallback('+res+')')
            })
  })
  else result.send('success_jsonpCallback('+JSON.stringify({code:1,'msg':'wrong checkin time.'})+')')
});

router.get('/checkout', function(req, result, next) {
	// result.send('ddd')
  scrapy(url,result,function(result,res){
  	// res.send(123)
  	
  	var tmp=JSON.parse(res.text)[0]
            // result.send({success:true,data:res.text}) 
            var urlout='https://www.zhisiyun.com/wxapp/001/do_clockInOut'; 
            urlout += '?op=' + 'out';
            urlout += '&address_name=' + tmp.position;
            urlout += '&longitude=' + tmp.longitude;
            urlout += '&latitude=' + tmp.latitude;
            urlout += '&distance=' + (Math.random()*150+40).toFixed(2);
            // result.send(urlout)   
            scrapy(urlout,result,function(result,res){
            	var res=JSON.stringify({"code":0,"success":true,"data":res.text})
            	result.send('success_jsonpCallback('+res+')')
            })
  })
});

var url = 'https://www.zhisiyun.com/wxapp/001/get_clockInOut_location';

function scrapy(url,result,callback) {

    agent('GET',url)
        .set('Content-Type', 'application/json;charset=UTF-8')
        .set('Cookie', 'connect.sid=s%3Ah-R47pFcyAamVxLwju4rMR_d.XHd6%2F6%2BzA8UFv%2F5hekrO2PJlo23H3xevuP42p%2FLymSk; i18next=zh')
        .set('User-Agent', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36')
        .send({'connect':'keep-alive'})
        .end(function(err, res) {
            callback(result,res); return res;
        })
        .then(function onResult(res) {
            return res;
        }, function onError(err) {
            console.log(err);
            return;
        })
};


module.exports = router;
