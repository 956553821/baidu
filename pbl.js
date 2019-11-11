window.onload = function(){
    //调用函数
    this.imgLocation("container","box") 

    //使用 JSON字符串来模拟数据；传输；
    var imgData={"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpg"},{"src":"7.jpg"},{"src":"8.jpg"},{"src":"9.jpg"}]}
    
    //监听滚动条；onscroll事件；
    window.onscroll = function(){
       if(this.checkFlag()){  //在滚动事件里判断，执行 chekFlag（） 则触发以下代码；
           var cparent = document.getElementById("container"); //还是先获取 根元素；
            // 进行 for 循环，因为要一直加载；imgData，加载来源；
           for(var i = 0;i<imgData.data.length;i++){          
               var ccontent = document.createElement("div"); //动态创建元素“div”；
               ccontent.className="box"; //指定classname，“box” ；
               cparent.appendChild(ccontent); // 巷节点子节点末尾添加新的子节点；
               var boximg = document.createElement("div");
               boximg.className="box_img";
               ccontent.appendChild(boximg);
               var img = document.createElement("img");
               img.src = "../tup/"+imgData.data[i].src;
               boximg.appendChild(img);
           }
           this.imgLocation("container","box") 
       }    
    }
}

// 下滑动 自动加载
//实现滚动到最后一张图片之前时加载图片；
function checkFlag(){
    var father = document.getElementById("container"); //一样先取得图片；得到数据；
    var son= getChiLdElement(father,"box");  // 监听的内容， 父对象以及子对象；
    var lastContentHeight = son[son.length - 1].offsetTop; //取得最后一张图片的高度距顶部的高度；
    var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;//滚动值；
    var pageHeight = document.documentElement.clientHeight||document.body.clientHeight;//当前页面高度；
    //判断，如果最后一张的高度 小于 滚动值加当前页面高度的和，则允许加载，返回；
    if(lastContentHeight<scrollTop+pageHeight){ 
        return true;
    }
}


/*获得多少个图片
需要获得DIV个数 通过父集空间获得子集空间 
*/
function imgLocation(parent,content){
    // 将parent下的所有content取出（取出box）
    var cparent = document.getElementById(parent);
    var ccontent = getChiLdElement(cparent,content);//得到所有图片；51~65行
    var imgWigth = ccontent[0].offsetWidth;//取得第一张图片的宽度；

    //一排能放多少图片？取决于屏幕的宽度除于图片的宽度；
    var num = Math.floor(document.documentElement.clientWidth / imgWigth);
    //将图片固定，不会因为float的属性 根据页面大小自适应； 
    cparent.style.cssText = "width:"+imgWigth*num+"px;margin:0 auto"; //一张图片的宽度 * 图片的个数；

    // 定义数组 来承载盒子的高度；（承载第一排图片的高度）
    var BoxHeightArr=[];
    for(var i =0;i<ccontent.length;i++){//循环每张图片，取得所有图片的高度
        if(i<num){
            BoxHeightArr[i] = ccontent[i].offsetHeight; //每得到一张图片的高度，将存进数组中；
        }else{
            var minheight = Math.min.apply(null,BoxHeightArr); //取得最小的高度；
            var minIndex = getminheightLocation(BoxHeightArr,minheight);//调用40~47行的代码；

            //摆放第二行开始的图片
            ccontent[i].style.position = "absolute"; //绝对布局，便于控制位置
            ccontent[i].style.top = minheight+"px";  //高度 最小高度的图片下面；但是位置不对，所以需要调用40~47行的代码；
            ccontent[i].style.left = ccontent[minIndex].offsetLeft+"px";//得到后，再设置居左的位置 offsetLeft 
            BoxHeightArr[minIndex] = BoxHeightArr[minIndex]+ccontent[i].offsetHeight;
            //高度数组的最小高度位置 = 第一行最小高度的图片+ 第二行摆放在第一行最小高度下面的图片；
            //总和高度高于其他图片，之后便继续遵照最小高度图片的位置进行摆放；
        }
    }
 
}
//得到最小高度的位置； 两个参数， 一个为 高度的数组，一个为最小的高度；
function getminheightLocation(BoxHeightArr,minHeight){
    for(var i in BoxHeightArr){ //循环遍历
        if(BoxHeightArr[i] == minHeight){ //如果符合最低高低，则取出这个数，返回；
            return i;
        }
    }
}



// b, 创建一个函数用来储存；
function getChiLdElement(parent,content){
    var contentArr= [];
    //通过父集来得到所有子集；
    var allcontent = parent.getElementsByTagName("*"); //取得 parent中的所有内容;

    //通过for循环 将其全部放入数组中；
    //判断，如果取出的数据等于子集，则将其放入数组中；
    for(var i = 0;i<allcontent.length;i++){
        if(allcontent[i].className==content){
            contentArr.push(allcontent[i]);
        }
    }
    return contentArr;
}


