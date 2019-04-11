$(function () {
    getPages(totalPages,visiblePages,currentPage);
    //确认添加订单
    $(".panel-default").on("click",".addItem.order",function () {
        var id = $(this).parents("tr").attr("item-id");
        showForm(id,"添加问题","确认添加","取消添加","editAction addOrderAction");
        setAddFormInfo();
    });
    //确认添加运维人员
    $(".panel-default").on("click",".addItem.operator",function () {
        var id = $(this).parents("tr").attr("item-id");
        showForm(id,"添加运维人员","确认添加","取消添加","editAction addOperatorAction");
        setAddFormInfo();
    });
    //确认添加用户
    $(".panel-default").on("click",".addItem.user",function () {
        var id = $(this).parents("tr").attr("item-id");
        showForm(id,"添加用户","确认添加","取消添加","editAction addUserAction");
        setAddFormInfo();
    });
    //确认修改订单
    $(".panel-default").on("click",".order .edit",function () {
        var id = $(this).parents("tr").attr("item-id");
        showForm(id,"问题详情","确认修改","取消修改","editAction editOrderAction");
        setEditFormInfo();
    });
    //确认删除订单
    $(".panel-default").on("click",".order .delete",function () {
        var id = $(this).parents("tr").attr("item-id");
        showDialog(id,"删除问题","确认删除该问题？","确认删除","取消删除","deleteAction deleteOrderAction");
    });
    //确认修改完成订单
    $(".panel-default").on("click",".order_finished .edit",function () {
        var id = $(this).parents("tr").attr("item-id");
        showForm(id,"问题详情","确认修改","取消修改","editAction editOrderFinishedAction");
        setEditFormInfo();
    });
    //确认删除完成订单
    $(".panel-default").on("click",".order_finished .delete",function () {
        var id = $(this).parents("tr").attr("item-id");
        showDialog(id,"删除问题","确认删除该问题？","确认删除","取消删除","deleteAction deleteOrderFinishedAction");
    });
    //确认修改运维人员
    $(".panel-default").on("click",".operator .edit",function () {
        var id = $(this).parents("tr").attr("item-id");
        showForm(id,"运维人员详情","确认修改","取消修改","editAction editOperatorAction");
        setEditFormInfo();
    });
    //确认删除运维人员
    $(".panel-default").on("click",".operator .delete",function () {
        var id = $(this).parents("tr").attr("item-id");
        showDialog(id,"删除运维人员","确认删除该运维人员？","确认删除","取消删除","deleteAction deleteOperatorAction");
    });
    //确认修改用户
    $(".panel-default").on("click",".user .edit",function () {
        var id = $(this).parents("tr").attr("item-id");
        showForm(id,"用户详情","确认修改","取消修改","editAction editUserAction");
        setEditFormInfo();
    });
    //确认删除用户
    $(".panel-default").on("click",".user .delete",function () {
        var id = $(this).parents("tr").attr("item-id");
        showDialog(id,"删除用户","确认删除该用户？","确认删除","取消删除","deleteAction deleteUserAction");
    });
    //删除订单
    $(".dialog").on("click",".deleteOrderAction",function () {
        var id = $(this).parents(".dialog").attr("item-id");
        deleteItem(id,"deleteOrder");
    });
    //删除完成订单
    $(".dialog").on("click",".deleteOrderFinishedAction",function () {
        var id = $(this).parents(".dialog").attr("item-id");
        deleteItem(id,"deleteOrderFinished");
    });
    //删除运维人员
    $(".dialog").on("click",".deleteOperatorAction",function () {
        var id = $(this).parents(".dialog").attr("item-id");
        deleteItem(id,"deleteOperator");
    });
    //删除用户
    $(".dialog").on("click",".deleteUserAction",function () {
        var id = $(this).parents(".dialog").attr("item-id");
        deleteItem(id,"deleteUser");
    });
    //修改订单
    $(".form").on("click",".editOrderAction",function () {
        if(isSubmit()) {
            updateOrder();0
        }
    });
    //修改已完成订单
    $(".form").on("click",".editOrderFinishedAction",function () {
        if(isSubmit()) {
            updateOrderFinished();
        }
    });
    //修改运维人员
    $(".form").on("click",".editOperatorAction",function () {
        if(isSubmit()) {
            updateOperator();
        }
    });
    //修改用户
    $(".form").on("click",".editUserAction",function () {
        if(isSubmit()) {
            updateUser();
        }
    });
    //添加订单
    $(".form").on("click",".addOrderAction",function () {
        if(isSubmit()) {
            addOrder();
        }
    });
    //添加运维
    $(".form").on("click",".addOperatorAction",function () {
        if(isSubmit()) {
            addOperator();
        }
    });
    //添加用户
    $(".form").on("click",".addUserAction",function () {
        if(isSubmit()) {
            addUser();
        }
    });
});