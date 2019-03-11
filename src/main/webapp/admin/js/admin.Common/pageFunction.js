//显示行更改
$("#pageSize").on("change",function(){
	//当前页回滚到第一页
	$("#currentPage").val(1);
	getList($("#pageSize option:selected").val(),$("#currentPage").val());
});
//转到
$("#toPage").on("click",function(){
	//判断页码是否合法
	if(Number($("#currentPage").val())<=Number($("#pageTotalNum").html()))
	{
		getList($("#pageSize option:selected").val(),$("#currentPage").val());
	}else {
		alert("页码超出范围或不存在！");
	}
});
//当前页键盘事件
$("#currentPage").on("keydown",function(event){
	if(event.which == 13){
		//判断页码是否合法
		if(Number($("#currentPage").val())<=Number($("#pageTotalNum").html()))
		{
			getList($("#pageSize option:selected").val(),$("#currentPage").val());
		}else {
			alert("页码超出范围或不存在！");
		}
	}
});
//分页方法
function getPages(totalPages,visiblePages,currentPage){
	$.jqPaginator('#pages',{
		totalPages: totalPages,
		visiblePages: visiblePages,
		currentPage: currentPage,
		prev: '<input type="button" class="pageButton prev" value="上一页"/>',
		page: '<input type="button" class="pageButton page" value="{{page}}"/>',
		first: '<input type="button" class="pageButton first" value="首页"/>',
		next: '<input type="button" class="pageButton next" value="下一页"/>',
		last: '<input type="button" class="pageButton last" value="尾页"/>',
		onPageChange: function (num) {
			$('#currentPage').val(num);
            getList($("#pageSize").val(),$('#currentPage').val());
		}
	});
};
//分页更新方法
function updatePages(totalPages,visiblePages,currentPage){
	$('#pages').jqPaginator('option', {
		totalPages: totalPages,
		visiblePages: visiblePages,
		currentPage: currentPage,
	});
};